import { world, system, Player, ItemStack, ItemUseAfterEvent } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { raijin_behavior } from "./role_behaviors/raijin";
import { archer_behavior } from "./role_behaviors/archer";
import { hellman_behavior } from "./role_behaviors/hellman";
import { warrior_behavior } from "./role_behaviors/warrior";
import { snatcher_behavior } from "./role_behaviors/snatcher";
import { fist_behavior } from "./role_behaviors/fist";
//うんこうんこ
function EntityDistance(entity1, entity2) {
    return Math.sqrt((entity1.location.x - entity2.location.x) ^ 2 + (entity1.location.y - entity2.location.y) ^ 2 + (entity1.location.z - entity2.location.z) ^ 2)
}

function runWithProbability(probability, func) {
    if (Math.random() < probability) {
        func();
    }
}

raijin_behavior();
archer_behavior();
hellman_behavior();
warrior_behavior();
snatcher_behavior();
fist_behavior();

world.afterEvents.itemUse.subscribe(data => {
    let player = data.source;
    let item = data.itemStack;

    if (player.hasTag("jobpvp_role_snatcher")) {
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
    if (item.typeId === "jobpvp:sonar") {
        for (const target of world.getPlayers()) {
            if (target != player) {
                let position = "x:" + Math.floor(target.location.x) + " z:" + Math.floor(target.location.z);
                player.runCommand("tellraw @s {\"rawtext\":[{\"text\":\"" + position + " にだれかがいるようです\"}]}");
            }
        }
        player.runCommand("clear @s jobpvp:sonar 0 1");
    }

    if (item.typeId === "jobpvp:speedup") {
        player.runCommand("effect @p speed 10 10 true");
        player.runCommand("clear @s jobpvp:speedup 0 1");
    }
    if (item.typeId === "jobpvp:jump") {
        player.runCommand("effect @p jump_boost 10 10 true");
        player.runCommand("clear @s jobpvp:jump 0 1");
    }
    return;
});


system.runInterval(() => {
    world.getPlayers()[0].runCommand("function jobpvp_tick");
}, 1);