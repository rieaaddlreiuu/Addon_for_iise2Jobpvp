import { world, system, Player, ItemStack, ItemUseAfterEvent } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

export function raijin_behavior() {
    world.afterEvents.itemUse.subscribe(data => {
        let player = data.source;
        let item = data.itemStack;
        if (player.hasTag("jobpvp_role_raijin") && !player.hasTag("jobpvp_cooldown")) {
            player.runCommand("tag @p add jobpvp_cooldown");
            system.runTimeout(() => {
                player.runCommand("tag @p remove jobpvp_cooldown");
            }, 40);
            if (item.typeId === "minecraft:golden_sword") {
                for (let i = 1; i < 10; i++) {
                    system.runTimeout(() => {
                        player.runCommand("execute as @p anchored eyes positioned ^^^" + (3 * i + 4) + " run damage @e[r=4] 20 lightning");
                        player.runCommand("execute as @p anchored eyes positioned ^^^" + (3 * i + 4) + " run summon lightning_bolt ~ ~ ~");
                        player.runCommand("execute as @p anchored eyes positioned ^^^" + (3 * i + 4) + " run particle minecraft:huge_explosion_emitter ~ ~ ~");
                    }, 3 * i);
                }
            }
        }
        if (player.hasTag("jobpvp_role_raijin")) {
            if (item.typeId === "minecraft:blaze_rod") {
                player.runCommand("clear @p blaze_rod 0 1");
                for (let i = 1; i < 40; i++) {
                    system.runTimeout(() => {
                        player.runCommand("execute as @e[rm=2,r=20,type=!lightning_bolt] run damage @s 3 self_destruct");
                        player.runCommand("execute as @e[rm=2,r=20,type=!lightning_bolt]  at @s run summon lightning_bolt ~ ~ ~");
                    }, 2 * i);
                }
            }
        }
    });

    world.afterEvents.entityHurt.subscribe(data => {
        let player = data.damageSource.damagingEntity;
        let hurtEntity = data.hurtEntity;

        if (player.hasTag("jobpvp_role_raijin")) {
            system.runTimeout(() => {
                hurtEntity.runCommand("summon lightning_bolt ~~~")
                return;
            }, 25);
        }
        return;
    });
}