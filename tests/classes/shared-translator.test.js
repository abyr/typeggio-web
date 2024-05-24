import { fileURLToPath } from 'url';
import { group, test } from '../../test-tools/test-runner.js';
import tester from '../../test-tools/tester.js';
import i18n from '../../js/classes/shared-translator.js';

const filePath = fileURLToPath(import.meta.url);

group(filePath, () => {
    test('translate unknown', async () => {
        tester.equal('', i18n.translate('test'));
    });
});