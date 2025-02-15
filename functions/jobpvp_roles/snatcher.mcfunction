execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_snatcher] slot.armor.head 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_snatcher] slot.armor.chest 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_snatcher] slot.armor.legs 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
execute if score game jobpvp_gameState matches 1 run replaceitem entity @a[tag=jobpvp_role_snatcher] slot.armor.feet 0 air 1 0 {"item_lock":{"mode":"lock_in_inventory"}}

execute if score game jobpvp_gameState matches 1 run execute as @a[tag=jobpvp_role_snatcher] run execute unless entity @s[hasitem={item=iron_sword}] run give @s slime_ball 10 0
execute if score game jobpvp_gameState matches 1 run execute as @a[tag=jobpvp_role_snatcher] run execute unless entity @s[hasitem={item=iron_sword}] run give @s magma_cream 1 0
execute if score game jobpvp_gameState matches 1 run execute as @a[tag=jobpvp_role_snatcher] run execute unless entity @s[hasitem={item=iron_sword}] run give @s iron_sword 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
effect @a[tag=jobpvp_role_snatcher] health_boost infinite 24 true

execute as @a[tag=jobpvp_role_snatcher] run titleraw @s actionbar {"rawtext":[{"text":"§fあなたの役職は§r§e罠師§r§fです！§b 残機 : "},{"score":{"name":"@s","objective":"jobpvp_Lives"}}]}