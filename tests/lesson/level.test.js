import { fileURLToPath } from 'url';
import { group, test } from '../../test-tools/test-runner.js';
import tester from '../../test-tools/tester.js';
import level from '../../js/lesson/level.js';

const qa = tester;

const filePath = fileURLToPath(import.meta.url);

group(filePath, () => {
    test('levels definition', () => {
        const levels = level.getLevelsDefinition();

        qa.assert(typeof levels === 'object');
        qa.assert(typeof levels.expert === 'object');
        qa.assert(typeof levels.proficient === 'object');
        qa.assert(typeof levels.competent === 'object');
        qa.assert(typeof levels.advanced_beginner === 'object');
        qa.assert(typeof levels.novice === 'object');
        qa.assert(typeof levels.fail === 'object');

        qa.assert(levels.fail.ratio === 0);
        qa.assert(levels.expert.ratio === 1);
    });

    test('levels for average wpm', () => {
        const levels = level.getLevelsDefinition();
        const AVERAGE_WPM = 44;

        qa.equal(level.getLevel({
            wordsPerMinute: AVERAGE_WPM,
            misprintsCount: 20
        }).code, levels.fail.code);

        qa.equal(level.getLevel({
            wordsPerMinute: AVERAGE_WPM,
            misprintsCount: 15
        }).code, levels.novice.code);

        qa.equal(level.getLevel({
            wordsPerMinute: AVERAGE_WPM,
            misprintsCount: 10
        }).code, levels.advanced_beginner.code);

        qa.equal(level.getLevel({
            wordsPerMinute: AVERAGE_WPM,
            misprintsCount: 7
        }).code, levels.competent.code);

        qa.equal(level.getLevel({
            wordsPerMinute: AVERAGE_WPM,
            misprintsCount: 3
        }).code, levels.proficient.code);

        qa.equal(level.getLevel({
            wordsPerMinute: AVERAGE_WPM,
            misprintsCount: 0
        }).code, levels.expert.code);
    });

    test('levels for slower wpm', () => {
        const levels = level.getLevelsDefinition();
        const SLOWER_WPM = 20;

        qa.equal(level.getLevel({
            wordsPerMinute: SLOWER_WPM,
            misprintsCount: 12
        }).code, levels.fail.code);

        qa.equal(level.getLevel({
            wordsPerMinute: SLOWER_WPM,
            misprintsCount: 8
        }).code, levels.novice.code);

        qa.equal(level.getLevel({
            wordsPerMinute: SLOWER_WPM,
            misprintsCount: 4
        }).code, levels.advanced_beginner.code);

        qa.equal(level.getLevel({
            wordsPerMinute: SLOWER_WPM,
            misprintsCount: 2
        }).code, levels.competent.code);   
        
        qa.equal(level.getLevel({
            wordsPerMinute: SLOWER_WPM,
            misprintsCount: 0
        }).code, levels.competent.code);

    });

    test('levels for slow wpm', () => {
        const levels = level.getLevelsDefinition();
        const SLOW_WPM = 10;

        qa.equal(level.getLevel({
            wordsPerMinute: SLOW_WPM,
            misprintsCount: 10
        }).code, levels.fail.code);

        qa.equal(level.getLevel({
            wordsPerMinute: SLOW_WPM,
            misprintsCount: 8
        }).code, levels.novice.code);

        qa.equal(level.getLevel({
            wordsPerMinute: SLOW_WPM,
            misprintsCount: 4
        }).code, levels.advanced_beginner.code);

        qa.equal(level.getLevel({
            wordsPerMinute: SLOW_WPM,
            misprintsCount: 0
        }).code, levels.competent.code);        

    });
});
