execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_fist] slot.armor.head 0 air 1 0 {"item_lock":{"mode":"lock_in_slot"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_fist] slot.armor.chest 0 air 1 0 {"item_lock":{"mode":"lock_in_slot"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_fist] slot.armor.legs 0 air 1 0 {"item_lock":{"mode":"lock_in_slot"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_fist] slot.armor.feet 0 air 1 0 {"item_lock":{"mode":"lock_in_slot"}}

# execute if score game jobpvp_gameState matches 1 run clear @a[tag=jobpvp_role_fist]

effect @a[tag=jobpvp_role_fist] health_boost infinite 20 true



execute as @a[tag=jobpvp_role_fist] run titleraw @s actionbar {"rawtext":[{"text":"§fあなたの役職は§r§e21歳§r§fです！§b 残機 : "},{"score":{"name":"@s","objective":"jobpvp_Lives"}}]}