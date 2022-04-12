import { fileURLToPath } from 'url';
import { group, test } from '../test-tools/test-runner.js';
import tester from '../test-tools/tester.js';
import letters from '../js/letters.js';

const filePath = fileURLToPath(import.meta.url);

group(filePath, () => {
    test('char codes', () => {
        tester.equal(letters.charToCode('.'), '.');
        tester.equal(letters.charToCode('-'), '-');
        tester.equal(letters.charToCode('1'), '1');
        tester.equal(letters.charToCode('a'), 'a');
        tester.equal(letters.charToCode('&'), '&');
        tester.equal(letters.charToCode('\n'), 'enter');
        tester.equal(letters.charToCode(' '), 'space');
    });
});
