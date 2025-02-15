import { world, system, Player, ItemStack, ItemUseAfterEvent, EntityHealthComponent, EntityComponentTypes, Dimension } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

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
        entity.applyKnockback(-velocity.x, -velocity.z, 5.0, 0.4);
    }

}

function affectByPosition(player, dimension, pos) {
    dimension
        .getEntities()
        .filter((entity) => {
            return (EntityBlockDistance(entity, pos) < 3.34 && !entity.hasTag("jobpvp_reflected"));
        })
        .forEach((entity) => {
            inverseVelocity(entity);
            entity.runCommand("tag @s add jobpvp_reflected");
            if (entity.matches({ families: ["mob"] })) {
                entity.applyDamage(12, { cause: "charging", damagingEntity: player });
            }
            if (entity.matches({ families: ["player"] })) {
                entity.applyDamage(12, { cause: "charging", damagingEntity: player });
            }
            system.runTimeout(() => {
                entity.runCommand("tag @s remove jobpvp_reflected")
            }, 10);
        });
}

export function fuujin_behavior() {
    system.runInterval(() => {
        for (const player of world.getPlayers()) {
            if (player.hasTag("jobpvp_role_fuujin")) {
                player.runCommand("particle minecraft:wind_explosion_emitter ~~-1~");
                player.runCommand("effect @s slow_falling 20 255 true");
            }
        }
    }, 1);
    /*system.runInterval(() => {
        for (const player of world.getPlayers()) {
            if (player.hasTag("jobpvp_role_fuujin")) {
                player.dimension
                    .getEntities()
                    .filter((entity) => {
                        return (2.0 < EntityDistance(player, entity) && EntityDistance(player, entity) < 7.0 && !entity.hasTag("jobpvp_reflected"));
                    })
                    .forEach((entity) => {
                        inverseVelocity(entity);
                        entity.runCommand("tag @s add jobpvp_reflected");
                        system.runTimeout(() => {
                            entity.runCommand("tag @s remove jobpvp_reflected")
                        }, 10);
                    });
                player.dimension
                    .getEntities()
                    .filter((entity) => {
                        return (2.0 >= EntityDistance(player, entity) && !entity.hasTag("jobpvp_reflected"));
                    })
                    .forEach((entity) => {
                        entity.runCommand("tag @s add jobpvp_reflected");
                    });
            }
        }
    }, 1);*/
    let N = 25;
    let r = 5.0;
    system.runInterval(() => {
        for (const player of world.getPlayers()) {
            if (player.hasTag("jobpvp_role_fuujin")) {
                for (let i = 0; i < N; i++) {
                    system.runTimeout(() => {
                        let digree_rad = i * 3.14159265358979 / (N);

                        let pos_x = r * Math.sin(digree_rad);
                        let pos_z = r * Math.cos(digree_rad);
                        let position_cmd = " ~" + pos_x + " ~1 ~" + pos_z;
                        let position_cmd_inv = " ~" + (-pos_x) + " ~1 ~" + (-pos_z);
                        player.runCommand("particle minecraft:wind_explosion_emitter " + position_cmd);
                        player.runCommand("particle minecraft:wind_explosion_emitter " + position_cmd_inv);

                        affectByPosition(player, player.dimension, { x: (player.location.x + pos_x), y: (player.location.y + 1), z: (player.location.z + pos_z) });
                        affectByPosition(player, player.dimension, { x: (player.location.x - pos_x), y: (player.location.y + 1), z: (player.location.z - pos_z) });
                    }, i)
                }
            }
        }
    }, N);
    world.afterEvents.itemUse.subscribe(data => {

    });
}