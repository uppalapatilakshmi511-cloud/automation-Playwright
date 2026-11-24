import { test, expect } from '@playwright/test';

// Scenario 6: Search for an invalid product
test('Scenario 6 - Search for invalid product', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');

  const searchBox = page.getByRole('textbox', {
    name: 'Search for Products, Brands'
  });

  await expect(searchBox).toBeVisible();

  await searchBox.fill('xyzproduct987654321');
  await expect(searchBox).toHaveValue('xyzproduct987654321');

  await searchBox.press('Enter');

  await expect(page).toHaveURL(/search/, {
    timeout: 20000
  });
});

// Scenario 7: Verify processor search
test('Scenario 7 - Verify processor search', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');

  const searchBox = page.getByRole('textbox', {
    name: 'Search for Products, Brands'
  });

  await expect(searchBox).toBeVisible();

  await searchBox.fill('MacBook Pro M1 Pro');
  await expect(searchBox).toHaveValue('MacBook Pro M1 Pro');

  await searchBox.press('Enter');

  await expect(page).toHaveURL(/search/, {
    timeout: 20000
  });

  // Verify that the results page displays MacBook-related content.
  await expect(
    page.getByText(/MacBook/i).first()
  ).toBeVisible({
    timeout: 20000
  });
});

// Scenario 8: Verify sorting option
test('Scenario 8 - Verify sorting option', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');

  const searchBox = page.getByRole('textbox', {
    name: 'Search for Products, Brands'
  });

  await expect(searchBox).toBeVisible();

  await searchBox.fill('Laptop');
  await searchBox.press('Enter');

  await expect(page).toHaveURL(/search/, {
    timeout: 20000
  });

  const sortOption = page.getByText(
    /Price.*Low to High/i
  ).first();

  await expect(sortOption).toBeVisible({
    timeout: 20000
  });

  await sortOption.click();
});

// Scenario 9: Verify product filters
test('Scenario 9 - Verify product filters', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');

  const searchBox = page.getByRole('textbox', {
    name: 'Search for Products, Brands'
  });

  await expect(searchBox).toBeVisible();

  await searchBox.fill('iPhone 17 Pro');
  await searchBox.press('Enter');

  await expect(page).toHaveURL(/search/, {
    timeout: 20000
  });

  // Verify that the Brand filter is displayed.
  await expect(
    page.getByText('Brand', { exact: true }).first()
  ).toBeVisible({
    timeout: 20000
  });
});

// Scenario 10: Verify cart option
test('Scenario 10 - Verify cart option', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');

  const cart = page.getByText('Cart', {
    exact: true
  }).first();

  await expect(cart).toBeVisible();
});
