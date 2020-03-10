class Stats {
    constructor({ element }) {
        this.element = element;

        this.misprintsCount = 0;

        this.wpm = 0;
    }

    addMisprint(q = 1) {
        this.setMisprintsCount(this.getMisprintsCount() + q);
    }

    resetMisprints() {
        this.setMisprintsCount(0);
    }

    setMisprintsCount(x) {
        this.misprintsCount = x;
    }

    getMisprintsCount() {
        return this.misprintsCount;
    }

    setWpm(wpm) {
        this.wpm = wpm;
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
}

export default Stats;