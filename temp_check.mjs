export class AddonsPage {
  constructor(page) {
    this.page = page;

    /* =======================
       NAVIGATION
    ======================== */
    this.productCatalogLink = page.getByText('Product Catalogue', { exact: true });
    this.addonsLink = page.getByRole('link', { name: 'Addons' });
    this.addonSearchField = page.getByRole('textbox', { name: 'Search Addons' });
    this.addNewAddonButton = page.getByRole('button', { name: 'Add New' });

    /* =======================
       ADDON FIELDS
    ======================== */
    this.addonNameField = page.getByRole('textbox', { name: 'Name *' });
    this.addonDescriptionField = page.getByRole('textbox', { name: 'Description' });
    this.addonPriceField = page.getByRole('textbox', { name: 'Price' });

    /* =======================
       DATE PICKERS (Radix popover + react-day-picker)
    ======================== */
    this.validFromDateField = page.getByRole('button', { name: /Valid From/i })
      .or(page.getByRole('combobox', { name: /Valid From/i }));
    this.validToDateField = page.getByRole('button', { name: /Valid To/i })
      .or(page.getByRole('combobox', { name: /Valid To/i }));

    /* =======================
       TIME SLOTS
    ======================== */
    this.startTimeDropdown = page.getByRole('button', { name: /Start Time/i })
      .or(page.getByRole('combobox', { name: /Start Time/i }));
    this.endTimeDropdown = page.getByRole('button', { name: /End Time/i })
      .or(page.getByRole('combobox', { name: /End Time/i }));

    /* =======================
       ACTIONS
    ======================== */
    this.createButton = page.getByRole('button', { name: 'Create' });
  }

  /* =======================
     HELPERS
  ======================== */

  async getCalendar() {
    // Wait for the navigation button to ensure calendar is open
    // This allows us to interact with the calendar without relying on specific container classes
    const nextMonthButton = this.page.getByRole('button', { name: /next month/i }).first();
    await nextMonthButton.waitFor({ state: 'visible', timeout: 5000 });
    return this.page;
  }

  async openAddonsPage() {
    await this.productCatalogLink.click();
    await this.addonsLink.waitFor({ state: 'visible' });
    await this.addonsLink.click();
  }

  async isAddonExists(addonName) {
    await this.addonSearchField.fill(addonName);
    await this.page.waitForTimeout(1500);
    return (await this.page.locator(`text="${addonName}"`).count()) > 0;
  }

  async gotoMonthYear(targetMonthYear, maxClicks = 24) {
    // Navigate months until text matches
    const monthLabel = this.page.getByRole('status').first(); // aria-live status usually holds month name
    const nextMonthButton = this.page.getByRole('button', { name: /next month/i }).first();

    for (let i = 0; i < maxClicks; i++) {
      // Handle case where status might be multiple elements or text content needs trim
      const currentMonthYear = (await monthLabel.innerText()).trim();
      if (currentMonthYear.includes(targetMonthYear)) return;

      await nextMonthButton.click();
      await this.page.waitForTimeout(200); // Small wait for animation
    }
    throw new Error(`Could not navigate to month/year: ${targetMonthYear}`);
  }

  async pickDay(day) {
    // Use visible text matching (filter hasText) instead of accessible name
    // Accessible names often include full date (e.g. "January 15th, 2026") which causes strict name match to fail
    await this.page.getByRole('button')
      .filter({ hasText: new RegExp(`^${day}$`) })
      .filter({ hasNot: this.page.locator('[disabled]') })
      .first()
      .click();
  }

  async closeCalendarOverlay() {
    // Close any open popovers/overlays (calendar, dropdowns)
    await this.page.keyboard.press('Escape').catch(() => { });
    await this.page.locator('body').click({ position: { x: 5, y: 5 } }).catch(() => { });
    await this.page.waitForTimeout(200);
  }

  /* =======================
     MAIN FLOW
  ======================== */

  async pickTime(time) {
    const [hh, mm] = time.split(':');

    // Select Hour (matches button with 'HH' exactly)
    await this.page.getByRole('button').filter({ hasText: /^HH$/ }).first().click();
    await this.page.getByRole('option', { name: hh, exact: true }).first().click();

    // Select Minute (matches button with 'MM' exactly)
    await this.page.getByRole('button').filter({ hasText: /^MM$/ }).first().click();
    await this.page.getByRole('option', { name: mm, exact: true }).first().click();
  }

  async EndTime(time) {
    await this.endTimeDropdown.click();
    await this.page.waitForTimeout(2000);
    await this.pickTime(time);
    await this.closeCalendarOverlay();
  }


  /* =======================
     MAIN FLOW
  ======================== */

  async createAddon(data) {
    await this.openAddonsPage();

    if (await this.isAddonExists(data.addonName)) {
      console.log(`Addon "${data.addonName}" already exists. Skipping.`);
      return;
    }

    await this.addNewAddonButton.click();

    // Fill basic details
    await this.addonNameField.fill(data.addonName);
    await this.addonDescriptionField.fill(data.addonDescription);
    await this.addonPriceField.fill(data.addonPrice);

    /* -------- Valid From -------- */
    await this.validFromDateField.click();
    await this.gotoMonthYear(data.validFromMonthYear);
    await this.pickDay(data.validFromDate);
    await this.closeCalendarOverlay();

    /* -------- Valid To -------- */
    // await this.validToDateField.click();
    // await this.gotoMonthYear(data.validToMonthYear);
    // await this.pickDay(data.validToDate);
    // await this.closeCalendarOverlay();

    /* -------- Start Time -------- */
    await this.startTimeDropdown.click();
    await this.pickTime(data.startTime);
    await this.closeCalendarOverlay();

    // Stability wait to ensure first popover is fully closed
    await this.page.waitForTimeout(2000);

    /* -------- End Time -------- */
    await this.endTimeDropdown.click();
    // Wait for the popover to appear (implied by pickTime's click, but safety helps)
    await this.page.waitForTimeout(2000);
    await this.pickTime(data.endTime);
    await this.closeCalendarOverlay();

    /* -------- Create -------- */
    await this.createButton.click();
  }

  // Keep the original method name used by existing tests
  async CreateAddon(data) {
    return await this.createAddon(data);
  }
}

/* Backward compatibility */
export const addonsPage = AddonsPage;
