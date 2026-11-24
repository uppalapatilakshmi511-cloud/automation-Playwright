
import { test, expect } from '@playwright/test';
import { SessionStoragePage } from './Pages/sessionStorage';

test('Verify Session Storage', async ({ page }) => {

    const sessionStoragePage = new SessionStoragePage(page);

    await page.goto('https://www.saucedemo.com/');

    // Store data
    await sessionStoragePage.setSessionStorage(
        'email',
        'lakshmi@gmail.com'
    );

    // Get data
    const email =
        await sessionStoragePage.getSessionStorage('email');

    console.log('Email:', email);

    // Verify data
    expect(email).toBe('lakshmi@gmail.com');

    // Remove data
    await sessionStoragePage.removeSessionStorage('email');

    // Verify removed data
    expect(
        await sessionStoragePage.getSessionStorage('email')
    ).toBeNull();

});
