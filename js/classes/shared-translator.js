import Translator from '../../js-translator/translator.js';

let translatorInstance;
const I18N_BASE_PATH = './i18n'

/**
 * Translator facade with a single instance
 */
class TranslatorFacade {

    constructor() {}

    async init(lang = '') {

        if (!translatorInstance || this.getLang() !== lang) {
            translatorInstance = new Translator({ 
                basePath: I18N_BASE_PATH,
                lang, 
            });
        }

        console.log('Lang:', this.getLang());

        await translatorInstance.init();
    }

    getLang() {
        if (!translatorInstance) {
            console.error("Translator is not inited");
            return;
        }

        return translatorInstance.getLangCode();
    }

    translate(key) {
        let res = '';

        if (!this.getLang()) {
            console.error("Translator is not inited");
            return res;
        }

        try {
            res = translatorInstance.getTranslation(key);
        } catch (err) {
            console.error(err);
        }

        return res;
    }
}

let sharedTranslatorFacadeInstance = Object.freeze(new TranslatorFacade());

export default sharedTranslatorFacadeInstance;
