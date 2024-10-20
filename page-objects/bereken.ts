import { Page,expect } from "@playwright/test"
import { HelperBase } from "./helperBase";


export class berekenPage extends HelperBase{


    constructor (page: Page){
        super(page)
    }

    async acceptCookieBanner(){
        await expect(this.page.getByRole('alertdialog')).toBeVisible();
        await this.page.locator('[data-label="Accepteren"]').click()
        
    }

    async enteraddress(postcode:string,houseNumber:string){
        await this.page.getByPlaceholder('1234 AB').fill(postcode);
        await this.page.waitForTimeout(2000);
        await this.page.getByPlaceholder('1234 AB').press('Enter');
        
        await this.page.locator('[name="houseNumber"]').fill(houseNumber);
        await this.page.waitForTimeout(2000);
        await this.page.locator('[name="houseNumber"]').press('Enter');
    }
    
    async verifyAddressInfoAPI(street: String,city: String){
        const response = await this.page.waitForResponse('**/public/nl/eneco/address?**')
        expect(response.status()).toBe(200);
        const responseBody = await response.json()
        expect(responseBody.data.street).toBe(street)
        expect(responseBody.data.city).toBe(city) 
        
    }

    async enterEnergyPerYear(energy:string){
        await this.page.getByPlaceholder('1234').fill(energy)
        await this.page.getByPlaceholder('1234').press('Enter');

    }

}