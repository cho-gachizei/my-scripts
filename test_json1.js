javascript:(function() {
    'use strict';

    let ids = [];

    const fetchJSON = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            console.log('JSONが正常に読み込まれました。', json);
            return json;
        } catch (error) {
            console.error('Error fetching JSON:', error);
            return null;
        }
    };

    const save = () => {
        try {
            if (!Array.isArray(ids)) {
                throw new Error('ids is not an array');
            }
            const state = ids.reduce((acc, id) => {
                const checkbox = document.getElementById(id);
                if (checkbox) acc[id] = checkbox.checked;
                return acc;
            }, {});
            localStorage.setItem('checkboxStates', JSON.stringify(state));
            console.log('保存しました！');
        } catch (error) {
            console.error('Error in save function:', error);
        }
    };

    const load = async () => {
        try {
            const state = JSON.parse(localStorage.getItem('checkboxStates'));
            if (!state) {
                console.log('保存された状態がありません。');
                return;
            }
            ids.forEach(id => {
                const checkbox = document.getElementById(id);
                if (checkbox && state.hasOwnProperty(id)) {
                    checkbox.checked = state[id];
                }
            });
            console.log('復元しました！');
        } catch (error) {
            console.error('Error in load function:', error);
        }
    };

    const initialize = async () => {
        try {
            const json = await fetchJSON('https://raw.githubusercontent.com/cho-gachizei/my-scripts/main/json1.json');
            if (!json || !Array.isArray(json.ids)) {
                throw new Error('Failed to load IDs from JSON or IDs is not an array');
            }
            ids = json.ids;
            console.log('Loaded IDs:', ids);

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
        } catch (error) {
            console.error('Error in initialize function:', error);
        }
    };

    initialize();
})();
