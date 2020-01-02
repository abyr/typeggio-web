import ElementWrapper from './element-wrapper.js';

const NEXT_LINE_CODE = 'Enter';

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

export default TypingHint;