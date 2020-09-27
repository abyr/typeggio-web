import Profiler from './profiler.js';
import Lesson from './lesson.js';

let lesson;

const mainProfiler = new Profiler();

window.onload = () => {

    document.getElementById('starter').addEventListener('click', e => {
        if (lesson) {
            lesson.destroy();
            lesson = null;
        }

        e.target.blur();

        const path = document.location.pathname;

        const layout = path.substr(path.lastIndexOf('/') + 1, path.indexOf('.') -1 - path.lastIndexOf('/'));

        lesson = new Lesson({
            element: document.getElementById('lesson-container'),
            file: document.getElementById('lesson-select').value,
            mainProfiler: mainProfiler,
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
