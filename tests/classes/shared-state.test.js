import { fileURLToPath } from 'url';
import { group, test } from '../../test-tools/test-runner.js';
import tester from '../../test-tools/tester.js';

import sharedState from '../../js/classes/shared-state.js';

const filePath = fileURLToPath(import.meta.url);
const SHARED_INC_FIELD_NAME = 'shared-test-field';

group(filePath, () => {
    test('duplicated instances', () => {
        let hasErr = false;
        let notAllowedInstance;

        try {
            notAllowedInstance = new sharedState();
        } catch (err) {
            hasErr = true;
            tester.equal(err.message, 'sharedState is not a constructor');
        }

        tester.assert(hasErr, 'Must fail on use shared state constructor');
    });

    test('increment prop', () => {
        const a = sharedState.incProp(SHARED_INC_FIELD_NAME);

        tester.equal(a, 1, 'First value must start from 1');

        const b = sharedState.incProp(SHARED_INC_FIELD_NAME);

        tester.equal(b, 2);

        const c = sharedState.incProp(SHARED_INC_FIELD_NAME);

        tester.equal(c, 3);
    });

    test('shared increment prop', () => {
        const a = sharedState.incProp(SHARED_INC_FIELD_NAME);

        tester.equal(a, 4, 'Shared value must start from previous test value');
    });

    test('set increment starter', () => {
        sharedState.setProp(SHARED_INC_FIELD_NAME, 33);

        const a = sharedState.incProp(SHARED_INC_FIELD_NAME);

        tester.equal(a, 34, 'Shared value must start from 33');
    });
});
