
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from './Pages/loginauthPage';

const authFile = 'playwright/.auth/user.json';

setup('Login and save authentication', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // Step 1: Open login page
    await loginPage.openLoginPage();

    // Step 2: Enter valid credentials
    await loginPage.enterCredentials(
        'student',
        'Password123'
    );

    // Step 3: Click Submit
    await loginPage.clickSubmit();

    // Step 4: Verify successful login
    await loginPage.verifySuccessfulLogin();

    // Step 5: Save authentication state(login data sved )
    await page.context().storageState({
        path: authFile
    });

    console.log('Authentication saved successfully');

});
