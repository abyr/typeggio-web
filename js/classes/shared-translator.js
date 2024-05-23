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
        return translatorInstance.getLangCode();
    }

    translate(key) {
        if (!this.getLang()) {
            throw new Error("Translator is not inited");
        }

        return translatorInstance.getTranslation(key);
    }
}

let sharedTranslatorFacadeInstance = Object.freeze(new TranslatorFacade());

export default sharedTranslatorFacadeInstance;
