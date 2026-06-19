import {test as base} from '@playwright/test';
import {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutPage,
  CheckoutOverviewPage,
  CheckoutCompletePage,
} from '../pages';
import {USERS} from './test-data';

/**
 * Custom fixtures: every page object is instantiated lazily and injected
 * into the test, so specs read as plain business steps with no `new` noise.
 *
 * `loginAsStandardUser` additionally performs an authenticated login and
 * returns the InventoryPage, ready for catalog/cart/checkout scenarios.
 */
type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  loginAsStandardUser: InventoryPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({page}, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({page}, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({page}, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({page}, use) => {
    await use(new CheckoutPage(page));
  },
  checkoutOverviewPage: async ({page}, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  checkoutCompletePage: async ({page}, use) => {
    await use(new CheckoutCompletePage(page));
  },

  loginAsStandardUser: async ({loginPage, inventoryPage}, use) => {
    await loginPage.open();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  },
});

export {expect} from '@playwright/test';
