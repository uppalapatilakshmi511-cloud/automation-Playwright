
import { Page } from '@playwright/test';

export class LocalStoragePage {

    constructor(private page: Page) {}

    async setLocalStorage(key: string, value: string) {

        await this.page.evaluate(({ key, value }) => {

            localStorage.setItem(key, value);

        }, { key, value });

    }

    async getLocalStorage(key: string) {

        return await this.page.evaluate((key) => {

            return localStorage.getItem(key);

        }, key);

    }

    async removeLocalStorage(key: string) {

        await this.page.evaluate((key) => {

            localStorage.removeItem(key);

        }, key);

    }
}
