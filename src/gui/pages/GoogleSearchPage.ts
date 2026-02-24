import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class GoogleSearchPage extends BasePage {
  private searchInput = this.page.locator('textarea[name="q"], input[name="q"]').first();

  constructor(page: Page) {
    super(page);
    this.onGoogleSearch();
  }

  async step_navigate(): Promise<this> {
    await this.waitForPageLoad();
    await this.step_acceptConsentIfPresent();
    return this;
  }

  async step_acceptConsentIfPresent(): Promise<this> {
    const consentButton = this.page.locator(
      'button:has-text("Accept all"), button:has-text("I agree"), button:has-text("Accept"), [aria-label="Accept all"]'
    ).first();
    try {
      await consentButton.click({ timeout: 4000 });
      await this.page.waitForLoadState('domcontentloaded');
    } catch {}
    return this;
  }

  // fill() used over click+type to bypass autocomplete dropdown overlay interception
  async step_search(term: string): Promise<this> {
    await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.keyboard.press('Escape');
    await this.searchInput.fill(term);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    return this;
  }

  async step_clickWikipediaResult(): Promise<void> {
    const wikipediaLink = this.getWikipediaLink();
    await wikipediaLink.click();
    await this.page.waitForURL(/wikipedia\.org/, { timeout: 30000 });
    await this.page.waitForLoadState('domcontentloaded');
  }
}
