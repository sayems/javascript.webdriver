import test from "selenium-webdriver/testing";
import config from "config";
import MainPage from "../page/home-page.js";
import * as BrowserFactory from "../utils/browsers.js";

let driver = null;
let page = null;

const mochaTimeoutMS = config.get('mochaTimeoutMS');

test.describe('Navigate to the Internet page', function () {
    this.timeout(mochaTimeoutMS);

    test.before(function () {
        driver = BrowserFactory.initializeTestSetUp();
        page = new MainPage(driver, true);
    });

    test.it('verify the HomePage heading title text is displayed', function () {
        page.pageHeadingText();
    });

    test.it('verify the CheckboxPage heading title text is displayed', function () {
        page.goToCheckboxPage().checkboxText();
    });

    test.afterEach(() => driver.manage().deleteAllCookies());
    test.after(() => driver.quit());
});