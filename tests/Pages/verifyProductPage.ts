import { Page, expect } from '@playwright/test';

export class VerifyProductPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyProductInCart(productName: string) {
    console.log(`Verifying product: ${productName}`);

    // Open cart page
    await this.page.goto('https://www.flipkart.com/viewcart');

    console.log('Cart page opened for product verification');

    // Wait for cart page
    await this.page.waitForTimeout(3000);

    // Search using the product name provided in test data
    const product = this.page.getByText(productName, {
      exact: false
    }).first();

    await expect(product).toBeVisible({
      timeout: 30000
    });

    console.log(`Product verified successfully: ${productName}`);
  }
}