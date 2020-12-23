import level from './level.js';

class LegendView {
    constructor({ element }) {
        this.element = element;
        this.containerId = 'legend-container';
    }

    render() {
        const c = this.getContainer();

        c.innerHTML = this.getHtml();
    }

    getContainer() {
        const c = document.getElementById(this.containerId);

        if (c) {
            return c;

        } else {
            return this.makeContainer();
        }
    }

    makeContainer() {
        const c = document.createElement("div");

        c.id = this.containerId;

        this.element.appendChild(c);

        return c;
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

    destroy() {}
}

export default LegendView;