import { world, system, Player, ItemStack, ItemUseAfterEvent, EntityHealthComponent, EntityComponentTypes } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

function runWithProbability(probability, func) {
    if (Math.random() < probability) {
        func();
    }
}

function Damage(entity,power) {
    const health = entity.getComponent(EntityComponentTypes.Health);
    health.setCurrentValue(health.currentValue - power);
}



export function warrior_behavior() {
    world.afterEvents.entityHurt.subscribe(data => {
        let player = data.damageSource.damagingEntity;
        let hurtEntity = data.hurtEntity;
        let damage_amount = data.damage;
        let power = damage_amount * damage_amount;
        if (player.hasTag("jobpvp_role_warrior")) {
            runWithProbability(0.3, function () {
                player.runCommand("playsound mace.heavy_smash_ground @p");
                system.runTimeout(() => {
                    Damage(hurtEntity,power);
                    hurtEntity.runCommand("particle minecraft:smash_ground_particle_center ~~~");
                    hurtEntity.runCommand("particle minecraft:knockback_roar_particle ~~~");
                    hurtEntity.runCommand("particle minecraft:knockback_roar_particle ~~~");
                    hurtEntity.runCommand("particle minecraft:knockback_roar_particle ~~~");
                    return;
                }, 1);
            });
        }
        return;
    });

}