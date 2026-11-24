
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {

    page: Page;
    username: Locator;
    password: Locator;
    submitButton: Locator;
    successMessage: Locator;
    logoutButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.username = page.getByLabel('Username');

        this.password = page.getByLabel('Password');

        this.submitButton = page.locator('#submit');

        this.successMessage = page.getByText(
            'Congratulations student. You successfully logged in!'
        );

        this.logoutButton = page.getByRole('link', {
            name: 'Log out'
        });
    }

    async openLoginPage() {

        await this.page.goto(
            'https://practicetestautomation.com/practice-test-login/'
        );
    }

    async enterCredentials(username: string, password: string) {

        await this.username.fill(username);

        await this.password.fill(password);
    }

    async clickSubmit() {

        await this.submitButton.click();
    }

    async verifySuccessfulLogin() {

        await expect(this.page).toHaveURL(
            /logged-in-successfully/
        );

        await expect(this.successMessage).toBeVisible();

        await expect(this.logoutButton).toBeVisible();
    }

    async logout() {

        await this.logoutButton.click();
    }
}
