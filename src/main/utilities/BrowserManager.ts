import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';

// Enum for Browser Types
export enum BrowserType {
  CHROMIUM = 'chromium',
  FIREFOX = 'firefox',
  WEBKIT = 'webkit',
  CHROME = 'chrome',
  EDGE = 'edge',
}

// Browser Manager Class
export class BrowserManager {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private browserType: BrowserType;

  constructor(browserType: BrowserType) {
    this.browserType = browserType;
  }

  // Initialize browser instance based on the type
  public async initializeBrowser() {
    switch (this.browserType) {
      case BrowserType.CHROME:
        this.browser = await chromium.launch({
          headless: false, // Set to true if you don't need to see the browser UI
          channel: this.browserType === BrowserType.CHROME ? 'chrome' : undefined,
        });
        break;
      case BrowserType.FIREFOX:
        this.browser = await firefox.launch({
          headless: false,
        });
        break;
      case BrowserType.WEBKIT:
        this.browser = await webkit.launch({
          headless: false,
        });
        break;
      case BrowserType.EDGE:
        this.browser = await chromium.launch({
          headless: false, // Set to true if you don't need to see the browser UI
          channel: 'msedge',
        });
        break;
      default:
        throw new Error(`Unsupported browser type: ${this.browserType}`);
    }
  }

  // Initialize a new browser context
  public async initializeContext() {
    if (!this.browser) {
      throw new Error('Browser is not initialized. Call initializeBrowser() first.');
    }
    this.context = await this.browser.newContext();
  }

  // Get a new page from the context
  public async newPage(): Promise<Page> {
    if (!this.context) {
      throw new Error('Context is not initialized. Call initializeContext() first.');
    }
    return this.context.newPage();
  }

  // Close the context and browser
  public async close() {
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }
}
