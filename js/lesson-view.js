import Keyboard from './keyboard.js';
import TypingHint from './typing-hint.js';
import TextIterator from "./text-iterator.js";
import ResultsView from './results-view.js';

/**
 * @fires LessonView#stats:started
 * @fires LessonView#stats:misprinted
 * @fires LessonView#stats:finished
 */
class LessonView {
    constructor(element, lessonModel) {
        this.element = element;
        this.lesson = lessonModel;

        this.startTyping = false;

        if (window.CustomEvent && typeof window.CustomEvent === 'function') {
            this.misprintedEvent = new CustomEvent('stats:misprinted', { detail: {} });
            this.startedEvent = new CustomEvent('stats:started', { detail: {} });
            this.finishedEvent = new CustomEvent('stats:finished', { detail: {} });
        } else {
            this.misprintedEvent = document.createEvent('CustomEvent');
            this.misprintedEvent.initCustomEvent('stats:misprinted', true, true, { detail: {} });

            this.startedEvent = document.createEvent('CustomEvent');
            this.startedEvent.initCustomEvent('stats:started', true, true, { detail: {} });

            this.finishedEvent = document.createEvent('CustomEvent');
            this.finishedEvent.initCustomEvent('stats:finished', true, true, { detail: {} });
        }
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

        this.onType = this.onType.bind(this);

        document.addEventListener('keypress', this.onType);
    }

    onType(e) {
        e = e || window.event;

        if (!this.startTyping) {
            this.startTyping = true;
            this.element.dispatchEvent(this.startedEvent);
        }

        const pressedCode = (e.which ? e.which : e.keyCode);
        const neededCode = this.textIterator.currentLineChar().charCodeAt();

        if (pressedCode !== neededCode) {
            this.element.dispatchEvent(this.misprintedEvent);
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
        this.startTyping = false;
        this.element.dispatchEvent(this.finishedEvent);
        this.typingHint.render('Done!', '', '');
        document.removeEventListener('keypress', this.onType);
    }

    destroy() {
        document.removeEventListener('keypress', this.onType);
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