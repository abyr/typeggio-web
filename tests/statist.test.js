import { fileURLToPath } from 'url';
import letters from '../js/letters.js';
import Statist from '../js/statist.js';
import { group, test } from '../test-tools/test-runner.js';
import tester from '../test-tools/tester.js';

const filePath = fileURLToPath(import.meta.url);

const codeA = letters.charToCode('a');
const codeB = letters.charToCode('b');

group(filePath, () => {
    test('misprints storing', () => {
        const statist = new Statist();

        statist.addMisprint({
            expectedCode: codeA, 
            typedCode: codeB
        });
        tester.equal(statist.getMisprintsCount(), 1);

        statist.addMisprint({
            expectedCode: codeB, 
            typedCode: codeA
        });
        tester.equal(statist.getMisprintsCount(), 2);
    });

    test('words count', () => {
        const statist = new Statist();

        statist.setWordsCount(10);
        tester.equal(statist.getWordsCount(), 10);

        statist.setWordsCount(9);
        tester.equal(statist.getWordsCount(), 9);
    });

    test('reset', () => {
        const statist = new Statist();

        statist.addMisprint({
            expectedCode: codeA, 
            typedCode: codeB
        });
        statist.setWordsCount(10);

        statist.reset();

        tester.equal(statist.getMisprintsCount(), 0);
        tester.equal(statist.getWordsCount(), null);
    });

    test('spent time', () => {
        const statist = new Statist();
        const PERIOD = 50;
        const PERIOD_CORRECTION = 5;

        const min = PERIOD - PERIOD_CORRECTION;
        const max = PERIOD + PERIOD_CORRECTION;

        return new Promise((resolve) => {
            statist.startTimer();

            setTimeout(() => {
                statist.endTimer();

                const spentTime = statist.getSpentTime();

                tester.assert((spentTime > min) && (spentTime < max), 
                    `Spent time (${spentTime}) must be between ${min} and ${max} ms`);

                resolve();
            }, PERIOD);
        });
    });
});
