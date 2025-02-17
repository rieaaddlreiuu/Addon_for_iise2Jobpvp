execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_fuujin] slot.armor.head 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_fuujin] slot.armor.chest 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_fuujin] slot.armor.legs 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_fuujin] slot.armor.feet 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}

execute if score game jobpvp_gameState matches 1 run execute as @a[tag=jobpvp_role_fuujin] run execute unless entity @s[hasitem={item=iron_sword}] run give @s wind_charge 22 0
execute if score game jobpvp_gameState matches 1 run execute as @a[tag=jobpvp_role_fuujin] run execute unless entity @s[hasitem={item=iron_sword}] run give @s feather 3 0
execute if score game jobpvp_gameState matches 1 run execute as @a[tag=jobpvp_role_fuujin] run execute unless entity @s[hasitem={item=iron_sword}] run give @s iron_sword 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
effect @a[tag=jobpvp_role_fuujin] health_boost infinite 54 true

execute as @a[tag=jobpvp_role_fuujin] run titleraw @s actionbar {"rawtext":[{"text":"§fあなたの役職は§r§e風神§r§fです！§b 残機 : "},{"score":{"name":"@s","objective":"jobpvp_Lives"}}]}