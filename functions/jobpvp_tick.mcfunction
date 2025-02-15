execute as @e[name=trap_1,tag=jobpvp_trapActivated] at @s run effect @s instant_health 20 255 true
execute as @e[name=trap_2,tag=jobpvp_trapActivated] at @s run effect @s instant_health 20 255 true

execute as @e[name=trap_1,tag=jobpvp_trapActivated] at @s run effect @s invisibility 20 255 true
execute as @e[name=trap_2,tag=jobpvp_trapActivated] at @s run effect @s invisibility 20 255 true

execute as @e[name=trap_1,tag=jobpvp_trapActivated] at @s run tp @s ~~~~~
execute as @e[name=trap_2,tag=jobpvp_trapActivated] at @s run tp @s ~~~~~

execute as @e[name=trap_1,tag=jobpvp_trapActivated] at @s run particle minecraft:white_smoke_particle ~~~
execute as @e[name=trap_2,tag=jobpvp_trapActivated] at @s run particle minecraft:white_smoke_particle ~~~

execute as @e[name=trap_1,tag=jobpvp_trapActivated] at @s run effect @e[r=2,family=mob] slowness 10 255 true
execute as @e[name=trap_1,tag=jobpvp_trapActivated] at @s run effect @e[r=2,type=player] slowness 10 255 true
execute as @e[name=trap_1,tag=jobpvp_trapActivated] at @s run damage @e[r=2,family=mob] 20 self_destruct
execute as @e[name=trap_1,tag=jobpvp_trapActivated] at @s run damage @e[r=2,type=player] 20 self_destruct

execute as @e[name=trap_1,tag=jobpvp_trapActivated] at @s if entity @e[r=2,family=mob,name=!trap_1] run kill @s
execute as @e[name=trap_1,tag=jobpvp_trapActivated] at @s if entity @e[r=2,type=player,name=!trap_1] run kill @s

execute as @e[name=trap_2,tag=jobpvp_trapActivated] at @s run execute as @e[r=2,type=player] run function jobpvp_role_reset
execute as @e[name=trap_2,tag=jobpvp_trapActivated] at @s run execute as @e[r=2,type=player] run tag @s add jobpvp_role_neet
execute as @e[name=trap_2,tag=jobpvp_trapActivated] at @s if entity @e[r=2,type=player,name=!trap_2] run tag @s add jobpvp_killed