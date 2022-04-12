import { fileURLToPath } from 'url';
import { group, test } from '../test-tools/test-runner.js';
import tester from '../test-tools/tester.js';

import duration from '../js/duration.js';

const filePath = fileURLToPath(import.meta.url);

group(filePath, () => {
    test('readable time', () => {
        tester.equal(duration.msToReadableTime(1000), '0:01');
        tester.equal(duration.msToReadableTime(1000*60), '1:00');
        tester.equal(duration.msToReadableTime(1000*61), '1:01');
        tester.equal(duration.msToReadableTime(1000*61*60), '61:00');
        tester.equal(duration.msToReadableTime(1000*61*60 + 1000), '61:01');
    });
});
