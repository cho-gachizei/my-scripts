javascript:(function() {
    'use strict';

    let checkboxIds = [];
    let radioIds = [];

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
            const checkboxState = checkboxIds.reduce((acc, id) => {
                const checkbox = document.getElementById(id);
                if (checkbox) acc[id] = checkbox.checked;
                return acc;
            }, {});
            localStorage.setItem('checkboxStates', JSON.stringify(checkboxState));

            const radioState = radioIds.reduce((acc, id) => {
                const radio = document.getElementById(id);
                if (radio && radio.checked) acc[id] = true;
                return acc;
            }, {});
            localStorage.setItem('radioStates', JSON.stringify(radioState));

            console.log('保存しました！');
        } catch (error) {
            console.error('Error in save function:', error);
        }
    };

    const load = async () => {
        try {
            const checkboxState = JSON.parse(localStorage.getItem('checkboxStates'));
            if (checkboxState) {
                checkboxIds.forEach(id => {
                    const checkbox = document.getElementById(id);
                    if (checkbox && checkboxState.hasOwnProperty(id)) {
                        checkbox.checked = checkboxState[id];
                    }
                });
                console.log('チェックボックスの状態を復元しました！');
            } else {
                console.log('保存されたチェックボックスの状態がありません。');
            }

            const radioState = JSON.parse(localStorage.getItem('radioStates'));
            if (radioState) {
                radioIds.forEach(id => {
                    const radio = document.getElementById(id);
                    if (radio && radioState.hasOwnProperty(id)) {
                        radio.checked = radioState[id];
                    }
                });
                console.log('ラジオボタンの状態を復元しました！');
            } else {
                console.log('保存されたラジオボタンの状態がありません。');
            }
        } catch (error) {
            console.error('Error in load function:', error);
        }
    };

    const initialize = async () => {
        try {
            const checkboxJson = await fetchJSON('https://raw.githubusercontent.com/cho-gachizei/my-scripts/main/json1.json');
            if (!checkboxJson || !Array.isArray(checkboxJson.ids)) {
                throw new Error('Failed to load checkbox IDs from JSON or IDs is not an array');
            }
            checkboxIds = checkboxJson.ids;
            console.log('Loaded checkbox IDs:', checkboxIds);

            const radioJson = await fetchJSON('https://raw.githubusercontent.com/cho-gachizei/my-scripts/main/json2.json');
            if (!radioJson || !Array.isArray(radioJson.ids)) {
                throw new Error('Failed to load radio IDs from JSON or IDs is not an array');
            }
            radioIds = radioJson.ids;
            console.log('Loaded radio IDs:', radioIds);

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
