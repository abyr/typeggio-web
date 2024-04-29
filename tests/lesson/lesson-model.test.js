import { fileURLToPath } from 'url';
import { group, test } from '../../test-tools/test-runner.js';
import tester from '../../test-tools/tester.js';
import LessonModel from '../../js/lesson/lesson-model.js';

const qa = tester;
const filePath = fileURLToPath(import.meta.url);

group(filePath, () => {
    test('full filled', () => {
        const opt = {
            title: 'Aaaaaaa',
            text: 'bbb bb bbb',
        };
        const m = new LessonModel(opt);

        qa.equal(m.getTitle(), opt.title);
        qa.equal(m.getText(), opt.text);
    });

    test('title only', () => {
        const opt = {
            title: 'Aaaaaaa',
        };
        const m = new LessonModel(opt);

        qa.equal(m.getTitle(), opt.title);
        qa.equal(m.getText(), undefined);
    });

    test('text only', () => {
        const opt = {
            text: 'bbb bb bbb',
        };
        const m = new LessonModel(opt);

        qa.equal(m.getTitle(), undefined);
        qa.equal(m.getText(), opt.text);
    });
});