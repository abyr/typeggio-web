import { fileURLToPath } from 'url';
import duration from '../js/duration.js';
import { group, test } from './test-runner.js';
import tester from './tester.js';

const filePath = fileURLToPath(import.meta.url);

group(filePath, () => {
    test('readable time', () => {
        tester.equals(duration.msToReadableTime(1000), '0:01');
        tester.equals(duration.msToReadableTime(1000*60), '1:00');
        tester.equals(duration.msToReadableTime(1000*61), '1:01');
        tester.equals(duration.msToReadableTime(1000*61*60), '61:00');
        tester.equals(duration.msToReadableTime(1000*61*60 + 1000), '61:01');
    });
});
