import { fileURLToPath } from 'url';
import { group, test } from '../test-tools/test-runner.js';
import tester from '../test-tools/tester.js';

import { Doc } from './libs/doc.js';
import NavigationView from '../js/navigation-view.js';

const filePath = fileURLToPath(import.meta.url);

group(filePath, () => {
    test('links render', () => {
        const doc = new Doc();
        const aNode = doc.createElement();

        const nav = new NavigationView({ element: aNode });

        nav.setLinks([{
            href: '1111',
            title: 'aaaa',
        }, {
            href: '2222',
            title: 'bbbb',
        }]);

        const html = nav.getHtml();

        tester.assert(html.includes, '<a href="1111">aaaa</a>');
        tester.assert(html.includes, '<a href="2222">bbbb</a>');
    });
});
