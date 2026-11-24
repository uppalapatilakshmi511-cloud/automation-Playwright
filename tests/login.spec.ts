
// import { test, expect } from './Fixtures/baseFixtures';
// import { loginData } from '../Test-data/login-Data';

// test.describe('Flipkart Login Tests', () => {
//   test(' verify Login Module ', async ({ loginPage }) => {
//     test.setTimeout(180000);

//     await test.step('Open Flipkart and Login ', async () => {
//       await loginPage.goto();
//       await expect(loginPage.page).toHaveURL(/flipkart\.com/);
//     });
                                                                                                                                                      
//     await test.step('Verify the Login button is visible', async () => {
//       await expect(loginPage.loginbutton).toBeVisible();
//     });

//     await test.step('Request OTP and verify the OTP screen', async () => {
//       await loginPage.clickLogin();
//       await loginPage.enterMobileNumber(loginData.mobileNumber);
//       await loginPage.enterOtpManually();
//     });

//     console.log('OTP Verified sucessfully.');
//   });
// });
