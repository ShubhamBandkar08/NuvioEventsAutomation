export class SalesChannelPage {
    constructor(page) {
        this.page = page;
        this.distributtionLink = this.page.getByRole('button', { name: 'Distribution' });
        this.salesChannelLink = this.page.getByRole('link', { name: 'Sales Channels' });
        this.salesChannelSearch = this.page.getByRole('textbox', { name: 'Search Sale Channels' });
        this.addSalesChannelButton = this.page.getByText('Add New', { exact: true });
        this.salesChannelNameField = this.page.getByRole('textbox', { name: 'Sales Channel Name *' });
        this.salesChannelCodeField = this.page.getByRole('textbox', { name: 'Code *' });
        this.salesChannelActiveToggle = this.page.getByRole('switch');
        this.salesChannelCreateButton = this.page.getByRole('button', { name: 'Create' });


    }


    async openSalesChannelPage() {
        await this.distributtionLink.click();
        await this.page.waitForTimeout(2000);
        await this.salesChannelLink.click();
        await this.page.waitForTimeout(2000);
    }

    async isSalesChannelExists(data) {
        await this.salesChannelSearch.fill(data.salesChannelName);
        return (await this.page.locator(`text=/^${data.salesChannelName}$/`).count()) > 0;
    }

    async addNewSalesChannel(data) {
        await this.openSalesChannelPage();
        const exists = await this.isSalesChannelExists(data); // 
        if (exists) {
            console.log(`Sales Channel "${data.salesChannelName}" already exists.`);
            return;
        }
        await this.addSalesChannelButton.click();
        await this.page.waitForTimeout(2000);
        await this.salesChannelNameField.fill(data.salesChannelName);
        await this.page.waitForTimeout(2000);
        await this.salesChannelCodeField.fill(data.salesChannelCode);
        await this.page.waitForTimeout(2000);
        await this.salesChannelActiveToggle.click();
        await this.page.waitForTimeout(2000);
        await this.salesChannelCreateButton.click();
    }
}