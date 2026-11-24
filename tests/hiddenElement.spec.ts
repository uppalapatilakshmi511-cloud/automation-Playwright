
import { test, expect } from '@playwright/test';

test('Verify hidden element', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    // Locate hidden text
    const hiddenText = page.locator('#finish');

    // Verify element is hidden
    await expect(hiddenText).toBeHidden();

    console.log('Element is hidden');

    // Click Start button
    await page.getByRole('button', { name: 'Start' }).click();

    // Verify element becomes visible
    await expect(hiddenText).toBeVisible();

    console.log('Element is visible');

    // Verify text
    await expect(hiddenText).toHaveText('Hello World!');

});
