import { fileURLToPath } from 'url';
import { group, test } from './test-runner.js';
import tester from './tester.js';
import letters from '../js/letters.js';

const filePath = fileURLToPath(import.meta.url);

group(filePath, () => {
    test('char codes', () => {
        tester.equals(letters.charToCode('.'), '.');
        tester.equals(letters.charToCode('-'), '-');
        tester.equals(letters.charToCode('1'), '1');
        tester.equals(letters.charToCode('a'), 'a');
        tester.equals(letters.charToCode('&'), '&');
        tester.equals(letters.charToCode('\n'), 'enter');
        tester.equals(letters.charToCode(' '), 'space');
    });
});
