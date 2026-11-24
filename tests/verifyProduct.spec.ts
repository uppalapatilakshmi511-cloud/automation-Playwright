
// import { test } from './Fixtures/baseFixtures';
// import { loginData } from '../Test-data/login-Data';
// import { SearchData } from '../Test-data/searchData';

// const productName = SearchData.productName[0];

// test.describe('Verify Cart Product', () => {

//   // Open Flipkart before each test
//   test.beforeEach(async ({ loginPage }) => {
//     console.log('Starting Verify Cart Product');
//     console.log('Opening Flipkart');

//     await loginPage.openHomePage();

//     console.log('Flipkart opened');
//   });

//   test('Verify product is displayed in cart', async ({
//     page,
//     loginPage,
//     searchProductPage,
//     addToCartPage,
//     verifyProductPage
//   }) => {

//     test.setTimeout(300000);

//     // Step 1: Login
//     console.log('Step 1: Clicking Login');
//     await loginPage.clickLogin();

//     console.log('Step 2: Entering mobile number');
//     await loginPage.enterMobileNumber(loginData.mobileNumber);

//     console.log('Step 3: Enter OTP manually');
//     await loginPage.enterOtpManually();

//     console.log('Step 4: Verifying login');
//     await loginPage.verifyLogin();

//     console.log('Login completed successfully');

//     // Step 2: Search for the product
//     console.log('Step 5: Searching for product:', productName);
//     await searchProductPage.searchProduct(productName);

//     // Step 3: Verify search results
//     console.log('Step 6: Verifying search results');
//     await searchProductPage.verifySearchResult(productName);

//     // Step 4: Select the product and capture its page
//     console.log('Step 7: Selecting product');

//     const productPage = await searchProductPage.selectProduct(productName);

//     console.log('Product page opened successfully');

//     // Step 5: Add product to cart on the product page
//     console.log('Step 8: Adding product to cart');

//     const productCartPage = new (addToCartPage.constructor as any)(productPage);
//     await productCartPage.addProductToCart();

//     // Step 6: Open cart
//     console.log('Step 9: Opening cart');

//     await productPage.goto('https://www.flipkart.com/viewcart');

//     // Step 7: Verify product in cart
//     console.log('Step 10: Verifying product in cart');

//     const cartVerification = new (verifyProductPage.constructor as any)(productPage);
//     await cartVerification.verifyProductInCart(productName);

//     console.log('Product is displayed in cart');
//     console.log('TEST COMPLETED SUCCESSFULLY');
//   });
// });