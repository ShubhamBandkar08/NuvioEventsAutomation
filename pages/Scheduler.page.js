import { schedularData } from "../data/scheduler.data";

export class SchedulerPage {
    constructor(page) {
        this.page = page;
        this.SchduleBuDropdown = this.page.getByLabel('Business Unit', { exact: true });
        this.schduleProductDropDown = this.page.getByRole('combobox', { name: 'Product' });
        this.schduleAddNewButton = this.page.getByRole('button', { name: 'Add Product' });
        this.SchdulerLink = this.page.getByRole('link', { name: 'Scheduler', exact: true });
        this.schdulingLink = this.page.getByRole('button', { name: 'Scheduling' });
        this.AddProductBuDropDown = this.page.getByRole('combobox').filter({ hasText: 'Select Business Unit' });
        this.addProductSalesChannelDropDown = this.page.getByRole('combobox').filter({ hasText: 'Select Sale Channel' });
        this.addProductDropDown = this.page.getByRole('combobox').filter({ hasText: 'Select a product' });
        this.nextButton = this.page.getByRole('button', { name: 'Next' });
        this.addDateRangeButton = this.page.getByRole('button', { name: 'Add Date Range' });
        this.previousMonthButton = this.page.getByRole('button', { name: 'Go to the Previous Month' });
        this.nextMonthButton = this.page.getByRole('button', { name: 'Go to the Next Month' });
        this.reviewDetailBox = this.page.getByRole('dialog');
        this.addProductButton = this.reviewDetailBox.getByRole('button', { name: 'Add Product' });

    }




    async openSchedulerPage() {
        await this.schdulingLink.click();
        await this.page.waitForTimeout(2000);
        await this.SchdulerLink.click();
        await this.page.waitForTimeout(2000);
        await this.schduleAddNewButton.click();
    }


    async selectDays(days) {
        if (!days || days.length === 0) return;
        for (const day of days) {
            await this.page.getByText(day, { exact: true }).click();
            await this.page.waitForTimeout(500);
        }
    }

    async selectBusinessUnit(businessUnitName) {
        await this.AddProductBuDropDown.click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('option', { name: new RegExp(`^${businessUnitName}$`) }).click()
        await this.page.waitForTimeout(2000);
    }

    async selectProduct(productName) {
        await this.addProductDropDown.click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('option', { name: new RegExp(`^${productName}$`) }).click()
        await this.page.waitForTimeout(2000);
    }

    async selectSalesChannel(salesChannelName) {
        await this.addProductSalesChannelDropDown.click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('option', { name: new RegExp(`^${salesChannelName}$`) }).click()
        await this.page.waitForTimeout(2000);
    }


    async selectDateRange(startDay, endDay, monthYear) {
        // Navigate to the correct month
        // We use a loop that clicks next until the specific month header is visible
        while (!(await this.page.getByText(monthYear).isVisible())) {
            await this.nextMonthButton.click();
            await this.page.waitForTimeout(2000); // Wait for animation
        }

        // Parse format "March 2026" -> Month Index and Year
        const [monthName, year] = monthYear.split(' ');
        const monthMap = {
            "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6,
            "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
        };
        const monthIndex = monthMap[monthName];

        if (!monthIndex) {
            throw new Error(`Invalid month name: ${monthName}`);
        }

        // Construct unique data-day selectors. 
        // Note: The DOM shows format "M/D/YYYY" (e.g. "3/1/2026"). 
        // We assume startDay/endDay inputs like "1" or "9" match the DOM format (no leading zeros usually for single digits in this specific lib, but we use the input directly).
        const startDataDay = `${monthIndex}/${startDay}/${year}`;
        const endDataDay = `${monthIndex}/${endDay}/${year}`;

        // Click the specific dates
        // Click the specific dates
        // Scope to the month grid to avoid strict mode violations (e.g. preview dates in next/prev month)
        const monthGrid = this.page.getByRole('grid', { name: monthName });
        await monthGrid.locator(`button[data-day="${startDataDay}"]`).click();
        await this.page.waitForTimeout(2000);
        await monthGrid.locator(`button[data-day="${endDataDay}"]`).click();
    }

    async scheduleProduct(SchedulerData) {
        await this.selectBusinessUnit(SchedulerData.SchedulerBu);
        await this.selectProduct(SchedulerData.ScheduleProduct);
        await this.selectSalesChannel(SchedulerData.ScheduleSalesChannel);
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('button', { name: 'Deselect All' }).first().click();
        await this.page.waitForTimeout(2000);
        await this.selectDays(SchedulerData.DayByWeeks);
        await this.page.waitForTimeout(2000);
        await this.nextButton.click();
        await this.page.waitForTimeout(2000);
        await this.addDateRangeButton.click();
        await this.page.waitForTimeout(2000);
        await this.selectDateRange(SchedulerData.StartDay, SchedulerData.EndDay, SchedulerData.MonthYear);
        await this.page.waitForTimeout(2000);
        await this.addProductButton.click();
        await this.page.waitForTimeout(2000);

    }
}
