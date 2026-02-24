import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class WikipediaPage extends BasePage {
  private articleTitle = this.page.locator('#firstHeading');
  private articleBody  = this.page.locator('#mw-content-text');

  constructor(page: Page) {
    super(page);
  }

  async verify_onWikipedia(): Promise<this> {
    await expect(this.articleTitle).toBeVisible({ timeout: 5000 });
    await expect(this.page).toHaveURL(/wikipedia\.org/);
    return this;
  }

  async step_takeScreenshot(name: string = 'wikipedia-automation'): Promise<Buffer> {
    const screenshot = await this.page.screenshot({ fullPage: true });
    return screenshot;
  }

  async verify_articleContainsYear(): Promise<this> {
    const bodyText = await this.articleBody.innerText();
    const year = this.getAutomationYear(bodyText);
    const SEP = '━'.repeat(53);
    console.log(`\n━━━ Exercise 1: Wikipedia Result ${'━'.repeat(20)}`);
    console.log(`  First automation year : ${year}`);
    console.log(`  Article URL           : ${this.page.url()}`);
    console.log(SEP);
    expect(year).not.toBe('Year not found');
    return this;
  }
}
