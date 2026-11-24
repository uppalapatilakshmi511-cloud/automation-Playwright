
import { test } from '@playwright/test';
import { MultipleWindowsPage } from './Pages/multipleWindowPage';

test('Multiple Windows Handling', async ({ page }) => {

    const windows = new MultipleWindowsPage(page);

    // Step 1: Open Google
    await windows.openGoogle();

    // Step 2: Open Amazon in new tab
    await windows.openAmazon();

    // Step 3: Verify Amazon
    await windows.verifyAmazon();

    // Step 4: Switch to Amazon
    await windows.switchToAmazon();

    // Step 5: Close Amazon
    await windows.closeAmazon();

    // Step 6: Switch back to Google
    await windows.switchToGoogle();

});
