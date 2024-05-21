class Translator {
    constructor({ lang } = {}) {
        if (lang) {
            this.langCode = lang;
        } else {
            this.langCode = this.getLocalLang();
        }

        this.translations = null;
    }

    async init() {
        await this.fetchLangFile(this.langCode);
    }

    getLocalLang() {
        const lang = navigator.languages ? navigator.languages[0] : navigator.language;
    
        return lang.substr(0, 2);
    }

    async setLang(langCode) {
        this.langCode = langCode;

        await this.fetchLangFile(langCode);
    }

    async fetchLangFile(langCode) {
        await fetch(`/i18n/${langCode}.json`)
            .then(data => data.json())
            .then(translations => {
                this.translations = translations;
            })
            .catch(() => {
                console.error(`Missing translation ${this.langCode}.json.`);
            });
    }

    getTranslation(key) {
        const res = this.translations[key];

        if (!res) {
            console.error(`Missing translation for ${key} (${this.langCode})`);
        }

        return res;
    }
}
export default Translator;