class Statist {
    constructor() {
        this._setStartTime(null);
        this._setEndTime(null);

        /**
         * @private
         */
        this._expectedCodes = {};

        /**
         * @private
         */
        this._typedCodes = {};
    }

    export() {
        return {
            misprintsCount: this.getMisprintsCount(),
            spentTime: this.getSpentTime(),
            wpm: this.getWordsPerMinute()
        };
    }

    /**
     *
     * @param {String} c char
     * @param {Number} q quantity
     */
    addMisprint({ expectedCode, typedCode }) {
        const expectedCodeSum = this._expectedCodes[expectedCode] || 0;

        this._expectedCodes[expectedCode] = expectedCodeSum + 1;

        const typedCodeSum = this._typedCodes[typedCode] || 0;

        this._typedCodes[typedCode] = typedCodeSum + 1;
    }

    reset() {
        this.resetTime();
        this.resetMisprints();
        this.resetWordsCount();
    }

    resetMisprints() {
        this._expectedCodes = {};
        this._typedCodes = {};
    }

    getMisprintsCount() {
        const list = Object.values(this._expectedCodes);

        if (list.length === 0) {
            return 0;
        }

        const expectedSumValues = list.reduce((a, b) => a + b) || 0;

        return expectedSumValues;
    }

    setWordsCount(x) {
        this.wordsCount = x;
    }

    resetWordsCount() {
        this.wordsCount = null;
    }

    resetTime() {
        this._setStartTime(null);
        this._setEndTime(null);
    }

    startTimer() {
        this._setStartTime(getTime());
    }

    /**
     * @private
     * @param {Number} startTime 
     */
    _setStartTime(startTime) {
        this.startTime = startTime;
    }

    endTimer() {
        this._setEndTime(getTime());
    }

    /**
     * @private
     * @param {Number} endTime 
     */
    _setEndTime(endTime) {
        this.endTime = endTime;
    }

    getSpentTime() {
        return this.endTime - this.startTime;
    }

    /**
     * @returns {String}
     */
    getWordsPerMinute() {
        const wordsCount = this.getWordsCount();

        if (!wordsCount) {
            return 0;
        }

        const msPerWord = this.getSpentTime() / wordsCount;
        const wpm = (60 * 1000 / msPerWord).toFixed(2);

        return wpm;
    }

    getWordsCount() {
        return this.wordsCount;
    }

    getMisprintsMap() {
        return Object.assign({}, this._expectedCodes);
    }
}

function getTime() {
    return (+ new Date());
}

export default Statist;
