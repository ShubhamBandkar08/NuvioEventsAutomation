import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { BusinessUnitPage } from '../pages/businessUnit.page';
import { businessUnitData } from '../data/businessUnit.data';
import { LocationPage } from '../pages/location.page';
import { locationData } from '../data/location.data';
import { TaxTypePage } from '../pages/taxType.page';
import { taxTypedata } from '../data/taxType.data';
import { TicketTypePage } from '../pages/ticketType.page';
import { ticketTypeData } from '../data/ticketType.data';
import { ticketClassData } from '../data/ticketClass.data';
import { TicketClassPage } from '../pages/ticketClass.page';
import { priceCardPage } from '../pages/priceCard.page';
import { priceCardData } from '../data/priceCard.data';
import { TimeSlotPage } from '../pages/timeSlot.page.js';
import { timeSlotData } from '../data/timeSlot.data';
import { addonsData } from '../data/addons.data.js';
import { AddonsPage } from '../pages/addons.page.js';
import { ProductPage } from '../pages/Product.page.js';
import { productData } from '../data/product.data.js';
import { SchedulerPage } from '../pages/Scheduler.page.js';
import { schedularData } from '../data/scheduler.data.js';
import { designationData } from '../data/designation.data.js';
import { DesignationPage } from '../pages/Designation.page.js';
import { employementTypeData } from '../data/employementType.data.js';
import { EmployementTypePage } from '../pages/EmployementType.page.js';
import { subLocationData } from '../data/sublocation.data.js';
import { SubLocationPage } from '../pages/SubLocation.page.js';
import { expertiseData } from '../data/expertise.data.js';
import { ExpertisePage } from '../pages/Expertise.page.js';
import { salesChannelData } from '../data/salesChannel.data.js';
import { SalesChannelPage } from '../pages/SalesChannel.page.js';









test.beforeEach(async ({ page }) => {
    // Any setup steps can be added here

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(5000);
    await loginPage.login('superadmin', 'Super@123');
    const loginSuccess = await loginPage.verifyLoginSuccess();
    expect(loginSuccess).toBeTruthy();
});

