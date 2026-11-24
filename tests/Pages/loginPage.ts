
import { Page, expect } from '@playwright/test';

export class LoginPage {

    page: Page;

    mobileNumberInput;
    
    constructor(page: Page) {

        this.page = page;

        // Mobile number locator
        this.mobileNumberInput = this.page.locator('//input[id="1"]');
    }

    // Open Flipkart homepage
    async openHomePage() {

        await this.page.goto('https://www.flipkart.com/');

        console.log('Homepage opened');
    }

    // Click Login button
    async clickLogin() {

        await this.page.getByTitle('Login').click();

        await expect(this.mobileNumberInput).toBeVisible();
    }

    // Enter mobile number
    async fillMobileNumber(mobileNumber: string) {

        await expect(this.mobileNumberInput).toBeVisible();

        await this.mobileNumberInput.fill(mobileNumber);
    }

    // Complete mobile number entry
    async enterMobileNumber(mobileNumber: string) {

        await this.clickLogin();

        await this.fillMobileNumber(mobileNumber);

        console.log('Mobile number entered successfully');
    }

    // Manual OTP verification
    async enterOtpManually() {

        console.log('Please enter OTP manually');

        //await this.page.pause();

        console.log('Manual OTP verification completed');
    }
}
