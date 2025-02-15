execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_archer] slot.armor.head 0 iron_helmet 1 0 {"item_lock":{"mode":"lock_in_slot"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_archer] slot.armor.chest 0 iron_chestplate 1 0 {"item_lock":{"mode":"lock_in_slot"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_archer] slot.armor.legs 0 iron_leggings 1 0 {"item_lock":{"mode":"lock_in_slot"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_archer] slot.armor.feet 0 iron_boots 1 0 {"item_lock":{"mode":"lock_in_slot"}}

execute if score game jobpvp_gameState matches 1 run execute as @a[tag=jobpvp_role_archer] run execute unless entity @s[hasitem={item=wooden_sword}] run give @s wooden_sword 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run execute as @a[tag=jobpvp_role_archer] run execute unless entity @s[hasitem={item=bow}] run give @s bow 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run execute as @a[tag=jobpvp_role_archer] run execute unless entity @s[hasitem={item=arrow}] run give @s arrow 1 0 {"item_lock":{"mode":"lock_in_inventory"}}

effect @a[tag=jobpvp_role_archer] health_boost infinite 14 true


execute as @a[tag=jobpvp_role_archer] run titleraw @s actionbar {"rawtext":[{"text":"§fあなたの役職は§r§eアーチャー§r§fです！§b 残機 : "},{"score":{"name":"@s","objective":"jobpvp_Lives"}}]}