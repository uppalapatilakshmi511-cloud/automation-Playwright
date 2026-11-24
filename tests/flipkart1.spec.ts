import { test, expect } from './Fixtures/baseFixtures';

// Scenario 1: Verify Flipkart homepage
test('Scenario 1 - Verify Flipkart homepage', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');

  await expect(page).toHaveURL(/flipkart\.com/);
  const searchBox = page.getByRole('textbox', {
    name: 'Search for Products, Brands',
  
  });
  await expect(searchBox).toBeVisible();
  await expect(searchBox).toBeEditable();
});

// Scenario 2: Verify Login option
test('Scenario 2 - Verify Login option', async ({ loginPage }) => {
  await loginPage.openHomePage();
  await loginPage.clickLogin();
 // await loginPage.fillMobileNumber('1234567898');
});

// Scenario 3: Search for a product
test('Scenario 3 - Search for a product', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');

 const searchBox = page.getByRole('textbox', {
    name: 'Search for Products, Brands',
  });

  await expect(searchBox).toBeVisible();

  await searchBox.fill('iPhone 17 Pro Max');
  await searchBox.press('Enter');

  await expect(page).toHaveURL(/search/);
});

// Scenario 4: Verify search results page
test('Scenario 4 - Verify search results', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');

  const searchBox = page.getByRole('textbox', {
    name: 'Search for Products, Brands',
  });

  await searchBox.fill('iPhone 17 Pro Max');
  await searchBox.press('Enter');

  await expect(page).toHaveURL(/search/, {
    timeout: 15000
  });

  // Verify that the search page displays the searched product name.
  await expect(
    page.getByText(/iPhone 17 Pro Max/i).first()
  ).toBeVisible({
    timeout: 15000
  });
});

// Scenario 5: Verify search box accepts text
test('Scenario 5 - Verify product search input', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  const searchBox = page.getByRole('textbox', {
    name: 'Search for Products, Brands',
  });

  await searchBox.fill('iPhone');

  await expect(searchBox).toHaveValue('iPhone');
  await expect(searchBox).toBeEditable();
});
