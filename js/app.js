import Results from './results.js';
import Lesson from './lesson.js';
import Statist from "./statist.js";


let lesson;

const results = new Results();


function saveLessonResult(evnt) {
    const { result, layout, lessonNumber } = evnt.detail;

    results.save(`${layout}-${lessonNumber}`, result);
}

window.onload = () => {

    document.getElementById('starter').addEventListener('click', e => {
        if (lesson) {
            lesson.element.removeEventListener('lesson:finished', saveLessonResult);
            lesson.destroy();
            lesson = null;
        }

        e.target.blur();

        const path = document.location.pathname;

        const layout = path.substr(path.lastIndexOf('/') + 1, path.indexOf('.') -1 - path.lastIndexOf('/'));

        const statist = new Statist();

        lesson = new Lesson({
            element: document.getElementById('lesson-container'),
            file: document.getElementById('lesson-select').value,
            layout,
            statist
        });

        lesson.element.addEventListener('lesson:finished', saveLessonResult);
    });

    document.getElementById('exporter').addEventListener('click', e => {
        results.export();
    });


    document.getElementById('importer').addEventListener('change', e => {
        results.importFile(e);
    });
}
