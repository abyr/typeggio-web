import IDBStorage from '../storage/IndexDB.js';

class CacheableStorageAdapter {
    constructor() {

        /**
         * @protected
         */
        this._cache = null;

        this.schema = {
            name: undefined,
            keyPath: 'id',
            indexes: []
        };
    }

    async connect() {
        const idb = new IDBStorage('typeggio');
        await idb.connect([ this.schema ]);

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

            this.idb.putRecord(this.schema.name, {
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

            this.idb.getRecord(this.schema.name, key).then(res => {
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
        return this.idb.clear(this.schema.name);
    }

    invalidateCache() {
        this._cache = null;
    }
}

export default CacheableStorageAdapter;