import ChildView from '../classes/child-view.js';
import i18n from '../classes/shared-translator.js'

class LessonStatsView extends ChildView {
    constructor({ parentElement, statist }) {
        super({ parentElement });

        this.statist = statist;
        this.containerId = 'lesson-stats-container';
    }

    getHtml() {
        const misprintsTpl = i18n.translate('misprints-result-$0') || 'Misprints: $0';
        const misprintsText = misprintsTpl.replace('$0', this.getMisprintsCount());
        
        return `<div class="stats-misprints">
            ${misprintsText}
        </div>`;
    }

    getMisprintsCount() {
        return this.statist.getMisprintsCount();
    }
}

export default LessonStatsView;