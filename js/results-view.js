import statsDataService from "./stats.js";
import duration from "./duration.js";

class ResultsView {
    constructor({ element }) {
        this.element = element;
    }

    render() {
        const c = this.getContainer();

        c.innerHTML = this.getHtml();
    }

    getContainer() {
        const c = document.getElementById("results-container");

        if (c) {
            return c;

        } else {
            return this.makeContainer();
        }
    }

    makeContainer() {
        const c = document.createElement("div");

        c.id = "results-container";

        this.element.appendChild(c);

        return c;
    }

    getHtml() {
        const spentTimeInMs = this.getSpentTime();
        const spentTime = duration.msToReadableTime(spentTimeInMs);

        const misprintsCount = this.getMisprintsCount();

        const wordsPerMinute = this.getWordsPerMinute();

        return `
            <div class="results-spent-time">Spent time: ${spentTime}</div>
            <div class="results-misprints">Misprints: ${misprintsCount}</div>
            <div class="results-wpm">Words per minute: ${wordsPerMinute}</div>
        `;
    }

    getMisprintsCount() {
        return statsDataService.getMisprintsCount();
    }

    getSpentTime() {
        return statsDataService.getSpentTime();
    }

    getWordsPerMinute() {
        return statsDataService.getWordsPerMinute();
    }

    destroy() {}
}

export default ResultsView;