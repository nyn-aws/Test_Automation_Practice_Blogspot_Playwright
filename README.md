# Playwright Test Automation Project

This project contains Playwright automated tests for various web applications, including a blogspot practice site, datatables.net, BlazeDemo, and Books by Kilo. The tests are designed to demonstrate different Playwright features and best practices for web automation.

## Setup Instructions

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nyn-aws/Test_Automation_Practice_Blogspot_Playwright.git
    cd Test_Automation_Practice_Blogspot_Playwright
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

## How to Run Tests

To run the tests, use the following commands:

- **Run all tests:**

  ```bash
  npx playwright test
  ```

- **Run tests with a specific tag (e.g., `@regression`):**

  ```bash
  npx playwright test --grep @regression
  ```

- **Run tests in UI mode:**

  ```bash
  npx playwright test --ui
  ```

- **Run tests in headed mode (shows browser UI):**

  ```bash
  npx playwright test --headed
  ```

- **Generate an HTML report after a test run:**
  ```bash
  npx playwright show-report
  ```

## Project Structure

- `tests/`: Contains all the test specifications.
  - `homepage_basic_elements.spec.ts`: Tests for basic elements on the automation practice blogspot.
  - `homepage_advanced_elements.spec.ts`: Tests for advanced elements on the automation practice blogspot.
  - `datatables.spec.ts`: Tests for `datatables.net`.
  - `blazedemo.spec.ts`: Tests for `blazedemo.com`.
  - `booksbykilo.spec.ts`: Tests for `booksbykilo.in` (Infinite Scroll).
- `src/pages/`: Contains Page Object Model (POM) classes.
  - `homepage.ts`: Page object for the automation practice blogspot.
  - `datatable_homepage.ts`: Page object for `datatables.net`.
  - `blazedemo.ts`: Page object for `blazedemo.com`.
- `playwright.config.ts`: Playwright configuration file.
- `package.json`: Project dependencies and scripts.
- `README.md`: Project documentation (this file).
- `.github/workflows/playwright.yml`: GitHub Actions workflow for CI/CD.
