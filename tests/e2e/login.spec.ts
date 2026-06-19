import {test} from '../../fixtures/fixtures';
import {USERS, ERRORS} from '../../fixtures/test-data';

test.describe('Authentication', () => {
  test.beforeEach(async ({loginPage}) => {
    await loginPage.open();
  });

  test('[AUTH-01] standard user logs in successfully @smoke', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectLoaded();
  });

  test('[AUTH-02] locked-out user is rejected @regression', async ({loginPage}) => {
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);
    await loginPage.expectError(ERRORS.lockedOut);
  });

  test('[AUTH-03] invalid credentials are rejected @regression', async ({loginPage}) => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);
    await loginPage.expectError(ERRORS.invalidCredentials);
  });

  test('[AUTH-04] username is required @regression', async ({loginPage}) => {
    await loginPage.login('', USERS.standard.password);
    await loginPage.expectError(ERRORS.missingUsername);
  });

  test('[AUTH-05] password is required @regression', async ({loginPage}) => {
    await loginPage.login(USERS.standard.username, '');
    await loginPage.expectError(ERRORS.missingPassword);
  });
});
