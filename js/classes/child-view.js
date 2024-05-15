import sharedState from "./shared-state.js";

const SHARED_VIEW_IDX_FIELD_NAME = 'view-index';

/**
 * Add child element into parent element. Use child element for rendering.
 * Generates new element with id containerId inside parentElement.
 */
class ChildView {
    constructor({ parentElement }) {
        
        this.parentElement = parentElement;

        const idx = sharedState.incProp(SHARED_VIEW_IDX_FIELD_NAME);

        this.containerId = `view-idx-${idx}`;
    }

    render() {
        const c = this.getContainer();

        c.innerHTML = this.getHtml();
    }

    getContainer() {
        const c = this.parentElement.querySelector('#' + this.containerId);

        if (c) {
            return c;

        } else {
            return this.makeContainer();
        }
    }

    makeContainer() {
        const c = document.createElement("div");

        c.id = this.containerId;

        this.parentElement.appendChild(c);

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