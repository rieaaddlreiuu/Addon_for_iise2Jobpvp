tag @a[tag=jobpvp_roleSelected] add jobpvp_Playing
tag @a[tag=jobpvp_Playing] remove jobpvp_roleSelected
#個人戦の場合の処理
execute if score gameMode jobpvp_GameMode matches 0 run scoreboard players set @a[tag=jobpvp_Playing] jobpvp_Lives 3
execute if score gameMode jobpvp_GameMode matches 0 run scoreboard players set @a[tag=jobpvp_Playing] jobpvp_Mana 100
execute if score gameMode jobpvp_GameMode matches 0 at @e[name=jobpvp_spawnCentral,c=1] run spreadplayers ~ ~ 1 30 @a[tag=jobpvp_Playing]
#チーム戦の場合の処理


#事後処理
scoreboard players set game jobpvp_gameState 1
execute as @a[tag=jobpvp_role_neet] run scoreboard players set @s jobpvp_Lives 20