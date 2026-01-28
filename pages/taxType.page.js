import { BusinessUnitPage } from "./businessUnit.page";


export class TaxTypePage {
    constructor(page) {
        this.page = page;   
        this.taxTypeLink = this.page.getByRole('link', { name: 'Tax Types' });
        this.entityManagementButton = this.page.getByRole('button', { name: 'Entity Management' });
        this.addnewtaxTypeButton = this.page.getByRole('button', { name: 'Add New' });
        this.searchField = this.page.getByRole('textbox', { name: 'Search Tax Types' });
        this.taxTypeNameField = this.page.getByLabel('Tax Name *'); 
        this.taxTypeCodeField = this.page.getByRole('textbox', { name: 'Tax Code *' });
        this.taxPercentageField = this.page.getByRole('textbox', { name: 'Value *' });
        this.activeToggle = this.page.getByRole('switch');
        this.saveButton = this.page.getByRole('button', { name: 'Create' });
    }

async openTaxTypePage() {
    await this.entityManagementButton.click();
    await this.page.waitForTimeout(2000);
    await this.taxTypeLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.taxTypeLink.click();
}   
async isTaxTypeExists(taxTypeName) {
    await this.searchField.fill(taxTypeName);
    await this.page.waitForTimeout(5000);
    return (await this.page.locator(`text=/^${taxTypeName}$/`).count()) > 0;


}
    async CreateTaxType(data) {
        await this.openTaxTypePage();

        const exists = await this.isTaxTypeExists(data.taxTypeName);

        if (!exists) {
            await this.addnewtaxTypeButton.click();
            await this.page.waitForTimeout(2000);
            await this.taxTypeNameField.fill(data.taxTypeName);
            await this.page.waitForTimeout(2000);
            await this.taxTypeCodeField.fill(data.taxCode);
            await this.page.waitForTimeout(2000);
            await this.taxPercentageField.fill(data.taxPercentage);
            await this.page.waitForTimeout(2000);
            await this.activeToggle.click();
            await this.saveButton.click();
        }

    }
}
