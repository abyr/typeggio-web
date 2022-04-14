import LessonStatsStoreAdapter from './storage-adapters/lesson-stats-storage-adapter.js';

class Results {

    constructor() {}

    async init() {
        this.storageAdapter = new LessonStatsStoreAdapter();

        await this.storageAdapter.connect();
    }

    async save(item, value) {
        await this.storageAdapter.put(item, value);
    }

    async getResult(key) {        
        return await this.storageAdapter.get(key);
    }

    async getAll() {
        return await this.storageAdapter.getAll();
    }

    async export() {        
        var exportData = await this.storageAdapter.getAllMap();

        var _exportData = JSON.stringify(exportData , null, 4);

        var vLink = document.createElement('a'),
            vBlob = new Blob([_exportData], {
                type: 'octet/stream'
            }),
            vName = 'typeggio-profile.json',
            vUrl = window.URL.createObjectURL(vBlob);

        vLink.setAttribute('href', vUrl);
        vLink.setAttribute('download', vName);

        vLink.click();
    }    

    importFile(e) {
        var files = event.target.files;

        if (files.length === 0) {
            console.log('No file is selected');
            return;
        }

        var reader = new FileReader();

        reader.onload = async event => {
            var src = event.target.result;
            var json = JSON.parse(src);

            await this.storageAdapter.clear();

            Object.values(json).forEach(async x => {
                await this.storageAdapter.put(x.id, x);
            });
        };
        reader.readAsText(files[0]);
    }

    import(rawString) {
        this.storage.import(JSON.parse(rawString));
    }

}

export default Results;