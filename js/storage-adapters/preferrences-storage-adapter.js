import CacheableStorageAdapter from './cacheable-storage-adapter.js';

class PreferrencesStoreAdapter extends CacheableStorageAdapter {
    constructor() {
        super();

        this.schema = {
            name: 'preferrences',
            keyPath: 'id',
            indexes: [{
                name: 'preferenceId',
                fields: [ 'id' ]
            }]
        };
    }
}

export default PreferrencesStoreAdapter;