gamemode a @a[tag=jobpvp_Playing]
tag @a remove jobpvp_ActivePlayers
tag @a remove jobpvp_Playing
tag @a remove jobpvp_Spectator
tag @a remove jobpvp_roleSelected
tag @a remove jobpvp_winner

scoreboard players set roleSelectedPlayers jobpvp_ActivePlayers 0
scoreboard players set game jobpvp_gameState 0

scoreboard players reset @e jobpvp_Mana
scoreboard players reset @e jobpvp_Lives
gamemode a @a[m=spectator]

execute as @a at @s run function jobpvp_role_reset
effect @a clear

tellraw @a {"rawtext":[{"text":"§bリセットしました§r"}]}
clear @a[tag=jobpvp_joined]
tp @a[tag=jobpvp_joined] 2404 -6 429