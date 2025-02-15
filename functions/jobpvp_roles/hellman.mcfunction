execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_hellman] slot.armor.head 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_hellman] slot.armor.chest 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_hellman] slot.armor.legs 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_hellman] slot.armor.feet 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run enchant @a[tag=jobpvp_role_hellman] fire_aspect 2

execute if score game jobpvp_gameState matches 1 run execute as @a[tag=jobpvp_role_hellman] run execute unless entity @s[hasitem={item=iron_sword}] run give @s blaze_powder 1 0
execute if score game jobpvp_gameState matches 1 run execute as @a[tag=jobpvp_role_hellman] run execute unless entity @s[hasitem={item=iron_sword}] run give @s iron_sword 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
effect @a[tag=jobpvp_role_hellman] health_boost infinite 54 true
execute if score game jobpvp_gameState matches 1 run effect @a[tag=jobpvp_role_hellman] fire_resistance infinite 255 true

execute as @a[tag=jobpvp_role_hellman] run titleraw @s actionbar {"rawtext":[{"text":"§fあなたの役職は§r§e地獄§r§fです！§b 残機 : "},{"score":{"name":"@s","objective":"jobpvp_Lives"}}]}