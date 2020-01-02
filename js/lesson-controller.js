import FileIterator from "./text-file-iterator.js";
import LessonModel from './lesson.js';
import LessonView from './lesson-view.js';

class LessonController {
    constructor({ file, element, layout }) {
        this.element = element;
        this.title = '';
        this.lines = [];
        this.layout = layout;

        const url = `https://raw.githubusercontent.com/abyr/typeggio-sources/master/${layout}/${file}`;

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

        this.lessonModel = new LessonModel({ title, text });
        this.view = new LessonView(this.element, this.lessonModel);

        this.start();
    }

    start() {
        this.view.render(this.layout);
    }

    destroy() {
        this.view.destroy();
    }
}

export default LessonController;