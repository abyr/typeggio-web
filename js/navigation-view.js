import View from "./classes/view.js";

class NavigationView extends View {

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