class LessonModel {
    constructor({title, text}) {
        this.title = title;
        this.text = text;
    }

    getTitle() {
        return this.title;
    }

    getText() {
        return this.text;
    }
}

export default LessonModel;