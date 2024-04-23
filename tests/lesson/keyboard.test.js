import { fileURLToPath } from 'url';
import { group, test } from '../../test-tools/test-runner.js';
import tester from '../../test-tools/tester.js';
import Keyboard from '../../js/lesson/keyboard.js';

const qa = tester;
const filePath = fileURLToPath(import.meta.url);

group(filePath, () => {
    test('layouts', () => {

        const k = new Keyboard();

        qa.equal(k.getLayout(), 'qwerty');
    });
});
