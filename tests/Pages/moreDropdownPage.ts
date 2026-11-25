
import { Page, Locator, expect } from '@playwright/test';

export class MoreDropdownPage {

    readonly page: Page;
    readonly moreOption: Locator;
    readonly sellerOption: Locator;

    constructor(page: Page) {

        this.page = page;

        this.moreOption = page.getByText('More', {
            exact: true
        });

        this.sellerOption = page.getByRole('link', {
            name: 'Become a Seller',
            exact: true
        });
    }

    async openFlipkart() {

        await this.page.goto('https://www.flipkart.com/');

        console.log('Flipkart homepage opened');

        await this.page.waitForLoadState('domcontentloaded');

        // Close login popup if displayed
        const closeButton = this.page.getByRole('button', {
            name: /close/i
        });

        if (await closeButton.isVisible().catch(() => false)) {
            await closeButton.click();
            console.log('Login popup closed');
        }
    }

    async verifyMoreVisible() {

        await expect(this.moreOption.first()).toBeVisible();

        console.log('More option is visible');
    }

    async hoverOnMore() {

        await this.moreOption.first().hover();

        console.log('Hovered on More');
    }

    async verifyBecomeSeller() {

        await expect(this.sellerOption).toBeVisible();

        console.log('Become a Seller option is visible');

        await expect(this.sellerOption).toBeEnabled();

        console.log('Become a Seller option is enabled');
    }

    async clickBecomeSeller() {

        await this.sellerOption.click();

        console.log('Clicked Become a Seller');
    }
}
