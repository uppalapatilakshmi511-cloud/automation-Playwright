
import { test, expect } from '@playwright/test';

import { IndexedDBPage } from './Pages/indexedDBPage';

test('Verify multiple products in IndexedDB', async ({ page }) => {

    const indexedDBPage = new IndexedDBPage(page);

    await page.goto('https://www.saucedemo.com/');

    // Step 1: Add multiple products
    await indexedDBPage.addProducts();

    console.log('Multiple products added successfully');

    // Step 2: Get all products
    const products = await indexedDBPage.getAllProducts() as { name: string; price: number }[];

    console.log('All Products:', products);

    // Step 3: Verify product count
    expect(products).toHaveLength(4);

    // Step 4: Verify product names
    expect(products[0].name).toBe('Laptop');

    expect(products[1].name).toBe('Mobile');

    expect(products[2].name).toBe('Headphones');

    expect(products[3].name).toBe('Keyboard');

    // Step 5: Verify product price
    expect(products[0].price).toBe(50000);

    // Step 6: Delete product
    await indexedDBPage.deleteProduct(2);

    // Step 7: Verify deleted product
    const updatedProducts = await indexedDBPage.getAllProducts();

    console.log('Products after deletion:', updatedProducts);

    expect(updatedProducts).toHaveLength(3);

});
