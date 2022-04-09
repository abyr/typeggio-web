class LessonStatsView {
    constructor({ element, statist }) {
        this.element = element;
        this.statist = statist;
    }

    render() {
        const c = this.getContainer();

        c.innerHTML = this.getHtml();
    }

    getContainer() {
        const c = document.getElementById("lesson-stats-container");

        if (c) {
            return c;

        } else {
            return this.makeContainer();
        }
    }

    makeContainer() {
        const c = document.createElement("div");

        c.id = "lesson-stats-container";

        this.element.appendChild(c);

        return c;
    }

    getHtml() {
        return `<div class="stats-misprints">Misprints: ${this.getMisprintsCount()}</div>`;
    }

    getMisprintsCount() {
        return this.statist.getMisprintsCount();
    }

    destroy() {}
}

export default LessonStatsView;