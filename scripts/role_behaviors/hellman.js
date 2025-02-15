import { world, system, Player, ItemStack, ItemUseAfterEvent } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

function EntityDistance(entity1, entity2) {
    let dx = entity1.location.x - entity2.location.x;
    let dy = entity1.location.y - entity2.location.y;
    let dz = entity1.location.z - entity2.location.z;
    return (Math.sqrt(dx * dx + dy * dy + dz * dz));
}

function randomBetween(a,b){
    return a+(b-a)*Math.random();
}


export function hellman_behavior() {
    world.afterEvents.itemUse.subscribe(data => {
        let player = data.source;
        let item = data.itemStack;
        if (player.hasTag("jobpvp_role_hellman") && item.typeId === "minecraft:blaze_powder") {
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
                            target.runCommand("tp @s "+(177+randomBetween(-area,area))+" 32 "+(-176+randomBetween(-area,area)));
                        }
                    }, 190);
                    system.runTimeout(() => {
                        for (let i = 0; i < 20; i++) {
                            target.runCommand("summon blaze 地獄のおともだち "+(177+randomBetween(-area,area))+" 32 "+(-176+randomBetween(-area,area)));
                        }
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] health_boost infinite 10 true");
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] instant_health 20 255 true");
                    }, 200);
                    system.runTimeout(() => {
                        for (let i = 0; i < 30; i++) {
                            target.runCommand("summon piglin 地獄のおともだち "+(177+randomBetween(-area,area))+" 32 "+(-176+randomBetween(-area,area)));
                        }
                    }, 300);
                    system.runTimeout(() => {
                        for (let i = 0; i < 15; i++) {
                            target.runCommand("summon piglin_brute 地獄のおともだち "+(177+randomBetween(-area,area))+" 32 "+(-176+randomBetween(-area,area)));
                        }
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] health_boost infinite 10 true");
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] instant_health 20 255 true");
                    }, 360);
                    system.runTimeout(() => {
                        for (let i = 0; i < 20; i++) {
                            target.runCommand("summon blaze 地獄のおともだち "+(177+randomBetween(-area,area))+" 32 "+(-176+randomBetween(-area,area)));
                        }
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] health_boost infinite 10 true");
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] instant_health 20 255 true");
                    }, 400);
                    system.runTimeout(() => {
                        for (let i = 0; i < 20; i++) {
                            target.runCommand("summon piglin 地獄のおともだち "+(177+randomBetween(-area,area))+" 32 "+(-176+randomBetween(-area,area)));
                            target.runCommand("summon blaze 地獄のおともだち "+(177+randomBetween(-area,area))+" 32 "+(-176+randomBetween(-area,area)));
                            target.runCommand("summon piglin_brute 地獄のおともだち "+(177+randomBetween(-area,area))+" 32 "+(-176+randomBetween(-area,area)));
                        }
                        for(let i=0;i<7;i++){
                            target.runCommand("summon ghast 地獄のおともだち "+(177+randomBetween(-area,area))+" 52 "+(-176+randomBetween(-area,area)));
                        }
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] health_boost infinite 20 true");
                        target.runCommand("effect @e[name=\"地獄のおともだち\"] instant_health 20 255 true");
                    }, 600);
                    system.runTimeout(()=>{
                        target.runCommand("kill @e[name=\"地獄のおともだち\"]");
                    },800);
                    system.runTimeout(()=>{
                        target.teleport(target_location, {dimension: world.getDimension("overworld")});
                    },900);
                }
            }
        }
    });

    world.afterEvents.entityHurt.subscribe(data => {
        let player = data.damageSource.damagingEntity;
        let hurtEntity = data.hurtEntity;
        let projectile = data.damageSource.damagingProjectile;
        let damage_amount = data.damage;
        let power = damage_amount * 3;
        if (player.hasTag("jobpvp_role_hellman")) {
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
}