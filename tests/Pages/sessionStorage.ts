
import { Page } from '@playwright/test';

export class SessionStoragePage {

    constructor(private page: Page) {}

    // Store data
    async setSessionStorage(key: string, value: string) {

        await this.page.evaluate(({ key, value }) => {

            sessionStorage.setItem(key, value);

        }, { key, value });

    }

    // Get data
    async getSessionStorage(key: string) {

        return await this.page.evaluate((key) => {

            return sessionStorage.getItem(key);

        }, key);

    }

    // Remove data
    async removeSessionStorage(key: string) {

        await this.page.evaluate((key) => {

            sessionStorage.removeItem(key);

        }, key);

    }

    // Clear all data
    async clearSessionStorage() {

        await this.page.evaluate(() => {

            sessionStorage.clear();

        });

    }
}
