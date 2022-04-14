import IDBStorage from '../storage/IndexDB.js';

class CacheableStorageAdapter {
    constructor() {

        /**
         * @protected
         */
         this.name = undefined;

        /**
         * @protected
         */
        this._cache = null;
    }

    async connect() {
        const idb = new IDBStorage();
        await idb.connect();

        this.idb = idb;
    }

    /**
     * @param {Number} key 
     * @param {Mixed} value
     * @returns {Promise}
     */
    put(key, value) {
        return new Promise((resolve, reject) => {
            this.invalidateCache();

            this.idb.putRecord(this.name, {
                id: key,
                value
            }).then(res => {
                resolve(res);

            }).catch(err => {
                console.error(err);
                reject(err);
            });
        });
    }

    /**
     * @param {String} key
     * @returns {Promise}
     */
    get(key) {
        return new Promise((resolve, reject) => {
            const cachedRes = this._getCached(key);

            if (cachedRes) {
                resolve(cachedRes);
                return;
            }

            this.idb.getRecord(this.name, key).then(res => {
                if (!this._cache) {
                    this._cache = {};
                }
                this._putCache(key, res);
                resolve(res);
                
            }).catch(err => {
                console.error(err);
                reject(err);
            });
        });
    }

    /**
     * @returns {Promise}
     */
     getAll() {
        return new Promise((resolve, reject) => {
            this.idb.getAllRecords(this.name).then(res => {
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

    /**
     * @protected
     * @param {String} key
     * @returns {Object|undefined}
     */
    _getCached(key) {
        return this._cache && this._cache[key];
    }

    /**
     * @protected
     * @param {String} key
     * @param {Mixed} value
     */
    _putCache(key, value) {
        if (!this._cache) {
            this._cache = {};
        }

        this._cache[key] = value;
    }

    clear() {
        this.invalidateCache();
        return this.idb.clear(this.name);
    }

    invalidateCache() {
        this._cache = null;
    }
}

export default CacheableStorageAdapter;