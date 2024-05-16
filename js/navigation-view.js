import View from "./classes/view.js";

/**
 * @typedef {{href: string, title: string}} NavigationLink
 */

class NavigationView extends View {

    constructor({ element }) {
        super({ element });
        
        this.element = element;

        /**
         * @type {NavigationLink[]}
         */
        this.links = [];
    }

    /**
     * @param {NavigationLink[]} links 
     */
    setLinks(links) {
        this.links = links;
    }

    getHtml() {
        const results = this.links.map(link => {
            return `
                <li>
                    ${link.href ? (
                        '<a href="' + link.href + '">' + link.title + '</a>'
                    ) : (
                        link.title
                    )}
                </li>
            `;
        });

        return `
            <nav>
                <ol> ${results.join('')} </ol>
            </nav>
        `;
    }
}

export default NavigationView;