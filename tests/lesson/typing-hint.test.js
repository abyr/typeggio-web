import { fileURLToPath } from 'url';
import { group, test } from '../../test-tools/test-runner.js';
import tester from '../../test-tools/tester.js';
import TypingHint from '../../js/lesson/typing-hint.js';
import { Doc } from '../libs/doc.js';

const filePath = fileURLToPath(import.meta.url);

group(filePath, () => {
    test('render', () => {
        const doc = new Doc();

        const elDone = doc.createElement();
        const elNow = doc.createElement();
        const elNext = doc.createElement();
        
        const th = new TypingHint({ elDone, elNow, elNext });
        let x;

        x = th.render('', 'a', 'bc');
        tester.equal(elDone.innerHTML, '');
        tester.equal(elNow.innerHTML, 'a');
        tester.equal(elNext.innerHTML, 'bc');

        x = th.renderInc();
        tester.equal(elDone.innerHTML, 'a');
        tester.equal(elNow.innerHTML, 'b');
        tester.equal(elNext.innerHTML, 'c');

        x = th.renderInc();
        tester.equal(elDone.innerHTML, 'ab');
        tester.equal(elNow.innerHTML, 'c');
        tester.equal(elNext.innerHTML, '');

        x = th.renderInc();
        tester.equal(elDone.innerHTML, 'abc');
        tester.equal(elNow.innerHTML, '');
        tester.equal(elNext.innerHTML, '');
    });
});