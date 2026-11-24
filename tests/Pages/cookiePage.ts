
import { BrowserContext } from '@playwright/test';

export class CookiesPage {

    constructor(private context: BrowserContext) {}

    // Add cookie
    async addCookie(name: string, value: string) {

        await this.context.addCookies([
            {
                name: name,
                value: value,
                domain: 'www.saucedemo.com',
                path: '/'
            }
        ]);

    }

    // Get cookies
    async getCookies() {

        return await this.context.cookies();

    }

    // Clear cookies
    async clearCookies() {

        await this.context.clearCookies();

    }

}
