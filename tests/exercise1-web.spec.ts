import { test, expect } from '../src/config/page.config';

test.describe('Exercise 1 - Web Automation: Google to Wikipedia', () => {

  test('should find a year reference on the Wikipedia automation article', async ({ googleSearchPage, wikipediaPage }) => {
    await googleSearchPage.step_navigate();
    await googleSearchPage.step_search('automation');
    await googleSearchPage.step_clickWikipediaResult();
    await wikipediaPage.verify_onWikipedia();
    await wikipediaPage.verify_articleContainsYear();
  });

  test('should take a screenshot of the Wikipedia automation article', async ({ googleSearchPage, wikipediaPage }, testInfo) => {
    await googleSearchPage.step_navigate();
    await googleSearchPage.step_search('automation');
    await googleSearchPage.step_clickWikipediaResult();
    await wikipediaPage.verify_onWikipedia();

    const screenshot = await wikipediaPage.step_takeScreenshot('wikipedia-automation');
    await testInfo.attach('wikipedia-automation-screenshot', {
      body: screenshot,
      contentType: 'image/png',
    });
    expect(screenshot).toBeTruthy();
  });

});
