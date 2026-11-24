
import { Page, Locator, expect } from '@playwright/test';

export class ChainLocatorPage {

    readonly page: Page;
    readonly productCard: Locator;

    constructor(page: Page) {

        this.page = page;

        // Parent locator
        this.productCard = page.locator('.product-card');
    }

    // Parent to Child
    async getProductName() {

        return this.productCard.first().locator('h2');
    }

    // Find product price
    async getProductPrice() {

        return this.productCard.first().locator('p');
    }

    // Find Add to Cart button inside a particular product
    async addProductToCart(productName: string) {

        const product = this.productCard.filter({
            hasText: productName
        });

        await product.getByRole('button', {
            name: 'Add to Cart'
        }).click();
    }

    // Child to Parent
    async getProductParent(productName: string) {

        const product = this.page.getByRole('heading', {
            name: productName
        });

        return product.locator('..');
    }

    // Sibling relationship through common parent
    async getPriceUsingProductName(productName: string) {

        const product = this.page.locator('.product-card')
            .filter({ hasText: productName });

        return product.locator('p');
    }
}
