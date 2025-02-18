import { world, system, Player, ItemStack, ItemUseAfterEvent } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

export class Config {
    constructor() {
        this.configData = this.loadConfig();
    }

    loadConfig() {
        let config = world.scoreboard.getObjective("jobpvp_Config");
        let item_config = world.scoreboard.getObjective("jobpvp_ItemConfig");
        let scores = config.getScores();
        let item_scores = item_config.getScores();
        let configData = {
            nightVision: false,
            fallingDamage: true,
            respawnPos: { x: 0, y: 0, z: 0 },
            readyRoomPos: { x: 0, y: 0, z: 0 },
            roleSelectRoomPos: { x: 0, y: 0, z: 0 },
            lobbyPos: { x: 0, y: 0, z: 0 },
            respawnRadius: 5,
            stocks: 3,
            items: []
        };
        scores.forEach(value => {
            let score_name = value.participant.displayName;
            let score = value.score;
            if (score_name == "respawnPos_x") {
                configData.respawnPos.x = score;
            }
            if (score_name == "respawnPos_y") {
                configData.respawnPos.y = score;
            }
            if (score_name == "respawnPos_z") {
                configData.respawnPos.z = score;
            }
            if (score_name == "readyRoomPos_x") {
                configData.readyRoomPos.x = score;
            }
            if (score_name == "readyRoomPos_y") {
                configData.readyRoomPos.y = score;
            }
            if (score_name == "readyRoomPos_z") {
                configData.readyRoomPos.z = score;
            }
            if (score_name == "roleSelectRoomPos_x") {
                configData.roleSelectRoomPos.x = score;
            }
            if (score_name == "roleSelectRoomPos_y") {
                configData.roleSelectRoomPos.y = score;
            }
            if (score_name == "roleSelectRoomPos_z") {
                configData.roleSelectRoomPos.z = score;
            }
            if (score_name == "lobbyPos_x") {
                configData.lobbyPos.x = score;
            }
            if (score_name == "lobbyPos_y") {
                configData.lobbyPos.y = score;
            }
            if (score_name == "lobbyPos_z") {
                configData.lobbyPos.z = score;
            }
            if (score_name == "nightVision") {
                configData.nightVision = (score == 1);
            }
            if (score_name == "fallingDamage") {
                configData.fallingDamage = (score == 1);
            }
            if (score_name == "respawnRadius") {
                configData.respawnRadius = score;
            }
            if (score_name == "stocks") {
                configData.stocks = score;
            }
        });
        item_scores.forEach(value => {
            let item_name = value.participant.displayName;
            let score = value.score;
            configData.items.push({ name: item_name, count: score });
        });
        return configData;
    }

    showConfigForm(player) {
        let form = new ActionFormData();
        form.title("JobPvP Config");
        form.body("設定を変更します");
        form.button("基本設定");
        form.button("リスポーン設定");
        form.button("待機部屋設定");
        form.button("役職選択部屋設定");
        form.button("ロビー設定");
        form.button("アイテム設定");
        form.button("設定を保存");

        form.show(player).then((response) => {
            if (response.canceled) return;
            if (response.selection === 0) {
                this.showBasicConfigForm(player);
            }
            if (response.selection === 1) {
                this.showRespawnConfigForm(player);
            }
            if (response.selection === 2) {
                this.showReadyRoomConfigForm(player);
            }
            if (response.selection === 3) {
                this.showRoleSelectRoomConfigForm(player);
            }
            if (response.selection === 4) {
                this.showLobbyConfigForm(player);
            }
            if (response.selection === 5) {
                this.showItemConfigForm(player);
            }
            if (response.selection === 6) {
                this.loadConfig();
                player.sendMessage("設定を保存しました");
            }
        });
    }

    showBasicConfigForm(player) {
        let config = world.scoreboard.getObjective("jobpvp_Config");
        let item_config = world.scoreboard.getObjective("jobpvp_ItemConfig");
        let form = new ModalFormData();
        form.title("基本設定");
        form.toggle("暗視");
        form.toggle("落下ダメージ", true);
        form.textField("ストック数", "ストック数を入力", this.configData.stocks.toString());
        form.show(player).then((response) => {
            if (response.canceled) return;
            config.setScore("nightVision", response.formValues[0] ? 1 : 0);
            config.setScore("fallingDamage", response.formValues[1] ? 1 : 0);
            config.setScore("stocks", parseInt(response.formValues[2]));
            world.sendMessage("基本設定を保存しました");
            this.configData = this.loadConfig();
        });
    }

    showRespawnConfigForm(player) {
        let config = world.scoreboard.getObjective("jobpvp_Config");
        let form = new ModalFormData();
        form.title("リスポーン設定");
        form.textField("x座標", "x座標を入力", parseInt(player.location.x).toString());
        form.textField("y座標", "y座標を入力", parseInt(player.location.y).toString());
        form.textField("z座標", "z座標を入力", parseInt(player.location.z).toString());
        form.textField("半径", "リスポーン半径を入力", "5");
        form.show(player).then((response) => {
            if (response.canceled) return;
            config.setScore("respawnPos_x", parseInt(response.formValues[0]));
            config.setScore("respawnPos_y", parseInt(response.formValues[1]));
            config.setScore("respawnPos_z", parseInt(response.formValues[2]));
            config.setScore("respawnRadius", parseInt(response.formValues[3]));
            world.sendMessage("リスポーン設定を保存しました");
            this.configData = this.loadConfig();
        });
    }

