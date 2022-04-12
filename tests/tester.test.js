import { fileURLToPath } from 'url';
import { group, test } from '../test-tools/test-runner.js';
import tester from '../test-tools/tester.js';

const filePath = fileURLToPath(import.meta.url);

export default group(`${filePath}: self test`, () => {
    test('assert', () => {
        tester.assert(1);
        tester.assert(1 == '1');
        tester.assert(true);
        tester.assert(!false);
    });
    test('equals', () => {        
        tester.equal('1', '1');
        tester.equal(true, !!1);
        tester.equal(1, Number('1'));
    });
});
