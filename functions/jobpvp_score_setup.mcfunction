scoreboard objectives add jobpvp_gameState dummy ゲーム状態
scoreboard objectives add jobpvp_GameMode dummy ゲームモード
scoreboard objectives add jobpvp_Mana dummy MP
scoreboard objectives add jobpvp_Lives dummy 残機
scoreboard objectives add jobpvp_Timer dummy 時間
scoreboard objectives add jobpvp_ActivePlayers dummy 参加プレイヤー数
scoreboard objectives add jobpvp_Events dummy イベント
scoreboard objectives add jobpvp_Config dummy 設定
scoreboard objectives add jobpvp_ItemConfig dummy アイテム設定

scoreboard players set game jobpvp_gameState 0
scoreboard players set activePlayers jobpvp_ActivePlayers 0
scoreboard players set remainPlayers jobpvp_ActivePlayers 0
scoreboard players set roleSelectedPlayers jobpvp_ActivePlayers 0
