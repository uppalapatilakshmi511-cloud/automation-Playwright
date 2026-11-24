
import { Page, expect } from '@playwright/test';

// Search page module: searches for products, verifies results, and opens a product page.
export class SearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private getProductResult(productName: string) {
    return this.page.locator('a[href*="/p/"]:visible').filter({
      hasText: productName
    }).first();
  }

  // Navigates to the Flipkart home page.
  async openHomePage() {
    await this.page.goto('https://www.flipkart.com/');

    console.log('Flipkart home page opened');
  }

  // Submits a product query and waits for a matching product result.
  async searchProduct(productName: string) {
    const searchUrl = new URL('/search', this.page.url());
    searchUrl.searchParams.set('q', productName);
    await this.page.goto(searchUrl.toString());

    await expect(this.getProductResult(productName)).toBeVisible({
      timeout: 20000
    });

    console.log('Search submitted:', productName);
  }

  // Confirms that a matching product link is visible in the results.
  async verifySearchResult(productName: string) {
    await expect(this.getProductResult(productName)).toBeVisible({
      timeout: 20000
    });

    console.log('Product search results are visible');
    console.log('Searched product:', productName);
  }

  // Opens the first matching result in a new product page.
  async selectProduct(productName: string): Promise<Page> {
    const product = this.getProductResult(productName);

    await expect(product).toBeVisible({
      timeout: 20000
    });

    console.log('Product search verified:', productName);

    const productPagePromise = this.page.waitForEvent('popup');
    await product.click();
    const productPage = await productPagePromise;

    await expect(productPage).toHaveURL(/\/p\//, {
      timeout: 30000
    });

    console.log('Product selected:', productName);
    console.log('Product page opened successfully');

    return productPage;
  }
}
