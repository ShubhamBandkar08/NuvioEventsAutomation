import { businessUnitData } from "../data/businessUnit.data";
import { locationData } from "../data/location.data";

export class TimeSlotPage {

    constructor(page) {
        this.page = page;
        this.schdulingLink = this.page.getByText('Scheduling', { exact: true });
        this.timeSlotLink = this.page.getByRole('listitem').filter({ hasText: /^Time Slots$/ });
        this.searchTimeSlotField = this.page.getByRole('textbox', { name: 'Search Time Slot Ranges' });
        this.addNewTimeSlotButton = this.page.getByRole('button', { name: 'Add New' });
        this.startTimeHourField = this.page.getByRole('combobox').nth(1);
        this.startTimeMinuteField = this.page.getByRole('combobox').nth(2);
        this.endTimeHourField = this.page.getByRole('combobox').nth(3);
        this.endTimeMinuteField = this.page.getByRole('combobox').nth(4);
        this.addDistrubutionButton = this.page.getByRole('button', { name: 'Add', exact: true });
        this.businessUnitField = this.page.getByRole('combobox').filter({ hasText: 'Select unit' });    
        this.locationField = this.page.getByRole('combobox').filter({ hasText: 'Select location' });
        this.createTimeSlotButton = this.page.getByRole('button', { name: 'Create' });  

    }

    async opentimeSlotPage() {
        await this.schdulingLink.click();
        await this.timeSlotLink.waitFor({ state: 'visible', timeout: 5000 });
        await this.timeSlotLink.scrollIntoViewIfNeeded();
        await this.timeSlotLink.click();
    }

    async searchByBusinessUnit(businessUnit) {
        if (!businessUnit) {
            console.log('Business unit is undefined, skipping search');
            return;
        }
        await this.searchTimeSlotField.fill(businessUnit);
        await this.page.waitForTimeout(3000);
    }

    async clearSearch() {
        try {
            await this.searchTimeSlotField.fill('');
        } catch (e) {
            // fallback to press Ctrl+A / Backspace if fill not supported
            await this.searchTimeSlotField.click();
            await this.page.keyboard.press('Control+A');
            await this.page.keyboard.press('Backspace');
        }
        await this.page.waitForTimeout(1000);
    }

    async istimeSlotExists(timeSlotData) {
        // Perform a search by business unit then check table for matching start/end times
        await this.searchByBusinessUnit(timeSlotData.businessUnit || '');
        await this.page.waitForTimeout(1000);
        const exists = await this.isTimeSlotPresentInTable(timeSlotData);
        return exists;
    }

   

    async isTimeSlotPresentInTable(timeSlotData) {
        const rows = this.page.locator('tbody tr');
        
        if (await rows.count() === 0) {
            console.log('No rows found in table');
            return false;
        }

        const count = await rows.count();
        const startTime = `${timeSlotData.startTime.hh}:${timeSlotData.startTime.mm}`;
        const endTime = `${timeSlotData.endTime.hh}:${timeSlotData.endTime.mm}`;

        console.log(`Looking for time slot: ${startTime} - ${endTime}`);
        console.log(`Total rows: ${count}`);

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const cells = await row.locator('td').count();
            
            let rowData = [];
            for (let j = 0; j < cells; j++) {
                const cellText = await row.locator('td').nth(j).innerText();
                rowData.push(cellText.trim());
            }
            
            console.log(`Row ${i}: ${rowData.join(' | ')}`);
            
            // Check if start time and end time are in the row
            if (rowData.join(' ').includes(startTime) && rowData.join(' ').includes(endTime)) {
                console.log(`Found matching time slot at row ${i}`);
                return true;
            }
        }
        
        console.log('Time slot not found in table');
        return false;
    }
    // }
    async createTimeSlot(timeSlotData) {

        await this.addNewTimeSlotButton.click();
        await this.page.waitForTimeout(3000);
      
        await this.startTimeHourField.click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('option', { name: timeSlotData.startTime.hh }).click();
        await this.page.waitForTimeout(1000);
        
        await this.startTimeMinuteField.click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('option', { name: timeSlotData.startTime.mm }).click();
        await this.page.waitForTimeout(1000);
        
        await this.endTimeHourField.click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('option', { name: timeSlotData.endTime.hh }).click();
        await this.page.waitForTimeout(1000);
        
        await this.endTimeMinuteField.click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('option', { name: timeSlotData.endTime.mm }).click();
        await this.page.waitForTimeout(3000);
        
        await this.addDistrubutionButton.click();
        await this.page.waitForTimeout(3000);
        
        await this.businessUnitField.click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('option', { name: businessUnitData.name, exact: true }).click();
     
        await this.page.waitForTimeout(3000);
        await this.locationField.click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('option', { name: locationData.locationName, exact: true }).click();
        await this.page.waitForTimeout(3000);
        await this.createTimeSlotButton.click();
        await this.page.waitForTimeout(5000);


    }

}