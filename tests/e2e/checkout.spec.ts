import {test, expect} from '../../fixtures/fixtures';
import {PRODUCTS, CHECKOUT_INFO, ERRORS} from '../../fixtures/test-data';

test.describe('Checkout flow', () => {
  test('[CHK-01] full purchase: login → catalog → cart → checkout → confirmation @smoke', async ({
    loginAsStandardUser: inventory,
    cartPage,
    checkoutPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    // Catalog: add two items.
    await inventory.addToCart(PRODUCTS.backpack);
    await inventory.addToCart(PRODUCTS.boltTShirt);
    expect(await inventory.cartCount()).toBe(2);

    // Cart: verify contents.
    await inventory.goToCart();
    await cartPage.expectLoaded();
    expect(await cartPage.itemCount()).toBe(2);
    await cartPage.checkout();

    // Checkout: fill buyer information.
    await checkoutPage.fillInformation(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode,
    );

    // Overview: place the order. (Totals arithmetic is covered by its own
    // atomic test below, so this journey only asserts the flow completes.)
    await checkoutOverviewPage.expectLoaded();
    await checkoutOverviewPage.finish();

    // Confirmation.
    await checkoutCompletePage.expectOrderComplete();
  });

  test('[CHK-02] checkout overview totals add up (item total + tax = total) @regression', async ({
    loginAsStandardUser: inventory,
    cartPage,
    checkoutPage,
    checkoutOverviewPage,
  }) => {
    // Arrange: reach the overview with two items.
    await inventory.addToCart(PRODUCTS.backpack);
    await inventory.addToCart(PRODUCTS.boltTShirt);
    await inventory.goToCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode,
    );
    await checkoutOverviewPage.expectLoaded();

    // Assert: the single fact this test owns — the grand total is consistent.
    const itemTotal = await checkoutOverviewPage.itemTotal();
    const tax = await checkoutOverviewPage.tax();
    expect(Number((itemTotal + tax).toFixed(2))).toBe(await checkoutOverviewPage.total());
  });

  test('[CHK-03] checkout requires a first name @regression', async ({
    loginAsStandardUser: inventory,
    cartPage,
    checkoutPage,
  }) => {
    await inventory.addToCart(PRODUCTS.backpack);
    await inventory.goToCart();
    await cartPage.checkout();

    await checkoutPage.fillInformation('', CHECKOUT_INFO.lastName, CHECKOUT_INFO.postalCode);
    await checkoutPage.expectError(ERRORS.missingFirstName);
  });

  test('[CHK-04] checkout requires a postal code @regression', async ({
    loginAsStandardUser: inventory,
    cartPage,
    checkoutPage,
  }) => {
    await inventory.addToCart(PRODUCTS.backpack);
    await inventory.goToCart();
    await cartPage.checkout();

    await checkoutPage.fillInformation(CHECKOUT_INFO.firstName, CHECKOUT_INFO.lastName, '');
    await checkoutPage.expectError(ERRORS.missingPostalCode);
  });
});
