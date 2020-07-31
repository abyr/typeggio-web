import FileIterator from "./text-file-iterator.js";
import LessonModel from './lesson.js';
import LessonView from './lesson-view.js';
import statsDataService from "./stats.js";
import StatsView from "./stats-view.js";
import Profiler from './profiler.js';

let lesson;

const mainProfiler = new Profiler();

window.onload = () => {

    document.getElementById('starter').addEventListener('click', e => {
        if (lesson) {
            lesson.destroy();
        }

        e.target.blur();

        const path = document.location.pathname;

        const layout = path.substr(path.lastIndexOf('/') + 1, path.indexOf('.') -1 - path.lastIndexOf('/'));

        lesson = new LessonMain({
            element: document.getElementById('lesson-container'),
            file: document.getElementById('lesson-select').value,
            layout
        });
    });

    document.getElementById('exporter').addEventListener('click', e => {
        mainProfiler.export();
    });


    document.getElementById('importer').addEventListener('change', e => {
        mainProfiler.importFile(e);
    });
}


class LessonMain {
    constructor({ file, element, layout }) {
        this.element = element;
        this.title = '';
        this.lines = [];
        this.layout = layout;

        // const url = `https://raw.githubusercontent.com/abyr/typeggio-sources/master/${layout}/${file}`;
        const url = `sources/${layout}/${file}`;

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

        this.profiler = mainProfiler;

        this.statsView = new StatsView({
            element: this.element
        });

        this.lessonModel = new LessonModel({ title, text });
        this.view = new LessonView(this.element, this.lessonModel);

        document.addEventListener('stats:misprinted', () => {
            statsDataService.addMisprint(1);
            this.statsView.render();
        });
        document.addEventListener('stats:started', () => {
            statsDataService.resetMisprints();
            statsDataService.startTimer();
        });
        document.addEventListener('stats:finished', () => {
            console.log('stats:finished');

            statsDataService.endTimer();
            const stats = statsDataService.export();
            this.profiler.save('qwerty-01', stats);
        });

        this.start();
    }

    destroy() {
        this.view.destroy();
    }

    start() {
        this.view.render(this.layout);
    }

}