class ResultsView {
    constructor({ element, allResults }) {
        this.element = element;

        this.allResults = allResults;

        this.resultsList = Object.entries(this.allResults).reduce((res, entry) => {
            res.push({
                id: entry[0],
                result: entry[1]
            });
            return res;
        }, []).sort((a, b) => a.id.localeCompare(b.id));

        this.containerId = 'all-results-container';
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

        const results = this.resultsList.map(x => {
            return `
                <div>
                    <div><b>${x.id}</b></div>
                    <div>
                        ${Object.entries(x.result).map(x => {
                            return `${x[0]}: ${x[1]} `
                        }).join(', ')}
                    </div>
                </div>
            `
        });

        return `
            <h2>Results</h2>
            ${results.join('')}
        `;
    }

    destroy() {
        var existingContainer = document.getElementById(this.containerId);

        if (!existingContainer) {
            return;
        }

        while(existingContainer.firstChild) {
            existingContainer.removeChild(existingContainer.firstChild);
        }
    }
}

export default ResultsView;