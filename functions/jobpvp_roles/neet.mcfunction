execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_neet] slot.armor.head 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_neet] slot.armor.chest 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_neet] slot.armor.legs 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_neet] slot.armor.feet 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}

execute as @a[tag=jobpvp_role_neet] run titleraw @s actionbar {"rawtext":[{"text":"§fあなたの役職は§r§eニート§r§fです！§b 残機 : "},{"score":{"name":"@s","objective":"jobpvp_Lives"}}]}