
import { Page, expect } from '@playwright/test';

export class MoreDropdownPage {

    constructor(private page: Page) {}

    // Step 1: Open Flipkart
    async openFlipkart() {

        await this.page.goto('https://www.flipkart.com/');

        console.log('Flipkart homepage opened');
    }

    // Step 2: Handle login popup
    async closeLoginPopup() {

        const closeButton = this.page.locator('span._30XB9F');

        if (await closeButton.isVisible()) {

            await closeButton.click();

            console.log('Login popup closed');

        } else {

            console.log('Login popup not displayed');
        }
    }

    // Step 3: Hover on More
    async hoverMore() {

        const more = this.page.getByRole('link', {
            name: 'More',
            exact: true
        });

        await expect(more).toBeVisible();

        await more.hover();

        console.log('Hovered on More');
    }

    // Step 4: Select and verify dropdown option
    async selectDropdownOption(optionName: string) {

        console.log('Selecting: ' + optionName);

        const option = this.page.getByRole('link', {
            name: optionName,
            exact: true
        });

        // Verify option visibility
        await expect(option).toBeVisible();

        console.log(optionName + ' is visible');

        // Check whether link opens in a new tab
        const target = await option.getAttribute('target');

        if (target === '_blank') {

            const [newPage] = await Promise.all([

                this.page.waitForEvent('popup'),

                option.click()

            ]);

            // Verify destination page has content
            await expect(newPage.locator('body')).not.toBeEmpty();

            console.log(optionName + ' opened in new tab');

            await newPage.close();

        } else {

            // Click option in same tab
            await option.click();

            // Verify destination page has content
            await expect(this.page.locator('body')).not.toBeEmpty();

            console.log(optionName + ' page opened successfully');
        }

        // Return to Flipkart homepage
        await this.openFlipkart();

        // Handle login popup again
        await this.closeLoginPopup();
    }

    // Step 5: Verify all dropdown options
    async verifyAllDropdownOptions() {

        const optionNames = [

            'Become a Seller',
            'Notification Preferences',
            '24x7 Customer Care 24x7',
            'Advertise',
            'Download App'

        ];

        for (const optionName of optionNames) {

            await this.hoverMore();

            await this.selectDropdownOption(optionName);
        }

        console.log('All dropdown options checked successfully');
    }
}
