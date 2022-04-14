import Results from './results.js';
import Lesson from './lesson/lesson.js';
import level from './lesson/level.js';
import NavigationView from './navigation-view.js';
import LegendView from './lesson/legend-view.js';
import PreferrencesView from './preferrences-view.js';

const layout = document.querySelector('#lesson-select').getAttribute('data-layout');
let results;
let preferrencesView;
let lesson;
let navigationView;

const screenController = {

    landingLayout: () => {
        screenController.setLayoutInfo(layout);

        navigationView.setLinks([{
            title: 'Lessons'
        }]);
        navigationView.render();

        screenController.showPreferrences();
        screenController.showLessons();
        screenController.showResults();
    },

    lessonLayout: (lessonFile, lessonShortTitle) => {
        screenController.clearLayout();

        navigationView.setLinks([{
            href: window.location.href,
            title: 'Lessons'
        }, {
            title: lessonShortTitle
        }]);
        navigationView.render();

        lesson = new Lesson({
            element: document.getElementById('lesson-container'),
            file: lessonFile,
            layout
        }, {
            showKeyboard: preferrencesView.isShowKeyboard()
        });

        lesson.element.addEventListener('lesson:finished', saveLessonResult);

    },

    clearLayout: () => {
        screenController.hidePreferrences();
        screenController.hideResultsControls();
        screenController.hideLessons();

        if (lesson) {
            screenController.closeLesson();
        }
    },

    closeLesson: () => {
        if (lesson) {
            lesson.element.removeEventListener('lesson:finished', e => {
                saveLessonResult(e);

                screenController.landingLayout();
            });

            lesson.destroy();
            lesson = null;
        }
    },

    showLessons: function () {
        const landingSection = document.querySelector('#landing-layout');

        showEl(landingSection);
    },

    hideLessons: function () {
        const landingSection = document.querySelector('#landing-layout');

        hideEl(landingSection);
    },

    showResults: async () => {
        var lessonCards = document.querySelectorAll('.lesson-card');

        // warm up
        const list = await results.getAll();

        Array.from(lessonCards).forEach(async lessonCard => {
            const lessonNumber = lessonCard.getAttribute('data-lesson-number');
            const lessonResult = await screenController.getLessonResult(lessonNumber);

            let resElement;

            if (lessonResult) {
                resElement = lessonCard.querySelector('.lesson-result');

                if (!resElement) {
                    resElement = document.createElement('div');

                    lessonCard.appendChild(resElement);
                }

                const lessonLevel = level.getLevel({
                    misprintsCount: lessonResult.misprintsCount,
                    wordsPerMinute: lessonResult.wpm
                });

                resElement.className = 'lesson-brief-result';

                resElement.innerHTML = lessonLevel.ratio * 100 + '/100';

                lessonCard.classList.add('card-level-' + lessonLevel.code);
            }
        });
    },

    getLessonResult: async lessonNumber => {
        const key = layout + '-' + lessonNumber;

        return await results.getResult(key);
    },

    hideResultsControls: () => {
        hideEl(document.querySelector('#results-controls'));
    },

    setLayoutInfo: async function (layout) {
        const infoURL = `./sources/${layout}/info.json`;
        
        const info = await fetch(infoURL);
        const infoJSON = await info.json();

        Object.keys(infoJSON.lessons).map(number => {
            const q = document.querySelector('.lesson-card[data-lesson-number="' + number + '"] .lesson-title');

            if (q) {
                q.innerHTML = infoJSON.lessons[number].title.replace('Lesson ', '');
            }

        });
    },

    showPreferrences: function () {
        showEl(document.querySelector('#preferrences'));
    },

    hidePreferrences: function () {
        hideEl(document.querySelector('#preferrences'));
    }
};

window.onload = async () => {
    results = new Results();

    await results.init();

    navigationView = new NavigationView({
        element: document.getElementById('navigation')
    });

    const preferrencesEl = document.createElement('div');

    preferrencesEl.id = 'preferrences';
    document.getElementById('navigation').insertAdjacentElement('beforebegin', preferrencesEl);

    preferrencesView = new PreferrencesView({
        element: preferrencesEl
    });

    await preferrencesView.init();
    preferrencesView.render();

    screenController.landingLayout();

    screenController.legendView = new LegendView({
        element: document.querySelector('#landing-layout')
    });
    screenController.legendView.render();

    const elements = document.querySelectorAll('.lesson-card');

    Array.from(elements).forEach(function(element) {
        element.addEventListener('click', evnt => {
            const filename = evnt.currentTarget.getAttribute('data-filename');

            screenController.lessonLayout(filename, evnt.currentTarget.querySelector('.lesson-title').textContent);
        });
    });

    document.getElementById('exporter').addEventListener('click', () => {
        results.export();
    });

    document.getElementById('importer').addEventListener('change', e => {
        results.importFile(e);
    });
};

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
