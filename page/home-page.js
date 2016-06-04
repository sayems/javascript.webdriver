import assert from "assert";
import {By} from "selenium-webdriver";
import config from "config";
import BasePage from "./base-page.js";
import CheckboxPage from "./checkbox-page.js";

let pageHeading = By.css('.heading');
let checkbox = By.xpath('//*[@id="content"]/ul/li[5]/a');

export default class MainPage extends BasePage {
    constructor(driver, visit = false) {
        super(driver, pageHeading, visit, config.get('url'));
        pageHeading = pageHeading;
    }

    goToCheckboxPage() {
        this.driver.findElement(checkbox).click();
        return new CheckboxPage(this.driver, false);
    }

    pageHeadingText() {
        var title = this.driver.findElement(pageHeading);
        title.getText().then(function (text) {
            assert.equal(text, 'Welcome to the Internet');
        });
    }
}