test('TC_01: Create New Product ', async ({ page }) => {

    test.setTimeout(1200000);

    //Create ticket class

    const ticketClassPage = new TicketClassPage(page);
    await ticketClassPage.CreateTicketClass(ticketClassData);
    await page.waitForTimeout(2000);
    await page.reload();
    await page.waitForTimeout(5000);
    await expect(page.locator(`text=/^${ticketClassData.ticketClassName}$/`)).toBeVisible();
    await page.waitForTimeout(6000);

    //create ticket type

    const ticketTypePage = new TicketTypePage(page);
    await ticketTypePage.CreateTicketType(ticketTypeData);
    await page.waitForTimeout(2000);
    await page.reload();
    await page.waitForTimeout(5000);
    await expect(page.locator(`text=/^${ticketTypeData.ticketTypeName}$/`)).toBeVisible();
    await page.waitForTimeout(6000);




    //Create New tax type

    const taxTypePage = new TaxTypePage(page);
    await taxTypePage.CreateTaxType(taxTypedata);
    await page.waitForTimeout(2000);


    //**************Create new Business Unit**************

    const BuPage = new BusinessUnitPage(page);
    await BuPage.CreateBusinessUnit(businessUnitData);
    await page.waitForTimeout(2000);
    await page.reload();
    await page.waitForTimeout(5000);
    await expect(page.locator(`text=/^${businessUnitData.name}$/`)).toBeVisible();
    await page.waitForTimeout(10000);

    //create new location

    const locationPage = new LocationPage(page);
    await locationPage.CreateLocation(locationData);
    await page.waitForTimeout(2000);
    await page.reload();
    await page.waitForTimeout(5000);
    await expect(page.locator(`text=/^${locationData.locationName}$/`)).toBeVisible();
    await page.waitForTimeout(6000);

    // Create new sub location

    // const subLocationPage = new SubLocationPage(page);
    // await page.waitForTimeout(3000);
    // await subLocationPage.createSubLocation(subLocationData);
    // await page.waitForTimeout(2000);
    // await page.reload();
    // await page.waitForTimeout(5000);
    // await expect(page.locator(`text=/^${subLocationData.subLocationName}$/`)).toBeVisible();
    // await page.waitForTimeout(6000);



    // create price card

    const priceCardpage = new priceCardPage(page);
    await priceCardpage.CreatepriceCard(priceCardData);
    await page.waitForTimeout(2000);
    await page.reload();
    await page.waitForTimeout(5000);
    await expect(page.locator(`text=/^${priceCardData.priceCardName}$/`)).toBeVisible();
    await page.waitForTimeout(6000);

    //Create time slot 

    const timeSlotPage = new TimeSlotPage(page);
    await timeSlotPage.opentimeSlotPage();
    await page.waitForTimeout(3000);

    // Search by business unit and check existence
    await timeSlotPage.searchByBusinessUnit(timeSlotData.businessUnit);
    await page.waitForTimeout(2000);
    const exists = await timeSlotPage.isTimeSlotPresentInTable(timeSlotData);

    if (!exists) {
        // clear search and create
        await timeSlotPage.clearSearch();
        await page.waitForTimeout(1000);

        await timeSlotPage.createTimeSlot(timeSlotData);
        await page.waitForTimeout(2000);
        await page.reload();
        await page.waitForTimeout(5000);

        // verify after creation
        await timeSlotPage.searchByBusinessUnit(timeSlotData.businessUnit);
        await page.waitForTimeout(2000);
        const created = await timeSlotPage.isTimeSlotPresentInTable(timeSlotData);
        expect(created).toBeTruthy();
    } else {
        // already present
        expect(exists).toBeTruthy();
    }


    // //create addon
    const addonsPage = new AddonsPage(page);
    await addonsPage.createAddon(addonsData);

    await page.waitForTimeout(2000);
    await page.reload();
    await page.waitForTimeout(5000);
    await expect(page.locator(`text=/^${addonsData.addonName}$/`)).toBeVisible();
    await page.waitForTimeout(6000);
    //

    //create product
    const productPage = new ProductPage(page);
    await productPage.createProduct(productData);
    await page.waitForTimeout(2000);
    await page.reload();
    await page.waitForTimeout(5000);
    await expect(page.locator(`text=/^${productData.productName}$/`)).toBeVisible();
    await page.waitForTimeout(6000);



});


test("TC_02 : Schedule new product", async ({ page }) => {


    test.setTimeout(1200000);
    const schedulerPage = new SchedulerPage(page);
    await schedulerPage.openSchedulerPage();
    await page.waitForTimeout(2000);
    await schedulerPage.scheduleProduct(schedularData);
    await page.waitForTimeout(2000);

})



