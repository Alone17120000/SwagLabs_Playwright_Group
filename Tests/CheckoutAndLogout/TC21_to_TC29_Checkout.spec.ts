import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
});

test('TC21 - Checkout Empty Information', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.click('[data-test="continue"]');
  const error = page.locator('[data-test="error"]');
  await expect(error).toContainText('Error: First Name is required');
});

test('TC22 - Checkout Complete Order', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'Khoa');
  await page.fill('[data-test="lastName"]', 'Pham');
  await page.fill('[data-test="postalCode"]', '700000');
  await page.click('[data-test="continue"]');
  await page.click('[data-test="finish"]');
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

test('TC23 - Missing Last Name', async ({ page }) => {
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'Khoa');
  await page.fill('[data-test="postalCode"]', '700000');
  await page.click('[data-test="continue"]');
  await expect(page.locator('[data-test="error"]')).toContainText('Error: Last Name is required');
});

test('TC24 - Missing Postal Code', async ({ page }) => {
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'Khoa');
  await page.fill('[data-test="lastName"]', 'Pham');
  await page.click('[data-test="continue"]');
  await expect(page.locator('[data-test="error"]')).toContainText('Error: Postal Code is required');
});

test('TC25 - Cancel at Step One', async ({ page }) => {
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.click('[data-test="cancel"]');
  await expect(page).toHaveURL(/cart.html/);
});

test('TC26 - Cancel at Step Two', async ({ page }) => {
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'Khoa');
  await page.fill('[data-test="lastName"]', 'Pham');
  await page.fill('[data-test="postalCode"]', '700000');
  await page.click('[data-test="continue"]');
  await page.click('[data-test="cancel"]');
  await expect(page).toHaveURL(/inventory.html/);
});

test('TC27 - Verify Item Name in Overview', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'Khoa');
  await page.fill('[data-test="lastName"]', 'Pham');
  await page.fill('[data-test="postalCode"]', '700000');
  await page.click('[data-test="continue"]');
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
});

test('TC28 - Verify Total Price', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-onesie"]');
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'Khoa');
  await page.fill('[data-test="lastName"]', 'Pham');
  await page.fill('[data-test="postalCode"]', '700000');
  await page.click('[data-test="continue"]');
  await expect(page.locator('.summary_total_label')).toContainText('Total: $8.63');
});

test('TC29 - Logout from Cart', async ({ page }) => {
  await page.click('.shopping_cart_link');
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});