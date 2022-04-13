import PreferrencesStoreAdapter from './storage-adapters/preferrences-storage-adapter.js';
import View from './view.js';

const SHOW_KEYBOARD_KEY = 'showKeyboard';

const prefsTitleMap = {};
prefsTitleMap[SHOW_KEYBOARD_KEY] = 'Show keyboard';

class PreferrencesView extends View {
    constructor({ element }) {
        super({ element });

        this.defaultPreferrencesMap = {};
        this.defaultPreferrencesMap[SHOW_KEYBOARD_KEY] = true;

        this.prefsMap = Object.assign({}, this.defaultPreferrencesMap);
    }

    async init() {
        this.storageAdapter = new PreferrencesStoreAdapter();

        await this.storageAdapter.connect();

        const storedPrefs = await this.storageAdapter.getAll();

        storedPrefs.reduce((prefs, x) => {
            prefs[x.id] = x.value;
            return prefs;
        }, this.prefsMap);
    }

    render() {
        const listEl = document.createElement('ul');

        listEl.classList.add('preferences-list');

        Object.keys(this.prefsMap).map((key) => {
            const val = this.prefsMap[key];
            const listItemEl = this.makePreferenceElelemnt(key, val);

            listEl.append(listItemEl);
        });

        this.element.appendChild(listEl);
    }

    makePreferenceElelemnt(key, val) {
        const inputId = 'pref-' + key;
        const listItemEl = document.createElement('li');
        const labelEl = document.createElement('label');
        const prefEl = document.createElement('input');

        labelEl.setAttribute('for',  inputId);
        labelEl.innerText = prefsTitleMap[key] || key;
        
        prefEl.type = "checkbox";
        prefEl.checked = !!val;
        prefEl.id = inputId;

        prefEl.addEventListener('change', async event => {
            const el = event.currentTarget;
            const val = el.checked;

            await this.updatePreference(key, val);
        });

        listItemEl.append(prefEl);
        listItemEl.append(labelEl);

        return listItemEl;        
    }

    async updatePreference(key, val) {
        await this.storageAdapter.put(key, val);

        const resVal = await this.storageAdapter.get(key);

        this.prefsMap[key] = resVal.value;
    }

    isShowKeyboard() {
        return !!this._isEnabled(SHOW_KEYBOARD_KEY);
    }

    _isEnabled(key) {
        return !!this.prefsMap[key];
    }    
}

export default PreferrencesView;