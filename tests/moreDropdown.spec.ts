
import { test, expect } from '@playwright/test';
import { MoreDropdownPage } from './Pages/moreDropdownPage';

test.describe('Flipkart More Dropdown Testing', () => {

    test('Verify More dropdown options', async ({ page }) => {

        const morePage = new MoreDropdownPage(page);

        console.log('========== TEST STARTED ==========');

        // Step 1: Open Flipkart
        await morePage.openFlipkart();

        // Step 2: Verify More option
        await morePage.verifyMoreVisible();

        // Step 3: Hover on More
        await morePage.hoverOnMore();

        // Step 4: Verify Become a Seller
        await morePage.verifyBecomeSeller();

        console.log('========== TEST COMPLETED ==========');

    });

});
