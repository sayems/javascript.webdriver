import config from "config";

const explicitWaitMS = config.get('explicitWaitMS');

export function click(driver, selector) {
    return driver.wait(function () {
        return driver.findElement(selector).then(function (element) {
            return element.click().then(function () {
                return true;
            }, function () {
                return false;
            });
        }, function () {
            return false;
        });
    }, explicitWaitMS, `Timed out waiting for element with ${selector.using} of '${selector.value}' to be clickable`);
}

export function clickIfPresent(driver, selector, attempts) {
    if (attempts === undefined) {
        attempts = 1;
    }
    for (let x = 0; x < attempts; x++) {
        driver.findElement(selector).then(function (element) {
            element.click().then(function () {
                return true;
            }, function () {
                return true;
            });
        }, function () {
            return true;
        });
    }
}

export function clearThenSendKeys(driver, selector) {
    return driver.wait(function () {
        return driver.findElement(selector).then((element) => {
            return element.clear().then(function () {
                return element.getAttribute('value').then((value) => {
                    return value === '';
                });
            }, function () {
                return false;
            });
        }, function () {
            return false;
        });
    }, explicitWaitMS, `Timed out waiting for element with ${selector.using} of '${selector.value}' to be clearable`);
}

export function sendKeys(driver, selector, value, {secureValue = false} = {}) {
    const logValue = secureValue === true ? '*********' : value;
    let self = this;
    return driver.wait(function () {
        return driver.findElement(selector).then(function (element) {
            self.clearThenSendKeys(driver, selector);
            return element.sendKeys(value).then(function () {
                return element.getAttribute('value').then((actualValue) => {
                    return actualValue === value;
                });
            }, function () {
                return false;
            });
        }, function () {
            return false;
        });
    }, explicitWaitMS, `Timed out waiting for element with ${selector.using} of '${selector.value}' to be settable to: '${logValue}'`);
}
