import { world, system, Player, ItemStack, ItemUseAfterEvent, EquipmentSlot, EntityComponentTypes } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
//import { MinecraftEntityTypes } from '@minecraft/vanilla-data';

function isBarehands(player) {
    const equipmentCompPlayer = player.getComponent(EntityComponentTypes.Equippable);
    if (equipmentCompPlayer) {
        let mainhand_item = equipmentCompPlayer.getEquipment(EquipmentSlot.Mainhand);
        return mainhand_item == null;
    }
}

function Knockback(entity) {
    const velocity = entity.getVelocity();
    entity.applyKnockback(-velocity.x, -velocity.z, 1.14, 3.34);

}

function Damage(entity, power) {
    const health = entity.getComponent(EntityComponentTypes.Health);
    health.setCurrentValue(health.currentValue - power);
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


function randomBetween(a, b) {
    return a + (b - a) * Math.random();
}

function pillarParticle(dimension, pos) {
    const particle_area = 4.45;
    let offset_x = randomBetween(-particle_area, particle_area);
    let offset_y = randomBetween(-particle_area, particle_area);
    let offset_z = randomBetween(-particle_area, particle_area);
    for (let i = -20; i < 100; i++) {
        dimension.runCommand("particle minecraft:trial_spawner_detection ~" + (pos.x + offset_x) + " ~" + (pos.y + i + offset_y) + " ~" + (pos.z + offset_z));
    }
}
function pillarParticle2(dimension, pos) {
    const particle_area = 4.45;
    for (let i = -20; i < 100; i++) {
        dimension.runCommand("particle minecraft:trial_spawner_detection ~" + (pos.x - 0.5) + " ~" + (pos.y + i) + " ~" + (pos.z - 0.5));
    }
}
//直線上にパーティクルを生成
function lineParticle(dimension, pos1, pos2) {
    let dx = pos2.x - pos1.x;
    let dy = pos2.y - pos1.y;
    let dz = pos2.z - pos1.z;
    let distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    let step = 0.1;
    let particle_area = 0.1;
    for (let i = 0; i < distance; i += step) {
        let x = pos1.x + dx * i / distance;
        let y = pos1.y + dy * i / distance;
        let z = pos1.z + dz * i / distance;
        dimension.runCommand("particle minecraft:mobflame_single " + x + " " + y + " " + z);
    }
}

function magicCircleParticle(dimension, pos) {
    const particle_radius = 7.0;
    const y_offset = 1.4;
    const N = 47;
    for (let i = 0; i < N; i++) {
        let rad = 2 * i * 3.14159265358979 / N;
        let x = Math.cos(rad) * particle_radius + pos.x;
        let y = pos.y + y_offset;
        let z = Math.sin(rad) * particle_radius + pos.z;
        dimension.runCommand("particle minecraft:mobflame_single " + x + " " + y + " " + z);
    }
    for (let i = 0; i < 6; i++) {
        let rad = 2 * i * 3.14159265358979 / 6;
        let next_rad = 2 * (i + 2) * 3.14159265358979 / 6;
        let x = Math.cos(rad) * particle_radius + pos.x;
        let y = pos.y + y_offset;
        let z = Math.sin(rad) * particle_radius + pos.z;
        let next_x = Math.cos(next_rad) * particle_radius + pos.x;
        let next_y = pos.y + y_offset;
        let next_z = Math.sin(next_rad) * particle_radius + pos.z;
        lineParticle(dimension, { x: x, y: y, z: z }, { x: next_x, y: next_y, z: next_z });
    }
}

function explodeParticle(dimension, pos) {
    //posを起点としてy++方向に次々に爆発がおこる
    for (let i = 0; i < 25; i++) {
        system.runTimeout(() => {
            dimension.runCommand("particle minecraft:huge_explosion_emitter " + pos.x + " " + (pos.y + i) + " " + pos.z);
        }, i);
    }

}


function Hellfire(dimension, pos) {
    pillarParticle(dimension, pos);
    pillarParticle(dimension, pos);
    pillarParticle(dimension, pos);
    pillarParticle(dimension, pos);
    pillarParticle2(dimension, pos);

    magicCircleParticle(dimension, pos);
    explodeParticle(dimension, pos);
    //ダメージ判定
    for (const target of dimension.getEntities()) {
        const distance = EntityBlockDistance(target, pos);

        if(distance < 7.0){
            target.setOnFire(1919);
        }
        if (3.0 <= distance && distance < 7.0) {
            target.applyDamage(20, { cause: "fire" });

        }
        if (distance < 3.0) {
            Damage(target, 48);
            Knockback(target);
        }
    }
}

export function hellman_behavior() {
    world.afterEvents.itemUse.subscribe(data => {
        let player = data.source;
        let item = data.itemStack;
        if (player.hasTag("jobpvp_role_hellman") && player.hasTag("jobpvp_Playing") && item.typeId === "minecraft:blaze_powder") {
            player.runCommand("clear @p blaze_powder 0 1");
            for (const target of world.getPlayers()) {
                if (target != player && EntityDistance(player, target) < 10.0) {
                    let target_location = target.location;
                    let area = 4;
                    target.teleport(
                        {
                            x: 177,
                            y: 32,
                            z: -176
                        },
                        {
                            dimension: world.getDimension("nether")
                        }
                    );
                    system.runTimeout(() => {
                        for (let i = 0; i < 20; i++) {
                            target.runCommand("tp @s " + (177 + randomBetween(-area, area)) + " 32 " + (-176 + randomBetween(-area, area)));
                            target.runCommand("kill @e[name=\"地獄のおともだち\"]");
                        }
                    }, 190);
                    system.runTimeout(() => {
                        for (let i = 0; i < 20; i++) {
                            target.runCommand("summon blaze 地獄のおともだち " + (177 + randomBetween(-area, area)) + " 32 " + (-176 + randomBetween(-area, area)));
                        }
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] health_boost infinite 10 true");
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] instant_health 20 255 true");
                    }, 200);
                    system.runTimeout(() => {
                        for (let i = 0; i < 30; i++) {
                            target.runCommand("summon piglin 地獄のおともだち " + (177 + randomBetween(-area, area)) + " 32 " + (-176 + randomBetween(-area, area)));
                        }
                    }, 300);
                    system.runTimeout(() => {
                        for (let i = 0; i < 15; i++) {
                            target.runCommand("summon piglin_brute 地獄のおともだち " + (177 + randomBetween(-area, area)) + " 32 " + (-176 + randomBetween(-area, area)));
                        }
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] health_boost infinite 10 true");
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] instant_health 20 255 true");
                    }, 360);
                    system.runTimeout(() => {
                        for (let i = 0; i < 20; i++) {
                            target.runCommand("summon blaze 地獄のおともだち " + (177 + randomBetween(-area, area)) + " 32 " + (-176 + randomBetween(-area, area)));
                        }
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] health_boost infinite 10 true");
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] instant_health 20 255 true");
                    }, 400);
                    system.runTimeout(() => {
                        for (let i = 0; i < 20; i++) {
                            target.runCommand("summon piglin 地獄のおともだち " + (177 + randomBetween(-area, area)) + " 32 " + (-176 + randomBetween(-area, area)));
                            target.runCommand("summon blaze 地獄のおともだち " + (177 + randomBetween(-area, area)) + " 32 " + (-176 + randomBetween(-area, area)));
                            target.runCommand("summon piglin_brute 地獄のおともだち " + (177 + randomBetween(-area, area)) + " 32 " + (-176 + randomBetween(-area, area)));
                        }
                        for (let i = 0; i < 7; i++) {
                            target.runCommand("summon ghast 地獄のおともだち " + (177 + randomBetween(-area, area)) + " 52 " + (-176 + randomBetween(-area, area)));
                        }
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] health_boost infinite 20 true");
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] instant_health 20 255 true");
                    }, 600);
                    system.runTimeout(() => {
                        target.runCommand("kill @e[name=\"地獄のおともだち\"]");
                    }, 800);
                    system.runTimeout(() => {
                        target.teleport(target_location, { dimension: world.getDimension("overworld") });
                    }, 900);
                }
            }
        }
        if (player.hasTag("jobpvp_role_hellman") && player.hasTag("jobpvp_Playing") && item.typeId === "minecraft:stick") {
            const fireball = player.dimension.spawnEntity("minecraft:fireball", {
                x: player.location.x + 5.0 * player.getViewDirection().x,
                y: player.location.y + 5.0 * player.getViewDirection().y,
                z: player.location.z + 5.0 * player.getViewDirection().z
            });
            let fireball_speed = 2.5;
            fireball.applyImpulse({
                x: fireball_speed * player.getViewDirection().x,
                y: fireball_speed * player.getViewDirection().y,
                z: fireball_speed * player.getViewDirection().z
            });
            fireball.runCommand("tag @s add jobpvp_hellFireball");
            system.runTimeout(() => {
                fireball.remove();
            }, 100);
        }
    });
    world.afterEvents.entityHurt.subscribe(data => {
        let player = data.damageSource.damagingEntity;
        let hurtEntity = data.hurtEntity;
        let projectile = data.damageSource.damagingProjectile;
        let damage_amount = data.damage;
        let power = damage_amount * 3;
        if (player.hasTag("jobpvp_role_hellman") && player.hasTag("jobpvp_Playing")) {
            system.runTimeout(() => {
                hurtEntity.runCommand("setblock ~~~ fire keep");
                return;
            }, 10);
            system.runTimeout(() => {
                hurtEntity.runCommand("setblock ~~~ fire keep");
                return;
            }, 20);
            system.runTimeout(() => {
                hurtEntity.runCommand("setblock ~~~ fire keep");
                return;
            }, 30);
            system.runTimeout(() => {
                player.runCommand("fill ~10 ~10 ~10 ~-10 ~-10 ~-10 air replace fire");
                return;
            }, 100);
        }
        return;
    });

    world.beforeEvents.entityRemove.subscribe(data => {
        let entity = data.removedEntity;
        let pos = entity.location;
        let dimension = entity.dimension;
        if (entity.hasTag("jobpvp_hellFireball")) {
            system.runTimeout(() => {
                try {
                    Hellfire(dimension, pos);
                } catch (error) {
                    world.sendMessage("" + error.message);

                }

            }, 1);
        }
    })

    system.runInterval(() => {
        world.getDimension("overworld").getEntities().forEach(entity => {
            if (entity.hasTag("jobpvp_hellFireball")) {
                let velocity = entity.getVelocity();
                let new_velocity = {
                    x: 0,
                    y: -0.2,
                    z: 0
                };
                entity.applyImpulse(new_velocity);
            }
        });
    }, 2);
}