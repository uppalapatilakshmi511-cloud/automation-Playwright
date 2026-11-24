
import { test, expect } from '@playwright/test';
import { CookiesPage } from './Pages/cookiePage';

test('Verify Cookies', async ({ page, context }) => {

    const cookiesPage = new CookiesPage(context);

    await page.goto('https://www.saucedemo.com/');

    // Add cookie
    await cookiesPage.addCookie(
        'username',
        'Lakshmi'
    );

    // Get cookies
    const cookies = await cookiesPage.getCookies();

    console.log('Cookies:', cookies);

    // Verify cookie
    expect(
        cookies.some(cookie =>
            cookie.name === 'username' &&
            cookie.value === 'Lakshmi'
        )
    ).toBeTruthy();

    // Clear cookies
    await cookiesPage.clearCookies();

    // Verify cookies cleared
    const remainingCookies = await cookiesPage.getCookies();

    expect(remainingCookies).toHaveLength(0);

});
