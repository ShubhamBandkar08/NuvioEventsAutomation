import { BusinessUnitPage } from "./businessUnit.page";
import { businessUnitData } from "../data/businessUnit.data";

export class LocationPage {

    constructor(page) {
        this.page = page;
        this.businessUnitPage = new BusinessUnitPage(page);
        this.locationLink = this.page.getByRole('link', { name: 'Locations', exact: true });
        this.entityManagementButton = this.page.getByRole('button', { name: 'Entity Management' });
        this.addnewlocationButton = this.page.getByText('Add New', { exact: true });
        this.locationSearchField = this.page.getByRole('textbox', { name: 'Search Locations' });
        this.locationNameField = this.page.getByRole('textbox', { name: 'Name *' });
        this.loactionCodeField = this.page.getByRole('textbox', { name: 'Code *' });
        this.businessUnitDropdown = this.page.getByRole('combobox').filter({ hasText: 'Select a business unit' });
        this.activetoggle = this.page.getByRole('switch');
        this.locationDescriptionField = this.page.getByRole('textbox', { name: 'Description' });
        this.addressLineOneField = this.page.getByRole('textbox', { name: 'Address Line 1' });
        //selsect location country and city locators
        this.locationCountrydropdown = this.page.getByRole('combobox').filter({ hasText: 'Select a country' });
        this.locationCountrySearchbox = this.page.getByPlaceholder('Search country...');
        this.locationcitydropdown = this.page.getByRole('combobox').filter({ hasText: 'Select a city' });
        this.locationcitySearchbox = this.page.getByPlaceholder('Search city...');

        // Select time zone locators modi needed
        this.locationtimezonedropdown = this.page.getByRole('combobox').filter({ hasText: 'Select a timezone' });
        this.locationtimezoneSearchbox = this.page.getByPlaceholder('Search timezone...');

        // primary phone number locators
        this.primaryPhoneNumberDropdown = this.page.getByRole('combobox').filter({ hasText: 'CA (+1)' });
        this.primaryPhoneNumberSearchbox = this.page.getByPlaceholder('Search country code...');
        this.primaryPhoneNumberField = this.page.getByRole('textbox', { name: 'Primary Phone' });

        //primary email field locator
        this.primaryEmailField = this.page.getByRole('textbox', { name: 'Primary Email' });

        //lattitude and longitude fields locators
        this.locationLatitudeField = this.page.getByRole('textbox', { name: 'Latitude' });
        this.locationLongitudeField = this.page.getByRole('textbox', { name: 'Longitude' });


        //click on create button  locators
        this.clickOnCreateButton = this.page.getByRole('button', { name: 'Create' });
 
        //location capacity type and value locators 

        this.flexibleRadioButton = this.page.getByRole('radio', { name: 'Flexible' });
        this.cumulativeCapacityField = this.page.getByRole('textbox', { name: 'Cumulative Capacity *' });
        this.addClassButton = this.page.getByRole('button', { name: 'Add Class' });





    }


    async openlocationPage() {
     //   await this.entityManagementButton.click();
        await this.locationLink.waitFor({ state: 'visible', timeout: 5000 });
        await this.locationLink.scrollIntoViewIfNeeded();
        await this.locationLink.click();
    }

    async isLocationExists(locationName) {
        await this.locationSearchField.fill(locationName);
        await this.page.waitForTimeout(5000);
        return (await this.page.locator(`text=/^${locationName}$/`).count()) > 0;
    }


    async CreateLocation(data) {
        await this.openlocationPage();

        const exists = await this.isLocationExists(data.locationName)

        if (exists) {
            console.log(`Location "${data.locationName}" already exists. Skipping creation.`);
            return;
        }
        console.log(`Creating Location "${data.locationName}"`);
        await this.addnewlocationButton.click();


        await this.addnewlocationButton.click();
        await this.page.waitForTimeout(2000);
        if (data.locationName) await this.locationNameField.fill(data.locationName);
        await this.page.waitForTimeout(2000);
        if (data.locationCode) await this.loactionCodeField.fill(data.locationCode);
        await this.page.waitForTimeout(2000);
        if (data.businessUnitNameInLocation) await this.businessUnitDropdown.click();
        await this.page.waitForTimeout(2000);
        if (data.businessUnitNameInLocation) {
            const businessUnitOption = this.page.getByLabel(data.businessUnitNameInLocation).getByText(data.businessUnitNameInLocation, { exact: true });
            await businessUnitOption.click();
        }
        await this.page.waitForTimeout(2000);
        await this.activetoggle.click();

        await this.page.waitForTimeout(2000);
        //description
        if (data.locationDescription) await this.locationDescriptionField.fill(data.locationDescription);
        await this.page.waitForTimeout(2000);

        //address line 1
        if (data.AddressLine1) await this.addressLineOneField.fill(data.AddressLine1);
        await this.page.waitForTimeout(2000);

        //select country
        await this.locationCountrydropdown.click();
        await this.page.waitForTimeout(2000);
        await this.locationCountrySearchbox.fill(data.locationCountry);
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('Enter');

        // select city 
        await this.locationcitydropdown.click();
        await this.page.waitForTimeout(2000);
        await this.locationcitySearchbox.fill(data.locationCity);
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('Enter');

        //select time zone
        await this.locationtimezonedropdown.click();
        await this.page.waitForTimeout(2000);
        await this.locationtimezoneSearchbox.fill(data.locationTimeZone);
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('Enter');    

        //select primary phone 

        await this.primaryPhoneNumberDropdown.click();
        await this.page.waitForTimeout(2000);
        await this.primaryPhoneNumberSearchbox.fill(data.primaryPhoneNumberCountryCode);
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);


        //fill primary phone number
        if (data.primaryPhoneNumber) await this.primaryPhoneNumberField.fill(data.primaryPhoneNumber);
        await this.page.waitForTimeout(2000);   


        //fill primary email
        if (data.primaryEmail) await this.primaryEmailField.fill(data.primaryEmail);
        await this.page.waitForTimeout(2000);

        //fill registration number
        if (data.registrationNumber) await this.page.getByRole('textbox', { name: 'Registration Number' }).fill(data.registrationNumber);
        await this.page.waitForTimeout(2000);

        //fill lattitude
        if (data.locationLatitude) await this.locationLatitudeField.fill(data.locationLatitude);
        await this.page.waitForTimeout(2000);
        //fill longitude
        if (data.locationLongitude) await this.locationLongitudeField.fill(data.locationLongitude);
        await this.page.waitForTimeout(2000);

        //select capacity type
        if (data.capacityType === 'Flexible') {
            await this.flexibleRadioButton.click(); 
            await this.page.waitForTimeout(2000);
            if (data.cumulativeCapacity) await this.cumulativeCapacityField.fill(data.cumulativeCapacity);
            await this.page.waitForTimeout(2000);
        }

        //click on add class button
        
        await this.addClassButton.click();
        await this.page.waitForTimeout(2000);

        //click on save changes button

        await this.clickOnCreateButton.click();
        await this.page.waitForTimeout(5000);


    }
}