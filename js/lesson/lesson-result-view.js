import level from "./level.js";
import duration from "../duration.js";

class LessonResultView {
    constructor({ element, statist }) {
        this.element = element;
        this.statist = statist
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

        const myLevel = level.getLevel({
            misprintsCount,
            wordsPerMinute
        });

        return `
            <div class="results-level level-${myLevel.code}">${myLevel.title}</div>
            <div class="results-spent-time">Spent time: ${spentTime}</div>
            <div class="results-wpm">Words per minute: ${wordsPerMinute}</div>
            <div class="results-misprints">Misprints: ${misprintsCount}</div>
        `;
    }

    getMisprintsCount() {
        return this.statist.getMisprintsCount();
    }

    getSpentTime() {
        return this.statist.getSpentTime();
    }

    getWordsPerMinute() {
        return this.statist.getWordsPerMinute();
    }

    destroy() {}
}

export default LessonResultView;