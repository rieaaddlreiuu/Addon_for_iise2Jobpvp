import { world, system, Player, ItemStack, ItemUseAfterEvent, EntityHealthComponent, EntityComponentTypes } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

function Damage(entity, power) {
    const health = entity.getComponent(EntityComponentTypes.Health);
    health.setCurrentValue(health.currentValue - power);
}


export function archer_behavior() {
    world.afterEvents.entityHurt.subscribe(data => {
        let player = data.damageSource.damagingEntity;
        let hurtEntity = data.hurtEntity;
        let projectile = data.damageSource.damagingProjectile;
        let damage_amount = data.damage;
        let power = damage_amount * 9;

        if (player.hasTag("jobpvp_role_archer") && player.hasTag("jobpvp_Playing") && projectile.typeId == "minecraft:arrow") {
            system.runTimeout(() => {
                Damage(hurtEntity,power);
                hurtEntity.runCommand("particle minecraft:smash_ground_particle_center ~~~");
                hurtEntity.runCommand("particle minecraft:knockback_roar_particle ~~~");
                hurtEntity.runCommand("particle minecraft:knockback_roar_particle ~~~");
                hurtEntity.runCommand("particle minecraft:knockback_roar_particle ~~~");
            }, 1);
        }
        return;
    });
    system.runInterval(() => {
        for (const player of world.getPlayers()) {
            if (player.isSneaking && player.hasTag("jobpvp_Playing") && player.hasTag("jobpvp_role_archer")) {
                for (let i = 0; i < 100; i++) {
                    player.runCommand("execute as @p anchored eyes positioned ^^^" + (i) + " run effect @e[r=3] slowness 1 3 true");
                }
            }
        }
    }, 1);

}