export class TicketTypePage {
    constructor(page) {
        this.page = page;
        this.ticketItemsLink = this.page.getByRole('button', { name: 'Ticketing' });
        this.ticketTypeLink = this.page.getByRole('link', { name: 'Ticket Types' });
        this.ticketTypeSearchField = this.page.getByRole('textbox', { name: 'Search Ticket Types' });
        this.ticketAddNewButton = this.page.getByText('Add New', { exact: true });
        this.ticketTypeNameField = this.page.getByRole('textbox', { name: 'Name *' });
        this.ticketDescriptionField = this.page.getByRole('textbox', { name: 'Description' });
        this.valideFromField = this.page.getByRole('textbox', { name: 'Valid From' });
        this.refundableTogggle = this.page.getByRole('switch').first();
        this.transferrableToggle = this.page.getByRole('switch').nth(1);
        this.allowRescheduleToggle = this.page.getByRole('switch').nth(2);
        this.avtiveToggle = this.page.getByRole('switch').nth(3);
        this.createButton = this.page.getByRole('button', { name: 'Create' });

    }


    async openTicketType() {

        // await this.ticketItemsLink.click();
        await this.ticketTypeLink.waitFor({ state: 'visible', timeout: 5000 });
        await this.ticketTypeLink.scrollIntoViewIfNeeded();
        await this.ticketTypeLink.click();

    }
    async isTicketTypeExists(ticketTypeName) {
        await this.ticketTypeSearchField.fill(ticketTypeName);
        await this.page.waitForTimeout(5000);
        return (await this.page.locator(`text=/^${ticketTypeName}$/`).count()) > 0;
    }

    async CreateTicketType(data) {
        await this.openTicketType();
        const exists = await this.isTicketTypeExists(data.ticketTypeName)

        if (exists) {
            console.log(`Ticket Type "${data.ticketTypeName}" already exists. Skipping creation.`);
            return;
        }

        await this.ticketAddNewButton.click();
        await this.page.waitForTimeout(2000);
        if (data.ticketTypeName) await this.ticketTypeNameField.fill(data.ticketTypeName);
        await this.page.waitForTimeout(2000);
        if (data.TicketTypeDescription) await this.ticketDescriptionField.fill(data.TicketTypeDescription);
        await this.page.waitForTimeout(2000);
        await this.valideFromField.click();
        await this.page.waitForTimeout(2000);
        if (data.valideFrom) await this.valideFromField.fill(data.valideFrom);
        await this.page.waitForTimeout(2000);
        await this.refundableTogggle.click();
        await this.page.waitForTimeout(2000);
        await this.transferrableToggle.click();
        await this.page.waitForTimeout(2000);
        await this.allowRescheduleToggle.click();
        await this.page.waitForTimeout(2000);
        await this.avtiveToggle.click();
        await this.page.waitForTimeout(2000);
        await this.createButton.click();
        



    }





}