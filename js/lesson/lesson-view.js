import Keyboard from './keyboard.js';
import TypingHint from './typing-hint.js';
import TextIterator from "./text-iterator.js";
import letters from '../letters.js';

/**
 * @fires LessonView#stats:started
 * @fires LessonView#stats:misprinted
 * @fires LessonView#stats:finished
 */
class LessonView {
    constructor(element, lessonModel, { showKeyboard }) {
        this.element = element;
        this.lesson = lessonModel;

        this.showKeyboard = showKeyboard;

        this.startTyping = false;

        this.startedEvent = new CustomEvent('stats:started', { detail: {} });
        this.finishedEvent = new CustomEvent('stats:finished', { detail: {} });
    }

    render(layout) {
        const container = document.createElement("div");

        container.id = 'lesson';

        const hintEl = document.createElement("div");
        const keyboardEl = document.createElement("div");

        this.keyboard = new Keyboard(layout);

        hintEl.classList.add('typingLine');

        hintEl.innerHTML = this.keyboard.getTypingHTML();
        keyboardEl.classList.add('keyboard');

        keyboardEl.innerHTML = this.keyboard.getHTML();
        container.append(keyboardEl, hintEl);

        if (!this.showKeyboard) {
            keyboardEl.classList.add('hidden');
        }

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
            const misprintedEvent = new CustomEvent('stats:misprinted', {
                detail: {
                    expectedCode: neededCode
                }
            });

            this.element.dispatchEvent(misprintedEvent);
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

        this.keyboard.pressButton(letters.charToCode(nextChar));
    }

    finish() {
        this.startTyping = false;
        this.element.dispatchEvent(this.finishedEvent);
        this.typingHint.render('', '', '');
        document.removeEventListener('keypress', this.onType);
    }

    destroy() {
        document.removeEventListener('keypress', this.onType);
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
    }
}

export default LessonView;