const { test, expect } = require('@playwright/test');

test.describe('Location Management', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Location management page before each test    
    await page.goto('https://nuvio-events.nuviotech.co/locations');
    await page.waitForTimeout(5000);
   await page.locator("[id='username']").fill('superadmin');
    await page.locator("[id='password']").fill('Super@123');
    await page.locator("[type='submit']").click();
    await page.waitForTimeout(5000);
    expect(await page.locator("[alt='Nuvio']").isVisible()).toBeTruthy();
  });

  test(' Creates a New Location', async ({ page }) => {
    test.setTimeout(60000);
    await page.getByRole('button', { name: 'Entity Management' }).click();
    await page.locator("body > div:nth-child(8) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > div:nth-child(1) > li:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)").click(); 
    await page.waitForTimeout(3000);
   await page.getByRole('button', { name: 'Add New' }).click();
    await page.locator("[id='name']").fill('New York');
    await page.getByRole('textbox', { name: 'Code *' }).fill('NYC001');
   await  page.getByRole('combobox').filter({ hasText: 'Select a business unit' }).click();

   await page.getByLabel('At The Top').getByText('At The Top').click();
   await page.waitForTimeout(2000);
   await page.getByRole('combobox').filter({ hasText: 'Select a country' }).click();
   await page.getByPlaceholder('Search country...').click();
    await page.getByPlaceholder('Search country...').fill('INDIA');
    await page.keyboard.press('Enter');
   await page.getByRole('combobox').filter({ hasText: 'Select a city' }).click();
    await page.getByPlaceholder('Search city...').click();
    await page.getByPlaceholder('Search city...').fill('mumbai');
    await page.keyboard.press('Enter');
    await page.getByRole('combobox').filter({ hasText: 'Select a timezone' }).click();
    await page.getByPlaceholder('Search timezone...').click();
    await page.getByPlaceholder('Search timezone...').fill('Asia/Kolkata');
    await page.keyboard.press('Enter');
    await page.getByRole('switch').click();

});

});
