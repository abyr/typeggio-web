class ChildView {
    constructor({ element }) {
        
        this.element = element;

        this.containerId = undefined; 
    }

    render() {
        const c = this.getContainer();

        c.innerHTML = this.getHtml();
    }

    getContainer() {
        const c = document.getElementById(this.containerId);

        if (c) {
            return c;

        } else {
            return this.makeContainer();
        }
    }

    makeContainer() {
        const c = document.createElement("div");

        c.id = this.containerId;

        this.element.appendChild(c);

        return c;
    }

    getHtml() {        
        return `<container view>`;
    }

    destroy() {
        const container = this.getContainer();

        while(container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
}

export default ChildView;