import { world, system, Player, ItemStack, ItemUseAfterEvent } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

//戦士
function show_description_warrior(player) {
    const job = new ActionFormData();
    job.title("戦士");
    job.body("まれにクリティカルが出る\n[ダメージは通常攻撃力の2乗分]");
    job.button("戦士にする");
    job.button("他の役職を見る");
    job.show(player).then(({ selection, canceled }) => {
        if (canceled) return;

        if (selection === 0) {
            player.runCommand("function jobpvp_role_reset")
            player.runCommand("tag @s add jobpvp_role_warrior");
        }

        if (selection === 1) {
            showRoleSelectionForm(player);
        }
    });
}
//ニート
function show_description_neet(player) {
    const job = new ActionFormData();
    job.title("ニート");
    job.body("ただの一般人\n[残機は20]");
    job.button("ニートにする");
    job.button("他の役職を見る");
    job.show(player).then(({ selection, canceled }) => {
        if (canceled) return;

        if (selection === 0) {
            player.runCommand("function jobpvp_role_reset")
            player.runCommand("tag @s add jobpvp_role_neet");
        }

        if (selection === 1) {
            showRoleSelectionForm(player);
        }
    });
}
//アーチャー
function show_description_archer(player) {
  const job = new ActionFormData();
  job.title("アーチャー");
  job.body("しゃがむと相手を遅くする\n弓矢のダメージが高い");
  job.button("アーチャーにする");
  job.button("他の役職を見る");
  job.show(player).then(({ selection, canceled }) => {
      if (canceled) return;

      if (selection === 0) {
        player.runCommand("function jobpvp_role_reset")
        player.runCommand("tag @s add jobpvp_role_archer");    
    }

    if (selection === 1) {
        showRoleSelectionForm(player);
    }
  });
}
//雷神
function show_description_raijin(player) {
    const job = new ActionFormData();
    job.title("雷神");
    job.body("剣を持ち使用することで雷を落とせる\n[クールタイム２秒]\n必殺技は相手に持続的に雷を落とせる");
    job.button("雷神にする");
    job.button("他の役職を見る");
    job.show(player).then(({ selection, canceled }) => {
        if (canceled) return;
  
        if (selection === 0) {
            player.runCommand("function jobpvp_role_reset")
          player.runCommand("tag @s add jobpvp_role_raijin");    
      }
  
      if (selection === 1) {
          showRoleSelectionForm(player);
      }
    });
  }
  //罠師
function show_description_snatcher(player) {
    const job = new ActionFormData();
    job.title("罠師");
    job.body("当たると鈍化とダメージを受ける罠を仕掛けれる\n自分にもあたるので注意\n必殺技は当たった相手の役職をニートの変える");
    job.button("罠師にする");
    job.button("他の役職を見る");
    job.show(player).then(({ selection, canceled }) => {
        if (canceled) return;
  
        if (selection === 0) {
            player.runCommand("function jobpvp_role_reset")
          player.runCommand("tag @s add jobpvp_role_snatcher");    
      }
  
      if (selection === 1) {
          showRoleSelectionForm(player);
      }
    });
  }
  //地獄
function show_description_hell(player) {
    const job = new ActionFormData();
    job.title("地獄");
    job.body("攻撃した相手の足元を燃やす\n必殺技は相手を地獄送りにする");
    job.button("地獄にする");
    job.button("他の役職を見る");
    job.show(player).then(({ selection, canceled }) => {
        if (canceled) return;
  
        if (selection === 0) {
            player.runCommand("function jobpvp_role_reset")
          player.runCommand("tag @s add jobpvp_role_hellman");    
      }
  
      if (selection === 1) {
          showRoleSelectionForm(player);
      }
    });
  }
  //２１歳拳で
function show_description_21years(player) {
    const job = new ActionFormData();
    job.title("21歳拳で");
    job.body("スロットが制限される\n素手の間のみ攻撃力が上がる");
    job.button("21歳拳でにする");
    job.button("他の役職を見る");
    job.show(player).then(({ selection, canceled }) => {
        if (canceled) return;
  
        if (selection === 0) {
            player.runCommand("function jobpvp_role_reset")
          player.runCommand("tag @s add jobpvp_role_fist");    
      }
  
      if (selection === 1) {
          showRoleSelectionForm(player);
      }
    });
  }
  //風神（製作中）
function show_description_zaraki(player) {
    const job = new ActionFormData();
    job.title("制作中");
    job.body("製作中しばらくお待ちください");
    job.button("ここを押すとニートになります");
    job.button("他の役職を見る");
    job.show(player).then(({ selection, canceled }) => {
        if (canceled) return;
  
        if (selection === 0) {
            player.runCommand("function jobpvp_role_reset")
          player.runCommand("tag @s add jobpvp_role_neet");    
      }
  
      if (selection === 1) {
          showRoleSelectionForm(player);
      }
    });
  }
  //製作中
function show_description_honoo(player) {
    const job = new ActionFormData();
    job.title("製作中");
    job.body("製作中しばらくお待ちください");
    job.button("ここを押すとニートになります");
    job.button("他の役職を見る");
    job.show(player).then(({ selection, canceled }) => {
        if (canceled) return;
  
        if (selection === 0) {
            player.runCommand("function jobpvp_role_reset")
          player.runCommand("tag @s add jobpvp_role_neet");    
      }
  
      if (selection === 1) {
          showRoleSelectionForm(player);
      }
    });
  }
  //製作中
function show_description_koori(player) {
    const job = new ActionFormData();
    job.title("製作中");
    job.body("製作中しばらくお待ちください");
    job.button("ここを押すとニートになります");
    job.button("他の役職を見る");
    job.show(player).then(({ selection, canceled }) => {
        if (canceled) return;
  
        if (selection === 0) {
            player.runCommand("function jobpvp_role_reset")
          player.runCommand("tag @s add jobpvp_role_neet");    
      }
  
      if (selection === 1) {
          showRoleSelectionForm(player);
      }
    });
  }

function showRoleSelectionForm(player){
    const sampleForm = new ActionFormData();
        sampleForm.title("役職選択");
        sampleForm.body("使いたい役職を選択してください");
        sampleForm.button("戦士");
        sampleForm.button("ニート");
        sampleForm.button("アーチャー");
        sampleForm.button("雷神");
        sampleForm.button("罠師師");
        sampleForm.button("地獄");
        sampleForm.button("21歳拳で");
        sampleForm.button("製作中");
        sampleForm.button("製作中");
        sampleForm.button("製作中");

        sampleForm.show(player).then(({ selection, canceled }) => {
            if (canceled) return;

            if (selection === 0) {
                show_description_warrior(player);
            }
            if (selection === 1) {
                show_description_neet(player);
            }
            if (selection === 2) {
              show_description_archer(player);
          }
          if (selection === 3) {
            show_description_raijin(player);
        }
        if (selection === 4) {
            show_description_snatcher(player);
        }
        if (selection === 5) {
            show_description_hell(player);
        }
        if (selection === 6) {
            show_description_21years(player);
        }
        if (selection === 7) {
            show_description_zaraki(player);
        }
        if (selection === 8) {
            show_description_honoo(player);
        }
        if (selection === 9) {
            show_description_koori(player);
        }
            return;
        })
}

world.afterEvents.itemUse.subscribe(data => {
    const player = data.source;
    const item = data.itemStack;
    
    if (item.typeId === "minecraft:diamond") {
        showRoleSelectionForm(player);
    }

});


export function showRoleSelectionForm(player) {

}