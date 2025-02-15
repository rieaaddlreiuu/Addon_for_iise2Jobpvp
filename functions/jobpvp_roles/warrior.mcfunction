execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_warrior] slot.armor.head 0 iron_helmet 1 0 {"item_lock":{"mode":"lock_in_slot"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_warrior] slot.armor.chest 0 iron_chestplate 1 0 {"item_lock":{"mode":"lock_in_slot"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_warrior] slot.armor.legs 0 iron_leggings 1 0 {"item_lock":{"mode":"lock_in_slot"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_warrior] slot.armor.feet 0 iron_boots 1 0 {"item_lock":{"mode":"lock_in_slot"}}

execute if score game jobpvp_gameState matches 1 run execute as @a[tag=jobpvp_role_warrior] run execute unless entity @s[hasitem={item=diamond_sword}] run give @s diamond_sword 1 0 {"item_lock":{"mode":"lock_in_inventory"}}

effect @a[tag=jobpvp_role_warrior] health_boost infinite 24 true


execute as @a[tag=jobpvp_role_warrior] run titleraw @s actionbar {"rawtext":[{"text":"§fあなたの役職は§r§e戦士§r§fです！§b 残機 : "},{"score":{"name":"@s","objective":"jobpvp_Lives"}}]}