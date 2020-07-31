class StatsDataService {
    constructor() {
        this.misprintsCount = 0;

        this.startTime = null;
        this.endTime = null;
    }

    export() {
        return {
            misprintsCount: this.getMisprintsCount(),
            spentTime: this.getSpentTime()
        }
    }

    addMisprint(q = 1) {
        this.setMisprintsCount(this.getMisprintsCount() + q);
    }

    reset() {
        this.resetTime();
        this.resetMisprints();
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
}

function getTime() {
    return (+ new Date());
}

const statsDataService = new StatsDataService();

export default statsDataService;