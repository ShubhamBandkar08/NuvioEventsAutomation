export class DesignationPage {
    constructor(page) {
        this.page = page;
        this.masterLink = page.getByRole('button', { name: 'Masters' });
        this.designationLink = page.getByRole('link', { name: 'Designations' });
        this.AddNewButton = page.getByRole('button', { name: 'Add New' });
        this.SearchField = page.getByRole('textbox', { name: 'Search Designations' });
        this.designationNameField = page.getByRole('textbox', { name: 'Name *' });
        this.designationDescriptionField = page.getByRole('textbox', { name: 'Description' });
        this.activeToggle = page.getByRole('switch');
        this.createButton = page.getByRole('button', { name: 'Create' });
    }

    async openDesignationPage() {
        await this.masterLink.click();
        await this.designationLink.click();
    }

    async isDesignationExists(name) {
        await this.SearchField.fill(name);
        return (await this.page.locator(`text=/^${name}$/`).count()) > 0;
    }

    async createDesignation(data) {
        await this.openDesignationPage();

        const exists = await this.isDesignationExists(data.designationName);
        if (exists) {
            console.log(`Designation "${data.designationName}" already exists.`);
            return;
        }

        await this.AddNewButton.click();
        await this.designationNameField.fill(data.designationName);
        await this.designationDescriptionField.fill(data.designationDescription);
        await this.activeToggle.click();
        await this.createButton.click();
    }
}
