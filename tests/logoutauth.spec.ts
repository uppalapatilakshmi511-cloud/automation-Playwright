
import { test, expect } from '@playwright/test';

test('Verify logout functionality', async ({ page }) => {

    // Open logged-in page
    await page.goto(
        'https://practicetestautomation.com/logged-in-successfully/'
    );

    // Click logout
    await page.getByRole('link', {
        name: 'Log out'
    }).click();

    // Verify logout
    await expect(page).toHaveURL(
        /practice-test-login/
    );

    console.log('Logout successful');

});
