import Storage from '../storage.js';

class Results {

    constructor() {
        this.storage = new Storage();
    }

    save(item, value) {
        this.storage.setItem(item, JSON.stringify(value));
    }

    export() {
        var exportData = this.getAll();

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

    getResult(key) {
        const allResObj = this.getAll();

        return allResObj[key] || null;
    }

    getAll() {
        return this.storage.export();
    }

    importFile(e) {
        var files = event.target.files;

        if (files.length === 0) {
            console.log('No file is selected');
            return;
        }

        var reader = new FileReader();

        reader.onload = event => {
            var src = event.target.result;
            var json = JSON.parse(src);

            this.import(JSON.stringify(json, null, 4));

            location.reload();
        };
        reader.readAsText(files[0]);

    }

    import(rawString) {
        this.storage.import(JSON.parse(rawString));
    }

}

export default Results;