import { test } from './Fixtures/baseFixtures';
import { SearchData } from '../Test-data/searchData';

// Data-driven search test: each configured product is searched and verified in sequence.
test('Search for all configured products', async ({ page, loginPage, searchProductPage }) => {
  test.setTimeout(300000);
  await page.goto('https://www.flipkart.com/');
  await loginPage.closeLoginPopupIfVisible();

  for (const productName of SearchData.productNames) {
    await test.step(`Search and verify ${productName}`, async () => {
      await loginPage.closeLoginPopupIfVisible();
      await searchProductPage.searchProduct(productName);
      await searchProductPage.verifySearchResult(productName);
    });
  }
});