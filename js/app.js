import Results from './results/results.js';
import ResultsView from './results/results-view.js';
import Lesson from './lesson/lesson.js';
import Statist from "./statist.js";

const layout = document.querySelector('#lesson-select').getAttribute('data-layout');
const results = new Results();

let lesson;
let resultsView;

const screenController = {
    lessonLayout: () => {
        screenController.clearLayout();

        const statist = new Statist();

        lesson = new Lesson({
            element: document.getElementById('lesson-container'),
            file: document.getElementById('lesson-select').value,
            layout,
            statist
        });

        lesson.element.addEventListener('lesson:finished', saveLessonResult);
    },

    landingLayout: () => {
        console.log(results.getAll());
        const allResObj = results.getAll();

        const layoutRes = Object.entries(allResObj).reduce(function (res, pair) {
            const [key, value] = pair;

            // FIXME: magic spell
            if (key.indexOf(layout + '-') === 0) {
                res[key] = value;
            }
            return res;
          }, {});

        resultsView = new ResultsView({
            element: document.getElementById('results-view-container'),
            allResults: layoutRes
        });
        resultsView.render();
    },

    clearLayout: () => {
        screenController.hideResultsControls();

        if (lesson) {
            lesson.element.removeEventListener('lesson:finished', e => {
                saveLessonResult(e);

                screenController.landingLayout();
            });

            lesson.destroy();
            lesson = null;
        }

        if (resultsView) {
            resultsView.destroy();
            resultsView = null;
        }
    },

    hideResultsControls: () => {
        hideEl(document.querySelector('#results-controls'));
    }
};


window.onload = () => {

    screenController.landingLayout();

    document.getElementById('starter').addEventListener('click', e => {
        e.target.blur();
        screenController.lessonLayout();
    });

    document.getElementById('exporter').addEventListener('click', e => {
        results.export();
    });

    document.getElementById('importer').addEventListener('change', e => {
        results.importFile(e);
    });
}

function saveLessonResult(evnt) {
    const { result, layout, lessonNumber } = evnt.detail;

    results.save(`${layout}-${lessonNumber}`, result);
}

function hideEl(el) {
    el.style.display = 'none';
}

function showEl(el) {
    el.style.display = '';
}