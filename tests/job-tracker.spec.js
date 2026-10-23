const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.removeItem('applyboard.jobs'));
  await page.reload();
});

test('shows the sample application pipeline and summary', async ({ page }) => {
  await expect(page.getByText('Northstar Studio')).toBeVisible();
  await expect(page.getByText('Cedar Labs')).toBeVisible();
  await expect(page.locator('#total')).toHaveText('4');
  await expect(page.locator('#interviews')).toHaveText('1');
});

test('adds an application and saves it across reloads', async ({ page }) => {
  await page.getByRole('button', { name: /add application/i }).click();
  await page.getByPlaceholder('Software Engineer').fill('Platform Engineer');
  await page.getByPlaceholder('Company name').fill('Juniper Works');
  await page.locator('select[name="status"]').selectOption('Applied');
  await page.getByRole('button', { name: 'Save application' }).click();
  await expect(page.getByText('Juniper Works')).toBeVisible();
  await page.reload();
  await expect(page.getByText('Juniper Works')).toBeVisible();
});

test('search filters applications', async ({ page }) => {
  await page.getByPlaceholder('Search roles or companies…').fill('Cedar');
  await expect(page.getByText('Cedar Labs')).toBeVisible();
  await expect(page.getByText('Northstar Studio')).toHaveCount(0);
});

test('edits and deletes an application', async ({ page }) => {
  const card = page.locator('.job').filter({ hasText: 'Cedar Labs' });
  await card.getByRole('button', { name: 'Edit' }).click();
  await page.getByPlaceholder('Software Engineer').fill('Senior Backend Engineer');
  await page.getByRole('button', { name: 'Save application' }).click();
  await expect(page.getByText('Senior Backend Engineer')).toBeVisible();
  await page.locator('.job').filter({ hasText: 'Cedar Labs' }).getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Cedar Labs')).toHaveCount(0);
});

test('supports a narrow mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('button', { name: /add application/i })).toBeVisible();
  await expect(page.locator('.board')).toBeVisible();
});
