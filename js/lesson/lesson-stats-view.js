import ChildView from '../classes/child-view.js';

class LessonStatsView extends ChildView {
    constructor({ parentElement, statist }) {
        super({ parentElement });

        this.statist = statist;
        this.containerId = 'lesson-stats-container';
    }

    getHtml() {
        return `<div class="stats-misprints">Misprints: ${this.getMisprintsCount()}</div>`;
    }

    getMisprintsCount() {
        return this.statist.getMisprintsCount();
    }
}

export default LessonStatsView;