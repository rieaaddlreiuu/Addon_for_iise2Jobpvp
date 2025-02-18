import { world, system, Player, ItemStack, ItemUseAfterEvent } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

import { config } from "./Config";

function countDown(count_number, callback) {
    let command_player = world.getPlayers()[0];
    for (let i = 0; i < count_number; i++) {
        system.runTimeout(() => {
            world.getPlayers().forEach(player => {
                player.runCommand("playsound random.anvil_land @s");
                player.runCommand("title @s title §e" + (count_number - i));
            });
        }, 20 * i);
    }
    system.runTimeout(() => {
        callback();
    }, 20 * count_number);
}

function gameStart() {
    system.runTimeout(() => {
        let command_player = world.getPlayers()[0];
        command_player.runCommand("clear @a[tag=jobpvp_joined]");
        if (config.configData.fallingDamage) {
            command_player.runCommand("gamerule fallDamage true");
        } else {
            command_player.runCommand("gamerule fallDamage false");
        }
        //カウントダウン
        countDown(4, () => {
            command_player.runCommand("title @a[tag=jobpvp_joined] title §bSTART！！！！");
            command_player.runCommand("tag @a[tag=jobpvp_joined] add jobpvp_Playing");
            command_player.runCommand("function jobpvp_gameStart");
            command_player.runCommand("playsound random.explode @a[tag=jobpvp_joined]");
            //プレイヤーの初期化
            world.getPlayers().filter(player => player.hasTag("jobpvp_joined")).forEach(player => {
                config.configData.items.forEach(item => {
                    player.runCommand("give @s " + item.name + " " + item.count);
                });
                player.runCommand("effect @s instant_health 20 255 true");
                player.runCommand("spawnpoint @s " + config.configData.respawnPos.x + " " + config.configData.respawnPos.y + " " + config.configData.respawnPos.z);
                player.runCommand("tp @s " + config.configData.respawnPos.x + " " + config.configData.respawnPos.y + " " + config.configData.respawnPos.z);
                if (config.configData.nightVision) {
                    player.runCommand("effect @s night_vision infinite 255 true");
                }
                player.runCommand("scoreboard players set @s jobpvp_Lives " + config.configData.stocks);
            });
        });
    }, 1);
}

export function jobpvpGameProgression() {

    system.runInterval(() => {
        let activePlayers_score = world.scoreboard.getObjective("jobpvp_ActivePlayers");
        let command_player = world.getPlayers()[0];
        let scores = activePlayers_score.getScores();
        let joined_player = world.getPlayers().filter(player => player.hasTag("jobpvp_joined")).length;
        let roleSelected_player = world.getPlayers().filter(player => player.hasTag("jobpvp_roleSelected")).length;
        let remain_player = world.getPlayers().filter(player => player.hasTag("jobpvp_Playing")).length;
        scores.forEach(value => {
            let score_name = value.participant.displayName;
            let score = value.score;



            if (score_name == "activePlayers") {
                activePlayers_score.setScore("activePlayers", joined_player);
            }
            if (score_name == "roleSelectedPlayers") {
                activePlayers_score.setScore("roleSelectedPlayers", roleSelected_player);
            }
            if (score_name == "remainPlayers") {
                activePlayers_score.setScore("remainPlayers", remain_player);
            }


        });
        //待機部屋へ移動
        world.getPlayers().filter(player => (player.hasTag("jobpvp_roleSelected") && !player.hasTag("jobpvp_waiting"))).forEach(player => {
            player.runCommand("gamemode adventure @s");
            player.runCommand("tag @s add jobpvp_waiting");
            player.runCommand("tp @s " + config.configData.readyRoomPos.x + " " + config.configData.readyRoomPos.y + " " + config.configData.readyRoomPos.z);
        });
        //ゲーム開始
        if (joined_player == roleSelected_player && world.scoreboard.getObjective("jobpvp_gameState").getScore("game") == 0) {
            world.scoreboard.getObjective("jobpvp_gameState").setScore("game", 1);
            world.sendMessage("§e全員が役職を選択しました！！！！");
            gameStart();
        }
        //ゲーム終了
        if (remain_player == 1 && world.scoreboard.getObjective("jobpvp_gameState").getScore("game") == 1) {
            world.scoreboard.getObjective("jobpvp_gameState").setScore("game", 0);
            world.sendMessage("§eゲーム終了！！！！");
            let winner = world.getPlayers().filter(player => player.hasTag("jobpvp_Playing"))[0];
            world.getPlayers().forEach(player => {
                player.runCommand("title @s title §bゲーム終了！！！！");
            });
            system.runTimeout(() => {
                world.getPlayers().forEach(player => {
                    player.runCommand("title @s title §e勝者 : " + winner.nameTag);
                });
                command_player.runCommand("function jobpvp_reset");
                command_player.runCommand("tp @a[tag=jobpvp_joined] " + config.configData.lobbyPos.x + " " + config.configData.lobbyPos.y + " " + config.configData.lobbyPos.z);
            }, 100);
        }

    }, 1);

    //プレイヤーが死んだとき
    world.afterEvents.playerSpawn.subscribe(data => {
        let player = data.player;
        if (!player.hasTag("jobpvp_Playing")) return;
        //残機を1減らす
        player.runCommand("scoreboard players add @s jobpvp_Lives -1");
        //役職設定
        player.runCommand("function jobpvp_role_setting");
        //各種effectをつける
        player.runCommand("effect @s instant_health 20 255 true");
        player.runCommand("effect @s resistance 5 255 true");
        player.runCommand("effect @s speed 5 20 true");
        if (config.configData.nightVision) {
            player.runCommand("effect @s night_vision infinite 255 true");
        }
        //残機が0になったら
        system.runTimeout(() => {
            if (world.scoreboard.getObjective("jobpvp_Lives").getScore(player) <= 0 && player.hasTag("jobpvp_Playing")) {
                player.runCommand("tag @s add jobpvp_dead");
                player.runCommand("tag @s remove jobpvp_Playing");
                player.runCommand("tag @s remove jobpvp_roleSelected");
                player.runCommand("gamemode spectator @s");
            }
        }, 4);
    });

    world.afterEvents.itemUse.subscribe(data => {
        let player = data.source;
        let item = data.itemStack;

        if (item.typeId === "minecraft:compass") {
            config.showConfigForm(player);
        }
        //全員を役職設定部屋に移動
        if(item.typeId === "minecraft:clock"){
            world.getPlayers().filter(player => player.hasTag("jobpvp_joined")).forEach(player => {
                player.runCommand("tp @s " + config.configData.roleSelectRoomPos.x + " " + config.configData.roleSelectRoomPos.y + " " + config.configData.roleSelectRoomPos.z);
            });
        }
    });
}