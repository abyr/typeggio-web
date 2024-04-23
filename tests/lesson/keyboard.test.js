import { fileURLToPath } from 'url';
import { group, test } from '../../test-tools/test-runner.js';
import tester from '../../test-tools/tester.js';
import Keyboard from '../../js/lesson/keyboard.js';

const qa = tester;
const filePath = fileURLToPath(import.meta.url);

group(filePath, () => {
    test('default layouts is qwerty', () => {
        const k = new Keyboard();

        qa.equal(k.getLayout(), 'qwerty');
    });

    group('qwerty layout', () => {
        test('buttons and classes', () => {
            const k = new Keyboard('ua');

            qa.equal(k.getButtonClass('f'), 'bf');
            qa.equal(k.getButtonClass('D'), 'bD');
            qa.equal(k.getButtonClass('space'), 'bspace');            
            qa.equal(k.getButtonClass('comma'), 'bcomma');
        });
    });
    
    group('ua layout', () => {
        test('ua layout is set', () => {
            const k = new Keyboard('ua');
    
            qa.equal(k.getLayout(), 'ua');
        });

        test('buttons and classes', () => {
            const k = new Keyboard('ua');

            qa.equal(k.getButtonClass('ф'), 'ba');
            qa.equal(k.getButtonClass('і'), 'bs');
            qa.equal(k.getButtonClass('и'), 'bb');
            qa.equal(k.getButtonClass('й'), 'bq');
            qa.equal(k.getButtonClass('ї'), 'bscbrc');
        });
    });
});
