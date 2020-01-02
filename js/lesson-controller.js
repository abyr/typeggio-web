import FileIterator from "./text-file-iterator.js";
import Keyboard from './keyboard.js';

class LessonController {
    constructor({ file, element, layout }) {
        this.element = element;
        this.title = '';
        this.lines = [];
        this.layout = layout;

        const url = `https://raw.githubusercontent.com/abyr/typeggio-sources/master/${layout}/${file}`;

        this.init({ url });
    }

    async init({ url }) {
        for await (let line of FileIterator.makeTextFileLineIterator(url)) {
            if (this.title) {
                this.lines.push(line);
            } else {
                this.title = line;
            }
        }

        const title = this.title;
        const text = this.lines.join('\n');

        this.lessonModel = new LessonModel({ title, text });
        this.view = new LessonView(this.element, this.lessonModel);

        this.start();
    }

    start() {
        this.view.render(this.layout);
    }

    destroy() {
        this.view.destroy();
    }
}

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

const NEXT_LINE_CODE = 'Enter';

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

class TypingHint {
    constructor({ elDone, elNow, elNext }) {
        this.elDone = new ElementWrapper(elDone);
        this.elNow = new ElementWrapper(elNow);
        this.elNext = new ElementWrapper(elNext);
    }

    isNextLine() {
        return this.elNow.text() === NEXT_LINE_CODE;
    }

    isEOL() {
        return this.elNext.len() === 0;
    }

    render(a, b, c) {
        this.renderDone(a);
        this.renderNow(b);
        this.renderNext(c);
    }

    renderDone(x) {
        this.elDone.text(x);
    }

    renderNow(x) {
        this.elNow.text(x);
    }

    renderNext(x) {
        this.elNext.text(x);
    }

    renderInc() {
        this.renderDoneInc();
        this.renderNowInc();
        this.renderNextInc();
    }

    renderDoneInc() {
        const c = this.elDone.text();

        this.elDone.text(c + this.elNow.text().replace('&nbsp;', ' '));
    }
    renderNowInc() {
        const c = this.elNext.text();
        const ch = c[0] || '';

        this.elNow.text(ch.replace(' ', '&nbsp;'));
    }

    renderNextInc() {
        const c = this.elNext.text();

        this.elNext.text(c.substring(1));
    }
}

class ElementWrapper {
    constructor(el) {
        this.el = el;
    }

    text(x) {
        if (typeof x === 'undefined') {
            return this.getText();
        } else {
            return this.render(x);
        }
    }

    getText() {
        return this.el.innerHTML || '';
    }

    render(x) {
        this.el.innerHTML = x;
    }

    len() {
        return this.el.innerHTML.length;
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

class TextIterator {
    constructor(text) {
        this.lines = text2list(text);

        this.first();
    }

    first() {
        this.lineIndex = 0;
        this.charIndex = 0;

        return this.currentLineChar();
    }

    next() {
        if (this.hasNextLineChar()) {
            return this.nextLineChar();

        } else if (this.hasNextLine()) {
            this.nextLine();

            return this.currentLineChar();
        } else {
            return null;
        }
    }

    /**
     * @returns {String|Null}
     */
    nextLine() {
        if (this.hasNextLine()) {
            this.lineIndex++;
            this.charIndex = 0;

            return this.currentLine();
        } else {

            return null;
        }

    }

    /**
     * @returns {String|Null}
     */
    nextLineChar() {
        if (this.hasNextLineChar()) {
            this.charIndex++;

            return this.currentLineChar();
        } else {

            return null;
        }
    }

    /**
     * @returns {String}
     */
    currentLineChar() {
        var line = this.currentLine();

        return line[this.charIndex];
    }

    /**
     * @returns {String}
     */
    currentLine() {
        return this.lines[this.lineIndex];
    }

    /**
     * @returns {Boolean}
     */
    isDone() {
        if (this.hasNextLine() || this.hasNextLineChar()) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * @returns {Boolean}
     */
    hasNextLine() {
        return !!this.lines[this.lineIndex + 1];
    }

    /**
     * @returns {Boolean}
     */
    hasNextLineChar() {
        return !!this.lines[this.lineIndex][this.charIndex + 1];
    }

    /**
     *
     * @param {Number} lineIndex
     * @param {Number} charIndex
     */
    getByIndex(lineIndex, charIndex) {
        const line = this.lines[lineIndex];

        if (line) {
            return line[charIndex] || null;
        } else {
            return null;
        }
    }
}

function text2list(text) {
    return stripSpaces(text).match(/[^\r\n]+/g);
}

function stripSpaces(text) {
    return text.replace(/^\s+|\s+$/gm, '');
}

export default LessonController;