import ChildView from "./child-view.js";

class LessonsCardView extends ChildView {

    constructor({ parentElement }) {
        super({ parentElement });

        this.containerId = 'lesson-select-section'; 
    }

    setInfo ({ infoJSON }) {
        this.infoJSON = infoJSON;
    }

    getHtml () {
        const infoJSON = this.infoJSON;
        const list = Object.keys(infoJSON.lessons).sort((a, b) => {
            return Number(a) - Number(b);

        }).map(number => {

            return `
                <li 
                    class="lesson-card"
                    data-lesson-number="${number}"
                    tabindex="0"
                >
                    <div class="lesson-title">${infoJSON.lessons[number].title.replace('Lesson ', '')}</div>
                    <div class="lesson-brief-result"></div>
                </li>`});


        return `
            <ul id="lesson-select">
                ${list.join('')}
            </ul>
        `;
    }
}

export default LessonsCardView;