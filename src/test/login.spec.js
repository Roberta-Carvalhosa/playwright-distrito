const { chromium } = require('playwright');
const chai = require('chai');
const expect = chai.expect;

let browser, page;

describe('LOGIN', () => {
    beforeEach(async function () {
        browser = await chromium.launch({ headless: false });
        page = await browser.newPage()
        await page.goto('https://distrito-qa.herokuapp.com');
    });
    afterEach(async function () {
        await page.screenshot({ path: `./src/screenshots/${this.currentTest.title.replace(/\s+/g, '_')}.png`, fullPage: false });
        await browser.close();
    });

    it('Verifica se o form do login existe', async function () {
        const inputEmail = await page.$('#user_email');
        const inputPassword = await page.$('#user_password');
        //            const submitButton = await page.$('input[type="submit"]');

        expect(inputEmail).to.exist;
        expect(inputPassword).to.exist;
        expect(('input[type="submit"]')).to.exist;
    });
    it('Verifica se o login está funcionando', async function () {
        await page.fill('#user_email', 'suellen@distrito.me');
        await page.fill('#user_password', 'Teste123');
        await page.click('input[type="submit"]', 'Acessar');
        await page.click('xpath=//*[@id="wrapper"]/header/div/div/nav/div/a[2]', 'Nome')

        const username = await page.textContent('xpath=//*[@id="pills-profile"]/div/div[2]/div/div/div[1]/div[1]/h4');
        expect(username).to.be.equal('Suellen');
    });
});