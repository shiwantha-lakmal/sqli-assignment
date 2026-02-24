import { Page } from '@playwright/test';
import { getGoogleURL } from '@config/env.config';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async onGoogleSearch(): Promise<void> {
    this.page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });
    await this.page.goto(`${getGoogleURL()}/?hl=en&gl=US`);
  }

  async waitForPageLoad(): Promise<this> {
    await this.page.waitForLoadState('domcontentloaded');
    return this;
  }

  getAutomationYear(bodyText: string): string {
    const yearMatches = bodyText.match(/\b(1[0-9]{3}|20[0-2][0-9])\b/g);
    return yearMatches && yearMatches.length > 0 ? yearMatches[0] : 'Year not found';
  }

  /**
   * Returns the organic Wikipedia search result link.
   *
   * XPath derived from real Google result HTML:
   *   <a jsname="UWckNb" class="zReHs" href="https://en.wikipedia.org/wiki/Automation">
   *
   * @jsname="UWckNb"        — targets only organic result title links
   * not(contains(@href,"#")) — excludes hidden fragment deep-links (#:~:text=...)
   *                            injected by featured snippets and knowledge panels
   */
  protected getWikipediaLink() {
    return this.page.locator(
      'xpath=//a[@jsname="UWckNb" and contains(@href, "en.wikipedia.org/wiki/") and not(contains(@href, "#"))]'
    ).first();
  }
}
