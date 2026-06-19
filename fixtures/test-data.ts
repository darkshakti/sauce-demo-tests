/**
 * Central test data for the SauceDemo suite.
 * SauceDemo exposes several well-known accounts and a fixed catalog,
 * so we keep them here instead of scattering literals across specs.
 */

export const USERS = {
  standard: {username: 'standard_user', password: 'secret_sauce'},
  lockedOut: {username: 'locked_out_user', password: 'secret_sauce'},
  problem: {username: 'problem_user', password: 'secret_sauce'},
  performanceGlitch: {username: 'performance_glitch_user', password: 'secret_sauce'},
  invalid: {username: 'no_such_user', password: 'wrong_password'},
} as const;

export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redTShirt: 'Test.allTheThings() T-Shirt (Red)',
} as const;

export const CHECKOUT_INFO = {
  firstName: 'Margarita',
  lastName: 'QA',
  postalCode: '12345',
} as const;

export const ERRORS = {
  lockedOut: 'Sorry, this user has been locked out.',
  invalidCredentials: 'Username and password do not match any user in this service',
  missingUsername: 'Username is required',
  missingPassword: 'Password is required',
  missingFirstName: 'First Name is required',
  missingPostalCode: 'Postal Code is required',
} as const;
