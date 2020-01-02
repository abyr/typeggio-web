import Keyboard from './keyboard.js';
import TypingHint from './typing-hint.js';
import TextIterator from "./text-iterator.js";

class LessonView {
    constructor(element, lessonModel) {
        this.element = element;
        this.lesson = lessonModel;
    }

    render(layout) {
        const container = document.createElement("div");

        const titleEl = document.createElement("h2");
        const hintEl = document.createElement("div");
        const keyboardEl = document.createElement("div");

        titleEl.innerHTML = this.lesson.getTitle();

        this.keyboard = new Keyboard(layout);

        hintEl.classList.add('typingLine');

        hintEl.innerHTML = this.keyboard.getTypingHTML();
        keyboardEl.classList.add('keyboard');

        keyboardEl.innerHTML = this.keyboard.getHTML();
        container.append(titleEl, keyboardEl, hintEl);

        this.element.appendChild(container);

        this.textIterator = new TextIterator(this.lesson.getText());

        var line = this.textIterator.currentLine();

        this.typingHint = new TypingHint({
            elDone: document.getElementById("before"),
            elNow: document.getElementById("line"),
            elNext: document.getElementById("after")
        });

        this.typingHint.render('', line[0], line.substring(1));

        this.renderKeyboard();

        document.onkeypress = this.onType.bind(this);
    }

    onType(e) {
        e = e || window.event;

        const pressedCode = (e.which ? e.which : e.keyCode);
        const neededCode = this.textIterator.currentLineChar().charCodeAt();

        if (pressedCode !== neededCode) {
            return false;
        }

        const hasNextLine = this.textIterator.hasNextLine();
        const hasNextLineChar = this.textIterator.hasNextLineChar();

        if (hasNextLineChar) {
            this.goToNextChar();

        } else if (hasNextLine) {
            this.goToNextLine();

        } else {
            this.finish();
        }

        this.renderKeyboard();
    }

    goToNextChar() {
        this.typingHint.renderInc();
        this.textIterator.next();
    }

    goToNextLine() {
        this.textIterator.next();

        const line = this.textIterator.currentLine();

        this.typingHint.render('', line[0], line.substring(1));
    }

    renderKeyboard() {
        const nextChar = this.textIterator.currentLineChar();

        this.keyboard.pressButton(charToCode(nextChar));
    }

    finish() {
        this.typingHint.render('Done!', '', '');
        document.onkeypress = null;
    }

    destroy() {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
    }
}

const codesMap = {
    "10": "enter",
    "13": "enter",
    "32": "space"
};

function charToCode(char) {
    const initialCode = char.charCodeAt();
    let code;

    if (initialCode === 10) {
        code = 13;
    } else {
        code = initialCode;
    }

    const specialCode = codesMap[code];

    if (specialCode) {
        return specialCode;
    } else {
        return char;
    }
}

export default LessonView;