'use strict';
/* eslint new-cap: 0 */ // --> OFF for Given, When, Then

// #############################################################################

const { Given, When, Then } = require('cucumber');
const { ClientFunction, Selector } = require('testcafe');
const pageObjectsFolderPath = process.env.PO_FOLDER_PATH || 'tests/page-model';
const path = require('path');
const fs = require('fs');

const isCalledExternally = __dirname.includes('node_modules');

const fullPageObjectsFolderPath = isCalledExternally ?
    path.join(__dirname, '../..', pageObjectsFolderPath) :
    path.join(__dirname, pageObjectsFolderPath);

// Require all Page Object files in directory
let pageObjects = {};

fs.readdirSync(fullPageObjectsFolderPath).filter(
    (value) => value.includes('.js')
).map((file) => {
    const fileName = path.basename(file, '.js');

    pageObjects[fileName] = require(path.join(fullPageObjectsFolderPath, file));
});

// #### Given steps ############################################################

Given('I go to URL {string}', async function (t, [url]) {
    await t.navigateTo(url);
});

Given('I go to {string}.{string}', async function (t, [page, element]) {
    await t.navigateTo(pageObjects[page][element]);
});

Given('I go to {word} from {word} page', async function (t, [element, page]) {
    await t.navigateTo(pageObjects[page][element]);
});

// #### When steps #############################################################

When('I reload the page', async function (t) {
    await t.eval(() => location.reload(true));
});

When('I click {string}.{string}', async function (t, [page, element]) {
    await t.click(pageObjects[page][element]);
});

When('I click {word} from {word} page', async function (t, [element, page]) {
    await t.click(pageObjects[page][element]);
});

When('I wait for {int} ms', async function (t, [timeToWait]) {
    await t.wait(timeToWait);
});

When('I wait and click {string}.{string}', async function (
    t, [page, element]
) {
    const timeToWait = 300;

    await t.wait(timeToWait).click(pageObjects[page][element]);
});

When('I wait and click {word} from {word} page', async function (
    t, [element, page]
) {
    const timeToWait = 300;

    await t.wait(timeToWait).click(pageObjects[page][element]);
});

When('I click {string}.{string} if present', async function (
    t, [page, element]
) {
    const isPresent = await Selector(pageObjects[page][element]).exists;

    if (isPresent) {
        // Click only if element is present
        await t.click(pageObjects[page][element]);
    }
});

When('I click {word} from {word} page if present', async function (
    t, [element, page]
) {
    const isPresent = await Selector(pageObjects[page][element]).exists;

    if (isPresent) {
        // Click only if element is present
        await t.click(pageObjects[page][element]);
    }
});

When('I double click {string}.{string}', async function (
    t, [page, element]
) {
    await t.doubleClick(pageObjects[page][element]);
});

When('I double click {word} from {word} page', async function (
    t, [element, page]
) {
    await t.doubleClick(pageObjects[page][element]);
});

When('I type {string} in {string}.{string}', async function (
    t, [text, page, element]
) {
    await t.typeText(pageObjects[page][element], text);
});

When('I type {string} in {word} from {word} page', async function (
    t, [text, element, page]
) {
    await t.typeText(pageObjects[page][element], text);
});

When('I type {string}.{string} in {string}.{string}', async function (
    t, [page1, element1, page2, element2]
) {
    await t.typeText(pageObjects[page2][element2], pageObjects[page1][element1]);
});

When('I type {word} from {word} page in {word} from {word} page', async function (
    t, [element1, page1, element2, page2]
) {
    await t.typeText(pageObjects[page2][element2], pageObjects[page1][element1]);
});

When('I clear {string}.{string} and type {string}', async function (
    t, [page, element, text]
) {
    await t.typeText(pageObjects[page][element], text, { replace: true });
});

When('I clear {word} from {word} page and type {string}', async function (
    t, [element, page, text]
) {
    await t.typeText(pageObjects[page][element], text, { replace: true });
});

When('I clear {string}.{string} and type {string}.{string}', async function (
    t, [page1, element1, page2, element2]
) {
    await t.typeText(
        pageObjects[page1][element1],
        pageObjects[page2][element2],
        { replace: true }
    );
});

When('I clear {word} from {word} page and type {word} from {word} page', async function (
    t, [element1, page1, element2, page2]
) {
    await t.typeText(
        pageObjects[page1][element1],
        pageObjects[page2][element2],
        { replace: true }
    );
});

When('I select {string} in {string}.{string}', async function (
    t, [text, page, element]
) {
    const dropdown = Selector(pageObjects[page][element]);
    const option = dropdown.find('option');

    await t.click(dropdown).click(option.withText(text));
});

