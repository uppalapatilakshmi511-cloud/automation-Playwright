// import { test } from './Fixtures/baseFixtures';
// import { loginData } from '../Test-data/login-Data';
// import { SearchData } from '../Test-data/searchData';

// // Cart workflow module: reuses login and first-product data to exercise the cart flow.
// // This cart test uses the first shared search term as its product.
// const productName = SearchData.productNames[0];

// test.describe('Flipkart Cart Tests', () => {
//   test('Open Flipkart once, log in, and verify the product in cart', async ({
//     loginPage,
//     searchProductPage,
//     addToCartPage,
//     verifyProductPage
//   }) => {
//     test.setTimeout(240000);

//     await test.step('Open Flipkart', async () => {
//       await loginPage.openHomePage();
//     });

//     await test.step('Log in with the mobile number and OTP', async () => {
//       await loginPage.clickLogin();
//       await loginPage.enterMobileNumber(loginData.mobileNumber);
//       await loginPage.enterOtpManually();
//       await loginPage.verifyLogin();
//     });

//     await test.step('Search for and open the product', async () => {
//       await searchProductPage.searchProduct(productName);
//       await searchProductPage.selectProduct(productName);
//     });

//     await test.step('Add the product to the cart and verify it', async () => {
//       await addToCartPage.addProductToCart();
//       await addToCartPage.openCart();
//       await verifyProductPage.verifyProductInCart(productName);
//     });
//   });
// });
