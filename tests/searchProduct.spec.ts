// import { test, expect } from './Fixtures/baseFixtures';
// import { loginData } from '../Test-data/login-Data';
// import { SearchData as searchData } from '../Test-data/searchData';

// test('Login and search for product', async ({
//   page,
//   loginPage,
//   searchProductPage
// }) => {
//   test.setTimeout(300000);

//   // Step 1: Open Flipkart
//   await loginPage.openHomePage();

//   // Step 2: Click Login
//   await loginPage.clickLogin();

//   // Step 3: Enter mobile number and click Continue
//   await loginPage.enterMobileNumber(loginData.mobileNumber);

//   // Step 4: Enter OTP manually and click Verify
//   await loginPage.enterOtpManually();

//   // Step 5: Verify login
//   await loginPage.verifyLogin();

//   // Step 6: Search for product
//   await searchProductPage.searchProduct(searchData.productName[0]);

//   // Step 7: Verify search results
//   await expect(page).toHaveURL(/search/i);

//   await expect(
//     page.getByRole('link', {
//       name: searchData.productName[0],
//       exact: false
//     }).first()
//   ).toBeVisible();
// });