import CacheableStorageAdapter from './cacheable-storage-adapter.js';

class PreferrencesStoreAdapter extends CacheableStorageAdapter {
    constructor() {
        super();

        this.schema = {
            name: 'preferrences',
            keyPath: 'id',
            indexes: []
        };
    }
}

export default PreferrencesStoreAdapter;