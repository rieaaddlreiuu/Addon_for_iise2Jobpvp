import { world, system, Player, ItemStack, ItemUseAfterEvent } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

function runWithProbability(probability, func) {
    if (Math.random() < probability) {
        func();
    }
}


export function warrior_behavior() {
    world.afterEvents.entityHurt.subscribe(data => {
        let player = data.damageSource.damagingEntity;
        let hurtEntity = data.hurtEntity;
        let damage_amount = data.damage;
        let power = damage_amount * 3;
        if (player.hasTag("jobpvp_role_warrior")) {
            runWithProbability(0.1, function () {
                player.runCommand("playsound random.anvil_land @p");
                system.runTimeout(() => {
                    hurtEntity.applyDamage(power, { cause: "selfDestruct" });
                    return;
                }, 1);
            });
        }
        return;
    });
    
}