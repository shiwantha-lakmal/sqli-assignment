# SQLI Assignment — Test Automation

End-to-end test automation covering web automation and API testing, built with Playwright and TypeScript.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher  
- npm v9 or higher

---

## Installation

**1. Clone the repository**

```bash
git clone git@github.com:shiwantha-lakmal/sqli-assignment.git
cd sqli-assignment
```

**2. Install dependencies**

```bash
npm install
```

**3. Install Playwright browsers**

```bash
npx playwright install chromium
```

---

## Running Tests

```bash
# Run all tests in headed mode (Chromium, single worker, tracing on)
npm run ui:headed

# Run all tests in headless mode
npm run ui:headless

# Run tests in debug mode (Playwright Inspector)
npm run ui:debug

# Type-check without emitting output
npm run audit
```

---

## Reports

### Allure Report

Run tests first, then serve the interactive report:

```bash
npm run ui:headed
npm run gen:report
```

The Allure report includes:

- Full-page screenshot of the Wikipedia automation article (Exercise 1)
- Full error stack traces on failure
- Filter by status, suite, and severity

---

## Project Structure

```
sqli-assignment/
├── playwright.config.ts              # Playwright config (reporters, timeouts, anti-bot options)
├── tsconfig.json                     # TypeScript config with path aliases
├── src/
│   ├── config/
│   │   ├── env.config.ts             # Base URLs (Google, PetStore API)
│   │   ├── page.config.ts            # Playwright fixtures (googleSearchPage, wikipediaPage)
│   │   ├── page-loader.ts            # Barrel export for all page objects
│   │   └── util.config.ts            # PetNameAnalyzer class
│   ├── gui/
│   │   └── pages/
│   │       ├── BasePage.ts           # Shared base: onGoogleSearch(), getAutomationYear(), getWikipediaLink()
│   │       ├── GoogleSearchPage.ts   # step_navigate(), step_search(), step_clickWikipediaResult()
│   │       └── WikipediaPage.ts      # verify_onWikipedia(), verify_articleContainsYear(), step_takeScreenshot()
│   └── api/
│       └── clients/
│           ├── BaseClient.ts         # HTTP client base (GET, POST, handleResponse)
│           └── PetStoreClient.ts     # PetStore methods + PetStoreUserFactory
└── tests/
    ├── exercise1-web.spec.ts         # Exercise 1: Google → Wikipedia automation
    ├── exercise2-user.spec.ts        # Exercise 2: PetStore user create & retrieve
    └── exercise2-pets.spec.ts        # Exercise 2: Sold pets list + name frequency
```

---

## Key Design Decisions

### Page Object Model

- `BasePage` holds shared infrastructure: Google navigation setup (`onGoogleSearch`), Wikipedia link locator, and automation year extraction (`getAutomationYear`)
- `GoogleSearchPage` and `WikipediaPage` extend `BasePage` with fluent `step_*` and `verify_*` methods
- Fixtures in `page.config.ts` inject page objects directly into tests — no `new` at the test level

### API Layer

- `BaseClient` provides generic `get()` and `post()` template with logging, query-string building
- `PetStoreClient` extends `BaseClient` with domain methods: `createUser`, `getUser`, `getSoldPets`
- `PetStoreUserFactory.create(overrides?)` generates realistic fake user data via `@faker-js/faker` — keeps test data setup out of test files

### Test Data

- `PetStoreUserFactory` is co-located with `PetStoreClient` — one import covers both client and factory
- `PetNameAnalyzer` takes the `{id, name}[]` tuple array in its constructor and exposes `listTuples()` and `countByName()`

### Anti-Bot Configuration

Google search automation uses:

- `navigator.webdriver` masked via `addInitScript`
- `--disable-blink-features=AutomationControlled` launch flag
- `Accept-Language: en-US` forced via `extraHTTPHeaders`
- XPath selector targeting `jsname="UWckNb"` organic result links only

---

## Test Results

Allure Report — all tests passing

---


## Author

Shiwantha Lakmal