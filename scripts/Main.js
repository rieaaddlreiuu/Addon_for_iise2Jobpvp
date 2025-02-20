import { world, system, Player, ItemStack, ItemUseAfterEvent } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { raijin_behavior } from "./role_behaviors/raijin";
import { archer_behavior } from "./role_behaviors/archer";
import { hellman_behavior } from "./role_behaviors/hellman";
import { warrior_behavior } from "./role_behaviors/warrior";
import { snatcher_behavior } from "./role_behaviors/snatcher";
import { fist_behavior } from "./role_behaviors/fist";
import { fuujin_behavior } from "./role_behaviors/fuujin";
import { showRoleSelectionEvents } from "./showRoleSelectionForm";
import { jobpvpGameProgression } from "./jobpvpGameProgression";
function EntityDistance(entity1, entity2) {
    return Math.sqrt((entity1.location.x - entity2.location.x) ^ 2 + (entity1.location.y - entity2.location.y) ^ 2 + (entity1.location.z - entity2.location.z) ^ 2)
}

function runWithProbability(probability, func) {
    if (Math.random() < probability) {
        func();
    }
}
showRoleSelectionEvents();
raijin_behavior();
archer_behavior();
hellman_behavior();
warrior_behavior();
snatcher_behavior();
fist_behavior();
fuujin_behavior();
jobpvpGameProgression();

world.afterEvents.itemUse.subscribe(data => {
    let player = data.source;
    let item = data.itemStack;

    if (item.typeId === "jobpvp:sonar") {
        if (player.hasTag("jobpvp_cooltime")) {
            player.runCommand("tellraw @s {\"rawtext\":[{\"text\":\"クールタイムです！\"}]}");
            return;
        }

        for (const target of world.getPlayers()) {
            if (target != player) {
                let position = "x:" + Math.floor(target.location.x) + " z:" + Math.floor(target.location.z);
                player.runCommand("tellraw @s {\"rawtext\":[{\"text\":\"" + position + " にだれかがいるようです\"}]}");
                for (let k = 0; k < 4; k++) {
                    system.runTimeout(() => {
                        for (let i = -20; i < 20; i++) {
                            if (i < 3 && i > -5) continue;
                            target.runCommand("particle minecraft:trial_spawner_detection ~-0.5 ~" + i + " ~-0.5");
                        }
                    }, 10 * k);
                }

            }
        }
        player.addTag("jobpvp_cooltime");
        system.runTimeout(() => {
            player.removeTag("jobpvp_cooltime");
        }, 100);
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