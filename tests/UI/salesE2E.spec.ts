import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';
import { berekenPage } from '../../page-objects/bereken';
import { aanbodPage } from '../../page-objects/aanbod';
import { controlPage } from '../../page-objects/control';
import { gegevensPage } from '../../page-objects/gegevens';
import { environment } from '../../playwright.config';


test.beforeEach(async({page}) => {
  await page.goto(`${environment.baseUrl}`);
})

test.describe('Eneco E2E flow', () => {
test('Verification of Eneco sales flow @regression @smoke @ui', async ({ page }) => {

  const address = environment.data.postcode
  const houseNumber = environment.data.houseNumber
  const street = environment.data.street
  const city = environment.data.city
  const energy = environment.data.energyperyear

  const bereken = new berekenPage(page)
  const aanbod = new aanbodPage(page)
  const control = new controlPage(page)
  const gegevens = new gegevensPage(page)

  //sales flow on the bereken pages
  await bereken.acceptCookieBanner()
  await bereken.enteraddress(address,houseNumber)
  await bereken.verifyAddressInfoAPI(street,city)
  await bereken.waitForHeaderDisplay('Welk type energie wil je in je berekening?')
  await bereken.verifyURL('duurzame-energie/bestellen2/energiekeuze/')

  await bereken.clickButtonByText('Alleen stroom')
  await bereken.clickButtonByText('Volgende')
  await bereken.waitForHeaderDisplay('Weet je het energieverbruik?')
  await bereken.verifyURL('duurzame-energie/bestellen2/verbruik-bekend/')

  await bereken.clickButtonByText('Ja, ik vul mijn verbruik zelf in')
  await bereken.clickButtonByText('Volgende')
  await bereken.waitForHeaderDisplay('Wat is je verbruik?')
  await bereken.verifyURL('duurzame-energie/bestellen2/verbruik/')

  await bereken.clickButtonByText('Nee, ik heb geen slimme meter')
  await bereken.verifyNotificationText('Je berekening gaat verder voor een energiecontract met een vaste prijs.')
  await bereken.enterEnergyPerYear(energy)
  await bereken.clickButtonByText('Volgende')
  await bereken.waitForHeaderDisplay('Heb je zonnepanelen?')
  await bereken.verifyURL('duurzame-energie/bestellen2/zonnepanelen/')
  

  await bereken.clickButtonByText('Nee, ik wek zelf geen stroom op')
  await bereken.clickButtonByText('Volgende')
  await bereken.waitForHeaderDisplay('Ga je verhuizen?')
  await bereken.verifyURL('duurzame-energie/bestellen2/je-gegevens/verhuizen/')

  //sales flow on the aanbod pages
  await bereken.clickButtonByText('Nee, ik ga niet verhuizen')
  await bereken.clickButtonByText('Volgende')
  await aanbod.waitForHeaderDisplay('Kies je type energiecontract')
  await aanbod.verifyURL('duurzame-energie/bestellen2/productkeuze/looptijd/')

  await aanbod.clickButtonByText('Volgende')
  await aanbod.waitForHeaderDisplay('Je aanbod')
  await aanbod.verifyURL('duurzame-energie/bestellen2/overzicht/')

  await aanbod.clickButtonByText('Naar je gegevens')
  await aanbod.waitForHeaderDisplay('Vanaf wanneer wil je energie ontvangen?')
  await aanbod.verifyURL('duurzame-energie/bestellen2/je-gegevens/start-leverdatum/')

  //sales flow on the gegevens pages
  await aanbod.clickButtonByText('Volgende')
  await gegevens.waitForHeaderDisplay('Woon of werk je op dit adres?')
  await gegevens.verifyURL('duurzame-energie/bestellen2/je-gegevens/adresgegevens/')
  await gegevens.clickButtonByText('Ja')
  

  await gegevens.clickButtonByText('Volgende')
  await gegevens.waitForHeaderDisplay('Wat zijn je persoonlijke gegevens?')
  await gegevens.verifyURL('duurzame-energie/bestellen2/je-gegevens/persoonlijke-gegevens/')
  await gegevens.enterPersonalDate('Dhr.','John','J.H.','Kuik','30','10','1985')

  await gegevens.clickButtonByText('Volgende')
  await gegevens.waitForHeaderDisplay('Hoe kunnen we je bereiken?')
  await gegevens.verifyURL('duurzame-energie/bestellen2/je-gegevens/contactgegevens/')
  await gegevens.enterContactDetails('0614387606','test234@gmail.com')

  await gegevens.clickButtonByText('Controleer je bestelling')
  await gegevens.waitForHeaderDisplay('Je bent er bijna')

  }
);
});
