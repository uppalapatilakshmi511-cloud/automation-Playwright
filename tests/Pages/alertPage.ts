
import { Page, expect } from '@playwright/test';

export class AlertPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Open JavaScript Alerts website
    async openAlertPage() {
        await this.page.goto(
            'https://the-internet.herokuapp.com/javascript_alerts'
        );

        console.log('JavaScript Alerts page opened');
    }

    // Scenario 1: JS Alert - Click OK
    async handleJsAlert() {
        console.log('Handling JS Alert');

        const dialogPromise = this.page.waitForEvent('dialog').then(async (dialog) => {
            console.log('Alert type:', dialog.type());
            console.log('Alert message:', dialog.message());

            await dialog.accept();

            console.log('JS Alert accepted');
        });

        await this.page.getByRole('button', {
            name: 'Click for JS Alert'
        }).click();

        await dialogPromise;
    }

    // Scenario 2: JS Confirm - Click OK
    async handleJsConfirm() {
        console.log('Handling JS Confirm');

        const dialogPromise = this.page.waitForEvent('dialog').then(async (dialog) => {
            console.log('Confirm type:', dialog.type());
            console.log('Confirm message:', dialog.message());

            await dialog.accept();

            console.log('JS Confirm accepted');
        });

        await this.page.getByRole('button', {
            name: 'Click for JS Confirm'
        }).click();

        await dialogPromise;
    }

    // Scenario 3: JS Confirm - Click Cancel
    async handleJsConfirmCancel() {
        console.log('Handling JS Confirm Cancel');

        const dialogPromise = this.page.waitForEvent('dialog').then(async (dialog) => {
            console.log('Confirm type:', dialog.type());

            await dialog.dismiss();

            console.log('JS Confirm cancelled');
        });

        await this.page.getByRole('button', {
            name: 'Click for JS Confirm'
        }).click();

        await dialogPromise;
    }

    // Scenario 4: JS Prompt - Enter text and click OK
    async handleJsPrompt() {
        console.log('Handling JS Prompt');

        const dialogPromise = this.page.waitForEvent('dialog').then(async (dialog) => {
            console.log('Prompt type:', dialog.type());
            console.log('Prompt message:', dialog.message());

            await dialog.accept('Hello Lakshmi');

            console.log('Text entered in JS Prompt');
        });

        await this.page.getByRole('button', {
            name: 'Click for JS Prompt'
        }).click();

        await dialogPromise;
    }

    // Scenario 5: JS Prompt - Click Cancel
    async handleJsPromptCancel() {
        console.log('Handling JS Prompt Cancel');

        const dialogPromise = this.page.waitForEvent('dialog').then(async (dialog) => {
            console.log('Prompt type:', dialog.type());
            console.log('Prompt message:', dialog.message());

            await dialog.dismiss();

            console.log('JS Prompt cancelled');
        });

        await this.page.getByRole('button', {
            name: 'Click for JS Prompt'
        }).click();

        await dialogPromise;
    }

    // Verify result displayed on webpage
    async verifyResult(expectedResult: string) {
        const resultText = this.page.locator('#result');

        await expect(resultText).toHaveText(expectedResult);

        console.log('Expected result verified:', expectedResult);
    }
}
