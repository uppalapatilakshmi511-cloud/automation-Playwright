
// import { test } from './Fixtures/baseFixtures';
// import { loginData } from '../Test-data/login-Data';
// import { SearchData } from '../Test-data/searchData';
// import { AddToCartPage } from './Pages/addToCartPage';

// test.describe('Flipkart Add to Cart Tests', () => {

//   // Open Flipkart before the test
//   test.beforeEach(async ({ loginPage }) => {
//     console.log('Starting Add to Cart Test');

//     console.log('Open Flipkart');
//     await loginPage.openHomePage();

//     console.log('Flipkart opened');
//   });

//   // Main test
//   test('Login, search product and add to cart', async ({
//     loginPage,
//     searchProductPage
//   }) => {
//     test.setTimeout(300000);

//     // Step 1: Login
//     console.log('Step 1: Click Login');
//     await loginPage.clickLogin();

//     console.log('Step 2: Enter mobile number');
//     await loginPage.enterMobileNumber(loginData.mobileNumber);

//     console.log('Step 3: Enter OTP manually');
//     await loginPage.enterOtpManually();

//     console.log('Step 4: Verify login');
//     await loginPage.verifyLogin();

//     console.log('Login completed');

//     // Step 2: Search product
//     const productName =
//       'Samsung Galaxy S25 5G Snapdragon (Silver Shadow, 128 GB)';

//     console.log('Step 5: Search product:', SearchData.productName[0]);

//     await searchProductPage.searchProduct(
//       SearchData.productName[0]
//     );

//     await searchProductPage.verifySearchResult(
//       SearchData.productName[0]
//     );

//     console.log('Product search completed');

//     // Step 3: Select product and capture its tab
//     console.log('Step 6: Select product:', productName);

//     const productPage = await searchProductPage.selectProduct(
//       productName
//     );

//     console.log('Product page opened successfully');

//     // Step 4: Add product to cart
//     const addToCartPage = new AddToCartPage(productPage);

//     console.log('Step 7: Add product to cart');
//     await addToCartPage.addProductToCart();

//     console.log('Product added to cart successfully');
//   });

//   // Runs after the test
//   test.afterEach(async () => {
//     console.log('Add to Cart test finished');
//   });
// });
