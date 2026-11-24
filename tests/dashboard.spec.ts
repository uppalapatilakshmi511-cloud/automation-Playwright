
import { test, expect } from '@playwright/test';

test('Verify dashboard using saved authentication', async ({ page }) => {

    // Open authenticated page directly
    await page.goto(
        'https://practicetestautomation.com/logged-in-successfully/'
    );

    // Verify URL
    await expect(page).toHaveURL(
        /logged-in-successfully/
    );

    // Verify success message
    await expect(
        page.getByText('Congratulations student. You successfully logged in!')
    ).toBeVisible();

    console.log('Dashboard opened using saved authentication');

});
