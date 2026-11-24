
import { test, expect } from './Fixtures/baseFixtures';

test.describe('Flipkart More Dropdown Testing', () => {

    test('Verify all More dropdown options', async ({ moreDropdownPage }) => {

        console.log('========== TEST STARTED ==========');

        // Step 1: Open Flipkart
        await moreDropdownPage.openFlipkart();

        // Step 2: Handle login popup
        await moreDropdownPage.closeLoginPopup();

        // Step 3: Verify all dropdown options
        await moreDropdownPage.verifyAllDropdownOptions();

        console.log('All More dropdown options verified');

        console.log('========== TEST COMPLETED ==========');

    });

});
