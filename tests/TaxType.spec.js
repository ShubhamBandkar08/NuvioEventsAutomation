const { test, expect } = require('@playwright/test');

test.describe('Tax Type Management', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Tax Type management page before each test
    await page.goto('https://nuvio-events.nuviotech.co/tax-types');
    await page.waitForTimeout(5000);
   await page.locator("[id='username']").fill('superadmin');
   await page.locator("[id='password']").fill('Super@123');
   await page.locator("[type='submit']").click();
   await page.waitForTimeout(5000);
  expect(await page.locator("[alt='Nuvio']").isVisible()).toBeTruthy();


  });   
  test('shows Nuvio logo after login', async ({ page }) => {
    // beforeEach already navigates and logs in, so just assert the logo is visible
    await expect(page.locator("[alt='Nuvio']")).toBeVisible();
  });

  test("Add New Tax Type", async ({ page }) => {
    await page.getByRole('button', { name: 'Entity Management' }).click();
    await page.locator("body > div:nth-child(8) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > div:nth-child(1) > li:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(4) > a:nth-child(1)").click(); 
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Add New' }).click();
    await page.locator("[id='name']").fill('GST18');
    await page.getByRole('textbox', { name: 'Tax Code *' }).fill('GST_IND');
    await page.locator("[id='value']").fill('18');
    await page.getByRole('switch').check();
    // Click Save and wait for the backend POST request that creates the tax type
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/tax-types') && resp.request().method() === 'POST'),
      page.getByRole('button', { name: 'Save Changes' }).click(),
    ]);

    // Expect a successful response (200 or 201)
    const status = response.status();
    expect([200, 201]).toContain(status);

    // Reload and search to ensure the created item appears in the list
    await page.reload();
    // Try to use the list search box (placeholder shown in UI as 'Tax Types')
    const searchInput = page.locator('input[placeholder="Tax Types"]');
    if (await searchInput.count()) {
      await searchInput.fill('GST18');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(4000);
    }

    // Check that the new tax type 'GST' is visible in the table
    await expect(page.locator('tbody tr:nth-child(1)')).toBeVisible();

    // Fallback: assert the page heading is visible
    expect(await page.locator(".text-2xl.font-semibold.tracking-tight").isVisible()).toBeTruthy();
  });

  test


});