javascript:(function() {
    'use strict';

    const ids = [
        'fieldname3_1_cb0', 'fieldname3_1_cb1', 'fieldname3_1_cb2', 'fieldname3_1_cb3', 'fieldname3_1_cb4',
        'fieldname3_1_cb5', 'fieldname3_1_cb6', 'fieldname3_1_cb7', 'fieldname3_1_cb8', 'fieldname3_1_cb9',
        'fieldname3_1_cb10', 'fieldname3_1_cb11', 'fieldname3_1_cb12', 'fieldname3_1_cb13', 'fieldname3_1_cb14',
        'fieldname3_1_cb15', 'fieldname3_1_cb16', 'fieldname3_1_cb17', 'fieldname3_1_cb18', 'fieldname3_1_cb19',
        'fieldname3_1_cb20', 'fieldname3_1_cb21', 'fieldname3_1_cb22', 'fieldname3_1_cb23', 'fieldname3_1_cb24',
        'fieldname3_1_cb25', 'fieldname3_1_cb26', 'fieldname3_1_cb27', 'fieldname3_1_cb28', 'fieldname3_1_cb29',
        'fieldname3_1_cb30', 'fieldname3_1_cb31', 'fieldname3_1_cb32', 'fieldname8_1_cb0'
    ];
    const selectIds = ['fieldname9_1', 'fieldname2_1', 'fieldname1_1']; 
    const totalFieldId = 'fieldname1_1'; // 合計値を表示するテキストボックスのID

    const values = {
        'fieldname3_1_cb0': 8, 'fieldname3_1_cb1': 5, 'fieldname3_1_cb2': 5, 'fieldname3_1_cb3': 5,
        'fieldname3_1_cb4': 5, 'fieldname3_1_cb5': 0, 'fieldname3_1_cb6': 5, 'fieldname3_1_cb7': 5,
        'fieldname3_1_cb8': 5, 'fieldname3_1_cb9': 5, 'fieldname3_1_cb10': 8, 'fieldname3_1_cb11': 8,
        'fieldname3_1_cb12': 8, 'fieldname3_1_cb13': 8, 'fieldname3_1_cb14': 8, 'fieldname3_1_cb15': 8,
        'fieldname3_1_cb16': 10, 'fieldname3_1_cb17': 10, 'fieldname3_1_cb18': 10, 'fieldname3_1_cb19': 10,
        'fieldname3_1_cb20': 10, 'fieldname3_1_cb21': 10, 'fieldname3_1_cb22': 10, 'fieldname3_1_cb23': 10,
        'fieldname3_1_cb24': 5, 'fieldname3_1_cb25': 5, 'fieldname3_1_cb26': 5, 'fieldname3_1_cb27': 5,
        'fieldname3_1_cb28': 5, 'fieldname3_1_cb29': 5, 'fieldname3_1_cb30': 5, 'fieldname3_1_cb31': 5,
        'fieldname3_1_cb32': 5, 'fieldname8_1_cb0': 20
    };

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

        calculateTotal();
        console.log('復元しました！');
    };

    const calculateTotal = () => {
        let total = 0;

        ids.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox && checkbox.checked) {
                total += values[id] || 0;
            }
        });

        const totalField = document.getElementById(totalFieldId);
        if (totalField) {
            totalField.value = total;
        }
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
