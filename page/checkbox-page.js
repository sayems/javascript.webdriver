import assert from "assert";
import {By} from "selenium-webdriver";
import BasePage from "./base-page.js";

let pageHeading = By.xpath('//*[@id="content"]/div/h3');

export default class CheckboxPage extends BasePage {
    constructor(driver) {
        super(driver, pageHeading);
        pageHeading = pageHeading;
    }

    checkboxText() {
        var title = this.driver.findElement(pageHeading);
        title.getText().then(function (text) {
            assert.equal(text, 'Checkboxes');
        });
    }
}