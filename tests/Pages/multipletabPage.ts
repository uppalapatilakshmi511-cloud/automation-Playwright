import { Page, BrowserContext, expect } from '@playwright/test';

export class MultipletabPage {

    context: BrowserContext;
    page1: Page;
    page2!: Page;
    page3!: Page;
    page4!: Page;

    constructor(context: BrowserContext, page: Page) {
        this.context = context;
        this.page1 = page;
    }

    // Open Google
    async openGoogle() {
        try {
            await this.page1.goto('https://www.google.com');

            console.log('Google opened successfully');
        }
        catch (error) {
            console.log('Google opening failed:', error);
            throw error;
        }
    }

    // Open YouTube
    async openYouTube() {
        try {
            this.page2 = await this.context.newPage();

            await this.page2.goto('https://www.youtube.com');

            console.log('YouTube opened successfully');
        }
        catch (error) {
            console.log('YouTube opening failed:', error);
            throw error;
        }
    }

    // Open Amazon
    async openAmazon() {
        try {
            this.page3 = await this.context.newPage();

            await this.page3.goto('https://www.amazon.in');

            console.log('Amazon opened successfully');
        }
        catch (error) {
            console.log('Amazon opening failed:', error);
            throw error;
        }
    }

    // Open Myntra
    async openMyntra() {
        try {
            this.page4 = await this.context.newPage();

            await this.page4.goto('https://www.myntra.com');

            console.log('Myntra opened successfully');
        }
        catch (error) {
            console.log('Myntra opening failed:', error);
            throw error;
        }
    }

    // Verify all tabs
    async verifyTabs() {
        try {
            await expect(this.page1).toHaveTitle(/Google/);
            console.log('Google title verified');

            await expect(this.page2).toHaveTitle(/YouTube/);
            console.log('YouTube title verified');

            await expect(this.page3).toHaveTitle(/Amazon/);
            console.log('Amazon title verified');

            await expect(this.page4).toHaveTitle(/Myntra/);
            console.log('Myntra title verified');
        }
        catch (error) {
            console.log('Tab verification failed:', error);
            throw error;
        }
    }

    // Switch between tabs
    async switchTabs() {
        try {
            await this.page1.bringToFront();
            console.log('Switched to Google');

            await this.page2.bringToFront();
            console.log('Switched to YouTube');

            await this.page3.bringToFront();
            console.log('Switched to Amazon');

            await this.page4.bringToFront();
            console.log('Switched to Myntra');
        }
        catch (error) {
            console.log('Tab switching failed:', error);
            throw error;
        }
    }

    // Close all tabs individually
    async closeTabs() {
        try {
            await this.page1.close();
            console.log('Google tab closed');

            await this.page2.close();
            console.log('YouTube tab closed');

            await this.page3.close();
            console.log('Amazon tab closed');

            await this.page4.close();
            console.log('Myntra tab closed');
        }
        catch (error) {
            console.log('Closing tabs failed:', error);
            throw error;
        }
    }
}