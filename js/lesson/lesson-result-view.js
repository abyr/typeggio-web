import ChildView from '../classes/child-view.js';
import level from "./level.js";
import duration from "../duration.js";
import letters from '../letters.js';
import i18n from '../classes/shared-translator.js'

class LessonResultView extends ChildView {
    constructor({ parentElement, statist }) {
        super({ parentElement });

        this.statist = statist;
        this.containerId = 'results-container';
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
            <div class="results-level">
                <span class="legend-item card-level-${myLevel.code}">${myLevel.title}</span>
            </div>
            <div class="results-spent-time">
                ${i18n.translate('spent-time-result-$0').replace('$0', spentTime)}
            </div>
            <div class="results-wpm">
                ${i18n.translate('wpm-result-$0').replace('$0', wordsPerMinute)}
            </div>
            <div class="results-misprints">
                ${i18n.translate('misprints-result-$0').replace('$0', misprintsCount)}
            </div>
            <div>
                ${lettersHTML}
            </div>
            <div>
                <a href="./index.html" class="btn" autofocus>Back</a>
            </div>
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

        const misprints = sortedList.length && sortedList.join('');

        return `
            <div class="results-misprints-header">${i18n.translate('misprinted-letters')}:</div>
            ${misprints || 'none'}
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
}

export default LessonResultView;
