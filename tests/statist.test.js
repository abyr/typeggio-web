import { fileURLToPath } from 'url';
import letters from '../js/letters.js';
import Statist from '../js/statist.js';
import { group, test } from '../test-tools/test-runner.js';
import tester from '../test-tools/tester.js';

const filePath = fileURLToPath(import.meta.url);

const codeA = letters.charToCode('a');
const codeB = letters.charToCode('b');
const ONE_MINUTE = 1000 * 60;

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

    test('reset time', () => {
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

    test('spent time is correct', () => {
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

    group('words per minute (wpm)', () => {

        test('wpm is 0 if no stats', () => {
            const statist = new Statist();

            const wpm0 = statist.getWordsPerMinute();

            tester.equal(wpm0, 0, 'Words per minute must be zero');
        });
        
        test('wpm is 20', () => {
            const statist = new Statist();

            statist.setWordsCount(20);
            statist._setStartTime(0);
            statist._setEndTime(ONE_MINUTE);

            const wpm = statist.getWordsPerMinute();

            tester.equal(wpm, '20.00', 'Words per munute must be 20');
        });

        test('wpm is 44 average', () => {
            const statist = new Statist();
            const date = new Date();

            statist.setWordsCount(44);
            statist._setStartTime(+date);
            statist._setEndTime(+date + ONE_MINUTE);

            const wpm44 = statist.getWordsPerMinute();

            tester.equal(wpm44, (44).toFixed(2), 'Words per minute must be 44');
        });
    });
});
