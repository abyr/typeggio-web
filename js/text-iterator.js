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

export default TextIterator;