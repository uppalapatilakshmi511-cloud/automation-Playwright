
import { Page, BrowserContext, expect } from '@playwright/test';

export class MultipleWindowsPage {

    page: Page;
    context: BrowserContext;
    amazonPage!: Page;

    constructor(page: Page) {
        this.page = page;
        this.context = page.context();
    }

    // Open Google Parent Window
    async openGoogle() {
        await this.page.goto('https://www.google.com');
        console.log('Google Parent Window Opened');
    }

    // Open Amazon in Child Window
    async openAmazon() {
        this.amazonPage = await this.context.newPage();

        await this.amazonPage.goto('https://www.amazon.in');

        console.log('Amazon Child Window Opened');
    }

    // Verify Amazon
    async verifyAmazon() {
        await expect(this.amazonPage).toHaveURL(/amazon.in/);
        console.log('Amazon Page Verified');
    }

    // Switch to Amazon
    async switchToAmazon() {
        await this.amazonPage.bringToFront();
        console.log('Switched to Amazon Window');
    }

    // Close Amazon
    async closeAmazon() {
        await this.amazonPage.close();
        console.log('Amazon Window Closed');
    }

    // Switch back to Google
    async switchToGoogle() {
        await this.page.bringToFront();
        console.log('Switched Back to Google Window');
    }
}
