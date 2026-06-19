import {test, expect} from '../../fixtures/fixtures';
import {PRODUCTS} from '../../fixtures/test-data';

test.describe('Shopping cart', () => {
  test('[CART-01] added products appear in the cart @smoke', async ({
    loginAsStandardUser: inventory,
    cartPage,
  }) => {
    await inventory.addToCart(PRODUCTS.backpack);
    await inventory.addToCart(PRODUCTS.fleeceJacket);
    await inventory.goToCart();

    await cartPage.expectLoaded();
    expect(await cartPage.itemCount()).toBe(2);
    await cartPage.expectContains(PRODUCTS.backpack);
    await cartPage.expectContains(PRODUCTS.fleeceJacket);
  });

  test('[CART-02] continue shopping returns to the catalog @regression', async ({
    loginAsStandardUser: inventory,
    cartPage,
  }) => {
    await inventory.addToCart(PRODUCTS.bikeLight);
    await inventory.goToCart();
    await cartPage.expectLoaded();

    await cartPage.continueShoppingButton.click();
    await inventory.expectLoaded();
  });
});