test("Create product using existing data", async ({ page }) => {
    test.setTimeout(1200000);


    const productPage = new BusinessUnitPage(page);

    await productPage.EntityManagementButton.click();
    await productPage.BusinessUnitLink.click();
    await page.waitForTimeout(3000);
    // Click edit for Dubai Aquarium & Underwater Zoo
    await productPage.clickEditForBusinessUnit('Dubai Aquarium & Underwater Zoo');

    //crete price card for the bussiness unit

    await page.goto('https://nuvio-events.nuviotech.co/price-cards');
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Add New' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('combobox', { name: 'Business Unit *' }).click();
    await page.getByLabel('Dubai Aquarium & Underwater').getByText('Dubai Aquarium & Underwater').click();
    await page.waitForTimeout(3000);

    // //Added price card

    await page.getByRole('textbox', { name: 'Name *' }).fill('DAUZ Platinum WEEKDAY');
    await page.waitForTimeout(3000);
    //price card type
    await page.getByRole('button', { name: 'Platinum' }).click();
    await page.waitForTimeout(3000);
    await page.locator('span:has-text("Platinum")').click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'All Ages' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('textbox', { name: '0.00' }).fill('200');
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Create' }).click();
    await page.waitForTimeout(3000);

    //creat product

    await page.getByRole('button', { name: 'Product Catalogue' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'Products' }).click();
    await page.waitForTimeout(3000);
    await page.getByText('Add New', { exact: true }).click();
    await page.waitForTimeout(3000);

    //add product

    await page.getByRole('textbox', { name: 'Product Name *' }).fill('DAUZ PLATINUM');
    await page.waitForTimeout(3000);
    //click on the BU 
    await page.getByRole('combobox', { name: 'Business Unit *' }).click();
    await page.getByLabel('Dubai Aquarium & Underwater').getByText('Dubai Aquarium & Underwater').click();
    await page.waitForTimeout(3000);
    //location
    await page.getByRole('combobox', { name: 'Location', exact: true }).click();
    await page.getByLabel('Burj Khalifa - Downtown Dubai').getByText('Burj Khalifa - Downtown Dubai').click();



    await page.getByRole('combobox', { name: 'Base Price Card *' }).click();
    await page.getByLabel('DAUZ Platinum WEEKDAY').getByText('DAUZ Platinum WEEKDAY').click();
    await page.waitForTimeout(3000);

    //select status
    await page.getByRole('combobox').filter({ hasText: 'Draft' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('option', { name: 'Published' }).click();
    await page.waitForTimeout(3000);

    //add addons

    await page.getByRole('tab', { name: 'Addons' }).click();
    await page.waitForTimeout(3000);

    await page.locator('button').filter({ hasText: 'Add addon' }).first().click();
    await page.waitForTimeout(3000);

    //add distribution
    await page.getByRole('tab', { name: 'Distribution' }).click();
    await page.waitForTimeout(3000);
    await page.getByText('10:00 - 11:00', { exact: true }).click();
    await page.waitForTimeout(3000);
    await page.getByText('10:00 - 12:00', { exact: true }).click();
    await page.waitForTimeout(3000);

    //add Distribution channel

    await page.getByRole('button', { name: 'Add Channel' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('combobox').filter({ hasText: 'Select business unit' }).click();
    await page.getByLabel('Dubai Aquarium & Underwater').getByText('Dubai Aquarium & Underwater').click();
    await page.waitForTimeout(3000);
    //location
    await page.getByRole('combobox').filter({ hasText: 'Select location' }).click();
    await page.waitForTimeout(3000);
    await page.getByLabel('Burj Khalifa - Downtown Dubai').getByText('Burj Khalifa - Downtown Dubai').click();

    //select channel price cards

    await page.getByRole('combobox').filter({ hasText: 'Select sales channel' }).click();
    await page.waitForTimeout(3000);
    await page.getByLabel('Web').getByText('Web').click();
    await page.waitForTimeout(3000);
    //Select card 
    //Click on add button 
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await page.waitForTimeout(3000);

    await page.getByRole('button', { name: 'Create' }).click();




});



test("Check Masters", async ({ page }) => {
    test.setTimeout(1200000);
    //  Designation

    // const designationPage = new DesignationPage(page);
    // await designationPage.createDesignation(designationData);
    // await page.waitForTimeout(2000);
    // await page.reload();
    // await page.waitForTimeout(5000);
    // await expect(page.locator(`text=/^${designationData.designationName}$/`)).toBeVisible();
    // await page.waitForTimeout(6000);



    //Employement 

    // const employementTypePage = new EmployementTypePage(page);
    // await employementTypePage.createEmployementType(employementTypeData);
    // await page.waitForTimeout(2000);
    // await page.reload();
    // await page.waitForTimeout(5000);
    // await expect(page.locator(`text=/^${employementTypeData.employementTypeName}$/`)).toBeVisible();
    // await page.waitForTimeout(6000);

    // New Expertise

    // const expertisePage = new ExpertisePage(page);
    // await expertisePage.addNewExpertise(expertiseData);
    // await page.waitForTimeout(2000);
    // await page.reload();
    // await page.waitForTimeout(5000);
    // await expect(page.locator(`text=/^${expertiseData.expertiseName}$/`)).toBeVisible();
    // await page.waitForTimeout(6000);


    //Create New sales channel

    // const salesChannelPage = new SalesChannelPage(page);
    // await salesChannelPage.addNewSalesChannel(salesChannelData);
    // await page.waitForTimeout(2000);
    // await page.reload();
    // await page.waitForTimeout(5000);
    // await expect(page.locator(`text=/^${salesChannelData.salesChannelName}$/`)).toBeVisible();
    // await page.waitForTimeout(6000);






})