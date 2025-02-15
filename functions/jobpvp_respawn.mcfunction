# tag=jobpvp_respawnのやつに処理します
effect @a[tag=jobpvp_respawn] resistance 5 255 true
effect @a[tag=jobpvp_respawn] speed 5 35 true
effect @a[tag=jobpvp_respawn] instant_health 20 255 true
execute at @e[name=jobpvp_spawnCentral,c=1] run spreadplayers ~ ~ 1 30 @a[tag=jobpvp_respawn]
scoreboard players add @a[tag=jobpvp_respawn] jobpvp_Lives -1
tag @a[tag=jobpvp_respawn] remove jobpvp_respawn