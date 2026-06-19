import {test, expect} from '../../fixtures/fixtures';
import {PRODUCTS} from '../../fixtures/test-data';

test.describe('Catalog / Inventory', () => {
  test('[INV-01] catalog shows all six products @smoke', async ({
    loginAsStandardUser: inventory,
  }) => {
    expect(await inventory.itemCount()).toBe(6);
  });

  test('[INV-02] adding a product updates the cart badge @smoke', async ({
    loginAsStandardUser: inventory,
  }) => {
    await inventory.addToCart(PRODUCTS.backpack);
    expect(await inventory.cartCount()).toBe(1);
  });

  test('[INV-03] removing a product decreases the cart badge @regression', async ({
    loginAsStandardUser: inventory,
  }) => {
    await inventory.addToCart(PRODUCTS.backpack);
    await inventory.addToCart(PRODUCTS.bikeLight);
    expect(await inventory.cartCount()).toBe(2);

    await inventory.removeFromCart(PRODUCTS.backpack);
    expect(await inventory.cartCount()).toBe(1);
  });

  test('[INV-04] products can be sorted by name Z→A @regression', async ({
    loginAsStandardUser: inventory,
  }) => {
    await inventory.sortBy('za');
    const names = await inventory.productNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('[INV-05] products can be sorted by price low→high @regression', async ({
    loginAsStandardUser: inventory,
  }) => {
    await inventory.sortBy('lohi');
    const prices = await inventory.productPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });
});
