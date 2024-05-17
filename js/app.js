import Results from './results.js';
import Lesson from './lesson/lesson.js';
import level from './lesson/level.js';
import NavigationView from './navigation-view.js';
import LegendView from './legend-view.js';
import PreferrencesView from './preferrences-view.js';
import LessonsListView from './lessons-list-view.js';

let globalLayout;
let results;
let preferrencesView;
let lesson;
let navigationView;

const PREFERRENCES_ELEMENT_SELECTOR = '#preferrences';
const LESSON_CONTAINER_SELECTOR = '#lesson-container';
const LESSONS_TITLE = 'Lessons';

const screenController = {

    landingLayout: async (layout) => {
        await screenController.setLayoutInfo(layout);

        navigationView.setLinks([{
            title: LESSONS_TITLE
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
            title: LESSONS_TITLE
        }, {
            title: lessonShortTitle
        }]);
        navigationView.render();

        lesson = new Lesson({
            element: document.querySelector(LESSON_CONTAINER_SELECTOR),
            file: lessonFile,
            layout: globalLayout
        }, {
            showKeyboard: preferrencesView.isShowKeyboard()
        });

        lesson.element.addEventListener('lesson:finished', saveLessonResult);
    },

    setLayoutInfo: async function (layout) {
        const infoURL = `./sources/${layout}/info.json`;

        const info = await fetch(infoURL);
        const infoJSON = await info.json();

        const landingSection = document.querySelector('#landing-layout');

        const lessonsCardView = new LessonsListView({
            parentElement: landingSection
        });

        lessonsCardView.setInfo({ infoJSON });
        lessonsCardView.render();

        landingSection.addEventListener('lesson:selected', this.selectLesson);
    },

    selectLesson: (evnt) => {
        const { number } = evnt.detail;
        const fileName = `lesson-${String(number).padStart(2, '0')}.txt`;
        const lessonCardEl = evnt.currentTarget.querySelector(`[data-lesson-number="${number}"]`);
        const title = lessonCardEl.querySelector('.lesson-title').textContent;

        screenController.lessonLayout(fileName, title);
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

                screenController.landingLayout(globalLayout);
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

        const warmUpList = await results.getAll();

        Array.from(lessonCards).forEach(async lessonCard => {
            const lessonNumber = lessonCard.getAttribute('data-lesson-number');
            const lessonResult = await screenController.getLessonResult(lessonNumber);

            let resElement;

            if (lessonResult) {
                resElement = lessonCard.querySelector('.lesson-brief-result');

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
        const key = globalLayout + '-' + lessonNumber;

        return await results.getResult(key);
    },

    hideResultsControls: () => {
        hideEl(document.querySelector('#results-controls'));
    },

    showPreferrences: function () {
        showEl(document.querySelector(PREFERRENCES_ELEMENT_SELECTOR));
    },

    hidePreferrences: function () {
        hideEl(document.querySelector(PREFERRENCES_ELEMENT_SELECTOR));
    }
};

window.onload = async () => {
    results = new Results();

    await results.init();

    navigationView = new NavigationView({
        element: document.getElementById('navigation')
    });

    const preferrencesEl = document.querySelector('#preferrences');

    preferrencesView = new PreferrencesView({ element: preferrencesEl });

    await preferrencesView.init();
    preferrencesView.render();

    globalLayout = await preferrencesView.getLayout();

    screenController.landingLayout(globalLayout);

    screenController.legendView = new LegendView({
        parentElement: document.querySelector('#landing-layout')
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
