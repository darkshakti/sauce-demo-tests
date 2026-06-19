import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';

/** Sort options exposed by the catalog's sort dropdown. */
export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

/**
 * Inventory / catalog page object — {@link https://www.saucedemo.com/inventory.html}.
 */
export class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';

  readonly title: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  /**
   * @param page - The Playwright page this object operates on.
   */
  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.items = page.locator('.inventory_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  /**
   * Assert that the catalog has loaded (title reads "Products" and the URL
   * points at the inventory page).
   *
   * @returns A promise that resolves when the page-identity checks pass.
   */
  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Products');
    await this.expectUrlContains('inventory.html');
  }

  /**
   * Count the products currently rendered in the catalog.
   *
   * @returns The number of product cards on the page.
   */
  async itemCount(): Promise<number> {
    return this.items.count();
  }

  /**
   * Add a product to the cart by its display name.
   *
   * @param productName - Display name of the product to add.
   * @returns A promise that resolves once the add button is clicked.
   */
  async addToCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${this.slug(productName)}"]`).click();
  }

  /**
   * Remove a product from the cart by its display name.
   *
   * @param productName - Display name of the product to remove.
   * @returns A promise that resolves once the remove button is clicked.
   */
  async removeFromCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${this.slug(productName)}"]`).click();
  }

  /**
   * Read the shopping-cart badge count.
   *
   * @returns The badge number, or `0` when the badge is absent (empty cart).
   */
  async cartCount(): Promise<number> {
    if ((await this.cartBadge.count()) === 0) return 0;
    return Number(await this.cartBadge.innerText());
  }

  /**
   * Open the shopping cart.
   *
   * @returns A promise that resolves once the cart link is clicked.
   */
  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  /**
   * Apply a sort option from the catalog's sort dropdown.
   *
   * @param option - The {@link SortOption} to apply.
   * @returns A promise that resolves once the option is selected.
   */
  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  /**
   * Read the product names in their current display order.
   *
   * @returns The product names, ordered as rendered.
   */
  async productNames(): Promise<string[]> {
    return this.itemNames.allInnerTexts();
  }

  /**
   * Read the product prices in their current display order.
   *
   * @returns The prices as numbers (currency symbol stripped), ordered as rendered.
   */
  async productPrices(): Promise<number[]> {
    const raw = await this.itemPrices.allInnerTexts();
    return raw.map((p) => Number(p.replace('$', '')));
  }

  /**
   * Convert a product display name into its `data-test` id slug.
   *
   * @param productName - Display name, e.g. `"Sauce Labs Backpack"`.
   * @returns The kebab-case slug, e.g. `"sauce-labs-backpack"`.
   */
  private slug(productName: string): string {
    return productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
}
