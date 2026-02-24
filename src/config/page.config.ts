import { test as base, expect } from '@playwright/test';
import { GoogleSearchPage, WikipediaPage } from '@config/page-loader';

type MyFixtures = {
  googleSearchPage: GoogleSearchPage;
  wikipediaPage: WikipediaPage;
};

const test = base.extend<MyFixtures>({
  googleSearchPage: async ({ page }, use) => {
    const googleSearchPage = new GoogleSearchPage(page);
    await use(googleSearchPage);
  },

  wikipediaPage: async ({ page }, use) => {
    const wikipediaPage = new WikipediaPage(page);
    await use(wikipediaPage);
  },
});

export { test, expect };
