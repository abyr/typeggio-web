import IDBStorage from '../storage/IndexDB.js';

class LessonStatsStoreAdapter {
    constructor() {
        this.schema = {
            name: 'lesson-stats',
            keyPath: 'id',
            indexes: [{
                name: 'lessonId',
                fields: [ 'id' ]
            }]
        };

        this._cache = null;
    }

    async connect() {
        const idb = new IDBStorage('typeggio');

        console.log('start connect...');
        
        const connected = await idb.connect([ this.schema ]);

        console.log('...connected');

        this.idb = idb;
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

            this.idb.putRecord(this.schema.name, {
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

            console.log('get', lessonId);
    
            this.idb.getRecord(this.schema.name, lessonId).then(res => {
                if (!this._cache) {
                    this._cache = {};
                }
                this._putCache(lessonId, res);
                console.log('resolve', lessonId, res);
                resolve(res);
                
            }).catch(err => {
                console.error(err);
                reject(err);
            });
        });
    }

    /**
     * @param {String} lessonId 
     * @returns {Object|undefined}
     */
    _getCached(lessonId) {
        return this._cache && this._cache[lessonId];
    }

    _putCache(key, value) {
        if (!this._cache) {
            this._cache = {};
        }

        this._cache[key] = value;
    }

    /**
     * @returns {Promise}
     */
    getAll() {
        return new Promise((resolve, reject) => {
            this.idb.getAllRecords(this.schema.name).then(res => {
                this._cache = res.reduce((map, x) => {
                    map[x.id] = x;

                    return map;
                }, {});
                resolve(res);

            }).catch(err => {
                console.error(err);
                reject(err);
            });
        });
    }    

    getAllMap() {
        return new Promise((resolve, reject) => {
            this.idb.getAllRecords(this.schema.name).then(res => {
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

    clear() {
        this.invalidateCache();
        return this.idb.clear(this.schema.name);
    }

    invalidateCache() {
        this._cache = null;
    }

}

export default LessonStatsStoreAdapter;