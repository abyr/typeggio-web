class Translator {
    constructor({ lang } = {}) {
        if (lang) {
            this.langCode = lang;
        } else {
            this.langCode = this.getLocalLanguage();
        }

        this.translations = null;
    }

    getLocalLanguage() {
        const lang = navigator.languages ? navigator.languages[0] : navigator.language;
    
        return lang.substr(0, 2);
    }

    async setLanguage(langCode) {
        this.langCode = langCode;

        await this.downloadLanguage(langCode);
    }

    async downloadLanguage() {
        await fetch(`/i18n/${this.langCode}.json`)
            .then((res) => res.json())
            .then((translations) => {
                this.translations = translations;
            })
            .catch(() => {
                console.error(`Missing translation ${this.langCode}.json.`);
            });
    }

    getTranslation(key) {
        return this.translations[key];
    }
}
export default Translator;