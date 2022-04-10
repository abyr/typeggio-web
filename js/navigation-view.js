class NavigationView {
    constructor({ element }) {
        this.element = element;
    }

    setLinks(links) {
        this.links = links;
    }

    render() {
        this.element.innerHTML = this.getHtml();
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

    destroy() {
        while(this.element.firstChild) {
            existingContainer.removeChild(existingContainer.firstChild);
        }
    }
}

export default NavigationView;