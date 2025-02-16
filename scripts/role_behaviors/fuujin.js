import { world, system, Player, ItemStack, ItemUseAfterEvent, EntityHealthComponent, EntityComponentTypes, Dimension, EquipmentSlot } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

function isBarehands(player) {
    const equipmentCompPlayer = player.getComponent(EntityComponentTypes.Equippable);
    if (equipmentCompPlayer) {
        let mainhand_item = equipmentCompPlayer.getEquipment(EquipmentSlot.Mainhand);
        return mainhand_item == null;
    }
}

function EntityDistance(entity1, entity2) {
    let dx = entity1.location.x - entity2.location.x;
    let dy = entity1.location.y - entity2.location.y;
    let dz = entity1.location.z - entity2.location.z;
    return (Math.sqrt(dx * dx + dy * dy + dz * dz));
}

function EntityBlockDistance(entity, block_pos) {
    let dx = entity.location.x - block_pos.x;
    let dy = entity.location.y - block_pos.y;
    let dz = entity.location.z - block_pos.z;
    return (Math.sqrt(dx * dx + dy * dy + dz * dz));
}

function runWithProbability(probability, func) {
    if (Math.random() < probability) {
        func();
    }
}

function inverseVelocity(entity) {
    if (entity.typeId != "minecraft:player") {
        const velocity = entity.getVelocity();
        entity.clearVelocity();
        entity.applyImpulse({
            x: -velocity.x,
            y: -velocity.y,
            z: -velocity.z
        });
    } else {
        const velocity = entity.getVelocity();
        entity.applyKnockback(-velocity.x, -velocity.z, 3.34, 1.2);
    }

}

// 風による攻撃。周囲にダメージ&ノックバックを与え、(確率で)particleを出す
function wind_attack(player, pos, particle_probability = 0.3) {
    try {
        let dimension = player.dimension;
        dimension
            .getEntities()
            .filter((entity) => {
                return (EntityBlockDistance(entity, pos) < 3.34 && !entity.hasTag("jobpvp_reflected"));
            })
            .forEach((entity) => {
                inverseVelocity(entity);
                entity.runCommand("tag @s add jobpvp_reflected");
                if (entity.matches({ families: ["mob"] })) {
                    entity.applyDamage(12, { cause: "magic", damagingEntity: player });
                }
                if (entity.matches({ families: ["player"] })) {
                    entity.applyDamage(12, { cause: "magic", damagingEntity: player });
                }
                system.runTimeout(() => {
                    entity.runCommand("tag @s remove jobpvp_reflected")
                }, 10);
            });

        //particleを出す(確率で)

        let position_cmd = " " + pos.x + " " + pos.y + " " + pos.z;
        runWithProbability(particle_probability, () => {
            player.runCommand("particle minecraft:wind_explosion_emitter " + position_cmd);
        });
    } catch (error) {
        world.sendMessage("" + error.message);
    }
}

export function fuujin_behavior() {
    const N = 25;
    const r = 3.5;

    //低速落下と風のエフェクト
    system.runInterval(() => {
        for (const player of world.getPlayers()) {
            if (player.hasTag("jobpvp_role_fuujin")) {
                player.runCommand("particle minecraft:wind_explosion_emitter ~~-1~");
                player.runCommand("effect @s slow_falling 20 255 true");
            }
        }
    }, 3);

    //風の攻撃
    system.runInterval(() => {
        for (const player of world.getPlayers()) {
            if (player.hasTag("jobpvp_role_fuujin") && isBarehands(player)) {
                for (let i = 0; i < N; i++) {
                    system.runTimeout(() => {
                        try {
                            let digree_rad = i * 3.14159265358979 / (N);

                            let pos = {
                                x: player.location.x + r * Math.cos(digree_rad),
                                y: player.location.y + 1,
                                z: player.location.z + r * Math.sin(digree_rad)
                            }
                            let pos_inverse = {
                                x: player.location.x - r * Math.cos(digree_rad),
                                y: player.location.y + 1,
                                z: player.location.z - r * Math.sin(digree_rad)
                            }

                            wind_attack(player, pos, 0.3);
                            wind_attack(player, pos_inverse, 0.3);
                        } catch (error) {
                            world.sendMessage("" + error.message);
                        }

                    }, i)
                }
            }
        }
    }, N);

    //右クリックで風の攻撃
    world.afterEvents.itemUse.subscribe(data => {
        let player = data.source;
        let item = data.itemStack;

        if (player.hasTag("jobpvp_role_fuujin")) {
            //前方に直線状に風の攻撃
            for (let i = 3; i < N; i++) {
                system.runTimeout(() => {
                    let pos = {
                        x: player.location.x + 2 * i * player.getViewDirection().x,
                        y: player.location.y + 1,
                        z: player.location.z + 2 * i * player.getViewDirection().z
                    }

                    wind_attack(player, pos, 0.8);
                }, i)
            }
        }
    });
};