import statsDataService from "./stats.js";

class StatsView {
    constructor({ element }) {
        this.element = element;
    }

    render() {
        const c = this.getContainer();

        c.innerHTML = this.getHtml();
    }

    getContainer() {
        const c = document.getElementById("stats-container");

        if (c) {
            return c;

        } else {
            return this.makeContainer();
        }
    }

    makeContainer() {
        const c = document.createElement("div");

        c.id = "stats-container";

        this.element.appendChild(c);

        return c;
    }

    getHtml() {
        return `<div class="stats-misprints">Misprints: ${this.getMisprintsCount()}</div>`;
    }

    getMisprintsCount() {
        return statsDataService.getMisprintsCount();
    }

    destroy() {

    }
}

export default StatsView;