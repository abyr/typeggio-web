class Doc {
    constructor() {}

    createElement() {
        return new DocElement();
    }
}

class DocElement {
    constructor() {
        this.classList = new ClassList();
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

        console.log('splice idx', idx, x, 'in', this.classList);

        if (idx > -1) {
            this.classList.splice(idx, 1);
        }
    }

    contains(x) {
        return this.classList.indexOf(x) > -1;
    }
}

export { Doc, DocElement, ClassList };