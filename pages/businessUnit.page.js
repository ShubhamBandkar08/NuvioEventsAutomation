import { businessUnitData } from "../data/businessUnit.data";

export class BusinessUnitPage {
    constructor(page) {
        this.page = page;

        this.EntityManagementButton = page.getByRole('button', { name: 'Entity Management' });
        this.BusinessUnitLink = page.getByRole('link', { name: 'Business Units' });
        this.AddNewButton = page.getByRole('button', { name: 'Add New' });
        this.SearchField = page.locator("[placeholder='Search Business Units']");

        this.NameField = page.getByLabel('Name *');
        this.CodeField = page.getByRole('textbox', { name: 'Code *' });
        this.SaveButton = page.getByRole('button', { name: 'Save' });
        this.countryField = page.getByRole('textbox', { name: 'Select a country' });
        this.countrySearchbox = page.getByPlaceholder('Search countries...');
        this.cityfield = page.getByRole('textbox', { name: 'Select a city' });
        this.citySearchbox = page.getByPlaceholder('Search cities...');
        // Select time zone
        this.timeZonefiled = page.getByRole('textbox', { name: 'Select a timezone' });
        this.timeZoneSearchbox = page.getByPlaceholder('Search timezone...');
        this.taxTypeField = page.getByRole('textbox', { name: 'Select tax types...' });
        this.taxTypeSearchbox = page.getByRole('textbox', { name: 'Select tax types...' });


        this.registrationNumberField = page.getByRole('textbox', { name: 'Registration Number' });
        this.rolesCheckbox = page.locator("[role$='checkbox']");
        this.flexibleRadionButton = page.getByRole('radio', { name: 'Flexible' });
        this.cumulativeCapacityField = page.getByRole('textbox', { name: 'Cumulative Capacity *' });
        // select role 
        this.roleField = page.getByRole('textbox', { name: 'Select roles' });
        this.selectRole = page.getByRole('option', { name: `${businessUnitData.role}` });

        //select ticket class
        this.ticketClassField = page.getByRole('textbox', { name: 'Select class' });
        this.selectTicketClass = page.getByRole('option', { name: `${businessUnitData.ticketClass}` });


        this.ticketclassbutton = page.getByRole('button', { name: 'Add Class' });
        this.activeInactiveToggle = page.getByRole('switch').nth(1);
        this.createButton = page.getByRole('button', { name: 'Create' });





    }
    async openBusinessUnitPage() {
        //   await this.EntityManagementButton.click();
        await this.page.waitForTimeout(2000);
        await this.BusinessUnitLink.click();
    }

    async isBusinessUnitExists(name, code = null) {
        // Search by name for validation
        await this.SearchField.fill(name);
        await this.page.waitForTimeout(5000);
        return (await this.page.locator(`text=/^${name}$/`).count()) > 0;
    }

    async CreateBusinessUnit(data) {
        await this.openBusinessUnitPage();

        const exists = await this.isBusinessUnitExists(data.name, data.code);

        if (exists) {
            console.log(`BU "${data.name}" (Code: ${data.code}) already exists. Skipping creation.`);
            return;
        }

        console.log(`Creating BU "${data.name}" (Code: ${data.code})`);
        await this.AddNewButton.click();

        if (data.name) await this.NameField.fill(data.name);
        if (data.code) await this.CodeField.fill(data.code);
        await this.countryField.click();
        await this.page.waitForTimeout(2000);
        //select country
        if (data.country) await this.countrySearchbox.fill(data.country);
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('Enter');
        await this.cityfield.click();
        await this.page.waitForTimeout(2000);
        //select city
        if (data.city) await this.citySearchbox.fill(data.city);
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('Enter');

        //select time zone

        await this.timeZonefiled.click();
        await this.page.waitForTimeout(2000);
        if (data.timeZone) await this.timeZoneSearchbox.fill(data.timeZone);
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('Enter');

        //select tax type 
        await this.taxTypeField.click();
        await this.page.waitForTimeout(4000);
        await this.taxTypeSearchbox.fill(`${data.taxType}`);
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('Enter');

        //  check all roles

        // const rolesCount = await this.rolesCheckbox.count();
        // for (let i = 0; i < rolesCount; i++) {
        //     await this.rolesCheckbox.nth(i).check();
        // }

        // enter registration number
        if (data.registrationNumber) await this.registrationNumberField.fill(data.registrationNumber);
        await this.page.waitForTimeout(2000);

        // select role 
        await this.roleField.click();
        await this.page.waitForTimeout(3000);
        await this.selectRole.click();
        await this.page.waitForTimeout(3000);




        //Select capacity management 

        await this.flexibleRadionButton.check();
        //Enter cumulative capacity
        this.cumulativeCapacityField.click();
        await this.page.waitForTimeout(2000);
        if (data.cumulativeCapacity) await this.cumulativeCapacityField.fill(data.cumulativeCapacity);

        // click on add class button
        await this.ticketclassbutton.click();
        await this.page.waitForTimeout(2000);

        //select ticket class
        await this.ticketClassField.click();
        await this.page.waitForTimeout(3000);
        //  await this.selectTicketClass.click();
        await this.page.waitForTimeout(3000);

        //click on active inactive toggle
        await this.activeInactiveToggle.click();
        await this.page.waitForTimeout(2000);

        //click on save changes button
        await this.createButton.click();
        await this.page.waitForTimeout(5000);



    }

    async clickEditForBusinessUnit(name) {
        // Find the row containing the business unit name
        const row = this.page.locator('tr').filter({ hasText: name });
        // Wait for the row to be visible
        await row.waitFor({ state: 'visible' });
        // Find all buttons in the ACTIONS column (view, edit, delete) and click the edit button (second button)
        // The edit button is typically the second button in the actions column
        const editButton = row.locator('button').nth(3);
        await editButton.click();
        await this.page.waitForTimeout(2000);

    }
}