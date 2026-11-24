
import { test } from '@playwright/test';
import { IframePage } from './Pages/iframePage';

test('Iframe interaction testing', async ({ page }) => {

    const iframe = new IframePage(page);

    // Step 1: Open website
    await iframe.openWebsite();

    // Step 2: Verify parent page title
    await iframe.verifyPageTitle();

    // Step 3: Verify first iframe
    await iframe.verifyContentIframe();

    // Step 4: Enter text inside second iframe
    await iframe.enterTextInIframe();

    // Step 5: Submit form
    await iframe.submitIframeForm();

    console.log('Iframe testing completed successfully');

});
