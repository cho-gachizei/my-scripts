javascript:(function() {
    'use strict';
 // チェックボックス
    const ids = [ 　　　　　　　
        'fieldname3_1_cb0',                  // 重要進化：弱点暴き：+8％
         'fieldname3_1_cb1',                 // Lv.80：ツキヨミ：+5％
         'fieldname3_1_cb2',                 // Lv.80：キング：+5％
         'fieldname3_1_cb3',                 // Lv.80：ウィチェ：+5％
         'fieldname3_1_cb4',                 // Lv.120：コモン：+5％
         'fieldname3_1_cb5',                 // Lv.120：マスターヤン：+10％
         'fieldname3_1_cb6',                 // Lv.120：ボブ：+5％
         'fieldname3_1_cb7',                 // Lv.120：イカルド：+5％
         'fieldname3_1_cb8',                 // Lv.120：パトリック：+5％
         'fieldname3_1_cb9',                 // Lv.120：サンディ：+5％
         'fieldname3_1_cb10',                // ★5：レオナルド+8％
         'fieldname3_1_cb11',                // ★5：ラファエロ+8％
         'fieldname3_1_cb12',                // ★5：エイプリル+8％
         'fieldname3_1_cb13',                // ★5：ミケランジェロ+8％
         'fieldname3_1_cb14',                // ★5：ドナテロ+8％
         'fieldname3_1_cb15',                // ★5：スプリンター+8％
         'fieldname3_1_cb16',                // 🟥：★3：古の知恵：+10％
         'fieldname3_1_cb17',                // 🟥：★3：星間跳躍陣の図面：+10％
         'fieldname3_1_cb18',                // 🟥：★3：異界の奇鍵：+10％
         'fieldname3_1_cb19',                // 🟥：★3：星核のダイヤモンド：+10％
         'fieldname3_1_cb20',                // 🟥：★3：真視の眼：+10％
         'fieldname3_1_cb21',                // 🟥：★3：命の砂時計：+10％
         'fieldname3_1_cb22',                // 🟥：★3：次元ホイル：+10％
         'fieldname3_1_cb23',                // 🟥：★3：意識同期ヘルメット：+10％
         'fieldname3_1_cb24',                // 🟨：1期：★3：古の医学書籍：+5％
         'fieldname3_1_cb25',                // 🟨：2期：★3：幸運のお守り：+5％
         'fieldname3_1_cb26',                // 🟨：2期：★3：先端科学者の手記：+5％
         'fieldname3_1_cb27',                // 🟨：3期：★3：伝説が刻まれた粘土板：+5％
         'fieldname3_1_cb28',                // 🟨：3期：★3：烈焔の羽：+5％
         'fieldname3_1_cb29',                // 🟨：4期：★3：プラズマソード：+5％
         'fieldname3_1_cb30',                // 🟨：4期：★3：黄金の角笛：+5％
         'fieldname3_1_cb31',                // 🟨：5期：★3：水力推進フリッパー：+5％
         'fieldname3_1_cb32',                // 🟨：5期：★3：超人タブレット：+5％
         'fieldname8_1_cb0'                  // マスターヤン：陽状態：+20％
    ];
 // プルダウン
    const selectIds = ['fieldname9_1']; // 協力作戦   
 
 // テキストボックス
    const inputIds = ['fieldname1_1',   // 手動入力
                      'fieldname2_1'];  // クリティカル率：合計
    
 // ラジオボタン
     const radioIds = [
      //ペットスキル：モチベーション
         'fieldname4_1_rb0', // なし
         'fieldname4_1_rb1', // +3％
         'fieldname4_1_rb2', // +4％
         'fieldname4_1_rb3', // +5％
      //手袋
         'fieldname6_1_rb0', // なし
         'fieldname6_1_rb1', // レザーグローブ：+5％
         'fieldname6_1_rb2', // エターナルグローブ：+10％
         'fieldname6_1_rb3', // エターナルグローブ：+20％
         'fieldname6_1_rb4', // 
      //装備：首輪
         'fieldname5_1_rb0', //  なし
         'fieldname5_1_rb1', // 破壊者エンブレム：+40％
         'fieldname5_1_rb2', // コレ★5：破壊者エンブレム：+50％
      //サバイバー：固有
         'fieldname7_1_rb0', //なし
         'fieldname7_1_rb1', //キング：サバイバー直感★5：+40％
         'fieldname7_1_rb2', //キング：致命的なセンス★：+50％
         'fieldname7_1_rb3', //マスターヤン：覚醒★1：+5％
         'fieldname7_1_rb4', //マスターヤン：覚醒★4：+15％
         'fieldname7_1_rb5', //マスターヤン：覚醒★6：+30％
    ]; // ラジオボタンのIDを追加

    const save = () => {
        const state = ids.reduce((acc, id) => {
            const checkbox = document.getElementById(id);
            if (checkbox) acc[id] = checkbox.checked;
            return acc;
        }, {});

        const selectState = selectIds.reduce((acc, id) => {
            const select = document.getElementById(id);
            if (select) acc[id] = select.value;
            return acc;
        }, {});

        const inputState = inputIds.reduce((acc, id) => {
            const input = document.getElementById(id);
            if (input) acc[id] = input.value;
            return acc;
        }, {});

        const radioState = radioIds.reduce((acc, id) => {
            const radio = document.getElementById(id);
            if (radio && radio.checked) acc[id] = radio.value;
            return acc;
        }, {});

        localStorage.setItem('checkboxStates', JSON.stringify(state));
        localStorage.setItem('selectStates', JSON.stringify(selectState));
        localStorage.setItem('inputStates', JSON.stringify(inputState));
        localStorage.setItem('radioStates', JSON.stringify(radioState));
        console.log('保存しました！');
    };

    const load = () => {
        const state = JSON.parse(localStorage.getItem('checkboxStates'));
        const selectState = JSON.parse(localStorage.getItem('selectStates'));
        const inputState = JSON.parse(localStorage.getItem('inputStates'));
        const radioState = JSON.parse(localStorage.getItem('radioStates'));

        if (!state && !selectState && !inputState && !radioState) {
            console.log('保存された状態がありません。');
            return;
        }

        ids.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox && state.hasOwnProperty(id)) {
                checkbox.checked = state[id];
            }
        });

        selectIds.forEach(id => {
            const select = document.getElementById(id);
            if (select && selectState.hasOwnProperty(id)) {
                select.value = selectState[id];
            }
        });

        inputIds.forEach(id => {
            const input = document