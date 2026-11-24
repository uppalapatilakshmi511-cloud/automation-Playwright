
import { test, expect } from '@playwright/test';

test('Types of Waits in Playwright', async ({ page }) => {

    // Step 1: Open website
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    // 1. waitForLoadState()
    await page.waitForLoadState('domcontentloaded');

    console.log('1. DOM Loaded');

    // 2. Auto-waiting
    await page.getByRole('button', { name: 'Start' }).click();

    console.log('2. Start button clicked');

    // 3. locator.waitFor()
    const loadingText = page.locator('#loading');

    await loadingText.waitFor({
        state: 'visible'
    });

    console.log('3. Loading text is visible');

    // 4. waitForSelector()
    await page.waitForSelector('#loading', {
        state: 'hidden'
    });

    console.log('4. Loading completed');

    // 5. waitFor()
    const helloText = page.locator('#finish h4');

    await helloText.waitFor({
        state: 'visible'
    });

    console.log('5. Hello text is visible');

    // 6. waitForFunction()
    await expect(helloText).toHaveText('Hello World!');

    console.log('6. JavaScript condition completed');

    // 7. waitForTimeout()
    await page.waitForTimeout(1000);

    console.log('7. Fixed wait completed');

    // 8. Web-first assertion (auto-retrying)
    await expect(helloText).toBeVisible();

    console.log('8. Assertion passed');

});
