import { subLocationData } from "../data/sublocation.data";

export class SubLocationPage {
    constructor(page) {
        this.page = page;
        this.entityLink = this.page.getByRole('button', { name: 'Entity Management' });
        this.subLocationLink = this.page.getByRole('link', { name: 'Sub Locations' });
        this.AddNewButton = this.page.getByRole('button', { name: 'Add New' });
        this.SearchField = this.page.getByRole('textbox', { name: 'Search Sub Locations' });
        this.locationDropdown = this.page.getByRole('combobox').filter({ hasText: 'Select a location' });
        this.subLocationNameField = this.page.getByRole('textbox', { name: 'Name *' });
        this.subLocationDescriptionField = this.page.getByRole('textbox', { name: 'Description' });
        this.subLocationCode = this.page.getByRole('textbox', { name: 'Code *' });
        this.PrimaryPhonecodeDropDown = this.page.getByRole('combobox').filter({ hasText: 'CA (+1)' });
        this.PrimaryPhoneField = this.page.getByRole('textbox', { name: 'e.g., +1 (555) 123-' });
        this.subLocationPrimaryEmailField = this.page.getByRole('textbox', { name: 'Primary Email' });
        this.subLocationRegistrationNumberField = this.page.getByRole('textbox', { name: 'Registration Number' });
        this.selectCapacityType = this.page.getByRole('radio', { name: subLocationData.subLocationCapacityType });
        this.cumulativeCapacityField = this.page.getByRole('textbox', { name: 'Cumulative Capacity *' });
        this.addClassButton = this.page.getByRole('button', { name: 'Add Class' });
        this.activeToggle = this.page.getByRole('switch');
        this.createButton = this.page.getByRole('button', { name: 'Create' });
        this.countryCodeSearchField = this.page.getByPlaceholder('Search country code...');
    }

    async openSubLocationPage() {
        // await this.entityLink.click();
        await this.page.waitForTimeout(1000);
        await this.subLocationLink.click();
    }

    async isSubLocationExists(name) {
        await this.SearchField.fill(name);
        return (await this.page.locator(`text=/^${name}$/`).count()) > 0;
    }

    async createSubLocation(subLocationData) {
        await this.openSubLocationPage();
        if (await this.isSubLocationExists(subLocationData.subLocationName)) {
            console.log(`Sub Location "${subLocationData.subLocationName}" already exists. Skipping.`);
            return;
        }
        await this.AddNewButton.click();
        await this.subLocationNameField.fill(subLocationData.subLocationName);
        await this.locationDropdown.click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('option', { name: new RegExp(`^${subLocationData.location}$`) }).click();
        await this.page.waitForTimeout(2000);
        await this.subLocationCode.fill(subLocationData.subLocationCode);
        await this.page.waitForTimeout(2000);
        await this.subLocationDescriptionField.fill(subLocationData.subLocationDescription);
        await this.page.waitForTimeout(1000);

        await this.activeToggle.click();
        await this.page.waitForTimeout(1000);

        await this.subLocationRegistrationNumberField.click();
        await this.subLocationRegistrationNumberField.fill(subLocationData.subLocationRegistrationNumber);
        await this.page.waitForTimeout(1000);
        await this.PrimaryPhonecodeDropDown.click();
        await this.page.waitForTimeout(2000);
        await this.countryCodeSearchField.fill(subLocationData.subLocationPrimaryPhoneCode);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.PrimaryPhoneField.fill(subLocationData.subLocationPrimaryPhone);
        await this.page.waitForTimeout(1000);
        await this.subLocationPrimaryEmailField.fill(subLocationData.subLocationPrimaryEmail);
        await this.page.waitForTimeout(1000);
        await this.selectCapacityType.click();
        await this.page.waitForTimeout(1000);
        await this.cumulativeCapacityField.fill(subLocationData.subLocationCumulativeCapacity);
        await this.page.waitForTimeout(1000);
        await this.addClassButton.click();
        await this.page.waitForTimeout(1000);
        await this.createButton.click();
        await this.page.waitForTimeout(1000);
    }
}