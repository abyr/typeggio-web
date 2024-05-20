import PreferrencesStoreAdapter from './storage-adapters/preferrences-storage-adapter.js';
import View from './classes/view.js';
import Translator from "./classes/translator.js";

const SHOW_KEYBOARD_KEY = 'showKeyboard';
const LAYOUT_KEY = 'layout';

const QWERTY_LAYOUT_VALUE = 'qwerty';
const UA_LAYOUT_VALUE = 'ua';

const layouts = [
    QWERTY_LAYOUT_VALUE,
    UA_LAYOUT_VALUE,
];

const prefsTitleMap = {};
prefsTitleMap[SHOW_KEYBOARD_KEY] = 'show-keyboard';
prefsTitleMap[LAYOUT_KEY] = 'keyboard-layout';

class PreferrencesView extends View {
    constructor({ element }) {
        super({ element });

        this.defaultPreferrencesMap = {};
        this.defaultPreferrencesMap[LAYOUT_KEY] = QWERTY_LAYOUT_VALUE;
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

        this.translator = new Translator();

        await this.translator.downloadLanguage();
    }

    render() {
        let listItemEl;
        const listEl = document.createElement('ul');

        listEl.classList.add('preferrences-list');

        Object.keys(this.prefsMap).map((key) => {
            const val = this.prefsMap[key];

            if (key === LAYOUT_KEY) {
                listItemEl = this.makeLayoutElelemnt(key, val);
            } else {
                listItemEl = this.makeCheckboxElelemnt(key, val);
            }

            listEl.append(listItemEl);
        });

        this.element.appendChild(listEl);
    }

    makeLayoutElelemnt(key, val) {
        const inputId = this.makePrefId(key);
        const listItemEl = this.makePreferrenceWrapperElelemnt();
        const labelEl = this.makeLabelElement(key);
        const selectEl = document.createElement('select');

        selectEl.id = inputId;

        layouts.forEach(layout => {
            const opt = document.createElement('option');

            opt.innerText = layout;
            opt.value = layout;

            if (layout === val) {
                opt.selected = true;
            }
            selectEl.append(opt);
        });

        selectEl.addEventListener('change', async (event) => {
            await this.updatePreferrence(key, selectEl.value);

            if (confirm(this.translator.getTranslation('reload-page?'))) {
                document.location.reload();
            };
        });

        listItemEl.append(labelEl);
        listItemEl.append(selectEl);

        return listItemEl;
    }

    makeCheckboxElelemnt(key, val) {
        const inputId = this.makePrefId(key);
        const listItemEl = this.makePreferrenceWrapperElelemnt();
        const labelEl = this.makeLabelElement(key);
        const prefEl = document.createElement('input');

        prefEl.type = "checkbox";
        prefEl.checked = !!val;
        prefEl.id = inputId;

        prefEl.addEventListener('change', async (event) => {
            const el = event.currentTarget;
            const val = el.checked;

            await this.updatePreferrence(key, val);
        });

        listItemEl.append(prefEl);
        listItemEl.append(labelEl);

        return listItemEl;
    }

    makePreferrenceWrapperElelemnt() {
        const listItemEl = document.createElement('li');

        listItemEl.classList.add('preferrence');

        return listItemEl;
    }

    makeLabelElement(key) {
        const inputId = this.makePrefId(key);
        const labelEl = document.createElement('label');

        labelEl.setAttribute('for',  inputId);
        labelEl.innerText = this.translator.getTranslation(prefsTitleMap[key]);

        return labelEl;
    }

    makePrefId(key) {
        return 'pref-' + key;
    }

    async updatePreferrence(key, val) {
        await this.storageAdapter.put(key, val);

        const resVal = await this.storageAdapter.get(key);

        this.prefsMap[key] = resVal.value;
    }

    isShowKeyboard() {
        return !!this._isEnabled(SHOW_KEYBOARD_KEY);
    }

    getLayout() {
        return this.prefsMap[LAYOUT_KEY] || QWERTY_LAYOUT_VALUE;
    }

    _isEnabled(key) {
        return !!this.prefsMap[key];
    }
}

export default PreferrencesView;