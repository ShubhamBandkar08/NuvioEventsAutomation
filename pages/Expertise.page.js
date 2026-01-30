export class ExpertisePage {
    constructor(page) {
        this.page = page;
        this.expertiseLink = this.page.getByRole('link', { name: 'Expertise' });
        this.mastersButton = this.page.getByRole('button', { name: 'Masters' });
        this.expertiseSearch = this.page.getByRole('textbox', { name: 'Search Expertises' });
        this.addExpertiseButton = this.page.getByRole('button', { name: 'Add New' });
        this.expertiseNameField = this.page.getByRole('textbox', { name: 'Name *' });
        this.expertiseDescriptionField = this.page.getByRole('textbox', { name: 'Description' });
        this.expertiseActiveToggle = this.page.getByRole('switch');
        this.expertiseCreateButton = this.page.getByRole('button', { name: 'Create' });
    }

    async openExpertisePage() {
        await this.mastersButton.click();
        await this.page.waitForTimeout(2000);
        await this.expertiseLink.click();
        await this.page.waitForTimeout(2000);
    }

    async isExpertiseExists(data) {
        await this.expertiseSearch.fill(data.expertiseName);
        return (await this.page.locator(`text=/^${data.expertiseName}$/`).count()) > 0;
    }

    async addNewExpertise(data) {
        await this.openExpertisePage();

        const exists = await this.isExpertiseExists(data); // 
        if (exists) {
            console.log(`Expertise "${data.expertiseName}" already exists.`);
            return;
        }

        await this.addExpertiseButton.click();
        await this.expertiseNameField.fill(data.expertiseName);
        await this.expertiseDescriptionField.fill(data.expertiseDescription);
        await this.expertiseActiveToggle.click();
        await this.expertiseCreateButton.click();
    }
}
