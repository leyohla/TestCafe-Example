import HomePage from '../support/homepage-page.js';
import { Selector } from "testcafe";

const homePage = new HomePage();

fixture `Example tests`
    .page(homePage.baseUrl);

test('1.1 Search for train time, check search page title', async t => {
    await t
        .typeText(homePage.fromLocation, 'London Bridge')
        .click(homePage.suggestedStationFrom)
        .typeText(homePage.toLocation, 'Brighton')
        .click(homePage.suggestedStationTo)
        .click(homePage.submitButton);
    await t
        .expect(Selector("title").innerText).contains('Trainline');
} )

test('1.2 Search for train time, check search page title', async t => {
    await homePage.enterFromLocation('London Bridge');
    await homePage.enterToLocation('Brighton');
    await t
        .click(homePage.submitButton);
    await t
        .expect(Selector("title").innerText).contains('Trainline');
} )

test('1.3 Search for train time, check search page title', async t => {
    await homePage.enterLocations('London Bridge','Brighton');
    await t
        .click(homePage.submitButton);
    await t
        .expect(Selector("title").innerText).contains('Trainline');
} )

test('2. Check page title, search train times, check results shown', async t => {
    await t
        .expect(Selector("title").innerText).contains('Trainline');
    await homePage.enterLocations('London Bridge','Brighton');
    await t
        .click(homePage.submitButton);
    await t
        .expect(homePage.resultsPriceBar.exists).ok();
})

test('3. Checking you can search for return tickets', async t =>{
    await homePage.enterLocations('London Bridge', 'Brighton');
    await t
        .click(homePage.returnRadioButton)
        .click(homePage.tomorrowButton)
        .click(homePage.nextDayButton);
    const validNextDay = await homePage.checkNextDateValid();
    await t
        .expect(validNextDay).eql(true);    

})