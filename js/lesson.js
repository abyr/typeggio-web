import FileIterator from './text-file-iterator.js';
import LessonModel from './lesson-model.js';
import LessonView from './lesson-view.js';
import statsDataService from "./stats.js";
import StatsView from './stats-view.js';
import ResultsView from './results-view.js';

class Lesson {
    constructor({ file, element, layout, mainProfiler }) {
        this.element = element;
        this.title = '';
        this.lines = [];
        this.layout = layout;
        this.profiler = mainProfiler;

        // github
        const url = `https://raw.githubusercontent.com/abyr/typeggio-sources/master/${layout}/${file}`;
        // local
        // const url = `sources/${layout}/${file}`;

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

        statsDataService.setWordsCount(wordsCount);

        this.statsView = new StatsView({
            element: this.element
        });

        this.lessonModel = new LessonModel({ title, text });
        this.view = new LessonView(this.element, this.lessonModel);

        this.countMisprint = this.countMisprint.bind(this);
        this.startLesson = this.startLesson.bind(this);
        this.finishLesson = this.finishLesson.bind(this);

        this.element.addEventListener('stats:misprinted', this.countMisprint);
        this.element.addEventListener('stats:started', this.startLesson);
        this.element.addEventListener('stats:finished',this.finishLesson);

        this.start();
    }

    startLesson() {
        statsDataService.resetMisprints();
        statsDataService.startTimer();
    }

    countMisprint() {
        statsDataService.addMisprint(1);
        this.statsView.render();
    }

    finishLesson() {
        statsDataService.endTimer();
        const stats = statsDataService.export();
        this.profiler.save(`${this.layout}-${this.lessonNumber}`, stats);

        this.resultsView = new ResultsView({
            element: this.element
        });

        this.resultsView.render();
    }

    destroy() {
        this.element.removeEventListener('stats:misprinted', this.countMisprint);
        this.element.removeEventListener('stats:started', this.startLesson);
        this.element.removeEventListener('stats:finished', this.finishLesson);

        this.view.destroy();
        this.view = null;

        this.statsView.destroy();
        this.statsView = null;
    }

    start() {
        this.view.render(this.layout);
    }

}

export default Lesson;