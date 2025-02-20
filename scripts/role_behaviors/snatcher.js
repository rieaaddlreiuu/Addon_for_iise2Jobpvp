import { world, system, Player, ItemStack, ItemUseAfterEvent } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

export function snatcher_behavior() {
    world.afterEvents.itemUse.subscribe(data => {
        let player = data.source;
        let item = data.itemStack;
        if (player.hasTag("jobpvp_role_snatcher") && player.hasTag("jobpvp_Playing")) {
            if (item.typeId === "minecraft:slime_ball") {
                player.runCommand("summon villager trap_1 ~~~");
                player.runCommand("clear @p slime_ball 0 1");
                system.runTimeout(() => {
                    player.runCommand("tag @e[name=trap_1] add jobpvp_trapActivated");
                }, 20);
            }
            if (item.typeId === "minecraft:magma_cream") {
                player.runCommand("summon villager trap_2 ~~~");
                player.runCommand("clear @p magma_cream 0 1");
                system.runTimeout(() => {
                    player.runCommand("tag @e[name=trap_2] add jobpvp_trapActivated");
                }, 20);
            }
        }
        return;
    });

}