import ChildView from "./classes/child-view.js";

/**
 * @fires LessonsCardView#lesson:selected
 */
class LessonsCardView extends ChildView {

    constructor({ parentElement }) {
        super({ parentElement });

        this.containerId = 'lesson-select-section';
    }

    setInfo({ infoJSON }) {
        this.infoJSON = infoJSON;
    }

    render() {
        const container = this.getContainer();

        container.innerHTML = this.getHtml();

        const cardsList = container.querySelectorAll('.lesson-card');
        
        Array.from(cardsList).forEach(cardEl => {
            const number = cardEl.getAttribute('data-lesson-number');

            const lessonSelectedEvent = new CustomEvent('lesson:selected', {
                detail: {
                    number: number
                }
            });

            cardEl.addEventListener('click', evnt => {
                this.parentElement.dispatchEvent(lessonSelectedEvent);
            });

            cardEl.addEventListener('keypress', evnt => {
                if (evnt.key === 'Enter') {
                    this.parentElement.dispatchEvent(lessonSelectedEvent);
                }
            });
        });
    }

    getHtml () {
        const lessonNumbers = this.getLessonNumbers();
        
        const list = lessonNumbers.map(number => {
            return `
                <li 
                    class="lesson-card"
                    data-lesson-number="${number}"
                    tabindex="0"
                >
                    <div class="lesson-title">${this.getLessonTitle(number)}</div>
                    <div class="lesson-brief-result"></div>
                </li>`});

        return `
            <ul id="lesson-select">
                ${list.join('')}
            </ul>`;
    }

    getLessonTitle(number) {
        return this.infoJSON.lessons[number].title.replace('Lesson ', '');
    }

    getLessonNumbers() {
        return Object.keys(this.infoJSON.lessons).sort((a, b) => {
            return Number(a) - Number(b);
        });
    }
}

export default LessonsCardView;