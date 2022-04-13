import CacheableStorageAdapter from './cacheable-storage-adapter.js';
class LessonStatsStoreAdapter extends CacheableStorageAdapter {
    constructor() {
        super();
        
        this.name = 'lesson-stats';
    }

    /**
     * @param {Number} id 
     * @param {Object} args
     * @param {number} args.misprintsCount 
     * @param {number} args.spentTime 
     * @param {string} args.wpm 
     * @returns {Promise}
     */
    put(id, { misprintsCount, spentTime, wpm }) {
        return new Promise((resolve, reject) => {

            this.invalidateCache();

            this.idb.putRecord(this.name, {
                id,
                misprintsCount,
                spentTime,
                wpm
            }).then(res => {
                resolve(res);

            }).catch(err => {
                console.error(err);
                reject(err);
            });
        });
    }

    /**
     * @param {Number} lessonId 
     * @returns {Promise}
     */
    get(lessonId) { 
        return new Promise((resolve, reject) => {
            const cachedRes = this._getCached(lessonId);

            if (cachedRes) {
                resolve(cachedRes);
                return;
            }

            this.idb.getRecord(this.name, lessonId).then(res => {
                if (!this._cache) {
                    this._cache = {};
                }
                this._putCache(lessonId, res);
                resolve(res);
                
            }).catch(err => {
                console.error(err);
                reject(err);
            });
        });
    }

    getAllMap() {
        return new Promise((resolve, reject) => {
            this.idb.getAllRecords(this.name).then(res => {
                this._cache = res.reduce((map, x) => {
                    map[x.id] = x;

                    return map;
                }, {});
                resolve(this._cache);

            }).catch(err => {
                console.error(err);
                reject(err);
            });
        });
    }
}

export default LessonStatsStoreAdapter;