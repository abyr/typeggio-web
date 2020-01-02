import LessonController from './lesson-controller.js';

let lesson;

window.onload = () => {

    const starter = document.getElementById('starter');

    starter.addEventListener('click', e => {
        if (lesson) {
            lesson.destroy();
        }

        e.target.blur();

        const path = document.location.pathname;

        const layout = path.substr(1, path.indexOf('.html') -1);

        lesson = new LessonController({
            element: document.getElementById('lesson-container'),
            file: document.getElementById('lesson-select').value,
            layout
        });
    })
}