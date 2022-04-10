import { fileURLToPath } from 'url';
import { group, test } from './test-runner.js';
import tester from './tester.js';

const filePath = fileURLToPath(import.meta.url);

export default group(`${filePath}: self test`, () => {
    test('assert', () => {
        tester.assert(1);
        tester.assert(1 == '1');
        tester.assert(true);
        tester.assert(!false);
    });
    test('equals', () => {        
        tester.equals('1', '1');
        tester.equals(true, !!1);
        tester.equals(1, Number('1'));
    });
});
