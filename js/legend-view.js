import ChildView from './classes/child-view.js';
import level from './lesson/level.js';
import i18n from './classes/shared-translator.js'

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
            const levelTitle = i18n.translate(levelItem.code) || levelItem.title;

            const elHtml = `<span class="legend-item card-level-${levelItem.code}">${levelTitle}</span>`;

            items.push(elHtml);
        });

        return `${i18n.translate('levels')}: <span>${items.join(' ')}</span>`;
    }
}

export default LegendView;