    showReadyRoomConfigForm(player) {
        let config = world.scoreboard.getObjective("jobpvp_Config");
        let form = new ModalFormData();
        form.title("待機部屋設定");
        form.textField("x座標", "x座標を入力", parseInt(player.location.x).toString());
        form.textField("y座標", "y座標を入力", parseInt(player.location.y).toString());
        form.textField("z座標", "z座標を入力", parseInt(player.location.z).toString());
        form.show(player).then((response) => {
            if (response.canceled) return;
            config.setScore("readyRoomPos_x", parseInt(response.formValues[0]));
            config.setScore("readyRoomPos_y", parseInt(response.formValues[1]));
            config.setScore("readyRoomPos_z", parseInt(response.formValues[2]));
            world.sendMessage("待機部屋設定を保存しました");
            this.configData = this.loadConfig();
        });
    }

    showRoleSelectRoomConfigForm(player) {
        let config = world.scoreboard.getObjective("jobpvp_Config");
        let form = new ModalFormData();
        form.title("役職選択部屋設定");
        form.textField("x座標", "x座標を入力", parseInt(player.location.x).toString());
        form.textField("y座標", "y座標を入力", parseInt(player.location.y).toString());
        form.textField("z座標", "z座標を入力", parseInt(player.location.z).toString());
        form.show(player).then((response) => {
            if (response.canceled) return;
            config.setScore("roleSelectRoomPos_x", parseInt(response.formValues[0]));
            config.setScore("roleSelectRoomPos_y", parseInt(response.formValues[1]));
            config.setScore("roleSelectRoomPos_z", parseInt(response.formValues[2]));
            world.sendMessage("役職選択部屋設定を保存しました");
            this.configData = this.loadConfig();
        });
    }

    showLobbyConfigForm(player) {
        let config = world.scoreboard.getObjective("jobpvp_Config");
        let form = new ModalFormData();
        form.title("ロビー設定");
        form.textField("x座標", "x座標を入力", parseInt(player.location.x).toString());
        form.textField("y座標", "y座標を入力", parseInt(player.location.y).toString());
        form.textField("z座標", "z座標を入力", parseInt(player.location.z).toString());
        form.show(player).then((response) => {
            if (response.canceled) return;
            config.setScore("lobbyPos_x", parseInt(response.formValues[0]));
            config.setScore("lobbyPos_y", parseInt(response.formValues[1]));
            config.setScore("lobbyPos_z", parseInt(response.formValues[2]));
            world.sendMessage("ロビー設定を保存しました");
            this.configData = this.loadConfig();
        });
    }
    showItemConfigForm(player) {
        let item_config = world.scoreboard.getObjective("jobpvp_ItemConfig");
        let form = new ActionFormData();
        form.title("アイテム設定");
        form.body("初期アイテムの設定をします");
        //アイテム名のボタン->アイテム数設定のformを表示
        this.configData.items.forEach((item) => {
            form.button(item.name);
        });
        form.button("新しいアイテムを追加");
        form.button("アイテムの削除")
        form.button("設定を保存");
        form.show(player).then((response) => {
            if (response.canceled) return;
            if (response.selection === this.configData.items.length) {
                this.showNewItemForm(player);

            } else if (response.selection === this.configData.items.length + 1) {
                this.showItemDeleteForm(player);
            } else if (response.selection === this.configData.items.length + 2) {
                this.loadConfig();
                player.sendMessage("アイテム設定を保存しました");
            } else {
                this.showItemAmountForm(player, response.selection);
            }
        });
    }

    showNewItemForm(player) {
        let item_config = world.scoreboard.getObjective("jobpvp_ItemConfig");
        let form = new ModalFormData();
        form.title("新しいアイテムを追加");
        form.textField("アイテム名", "アイテム名を入力");
        form.textField("アイテム数", "個数", "1");
        form.show(player).then((response) => {
            if (response.canceled) return;
            item_config.setScore(response.formValues[0], parseInt(response.formValues[1]));
            this.configData = this.loadConfig();
        });
    }

    showItemAmountForm(player, index) {
        let item_config = world.scoreboard.getObjective("jobpvp_ItemConfig");
        let form = new ModalFormData();
        form.title("アイテム数設定");
        form.textField("アイテム数", "アイテム数を入力");
        form.show(player).then((response) => {
            if (response.canceled) return;
            item_config.setScore(this.configData.items[index].name, parseInt(response.formValues[0]));
            this.configData = this.loadConfig();
        });
    }

    showItemDeleteForm(player) {
        let item_config = world.scoreboard.getObjective("jobpvp_ItemConfig");
        let form = new ActionFormData();
        form.title("アイテム削除");
        form.body("削除したいアイテムを選択してください");
        this.configData.items.forEach((item) => {
            form.button(item.name);
        });
        form.show(player).then((response) => {
            if (response.canceled) return;
            item_config.removeParticipant(this.configData.items[response.selection].name);
            this.configData = this.loadConfig();
        });
    }
}

export const config = new Config();