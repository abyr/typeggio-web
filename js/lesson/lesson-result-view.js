import level from "./level.js";
import duration from "../duration.js";
import letters from '../letters.js';

class LessonResultView {
    constructor({ element, statist }) {
        this.element = element;
        this.statist = statist;

        this.containerId = 'results-container';
    }

    render() {
        this.element.innerHTML = this.getHtml();
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
        const spentTimeInMs = this.getSpentTime();
        const spentTime = duration.msToReadableTime(spentTimeInMs);

        const misprintsCount = this.getMisprintsCount();

        const wordsPerMinute = this.getWordsPerMinute();

        const myLevel = level.getLevel({
            misprintsCount,
            wordsPerMinute
        });

        const lettersHTML = this.getLettersHtml();

        return `
            <div class="results-level level-${myLevel.code}">${myLevel.title}</div>
            <div class="results-spent-time">Spent time: ${spentTime}</div>
            <div class="results-wpm">Words per minute: ${wordsPerMinute}</div>
            <div class="results-misprints">Misprints: ${misprintsCount}</div>
            ${lettersHTML}
        `;
    }

    getLettersHtml() {
        const lettersStats = this.statist.getMisprintsMap();

        const sortableEntries = Object.entries(lettersStats);

        sortableEntries.sort(function(a, b) {
            return b[1] - a[1];
        });

        const sortedList = sortableEntries.map(x => {
            const code = x[0];
            const quantity = x[1];
            const letter = letters.fromCharCode(code);

            return `<div class="results-letter">${letter}: ${quantity}</div>`;
        });

        return `
            <div class="results-misprints-header">Misprinted letters:</div>
            ${sortedList.join('')}
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

    destroy() {
        const container = this.getContainer();

        while(container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
}

export default LessonResultView;