When('I select {string} in {word} from {word} page', async function (
    t, [text, element, page]
) {
    const dropdown = Selector(pageObjects[page][element]);
    const option = dropdown.find('option');

    await t.click(dropdown).click(option.withText(text));
});

When('I select {string}.{string} in {string}.{string}', async function (
    t, [page1, element1, page2, element2]
) {
    const dropdown = Selector(pageObjects[page2][element2]);
    const option = dropdown.find('option');

    await t.click(dropdown)
        .click(option.withText(pageObjects[page1][element1]));
});

When('I select {word} from {word} page in {word} from {word} page', async function (
    t, [element1, page1, element2, page2]
) {
    const dropdown = Selector(pageObjects[page2][element2]);
    const option = dropdown.find('option');

    await t.click(dropdown)
        .click(option.withText(pageObjects[page1][element1]));
});

When('I move to {string}.{string}', async function (t, [page, element]) {
    await t.hover(pageObjects[page][element]);
});

When('I move to {word} from {word} page', async function (t, [element, page]) {
    await t.hover(pageObjects[page][element]);
});

When(
    'I move to {string}.{string} with an offset of x: {int}px, y: {int}px',
    async function (t, [page, element, offsetX, offsetY]) {
        await t.hover(pageObjects[page][element], {
            offsetX: offsetX,
            offsetY: offsetY
        });
    }
);

When(
    'I move to {word} from {word} page with an offset of x: {int}px, y: {int}px',
    async function (t, [element, page, offsetX, offsetY]) {
        await t.hover(pageObjects[page][element], {
            offsetX: offsetX,
            offsetY: offsetY
        });
    }
);

When('I switch to {string}.{string} frame', async function (
    t, [page, element]
) {
    await t.switchToIframe(pageObjects[page][element]);
});

When('I switch to {word} frame from {word} page', async function (
    t, [element, page]
) {
    await t.switchToIframe(pageObjects[page][element]);
});

When('I switch to main frame', async function (t) {
    await t.switchToMainWindow();
});

// #### Then steps #############################################################

const getTitle = ClientFunction(() => {
    return document.title;
});

Then('the title should be {string}', async function (t, [text]) {
    await t.expect(getTitle()).eql(text);
});

Then('the title should contain {string}', async function (t, [text]) {
    await t.expect(getTitle()).contains(text);
});

Then('{string}.{string} should be present', async function (
    t, [page, element]
) {
    await t.expect(Selector(pageObjects[page][element]).exists).ok();
});

Then('{word} from {word} page should be present', async function (
    t, [element, page]
) {
    await t.expect(Selector(pageObjects[page][element]).exists).ok();
});

Then('{string}.{string} should not be present', async function (
    t, [page, element]
) {
    await t.expect(Selector(pageObjects[page][element]).exists).notOk();
});

Then('{word} from {word} page should not be present', async function (
    t, [element, page]
) {
    await t.expect(Selector(pageObjects[page][element]).exists).notOk();
});

Then('{string}.{string} text should be {string}', async function (
    t, [page, element, text]
) {
    await t.expect(Selector(pageObjects[page][element]).innerText).eql(text);
});

Then('{word} text from {word} page should be {string}', async function (
    t, [element, page, text]
) {
    await t.expect(Selector(pageObjects[page][element]).innerText).eql(text);
});

Then('{string}.{string} text should be {string}.{string}', async function (
    t, [page1, element1, page2, element2]
) {
    await t.expect(Selector(pageObjects[page1][element1]).innerText)
        .eql(pageObjects[page2][element2]);
});

Then(
    '{word} text from {word} page should be {word} from {word} page',
    async function (t, [element1, page1, element2, page2]) {
        await t.expect(Selector(pageObjects[page1][element1]).innerText)
            .eql(pageObjects[page2][element2]);
    }
);

Then('{string}.{string} text should contain {string}', async function (
    t, [page, element, text]
) {
    await t.expect(Selector(pageObjects[page][element]).innerText)
        .contains(text);
});

Then('{word} text from {word} page should contain {string}', async function (
    t, [element, page, text]
) {
    await t.expect(Selector(pageObjects[page][element]).innerText)
        .contains(text);
});

Then('{string}.{string} text should contain {string}.{string}', async function (
    t, [page1, element1, page2, element2]
) {
    await t.expect(Selector(pageObjects[page1][element1]).innerText)
        .contains(pageObjects[page2][element2]);
});

Then(
    '{word} text from {word} page should contain {word} from {word} page',
    async function (t, [element1, page1, element2, page2]) {
        await t.expect(Selector(pageObjects[page1][element1]).innerText)
            .contains(pageObjects[page2][element2]);
    }
);
