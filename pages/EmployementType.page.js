export class EmployementTypePage {
    constructor(page) {
        this.page = page;
        this.employementTypeLink = this.page.getByRole('link', { name: 'Employment Types' });
        this.AddNewButton = this.page.getByRole('button', { name: 'Add New' });
        this.SearchField = this.page.getByRole('textbox', { name: 'Search Employment Types' });
        this.employementTypeNameField = this.page.getByRole('textbox', { name: 'Name *' });
        this.employementTypeDescriptionField = this.page.getByRole('textbox', { name: 'Description' });
        this.activeToggle = this.page.getByRole('switch');
        this.createButton = this.page.getByRole('button', { name: 'Create' });
    }

    async openEmployementTypePage() {
        await this.employementTypeLink.click();
    }

    async isEmployementTypeExists(name) {
        await this.SearchField.fill(name);
        return (await this.page.locator(`text=/^${name}$/`).count()) > 0;
    }

    async createEmployementType(data) {
        await this.openEmployementTypePage();

        const exists = await this.isEmployementTypeExists(data.employementTypeName);
        if (exists) {
            console.log(`Employment Type "${data.employementTypeName}" already exists.`);
            return;
        }

        await this.AddNewButton.click();
        await this.page.waitForTimeout(2000);
        await this.employementTypeNameField.fill(data.employementTypeName);
        await this.page.waitForTimeout(2000);
        await this.employementTypeDescriptionField.fill(data.employementTypeDescription);
        await this.page.waitForTimeout(2000);
        await this.activeToggle.click();
        await this.page.waitForTimeout(2000);
        await this.createButton.click();
    }
}   