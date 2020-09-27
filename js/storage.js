class Storage {
    constructor() {
        this.engine = window.localStorage;
    }

    getItem() {
        localStorage.getItem(name);
    }

    setItem(name, value) {
        localStorage.setItem(name, value);
    }

    export() {
        return Object.keys(localStorage).reduce(function (res, x) {
            res[x] = JSON.parse(localStorage.getItem(x));

            return res;
        }, {});
    }

    import(dataObject) {
        Object.keys(dataObject).forEach(x => {
            var row = dataObject[x];

            this.setItem(x, JSON.stringify(row));
        });

    }
}

export default Storage;