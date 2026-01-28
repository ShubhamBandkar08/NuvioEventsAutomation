import { time } from "console";
import { timeSlotData } from "../data/timeSlot.data";


export class ProductPage {
    constructor(page) {
        this.page = page;
        this.productsLink = this.page.getByRole('link', { name: 'Products' });
        this.seachBoxField = this.page.getByRole('textbox', { name: 'Search Products' });
        this.addNewButton = this.page.getByRole('button', { name: 'Add New' });
        this.ClickOnBUDroDown = this.page.getByRole('combobox', { name: 'Business Unit *' });
        this.locationDropdown = this.page.getByLabel('Location', { exact: true });
        this.productNameField = this.page.getByRole('textbox', { name: 'Product Name *' });
        this.shortDescriptionField = this.page.getByRole('textbox', { name: 'Short Description' });
        this.productDescriptionField = this.page.getByLabel('Description', { exact: true });
        this.BasePriceField = this.page.getByRole('combobox', { name: 'Base Price Card *' });
        this.SelectStatus = this.page.getByRole('combobox').filter({ hasText: 'Draft' });
        this.TaxInclusiveToggle = this.page.getByRole('switch');
        this.clickOnAddons = this.page.locator('span').filter({ hasText: 'Addons' }).first();
        this.addonsSearch = this.page.getByRole('textbox', { name: 'Search addons...' });
        this.ClickOnAddons = this.page.getByRole('checkbox');
        this.distributionbutton = this.page.getByRole('tab', { name: 'Distribution' });
        this.selectTimeSlot = this.page.getByText(timeSlotData.startTime.hh + ':' + timeSlotData.startTime.mm + ' - ' + timeSlotData.endTime.hh + ':' + timeSlotData.endTime.mm, { exact: true });
        //Additional Distribution Channels locators
        this.addChannelButton = this.page.getByRole('button', { name: 'Add Channel' });

        //Sales Channel Price Cards

        this.salesChanneldropDown = this.page.getByRole('combobox').filter({ hasText: 'Select sales channel' });
        this.priceDropDown = this.page.getByRole('combobox', { name: 'Select price card' });
        this.ClickAddButton = this.page.getByText('Add', { exact: true });
        // create button

        this.clickOnCreateButton = this.page.getByRole('button', { name: 'Create' });
    }

    async openProductPage() {
        await this.productsLink.click();
        await this.page.waitForTimeout(2000);
    }

    async isProductExists(productName) {
        await this.seachBoxField.fill(productName);
        await this.page.waitForTimeout(1500);
        return (await this.page.locator(`text="${productName}"`).count()) > 0;
    }

    async createProduct(data) {
        await this.openProductPage();

        if (await this.isProductExists(data.productName)) {
            console.log(`Product "${data.productName}" already exists. Skipping.`);
            return;
        }

        await this.addNewButton.click();

        // Fill basic details
        await this.productNameField.click();
        await this.page.waitForTimeout(2000);
        await this.productNameField.fill(data.productName);
        await this.page.waitForTimeout(2000);
        await this.shortDescriptionField.click();
        await this.shortDescriptionField.fill(data.productShortDescription);
        await this.page.waitForTimeout(2000);
        await this.productDescriptionField.click();
        await this.productDescriptionField.fill(data.productDescription);
        await this.page.waitForTimeout(2000);
        await this.ClickOnBUDroDown.click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('option', { name: data.ProductBusinessUnit, exact: true }).click();
        await this.page.waitForTimeout(2000);
        await this.locationDropdown.click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('option', { name: data.ProductLocation, exact: true }).click();
        await this.page.waitForTimeout(2000);
        await this.BasePriceField.click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('option', { name: data.ProductPriceCard, exact: true }).click();
        await this.page.waitForTimeout(2000);
        await this.SelectStatus.click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('option', { name: data.ProductStatus }).click();
        await this.page.waitForTimeout(2000);
        await this.TaxInclusiveToggle.click();
        await this.page.waitForTimeout(2000);
        await this.clickOnAddons.click();
        await this.page.waitForTimeout(2000);
        await this.addonsSearch.click();
        await this.page.waitForTimeout(2000);
        await this.addonsSearch.fill(data.ProductAddons);
        await this.page.waitForTimeout(2000);
        await this.ClickOnAddons.click();
        await this.page.waitForTimeout(2000);
        await this.distributionbutton.click();
        await this.selectTimeSlot.click();
        await this.page.waitForTimeout(2000);
        // await this.addChannelButton.click();
        await this.page.waitForTimeout(2000);
        await this.salesChanneldropDown.click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('option', { name: data.ProductSalesChannel }).click();
        await this.page.waitForTimeout(2000);
        //  await this.priceDropDown.click();
        //     await this.page.waitForTimeout(2000);
        // await this.page.getByRole('option', { name: data.SalesChannelPriceCard }).click();
        await this.ClickAddButton.click();
        await this.clickOnCreateButton.click();
    }
}