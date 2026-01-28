export class TicketClassPage {
    constructor(page) {
        this.page = page;
        this.ticketItemsLink = this.page.getByRole('button', { name: 'Ticketing' });
        this.ticketClassLink = this.page.getByRole('link', { name: 'Ticket Classes' });
        this.ticketClassSearchField = this.page.getByRole('textbox', { name: 'Search Ticket Classes' });
        this.ticketClassAddNewButton = this.page.getByText('Add New', { exact: true });
        this.ticketClassNameField = this.page.getByRole('textbox', { name: 'Name *' });
        this.ticketClassDescriptionField = this.page.getByRole('textbox', { name: 'Description' });
        this.activeToggle = this.page.getByRole('switch');
        this.createButton = this.page.getByRole('button', { name: 'Create' });


    }


    async openTicketClass() {

        await this.ticketItemsLink.click();
        await this.ticketClassLink.waitFor({ state: 'visible', timeout: 5000 });
        await this.ticketClassLink.scrollIntoViewIfNeeded();
        await this.ticketClassLink.click();
    }
    async isTicketClassExists(ticketClassName) {
        await this.ticketClassSearchField.fill(ticketClassName);
        await this.page.waitForTimeout(5000);
        return (await this.page.locator(`text=/^${ticketClassName}$/`).count()) > 0;

    }   

    async CreateTicketClass(data) {
        await this.openTicketClass();
        const exists = await this.isTicketClassExists(data.ticketClassName);
        if (exists) {
            console.log(`Ticket Class "${data.ticketClassName}" already exists. Skipping creation.`);
            return;
        }   
        await this.ticketClassAddNewButton.click();
        await this.page.waitForTimeout(2000);
        if (data.ticketClassName) await this.ticketClassNameField.fill(data.ticketClassName);
        await this.page.waitForTimeout(2000);
        if (data.ticketClassDescription) await this.ticketClassDescriptionField.fill(data.ticketClassDescription);
        await this.page.waitForTimeout(2000);
        await this.activeToggle.click();
        await this.page.waitForTimeout(2000);
        await this.createButton.click();
    }

}