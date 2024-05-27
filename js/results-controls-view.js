import View from './classes/view.js';
import i18n from './classes/shared-translator.js';

class ResultsControlsView extends View {

    getHtml() {
        return `
            <div>
                <input type="button" value="${i18n.translate('export') || 'Export'}" id="exporter" />
                <label for="importer">${i18n.translate('import') || 'Import'}</label>
                <input type="file" id="importer">
            </div>`;
    }
}

export default ResultsControlsView;