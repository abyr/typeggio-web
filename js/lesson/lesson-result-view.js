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

        const spentTimeTpl = i18n.translate('spent-time-result-$0') || 'Spent time: $0';
        const spentTimeText = spentTimeTpl.replace('$0', spentTime);

        const wpmTpl = i18n.translate('wpm-result-$0') || 'Words per minute: $0';
        const wpmText = wpmTpl.replace('$0', wordsPerMinute);
        
        const misprintsTpl = i18n.translate('misprints-result-$0') || 'Misprints: $0';
        const misprintsText = misprintsTpl.replace('$0', misprintsCount);

        return `
            <div class="results-level">
                <span class="legend-item card-level-${myLevel.code}">${myLevel.title}</span>
            </div>
            <div class="results-spent-time">
                ${spentTimeText}
            </div>
            <div class="results-wpm">
                ${wpmText}
            </div>
            <div class="results-misprints">
                ${misprintsText}
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
