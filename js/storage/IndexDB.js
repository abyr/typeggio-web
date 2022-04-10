class IDBStorage {

    constructor(name, version = '4') {
        this._name = name;
        this._version = version;
    }

    /**
     * @param {Array} storeSchemaList 
     * @returns {Promise}
     */
    connect(storeSchemaList) {
        return this.connectDB(storeSchemaList);
    }

    /**
     * @param {Array} storeSchemasList 
     * @returns {Promise}
     */
    connectDB(storeSchemasList) {
        return new Promise((resolve, reject) => {
            const idb = window.indexedDB || window.mozIndexedDB ||
                window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

            const openRequest = idb.open(this._name, this._version);

            openRequest.onerror = event => {
                console.error('Database ready ERROR', event.target.errorCode);
                reject(event.target.errorCode);
            };

            openRequest.onsuccess = event => {
                this.db = openRequest.result;
                resolve();
            };

            openRequest.onupgradeneeded = () => {
                this.db = openRequest.result;
                this.initStores(storeSchemasList);
            };
        });
    }

    initStores(storeSchemasList) {
        if (!storeSchemasList) {
            return;
        }

        storeSchemasList.forEach(storeSchema => {
            this.initStore({
                storeName: storeSchema.name,
                keyPath: storeSchema.keyPath,
                indexesList: storeSchema.indexes
            });
        });
    }

    initStore({ storeName, keyPath = 'id', indexList = [] }) {
        const store = this.db.createObjectStore(storeName, { keyPath });

        indexList.forEach(indexObject => {
            store.createIndex(indexObject.name, indexObject.fields);
        });
    }

    /**
     * @param {String} storeName 
     * @param {Object} recordObject 
     * @returns {Promise} 
     */
    addRecord(storeName, recordObject) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], "readwrite");

            transaction.oncomplete = event => {
                console.log('Database Transaction OK');
            };

            transaction.onerror = event => {
                console.error('Database Transaction ERROR');
            };

            const store = transaction.objectStore(storeName);

            const storeRecord = Object.assign({}, recordObject);

            if (!storeRecord.id) {
                storeRecord.id = this.generateUniqueId();
            }

            const request = store.add(storeRecord);

            request.onsuccess = function () {
              resolve(request.result);
            };

            request.onerror = function () {
              console.error('Add record ERROR', request.error);
              reject(request.error);
            };
        });
    }

    /**
     * @param {String} storeName 
     * @param {Object} recordObject 
     * @returns {Promise} 
     */
    putRecord(storeName, recordObject) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], "readwrite");

            transaction.onerror = event => {
                console.error('Database Transaction ERROR');
            };

            const store = transaction.objectStore(storeName);

            const storeRecord = Object.assign({}, recordObject);

            if (!storeRecord.id) {
                storeRecord.id = this.generateUniqueId();
            }

            const request = store.put(storeRecord);

            request.onsuccess = function () {
              resolve(request.result);
            };

            request.onerror = function () {
              console.error('Add record ERROR', request.error);
              reject(request.error);
            };
        });
    }

    /**
     * @param {String} storeName 
     * @param {String} id 
     * @returns {Promise} 
     */
    getRecord(storeName, id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');

            transaction.onerror = event => {
                console.error('Database Transaction ERROR');
            };

            const store = transaction.objectStore(storeName);

            const request = store.get(id);

            request.onerror = function (error) {
                reject(error);
            };

            request.onsuccess = () => {
                resolve(request.result);
            };
        });
    }

    /**
     * @param {String} storeName 
     * @returns {Promise} 
     */
    getAllRecords(storeName) {
        return new Promise((resolve, reject) => {

            const transaction = this.db.transaction([storeName], 'readonly');

            transaction.onerror = event => {
                console.error('Database Transaction ERROR');
            };

            const store = transaction.objectStore(storeName);

            const request = store.openCursor();
            let recordsList = [];

            request.onerror = function (error) {
                reject(error);
            };

            request.onsuccess = function(event) {
                let cursor = event.target.result;

                if (cursor) {
                    recordsList.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(recordsList);
                }
            };
        });
    }    

    /**
     * @param {String} storeName 
     * @param {String} key 
     * @returns {Promise} 
     */
    deleteRecord(storeName, key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const request = transaction.objectStore(storeName).delete(key);

            transaction.onerror = event => {
                console.error('Database Transaction ERROR');
            };

            request.onerror = function (error) {
                console.error(error);
                reject(error);
            };

            transaction.oncomplete = function() {
                resolve();
            };
        });
    }

    /**
     * @param {String} storeName 
     * @returns {Promise} 
     */
    clear(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');

            transaction.onerror = event => {
                console.error('Database Transaction ERROR');
            };

            const store = transaction.objectStore(storeName);

            const request = store.clear();

            request.onerror = function (error) {
                reject(error);
            };

            transaction.oncomplete = function() {
                resolve();
            };
        });
    }

    /**
     * @returns {Number}
     */
    generateUniqueId() {
        return + (new Date()).getTime();
    }

}

export default IDBStorage;