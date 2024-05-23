import ChildView from '../classes/child-view.js';
import i18n from '../classes/shared-translator.js'

class LessonStatsView extends ChildView {
    constructor({ parentElement, statist }) {
        super({ parentElement });

        this.statist = statist;
        this.containerId = 'lesson-stats-container';
    }

    getHtml() {
        return `<div class="stats-misprints">
            ${i18n.translate('misprints-result-$0').replace('$0', this.getMisprintsCount())}
        </div>`;
    }

    getMisprintsCount() {
        return this.statist.getMisprintsCount();
    }
}

export default LessonStatsView;