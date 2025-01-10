javascript:(function() {
    'use strict';

    const ids = ['fieldname3_1_cb0', 'fieldname3_1_cb1', 'fieldname3_1_cb2', 'fieldname3_1_cb3', 'fieldname3_1_cb32', 'fieldname8_1_cb0'];
    const selectIds = ['fieldname9_1']; // プルダウン項目のIDを追加

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

        localStorage.setItem('checkboxStates', JSON.stringify(state));
        localStorage.setItem('selectStates', JSON.stringify(selectState));
        console.log('保存しました！');
    };

    const load = () => {
        const state = JSON.parse(localStorage.getItem('checkboxStates'));
        const selectState = JSON.parse(localStorage.getItem('selectStates'));

        if (!state && !selectState) {
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

        console.log('復元しました！');
    };

    const dialog = document.createElement('div');
    dialog.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.5); z-index: 1000;">
            <p>チェック状態を保存しますか？「読み込み」を押すと復元します。</p>
            <button id="saveButton">保存</button>
            <button id="loadButton">読み込み</button>
            <button id="closeButton">閉じる</button>
        </div>
    `;
    document.body.appendChild(dialog);

    document.getElementById('saveButton').addEventListener('click', () => {
        save();
        document.body.removeChild(dialog);
    });

    document.getElementById('loadButton').addEventListener('click', () => {
        load();
        document.body.removeChild(dialog);
    });

    document.getElementById('closeButton').addEventListener('click', () => {
        document.body.removeChild(dialog);
    });
})();
