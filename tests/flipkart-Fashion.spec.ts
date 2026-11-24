import { test, expect, Page } from '@playwright/test';

// Handle Flipkart login popup
async function handlePopups(page: Page) {
  const closeButton = page.getByText('✕', {
    exact: true
  });

  if (await closeButton.isVisible().catch(() => false)) {
    await closeButton.click();
  }
}

test('Flipkart Fashion and Add to Cart', async ({ page }) => {

  // 1. Open Flipkart
  await page.goto('https://www.flipkart.com/');
  await expect(page).toHaveURL(/flipkart/);

  // 2. Handle login popup
  await handlePopups(page);

  // 3. Click Fashion
  const fashion = page.getByRole('link', {
    name: 'Fashion',
    exact: true
  });

  await expect(fashion).toBeVisible();
  await fashion.click();

  // 4. Handle login popup if it appears
  await handlePopups(page);

  // 5. Click the big milion deals  Image link
  const imageLinks = page.getByRole('link', {
    name: 'Image',
    exact: true
  });

  await expect(imageLinks.nth(1)).toBeVisible();
  await imageLinks.nth(1).click({ timeout: 15000 });

  // 6. Handle popup
  await handlePopups(page);

  // 7. Click the Sports shoes third Image link
  await expect(imageLinks.nth(2)).toBeVisible();
  await imageLinks.nth(2).click({ timeout: 15000 });

  // 8. Open a new popup/tab
  const popupPromise = page.waitForEvent('popup');

  await page.getByRole('link')
    .filter({ hasText: /^$/ })
    .nth(1)
    .click();

  const page1 = await popupPromise;
  await page1.waitForLoadState('domcontentloaded');

  // 9. Verify new page
  await expect(page1).toHaveURL(/flipkart/i);

  // 10. Handle login popup in new page
  await handlePopups(page1);

  // 11. Click on the selected shoe Image link
  const productImages = page1.getByRole('link', {
    name: 'Image',
    exact: true
  });

  await expect(productImages.nth(4)).toBeVisible();
  await productImages.nth(4).click({ timeout: 15000 });

  // 12. Select size 9 if available
  const size9 = page1.getByRole('link', {
    name: '9',
    exact: true
  });

  if (await size9.isVisible().catch(() => false)) {
    await size9.click();
  }

  // 13. Select colour if an actual colour option is available

  const colourOption = page1.getByRole('button', {
    name: /black|blue|white|red/i
  }).first();

  if (await colourOption.isVisible().catch(() => false)) {
    await colourOption.click();
  }

  // 14. Handle popup before adding to cart
  await handlePopups(page1);

  // 15. Click Add to Cart
  const addToCart = page1.getByText('Add to cart', {
    exact: true
  });

  await expect(addToCart).toBeVisible({
    timeout: 15000
  });

  await expect(addToCart).toBeEnabled();
  await addToCart.click();
  

  // 16. Verify the cart action using a cart-related confirmation
  const cartConfirmation = page1.getByText(
    /added to cart|go to cart|item added/i
  ).first();

  const cartButton = page1.getByText('Cart', {
    exact: true
  }).first();

  // Flipkart may show a confirmation or navigate/update the cart.
  await expect.poll(async () => {
    const confirmationVisible =
      await cartConfirmation.isVisible().catch(() => false);

    const cartVisible =
      await cartButton.isVisible().catch(() => false);

    const url = page1.url();

    return confirmationVisible || cartVisible || /viewcart/i.test(url);
  }, {
    timeout: 15000
  }).toBe(true);

  // 17. Navigate to the cart
  await page1.goto('https://www.flipkart.com/viewcart');

  // 18. Verify Cart page
  await expect(page1).toHaveURL(/viewcart/i);
  await expect(page1.locator('body')).toBeVisible();

  // 19. Verify the product in the cart
  const productInCart = page1.getByText(
    /PUMA Zod Runner V3 IDP Sneakers For Men/i
  ).first();
  await handlePopups(page1);

  await expect(productInCart).toBeVisible({
    timeout: 20000
  });

  console.log('Product successfully verified in the cart.');
});


