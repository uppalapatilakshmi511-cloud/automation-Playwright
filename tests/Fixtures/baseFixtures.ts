
import { test as base, expect, type Page, type BrowserContext } from '@playwright/test';

import { LoginPage } from '../Pages/loginPage';
import { SearchPage } from '../Pages/searchPage';
import { AddToCartPage } from '../Pages/addToCartPage';
import { VerifyProductPage } from '../Pages/verifyProductPage';
import { FilterPage } from '../Pages/filterPage';
import { MultipletabPage } from '../Pages/multipletabPage';
//import { authHelper } from '../utils/authHelper';
import { AuthenticationPage } from '../Pages/authenticationPage';
import { MoreDropdownPage } from '../Pages/moreDropdownPage';

type MyFixtures = {
    loginPage: LoginPage;
    searchProductPage: SearchPage;
    addToCartPage: AddToCartPage;
    filterPage: FilterPage;
    verifyProductPage: VerifyProductPage;
    multipleTabPage: MultipletabPage;
    authenticationPage: AuthenticationPage;
    moreDropdownPage: MoreDropdownPage;
};

export const test = base.extend<MyFixtures>({

    loginPage: async ({ page }, use) => {
        console.log('Creating LoginPage fixture');
        await use(new LoginPage(page));
    },

    searchProductPage: async ({ page }, use) => {
        console.log('Creating SearchPage fixture');
        await use(new SearchPage(page));
    },

    addToCartPage: async ({ page }, use) => {
        console.log('Creating AddToCartPage fixture');
        await use(new AddToCartPage(page));
    },

    verifyProductPage: async ({ page }, use) => {
        console.log('Creating VerifyProductPage fixture');
        await use(new VerifyProductPage(page));
    },

    filterPage: async ({ page }, use) => {
        console.log('Creating FilterPage fixture');
        await use(new FilterPage(page));
    },

    multipleTabPage: async ({ page, context }, use) => {
        console.log('Creating MultipletabPage fixture');
        await use(new MultipletabPage(context, page));
    },

    // authenticationPage: async ({ page }, use) => {
    //     console.log('Creating AuthenticationPage fixture');
    //     await use(new AuthenticationPage(page));
    // },

 moreDropdownPage: async ({ page }, use) => {

    console.log('Creating MoreDropdownPage fixture');

    const moreDropdownPage = new MoreDropdownPage(page);

    await use(moreDropdownPage);
},
});

export { expect };
export type { Page, BrowserContext };
