class Doc {
    constructor() {}

    createElement() {
        return new DocElement();
    }
}

class DocElement {
    constructor() {
        this.classList = new ClassList();
        this.innerHTML = '';
    }
}

class ClassList {
    constructor() {
        this.classList = [];
    };

    add(x) {
        this.classList.push(x);
    }

    remove(x) {
        const idx = this.classList.indexOf(x);

        if (idx > -1) {
            this.classList.splice(idx, 1);
        }
    }

    contains(x) {
        return this.classList.indexOf(x) > -1;
    }
}

export { Doc, DocElement, ClassList };