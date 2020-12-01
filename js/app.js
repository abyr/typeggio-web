import Results from './results/results.js';
import Lesson from './lesson/lesson.js';
import level from './lesson/level.js';
import NavigationView from './navigation-view.js';

const layout = document.querySelector('#lesson-select').getAttribute('data-layout');
const results = new Results();

let lesson;
let navigationView;
let lessonsInfo;

const screenController = {

    landingLayout: () => {

        screenController.setLayoutInfo(layout);

        navigationView.setLinks([{
            title: 'Lessons'
        }]);
        navigationView.render();

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
        });

        lesson.element.addEventListener('lesson:finished', saveLessonResult);

    },

    clearLayout: () => {
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

    showResults: () => {
        var lessonCards = document.querySelectorAll('.lesson-card');

        Array.from(lessonCards).forEach(function(lessonCard) {
            const lessonNumber = lessonCard.getAttribute('data-lesson-number');
            const lessonResult = screenController.getLessonResult(lessonNumber);

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

    getLessonResult: lessonNumber => {
        const key = layout + '-' + lessonNumber;

        return results.getResult(key);
    },

    hideResultsControls: () => {
        hideEl(document.querySelector('#results-controls'));
    },

    setLayoutInfo: async function (layout) {
        const infoURL = `https://raw.githubusercontent.com/abyr/typeggio-sources/master/${layout}/info.json`;

        const info = await fetch(infoURL);

        const infoJSON = await info.json();

        Object.keys(infoJSON.lessons).map(number => {
            const q = document.querySelector('.lesson-card[data-lesson-number="' + number + '"] .lesson-title');

            if (q) {
                q.innerHTML = infoJSON.lessons[number].title.replace('Lesson ', '');
            }

        })
    }
};


window.onload = () => {
    navigationView = new NavigationView({
        element: document.getElementById('navigation')
    });

    screenController.landingLayout();

    const elements = document.querySelectorAll('.lesson-card');

    Array.from(elements).forEach(function(element) {
        element.addEventListener('click', evnt => {
            const filename = evnt.currentTarget.getAttribute('data-filename');

            screenController.lessonLayout(filename, evnt.currentTarget.querySelector('.lesson-title').textContent);
        });
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
