
import { test, expect } from './Fixtures/baseFixtures';
import { ChainLocatorPage } from './Pages/chainLocatorPage';

test('Chain Locator Testing', async ({ page }) => {

    const chainPage = new ChainLocatorPage(page);

    await page.goto('https://www.flipkart.com/');

    // Parent to Child
    const productName = await chainPage.getProductName();

    await expect(productName).toBeVisible();

    console.log('Parent to Child locator verified');

    // Sibling relationship
    const price = await chainPage.getPriceUsingProductName('iPhone 16');

    await expect(price).toBeVisible();

    console.log('Sibling relationship verified');

    // Add particular product to cart
    await chainPage.addProductToCart('iPhone 16');

    console.log('Product added to cart successfully');

    // Child to Parent
    const parent = await chainPage.getProductParent('iPhone 16');

    await expect(parent).toBeVisible();

    console.log('Child to Parent locator verified');

});
