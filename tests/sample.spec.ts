
import { test, expect } from '@playwright/test';

test('Verify all More dropdown options', async ({ page }) => {

    // Step 1: Open Flipkart
    await page.goto('https://www.flipkart.com/');

    console.log('Flipkart homepage opened');

    // Step 2: Handle login popup
    const closeButton = page.getByText('✕', { exact: true });

    if (await closeButton.isVisible()) {
        await closeButton.click();
        console.log('Login popup closed');
    } else {
        console.log('Login popup not displayed');
    }

    // Step 3: Hover on More
    const More = page.getByTitle('More');

    await expect(More).toBeVisible();
    await More.hover();

    console.log('More dropdown opened');

    // Step 4: Store all dropdown options
    const optionNames = [
        'Notification Preferences',
        '24x7 Customer Care',
        'Advertise',
        'Download App'
    ];

    // Step 5: Verify and select each option
    for (const optionName of optionNames) {

        await More.hover();

        const option = page.getByText(optionName, { exact: true });

        // Verify option visibility
        await expect(option).toBeVisible();

        console.log(optionName + ' is visible');

        // Select option
        await option.click();

        console.log(optionName + ' clicked');

        // Verify navigation
        await expect(page).not.toHaveURL('https://www.flipkart.com/');

        console.log(optionName + ' navigation verified');

        // Return to homepage
        await page.goto('https://www.flipkart.com/');

        // Handle login popup again
        if (await closeButton.isVisible()) {
            await closeButton.click();
            console.log('Login popup closed');
        }
    }

    console.log('All More dropdown options verified successfully');

});
