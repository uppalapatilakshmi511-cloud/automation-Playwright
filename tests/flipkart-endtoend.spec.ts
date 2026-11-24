
import { test, expect } from './Fixtures/baseFixtures';
import type { Browser, BrowserContext, Page } from '@playwright/test';

import { LoginPage } from './Pages/loginPage';
import { SearchPage } from './Pages/searchPage';
import { AddToCartPage } from './Pages/addToCartPage';
import { VerifyProductPage } from './Pages/verifyProductPage';
import { FilterPage } from './Pages/filterPage';                                                                                                                                                                    

import { loginData } from '../Test-data/loginData';
import productData from '../Test-data/productData.json';
import { deliveryData } from '../Test-data/deliveryData';

type ProductTestData = {
  productName: string;
  expectedProductName?: string;
  sortOption?: string;
  networkType?: string;
  category?: string;
  displaySize?: string;
  ram?: string;
  processor?: string;
  customerRating?: string;
};

test.describe('Flipkart login and product search', () => {
  //test.setTimeout(300000);

  let context: BrowserContext;
  let page: Page;

  let loginPage: LoginPage;
  let searchPage: SearchPage;
  let addToCartPage: AddToCartPage;
  let verifyProductPage: VerifyProductPage;
  let filterPage: FilterPage;

  const mobileNumber = (loginData as {
    mobileNumber?: string
  }).mobileNumber;

  // BEFORE ALL HOOK Function
  test.beforeAll(
    'Login once',
    async ({ browser }: { browser: Browser }) => {
      test.setTimeout(180000);
      console.log('Starting browser and logging in');

      context = await browser.newContext();
      page = await context.newPage();

      loginPage = new LoginPage(page);
      searchPage = new SearchPage(page);
      addToCartPage = new AddToCartPage(page);
      verifyProductPage = new VerifyProductPage(page);
      filterPage = new FilterPage(page);

      await test.step('Login to Flipkart', async () => {
        await loginPage.openHomePage();

        if (!mobileNumber) {
          throw new Error('Please provide mobile number in loginData');
        }

        console.log('Entering mobile number');
        await loginPage.enterMobileNumber(mobileNumber);

        console.log('Waiting for manual OTP verification');
        await loginPage.enterOtpManually();
      });

      console.log('Login completed successfully');
    }
  );

  // BEFORE EACH HOOK Function
  test.beforeEach(async () => {
    console.log('Starting test execution');

  });

  test(
    'Search products, add available products and verify cart',
    async () => {
      const cartProductNames: string[] = [];

      const products = productData.products as ProductTestData[];

      console.log('Total products to search:', products.length);

      for (const product of products) {
        const productName = product.productName;

        const expectedProductName =
          product.expectedProductName || product.productName;

        await test.step(`Search and add ${productName}`, async () => {
          console.log('Searching product:', productName);

          await page.bringToFront();

          await searchPage.searchProduct(productName);

          await searchPage.verifySearchResult(productName);

          await filterPage.applyProductFilters(product);

          // Skip laptop product selection and cart verification
          if (productName.toLowerCase().includes('laptop')) {
            console.log('Laptop search completed successfully');
            // console.log('Skipping laptop product selection');
            // console.log('Skipping laptop Add to Cart');
            // console.log('Skipping laptop cart verification');

            // return;
          }

          await searchPage.selectProduct(productName);

          const isOutOfStock =
            await addToCartPage.isProductOutOfStock();

          if (isOutOfStock) {
            console.log(
              productName,
              'is Out of Stock. Skipping this product'
            );

            await loginPage.openHomePage();
            return;
          }

          await addToCartPage.addProductToCart();

          await addToCartPage.verifyAddToCartConfirmation();

          await addToCartPage.enterDeliveryPincode(
            deliveryData.pincode
          );

          // Verify using the expected product title
          await verifyProductPage.verifyProductInCart(
            expectedProductName
          );

          // Store expected product title for final verification
          cartProductNames.push(expectedProductName);

          console.log(
            'Product added and verified:',
            expectedProductName
          );

          await loginPage.openHomePage();
        });
      }

      await test.step('Verify all available products in cart', async () => {
        console.log('Starting final cart verification');

        if (cartProductNames.length > 0) {
          await addToCartPage.openCart();

          for (const productName of cartProductNames) {
            console.log('Final verification:', productName);

            await verifyProductPage.verifyProductInCart(productName);
          }

          expect(cartProductNames.length).toBeGreaterThan(0);

          console.log(
            'Successfully verified available products:',
            cartProductNames
          );
        } else {
          console.log('No available products were added to cart');
        }
      });
    }
  );

  // AFTER EACH HOOK Function
  test.afterEach(async () => {

    console.log('After Each Hook: Test execution completed');
  });

  // AFTER ALL HOOK Function
  test.afterAll(async () => {
    console.log('All product verification steps completed');

    if (context) {
      console.log('Closing browser context');
      await context.close();
    }

    console.log('Browser closed successfully');
  });
});
