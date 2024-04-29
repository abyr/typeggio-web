import { fileURLToPath } from 'url';
import { group, test } from '../../test-tools/test-runner.js';
import tester from '../../test-tools/tester.js';
import LessonResultView from '../../js/lesson/lesson-result-view.js';
import Statist from '../../js/statist.js';
import { Doc } from '../libs/doc.js';

const qa = tester;
const filePath = fileURLToPath(import.meta.url);

const Q_CODE = 113;
const W_CODE = 119;

group(filePath, () => {
    test('no stats', () => {
        const el = new Doc();
        const stat = new Statist();
        const v = new LessonResultView({
            parentElement: el,
            statist: stat,
        });

        const html = v.getHtml();

        qa.assert(html.indexOf('Misprints: 0') > 0);
        qa.assert(html.indexOf('Spent time: 0:00') > 0);
        qa.assert(html.indexOf('Words per minute: 0') > 0);
    });
    test('has misprints', () => {
        const el = new Doc();
        const stat = new Statist();

        stat.addMisprint(Q_CODE, W_CODE);
        stat.addMisprint(Q_CODE, W_CODE);

        const v = new LessonResultView({
            parentElement: el,
            statist: stat,
        });

        const html = v.getHtml();

        qa.assert(html.indexOf('Misprints: 2') > 0);
    });
});