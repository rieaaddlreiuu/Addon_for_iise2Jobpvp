import { world, system, Player, ItemStack, ItemUseAfterEvent } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

export function archer_behavior() {
    world.afterEvents.entityHurt.subscribe(data => {
        let player = data.damageSource.damagingEntity;
        let hurtEntity = data.hurtEntity;
        let projectile = data.damageSource.damagingProjectile;
        let damage_amount = data.damage;
        let power = damage_amount * 3;

        if (player.hasTag("jobpvp_role_archer") && projectile.typeId == "minecraft:arrow") {
            system.runTimeout(() => {
                hurtEntity.applyDamage(3 * power, { cause: "selfDestruct" });
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
            if (player.isSneaking && player.hasTag("jobpvp_role_archer")) {
                for (let i = 0; i < 100; i++) {
                    player.runCommand("execute as @p anchored eyes positioned ^^^" + (i) + " run effect @e[r=3] slowness 1 3 true");
                }
            }
        }
    }, 1);

}