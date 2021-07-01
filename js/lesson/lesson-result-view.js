import level from "./level.js";
import duration from "../duration.js";

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

        const hardestLetter = this.getHardestLetter();

        const { timesMisprinted } = this.getLetterDetail(hardestLetter);

        const myLevel = level.getLevel({
            misprintsCount,
            wordsPerMinute
        });

        return `
            <div class="results-level level-${myLevel.code}">${myLevel.title}</div>
            <div class="results-spent-time">Spent time: ${spentTime}</div>
            <div class="results-wpm">Words per minute: ${wordsPerMinute}</div>
            <div class="results-misprints">Misprints: ${misprintsCount}</div>
            <div class="results-wpm">Hardest letter: <b class="hardest-letter">${hardestLetter}</b>. It's misprinted ${timesMisprinted} times</div>
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

    getHardestLetter() {
        const code = this.statist.getHardestCharCode();

        return String.fromCharCode(code);
    }

    getLetterDetail(letter) {
        const code = letter.charCodeAt(0);

        const { timesMisprinted } = this.statist.getCharCodeDetail(code);

        return { timesMisprinted };
    }

    destroy() {
        const container = this.getContainer();

        while(container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
}

export default LessonResultView;