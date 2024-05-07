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
const ONE_MINUTE = 1000 * 60;

group(filePath, () => {
    test('no stats', () => {
        const el = new Doc();
        const stat = new Statist();
        const v = new LessonResultView({
            parentElement: el,
            statist: stat,
        });

        const html = v.getHtml();

        qa.assert(html.indexOf('Misprints: 0') > 0, 'Must be zero misprints');
        qa.assert(html.indexOf('Spent time: 0:00') > 0, 'Must be zero spent time');
        qa.assert(html.indexOf('Words per minute: 0') > 0, 'Must be zero wpm');
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

        qa.assert(html.indexOf('Misprints: 2') > 0, 'Must be 2 misprints');
    });
    
    test('spent time', () => {
        const el = new Doc();
        const stat = new Statist();
        const date = new Date();

        stat.addMisprint(Q_CODE, W_CODE);
        stat.setWordsCount(12);
        stat._setStartTime(+date);
        stat._setEndTime(+date + ONE_MINUTE);

        const v = new LessonResultView({
            parentElement: el,
            statist: stat,
        });

        const html = v.getHtml();

        qa.assert(html.indexOf('Misprints: 1') > 0, 'Must be 1 misprint');
        qa.assert(html.indexOf('Spent time: 1:00') > 0, 'Must be 1 min spent');
        qa.assert(html.indexOf('Words per minute: 12.00') > 0, 'must be 12 wpm');
        qa.assert(html.indexOf('Advanced beginner') > 0, 'Reached level must be Advanced beginner');
    });
});