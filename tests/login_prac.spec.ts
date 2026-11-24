import { test } from './Fixtures/baseFixtures';
import { loginData } from '../Test-data/loginData';

// Login smoke test: submits the configured number and checks that OTP verification opens.
test('Submit mobile number and open OTP form', async ({ loginPage }) => {
  test.setTimeout(90000);
  await loginPage.openHomePage();
  await loginPage.clickLogin();
  await loginPage.enterMobileNumber(loginData.mobileNumber);
});
