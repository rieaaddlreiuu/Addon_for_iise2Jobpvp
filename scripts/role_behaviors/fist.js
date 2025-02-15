import { world, system, Player, ItemStack, ItemUseAfterEvent, EquipmentSlot, EntityComponentTypes } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

function isBarehands(player) {
    const equipmentCompPlayer = player.getComponent(EntityComponentTypes.Equippable);
    if (equipmentCompPlayer) {
        let mainhand_item = equipmentCompPlayer.getEquipment(EquipmentSlot.Mainhand);
        return mainhand_item == null;
    }
}

export function fist_behavior() {
    world.afterEvents.entityHurt.subscribe(data => {
        let player = data.damageSource.damagingEntity;
        let hurtEntity = data.hurtEntity;
        if (player.hasTag("jobpvp_role_fist") && isBarehands(player)) {
            player.runCommand("playsound mace.heavy_smash_ground @p");
            hurtEntity.runCommand("particle minecraft:smash_ground_particle_center ~~~");
            hurtEntity.runCommand("particle minecraft:knockback_roar_particle ~~~");
            hurtEntity.runCommand("particle minecraft:knockback_roar_particle ~~~");
            hurtEntity.runCommand("particle minecraft:knockback_roar_particle ~~~");
        }
        return;
    });
    system.runInterval(() => {
        for (const player of world.getPlayers()) {
            if(player.hasTag("jobpvp_role_fist") && isBarehands(player)){
                player.runCommand("effect @s strength 20 12 true");
            } else {
                player.removeEffect("strength");
            }
        }
    }, 3);
    system.runInterval(()=>{
        for (const player of world.getPlayers()) {
            if(player.hasTag("jobpvp_role_fist")){
                player.runCommand("function others/inventory_lock")
            }
        }
    },10);
}