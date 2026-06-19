import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * Login page object — {@link https://www.saucedemo.com/}.
 */
export class LoginPage extends BasePage {
  protected readonly path = '/';

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  /**
   * @param page - The Playwright page this object operates on.
   */
  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Fill the credentials and submit the login form.
   *
   * @param username - The username to authenticate with.
   * @param password - The password to authenticate with.
   * @returns A promise that resolves once the form is submitted.
   *
   * @remarks
   * Does not assert success — on valid credentials the app navigates to the
   * inventory page; on invalid ones an error banner is shown. Assert the
   * outcome from the test or via {@link expectError}.
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Assert the login error banner is visible and contains the given text.
   *
   * @param message - Substring expected within the error banner.
   * @returns A promise that resolves when both assertions pass.
   */
  async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}
