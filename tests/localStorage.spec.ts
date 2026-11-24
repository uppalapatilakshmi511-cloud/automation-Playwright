
import { test, expect } from '@playwright/test';
import { LocalStoragePage } from './Pages/localStoragePage';

test('Verify Local Storage', async ({ page }) => {

    const localStoragePage = new LocalStoragePage(page);

    await page.goto('https://www.saucedemo.com/');

    await localStoragePage.setLocalStorage(
        'username',
        'Lakshmi'
    );

    const username =
        await localStoragePage.getLocalStorage('username');

    console.log('Username:', username);

    expect(username).toBe('Lakshmi');

});
