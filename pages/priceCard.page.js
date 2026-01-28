import { BusinessUnitPage } from "./businessUnit.page";
import { businessUnitData } from "../data/businessUnit.data";
import { ticketClassData } from "../data/ticketClass.data";
import { ticketTypeData } from "../data/ticketType.data";
import { priceCardData } from "../data/priceCard.data";

export class priceCardPage {
    constructor(page) {
        this.page = page;
        this.priceCardLink = this.page.getByRole('link', { name: 'Price Cards' });
        this.priceCadSearchField = this.page.getByRole('textbox', { name: 'Search Price Cards' });
        this.priceAddNewButton = this.page.getByText('Add New', { exact: true });
        this.priceCardBusinessUnitDropdown = this.page.getByRole('combobox', { name: 'Business Unit *' });
        this.businessUnitOption = this.page.getByLabel(businessUnitData.name).getByText(businessUnitData.name, { exact: true });
        this.priceCardNameField = this.page.getByRole('textbox', { name: 'Name *' });
        this.priceCardDescriptionField = this.page.getByRole('textbox', { name: 'Description' });
        this.selectTicketClass = this.page.getByRole('button', { name: ticketClassData.ticketClassName });
        this.clickOnTicketClassOption = this.page.locator('span:has-text("' + ticketClassData.ticketClassName + '")');
        this.selectTicketType = this.page.getByRole('button', { name: ticketTypeData.ticketTypeName, exact: true });
        this.EnterPriceField = this.page.getByRole('textbox', { name: '0.00' });
        this.ticketItemsLink = this.page.getByRole('button', { name: 'Ticketing' });
        this.priceCardColor = this.page.getByRole('button', { name: '#3b82f6' });
        this.colorCodeField = this.page.locator('#radix-_r_3q_').getByRole('textbox');
    }

    async openpriceCardPage() {
        await this.ticketItemsLink.click();
        await this.priceCardLink.waitFor({ state: 'visible', timeout: 5000 });
        await this.priceCardLink.scrollIntoViewIfNeeded();
        await this.priceCardLink.click();
    }
    async ispriceCardExists(priceCardName) {
        await this.priceCadSearchField.fill(priceCardName);
        await this.page.waitForTimeout(5000);
        return (await this.page.locator(`text=/^${priceCardName}$/`).count()) > 0;
    }
    async CreatepriceCard(data) {
        await this.openpriceCardPage();
        const exists = await this.ispriceCardExists(data.priceCardName)

        if (exists) {
            console.log(`Price Card "${data.priceCardName}" already exists. Skipping creation.`);
            return;
        }
        await this.priceAddNewButton.click();
        await this.page.waitForTimeout(2000);
        await this.priceCardBusinessUnitDropdown.click();
        await this.page.waitForTimeout(2000);
        await this.businessUnitOption.click();
        await this.page.waitForTimeout(2000);

        //Enter price card name 
        if (data.priceCardName) await this.priceCardNameField.fill(data.priceCardName);
        await this.page.waitForTimeout(2000);

        //Enter price card color
        await this.priceCardColor.click();
        await this.page.waitForTimeout(2000);
        await this.colorCodeField.click();
        await this.page.waitForTimeout(2000);
        await this.colorCodeField.fill(priceCardData.PriceCardColor);
        await this.page.waitForTimeout(2000);

        //Enter price card description
        if (data.priceCardDescription) await this.priceCardDescriptionField.fill(data.priceCardDescription);
        await this.page.waitForTimeout(2000);

        //Select ticket class
        await this.selectTicketClass.click();
        await this.page.waitForTimeout(2000);
        await this.clickOnTicketClassOption.click();
        await this.page.waitForTimeout(2000);

        //Select ticket type
        await this.selectTicketType.click();
        await this.page.waitForTimeout(2000);
        await this.clickOnTicketTypeOption.click();
        await this.page.waitForTimeout(2000);

        //Enter price card price
        if (data.priceCardPrice) await this.EnterPriceField.fill(data.priceCardPrice);
        await this.page.waitForTimeout(2000);

        //Click on create button
        await this.page.getByRole('button', { name: 'Create' }).click();








    }
}