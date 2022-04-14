import ChildView from './child-view.js';
import level from './lesson/level.js';

class LegendView extends ChildView {
    constructor({ parentElement }) {
        super({ parentElement });
        this.containerId = 'legend-container';
    }

    getHtml() {

        const levelsMap = level.getLevelsDefinition();

        const items = [];

        const levelsList = Object.values(levelsMap).sort((a, b) => {
            return a.ratio - b.ratio;
        });

        levelsList.forEach(function (levelItem) {
            const elHtml = `<span class="legend-item card-level-${levelItem.code}">${levelItem.title}</span>`;

            items.push(elHtml);
        });

        return 'Levels: <span>' + items.join(' ') + '</span>';
    }
}

export default LegendView;