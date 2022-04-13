import CacheableStorageAdapter from './cacheable-storage-adapter.js';

class PreferrencesStoreAdapter extends CacheableStorageAdapter {
    constructor() {
        super();

        this.name = 'preferrences';
    }
}

export default PreferrencesStoreAdapter;