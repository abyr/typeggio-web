import FileIterator from './text-file-iterator.js';
import LessonModel from './lesson-model.js';
import LessonView from './lesson-view.js';
import LessonStatsView from './lesson-stats-view.js';
import LessonResultView from './lesson-result-view.js';
import Statist from '../statist.js';
import Results from '../results.js';

class Lesson {
    constructor({ file, element, layout }, { showKeyboard }) {
        this.element = element;
        this.title = '';
        this.lines = [];
        this.layout = layout;

        this.showKeyboard = showKeyboard;

        this.statist = new Statist();

        const url = `sources/${layout}/${file}`;

        const parts = url.split('/');
        const fileName = parts[parts.length - 1];

        this.lessonNumber = fileName.replace(/^\w+-(\d+).txt/g, '$1');

        this.init({ url });
    }

    async init({ url }) {
        for await (let line of FileIterator.makeTextFileLineIterator(url)) {
            if (this.title) {
                this.lines.push(line);
            } else {
                this.title = line;
            }
        }

        const title = this.title;
        const text = this.lines.join('\n');

        const wordsCount = this.lines.join(' ').split(' ').length - 1;

        this.statist.setWordsCount(wordsCount);

        this.lessonStatsView = new LessonStatsView({
            parentElement: this.element,
            statist: this.statist
        });

        this.lessonModel = new LessonModel({ title, text });
        this.lessonView = new LessonView(this.element, this.lessonModel, {
            showKeyboard: this.showKeyboard
        });

        this.countMisprint = this.countMisprint.bind(this);
        this.startLesson = this.startLesson.bind(this);
        this.finishLesson = this.finishLesson.bind(this);

        this.element.addEventListener('stats:misprinted', this.countMisprint);
        this.element.addEventListener('stats:started', this.startLesson);
        this.element.addEventListener('stats:finished',this.finishLesson);

        this.start();
    }

    startLesson() {
        this.statist.resetMisprints();
        this.statist.startTimer();
    }

    countMisprint(evnt) {
        const { expectedCode } = evnt.detail;

        this.statist.addMisprint({ expectedCode });
        this.lessonStatsView.render();
    }

    finishLesson() {
        this.statist.endTimer();

        this.dispatchFinishEvent();

        this.lessonView.destroy();
        this.lessonView = null;

        this.lessonStatsView.destroy();
        this.lessonStatsView = null;

        this.showStatistResult();
    }

    showStatistResult() {
        this.resultView = new LessonResultView({
            parentElement: this.element,
            statist: this.statist,
        });

        this.resultView.render();
    }

    showResult() {
        const results = new Results();
        const key = this.layout + '-' + this.lessonNumber;
        const lessonResult = results.getResult(key);

        this.resultView = new LessonResultView({
            parentElement: this.element,
            result: lessonResult,
            statist: null,
        });

        this.resultView.render();
    }

    dispatchFinishEvent() {
        this.finishedEvent = new CustomEvent('lesson:finished', {
            detail: {
                layout: this.layout,
                lessonNumber: this.lessonNumber,
                result: this.statist.export()
            }
        });

        this.element.dispatchEvent(this.finishedEvent);
    }

    destroy() {
        this.element.removeEventListener('stats:misprinted', this.countMisprint);
        this.element.removeEventListener('stats:started', this.startLesson);
        this.element.removeEventListener('stats:finished', this.finishLesson);

        this.resultView.destroy();
        this.resultView = null;

        this.lessonStatsView.destroy();
        this.lessonStatsView = null;

        this.lessonView.destroy();
        this.lessonView = null;

        this.statist = null;
    }

    start() {
        this.lessonView.render(this.layout);
    }

}

export default Lesson;