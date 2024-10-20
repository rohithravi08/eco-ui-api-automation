import { expect, Page } from "@playwright/test"

export class HelperBase{
    readonly page:Page

    constructor(page: Page){
        this.page = page
    }


    async clickButtonByText(buttonText:string) {
        await this.page.locator(`[data-label="${buttonText}"]`).isVisible();
        await this.page.locator(`[data-label="${buttonText}"]`).click()
        await this.page.waitForTimeout(2000);
    }

    async verifyURL(url:string) {
        const currentUrl=this.page.url() 
        expect(currentUrl).toContain(url)
    }

    async waitForHeaderDisplay(header:string){
        await this.page.waitForSelector('h1.sparky-heading', { state: 'visible' });
        const headerText = await this.page.textContent('h1.sparky-heading');
        expect(headerText).toBe(header);
    }
    
    async verifyNotificationText(notification:string){
        await this.page.waitForSelector('.notification-box-sparky', { state: 'visible' });
        const notificationText = await this.page.textContent('div.sparky-text');
        expect(notificationText).toBe(notification);
    }
}