
import { Page, expect } from '@playwright/test';

export class IframePage {

    constructor(private page: Page) { }

    // Open website
    async openWebsite() {

        await this.page.goto(
            'https://playground.qajourney.net/iframes/'
        );
    }

    // Verify parent page title
    async verifyPageTitle() {

        await expect(this.page).toHaveTitle(/iFrame Interaction/i);
    }

    // Verify first iframe
    async verifyContentIframe() {

        const frame = this.page.frameLocator(
            '[data-testid="content-iframe"]'
        );

        await expect(frame.locator('body')).toBeVisible();

        console.log('Content iframe verified');
    }

    // Enter text inside second iframe
    async enterTextInIframe() {

        const frame = this.page.frameLocator(
            '[data-testid="form-iframe"]'
        );

        const input = frame.locator(
            '[data-testid="iframe-input"]'
        );

        await input.fill('Hello Lakshmi');

        await expect(input).toHaveValue('Hello Lakshmi');

        console.log('Text entered successfully');
    }

    // Submit form inside iframe
    async submitIframeForm() {

        const frame = this.page.frameLocator(
            '[data-testid="form-iframe"]'
        );

        await frame.getByRole('button', {
            name: 'Submit'
        }).click();

        console.log('Submit button clicked');
    }
}
