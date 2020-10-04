import Results from './results/results.js';
import ResultsView from './results/results-view.js';
import Lesson from './lesson/lesson.js';
import Statist from "./statist.js";


let lesson;

const results = new Results();

let resultsView;

function saveLessonResult(evnt) {
    const { result, layout, lessonNumber } = evnt.detail;

    results.save(`${layout}-${lessonNumber}`, result);
}

window.onload = () => {

    var allResults = results.getAll();

    resultsView = new ResultsView({
        element: document.getElementById('results-view-container'),
        allResults: allResults
    });
    resultsView.render();

    document.getElementById('starter').addEventListener('click', e => {
        if (lesson) {
            lesson.element.removeEventListener('lesson:finished', saveLessonResult);
            lesson.destroy();
            lesson = null;
        }

        if (resultsView) {
            resultsView.destroy();
            resultsView = null;
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
