import { Page,expect } from "@playwright/test"
import { HelperBase } from "./helperBase";


export class gegevensPage extends HelperBase{

    constructor (page: Page){
        super(page)
    }

    
    async enterPersonalDate(title:string,voornaam:string,voorletter:string,Acchternaam:string,day:string,maand:string,jaar:string){
        await this.page.locator(`label[data-label="${title}"] button`).click()
        await this.page.getByPlaceholder('Peter').fill(voornaam)
        await this.page.getByPlaceholder('A.B.').fill(voorletter)
        await this.page.getByPlaceholder('Vries').fill(Acchternaam)
        await this.page.locator(`[name="day"]`).fill(day)
        await this.page.locator(`[name="month"]`).fill(maand)
        await this.page.locator(`[name="year"]`).fill(jaar)
    }

    async enterContactDetails(telefoon:string,email:string){
        await this.page.getByPlaceholder('0612345678').fill(telefoon)
        await this.page.getByPlaceholder('mijn@email.nl').fill(email)
    }

}