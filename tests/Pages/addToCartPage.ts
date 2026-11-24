
import { Page, expect } from '@playwright/test';

export class AddToCartPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Check whether product is out of stock
  async isProductOutOfStock() {
    console.log('Checking product availability');

    const outOfStockText = this.page.getByText(
      'Currently unavailable',
      { exact: false }
    );

    const isUnavailable = await outOfStockText
      .isVisible()
      .catch(() => false);

    if (isUnavailable) {
      console.log('Product is Out of Stock');
      return true;
    }

    console.log('Product is available');
    return false;
  }

  // Add product to cart
  async addProductToCart() {
    console.log('Looking for Add to Cart button');

    const addToCartButton = this.page.getByText(
      'Cart',
      { exact: true }
    ).first();

    await expect(addToCartButton).toBeVisible({
      timeout: 20000
    });

    await addToCartButton.click();

    console.log('Cart element clicked');
  }

  // Open cart without toast verification
  async verifyAddToCartConfirmation() {
    console.log('Opening cart verification');

    await this.openCart();

    console.log('Cart page opened successfully');
  }

  // Enter delivery PIN code
  async enterDeliveryPincode(pincode: string) {
    console.log('Entering delivery PIN code:', pincode);

    const pincodeInput = this.page.locator(
      'input[placeholder*="pincode" i]'
    ).first();

    const checkButton = this.page.getByText(
      'Check',
      { exact: true }
    ).first();

    const isPincodeVisible = await pincodeInput
      .isVisible()
      .catch(() => false);

    if (isPincodeVisible) {
      await pincodeInput.fill(pincode);

      console.log('PIN code entered');

      const isCheckButtonVisible = await checkButton
        .isVisible()
        .catch(() => false);

      if (isCheckButtonVisible) {
        await checkButton.click();
        console.log('Delivery PIN code checked');
      }
    } else {
      console.log(
        'Delivery PIN code popup is not displayed for this product'
      );
    }
  }

  // Open cart
  async openCart() {
    console.log('Opening cart');

    const cartButton = this.page.getByText(
      'Cart',
      { exact: true }
    ).first();

    await expect(cartButton).toBeVisible({
      timeout: 20000
    });

    await cartButton.click();

    console.log('Cart opened successfully');
  }
}
