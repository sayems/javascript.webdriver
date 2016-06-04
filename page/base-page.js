import webdriver from "selenium-webdriver";
import config from "config";

const until = webdriver.until;

export default class BasePage {
    constructor(driver, expectedElementSelector, visit = false, url = null) {
        this.explicitWaitMS = config.get('explicitWaitMS');
        this.driver = driver;
        this.expectedElementSelector = expectedElementSelector;
        this.url = url;

        if (visit) this.driver.get(this.url);

        this.driver.wait(until.elementLocated(this.expectedElementSelector), this.explicitWaitMS);
    }
}