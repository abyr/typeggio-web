import Storage from './storage.js';

class Profiler {

    constructor() {
        this.storage = new Storage();

        const profile = this.getProfile();

        if (!profile) {
            profile = this.makeNewProfile();
        }

        this.profile = profile;
    }

    save(item, value) {
        this.storage.setItem(item, value);
    }

    getProfile() {
        return {};
    }

    makeNewProfile() {
        return {};
    }

    export() {
        var exportData = this.storage.export();

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

        reader.onload = event => {
            var src = event.target.result;
            var json = JSON.parse(src);

            console.log(src);

            this.import(JSON.stringify(json, null, 4));
        };
        reader.readAsText(files[0]);

    }

    import(rawString) {
        this.storage.import(JSON.parse(rawString));
    }

}

export default Profiler;