import ChildView from '../child-view.js';

class LessonStatsView extends ChildView {
    constructor({ element, statist }) {
        super({ element });

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