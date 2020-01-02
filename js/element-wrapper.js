
class ElementWrapper {
    constructor(el) {
        this.el = el;
    }

    text(x) {
        if (typeof x === 'undefined') {
            return this.getText();
        } else {
            return this.render(x);
        }
    }

    getText() {
        return this.el.innerHTML || '';
    }

    render(x) {
        this.el.innerHTML = x;
    }

    len() {
        return this.el.innerHTML.length;
    }
}

export default ElementWrapper;