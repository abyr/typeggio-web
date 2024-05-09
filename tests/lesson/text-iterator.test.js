import { fileURLToPath } from 'url';
import { group, test } from '../../test-tools/test-runner.js';
import tester from '../../test-tools/tester.js';
import TextIterator from '../../js/lesson/text-iterator.js';

const filePath = fileURLToPath(import.meta.url);

group(filePath, () => {
    test('next char', () => {
        const ti = new TextIterator(`ab de
12 45`);
        let x;
        
        x = ti.first();
        tester.equal(x, 'a');
        x = ti.next();
        tester.equal(x, 'b');
        x = ti.next();
        tester.equal(x, ' ');
        x = ti.next();
        tester.equal(x, 'd');
        x = ti.next();
        tester.equal(x, 'e');
        x = ti.next();
        tester.equal(x, '1');
        x = ti.next();
        tester.equal(x, '2');
        x = ti.next();
        tester.equal(x, ' ');
        x = ti.next();
        tester.equal(x, '4');
        x = ti.next();
        tester.equal(x, '5');
        x = ti.next();
        tester.equal(x, null);
    });

    test('text is done', () => {
        const ti = new TextIterator(`abc`);
        let x;

        x = ti.next();
        x = ti.next();
        x = ti.next();

        tester.assert(ti.isDone());

        x = ti.next();
        tester.equal(x, null);

        x = ti.nextLine();
        tester.equal(x, null);
    });

    test('text by lines', () => {
        const ti = new TextIterator(`abc
qwe`);
        let x;

        x = ti.currentLine();
        tester.equal(x, 'abc');

        x = ti.nextLine();
        tester.equal(x, 'qwe');

        x = ti.nextLine();
        tester.equal(x, null);
    });
});