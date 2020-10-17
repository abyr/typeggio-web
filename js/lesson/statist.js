class Statist {
    constructor() {
        this.misprintsCount = 0;

        this.startTime = null;
        this.endTime = null;
    }

    export() {
        return {
            misprintsCount: this.getMisprintsCount(),
            spentTime: this.getSpentTime(),
            wpm: this.getWordsPerMinute()
        }
    }

    addMisprint(q = 1) {
        this.setMisprintsCount(this.getMisprintsCount() + q);
    }

    reset() {
        this.resetTime();
        this.resetMisprints();
        this.resetWordsCount();
    }

    resetMisprints() {
        this.setMisprintsCount(0);
    }

    setMisprintsCount(x) {
        this.misprintsCount = x;
    }

    getMisprintsCount() {
        return this.misprintsCount;
    }

    setWordsCount(x) {
        this.wordsCount = x;
    }

    resetWordsCount() {
        this.wordsCount = null;
    }

    resetTime() {
        this.startTime = null;
        this.endTime = null;
    }

    startTimer() {
        this.startTime = getTime();
    }

    endTimer() {
        this.endTime = getTime();
    }

    getSpentTime() {
        return this.endTime - this.startTime;
    }

    getWordsPerMinute() {
        const msPerWord = this.getSpentTime() / this.getWordsCount();
        const wpm = (60 * 1000 / msPerWord).toFixed(2);

        return wpm;
    }

    getWordsCount() {
        return this.wordsCount;
    }

}

function getTime() {
    return (+ new Date());
}

export default Statist;