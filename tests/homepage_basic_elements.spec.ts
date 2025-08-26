import { test, expect, Locator } from "@playwright/test";
import { Homepage } from "../src/pages/homepage";

test.describe("Playwright Locators", () => {
  let homepage: Homepage;
  test.beforeEach(async ({ page }, testInfo) => {
    homepage = new Homepage(page);
    await homepage.goto("/p/playwrightpractice.html");
    // Log test info and with Proper message execution started for a given test
    console.log(`Test started: ${testInfo.title}`);
  });
  test.afterEach(async ({ page }, testInfo) => {
    await page.waitForLoadState("networkidle");
    // Log test execution details with passed and fail along with timing in one line also add if for undefined
    console.log(
      `Test finished: ${testInfo.title} | Test status: ${testInfo.status} | Test duration: ${testInfo.duration}ms`
    );
  });

  test(
    "Validate URL and title",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Verifies the correct URL and title of the Playwright practice homepage.",
        },
      ],
    },
    async ({ page }) => {
      await expect(page).toHaveTitle(
        "Automation Testing Practice: PlaywrightPractice"
      );
      await expect(page).toHaveURL(
        "https://testautomationpractice.blogspot.com/p/playwrightpractice.html"
      );
    }
  );

  test(
    "Get By Role",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Tests interaction with various elements located by their role, including buttons, form elements, and navigation links.",
        },
      ],
    },
    async ({ page }) => {
      await expect(homepage.locators.buttonsHeading).toBeVisible();
      await homepage.locators.primaryActionButton.hover();
      await homepage.locators.toggleButton.click();
      await homepage.locators.divWithButtonRole.hover();

      await expect(homepage.locators.formElementsHeading).toBeVisible();
      await homepage.locators.textbox.fill("Hello World");
      await homepage.locators.acceptTermsCheckbox.check();
      await expect(homepage.locators.acceptTermsCheckbox).toBeChecked();

      // Navigation Links
      await expect(homepage.locators.navigationHeading).toBeVisible();

      // Different assertions to be used on links
      // Visibility
      await expect(homepage.locators.homeLink).toBeVisible();
      await expect(homepage.locators.productsLink).toBeVisible();
      await expect(homepage.locators.contactLink).toBeVisible();

      // State
      await expect(homepage.locators.homeLink).toBeEnabled();
      await expect(homepage.locators.productsLink).toBeEnabled();
      await expect(homepage.locators.contactLink).toBeEnabled();

      // Href attribure
      await expect(homepage.locators.homeLink).toHaveAttribute("href", "#");
      await expect(homepage.locators.productsLink).toHaveAttribute("href", "#");
      await expect(homepage.locators.contactLink).toHaveAttribute("href", "#");

      // Text Content
      await expect(homepage.locators.homeLink).toHaveText("Home");
      await expect(homepage.locators.productsLink).toHaveText("Products");
      await expect(homepage.locators.contactLink).toHaveText("Contact");
    }
  );

  test(
    "Get By Text",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Verifies various text-based locators and assertions for paragraphs, list items, and form submission messages.",
        },
      ],
    },
    async ({ page }) => {
      await expect(homepage.locators.getByTextHeading).toBeVisible();

      await expect(homepage.locators.textByTextContent).toBeVisible();
      await expect(homepage.locators.textByTextContent).toHaveText(
        "Locate elements by their text content."
      );

      await expect(homepage.locators.importantTextParagraph).toBeVisible();
      await expect(homepage.locators.importantTextParagraph).toContainText(
        "important text"
      );

      await expect(homepage.locators.coloredTextParagraph).toBeVisible();

      await expect(homepage.locators.listItem1).toBeVisible();
      await expect(homepage.locators.listItem1).toHaveText("List item 1");

      await expect(homepage.locators.listItem2WithLink).toBeVisible();
      await expect(homepage.locators.listItem2WithLink).toContainText("link");

      await expect(homepage.locators.specialUniqueTextIdentifier).toBeVisible();
      await expect(homepage.locators.specialUniqueTextIdentifier).toHaveText(
        "Special: Unique text identifier"
      );

      await expect(homepage.locators.submitFormButton).toBeVisible();
      await expect(homepage.locators.submitFormButton).toBeEnabled();

      await expect(homepage.locators.submitInformationText).toBeVisible();
      await expect(homepage.locators.submitInformationText).toContainText(
        "submit your information"
      );
    }
  );

  test(
    "Get By Label",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Validates form input elements located by their associated labels, including filling inputs, checking radio buttons, and asserting values.",
        },
      ],
    },
    async ({ page }) => {
      await expect(homepage.locators.emailAddressInput).toBeVisible();
      await expect(homepage.locators.emailAddressInput).toBeEnabled();
      // two ways to validate an attribute
      await expect(homepage.locators.emailAddressInput).toHaveAttribute(
        "type",
        "email"
      );
      expect(
        await homepage.locators.emailAddressInput.getAttribute("type")
      ).toBe("email");
      await expect(homepage.locators.emailAddressInput).toHaveValue("");

      await expect(homepage.locators.passwordInput).toBeVisible();
      await expect(homepage.locators.passwordInput).toBeEnabled();
      await expect(homepage.locators.passwordInput).toHaveAttribute(
        "type",
        "password"
      );
      await expect(homepage.locators.passwordInput).toHaveValue("");

      await expect(homepage.locators.ageInput).toBeVisible();
      await expect(homepage.locators.ageInput).toBeEnabled();
      await expect(homepage.locators.ageInput).toHaveAttribute(
        "type",
        "number"
      );
      await expect(homepage.locators.ageInput).toHaveValue("");

      await expect(homepage.locators.shippingStandardRadio).toBeVisible();
      await expect(homepage.locators.shippingStandardRadio).toBeEnabled();
      await expect(homepage.locators.shippingStandardRadio).toHaveAttribute(
        "type",
        "radio"
      );
      await expect(homepage.locators.shippingStandardRadio).toHaveValue(
        "standard"
      );

      await expect(homepage.locators.shippingExpressRadio).toBeVisible();
      await expect(homepage.locators.shippingExpressRadio).toBeEnabled();
      await expect(homepage.locators.shippingExpressRadio).toHaveAttribute(
        "type",
        "radio"
      );
      await expect(homepage.locators.shippingExpressRadio).toHaveValue(
        "express"
      );

      // actions
      await homepage.locators.emailAddressInput.fill("email@email.com");
      await homepage.locators.passwordInput.fill("password");
      for (let index = 0; index < 70; index++) {
        await homepage.locators.ageInput.press("ArrowUp");
      }
      await homepage.locators.shippingStandardRadio.click();
      await homepage.locators.shippingExpressRadio.click();

      // assertions
      await expect(homepage.locators.emailAddressInput).toHaveValue(
        "email@email.com"
      );
      // another way to validate the input value
      expect(await homepage.locators.emailAddressInput.inputValue()).toBe(
        "email@email.com"
      );
      await expect(homepage.locators.passwordInput).toHaveValue("password");
      await expect(homepage.locators.ageInput).toHaveValue("70");
      await expect(homepage.locators.shippingExpressRadio).toBeChecked();
      await expect(homepage.locators.shippingStandardRadio).not.toBeChecked();
    }
  );

  test(
    "Get By Placeholder",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Checks input fields identified by placeholder text, including filling and asserting values for various input types like text, tel, and search.",
        },
      ],
    },
    async ({ page }) => {
      await expect(homepage.locators.fullNamePlaceholder).toBeVisible();
      await expect(homepage.locators.fullNamePlaceholder).toBeEnabled();
      await expect(homepage.locators.fullNamePlaceholder).toHaveAttribute(
        "type",
        "text"
      );
      await expect(homepage.locators.fullNamePlaceholder).toHaveValue("");

      await expect(homepage.locators.phoneNumberPlaceholder).toBeVisible();
      await expect(homepage.locators.phoneNumberPlaceholder).toBeEnabled();
      await expect(homepage.locators.phoneNumberPlaceholder).toHaveAttribute(
        "type",
        "tel"
      );
      await expect(homepage.locators.phoneNumberPlaceholder).toHaveValue("");

      await expect(homepage.locators.messagePlaceholder).toBeVisible();
      await expect(homepage.locators.messagePlaceholder).toBeEnabled();
      await expect(homepage.locators.messagePlaceholder).toHaveValue("");

      await expect(homepage.locators.searchProductsPlaceholder).toBeVisible();
      await expect(homepage.locators.searchProductsPlaceholder).toBeEnabled();
      await expect(homepage.locators.searchProductsPlaceholder).toHaveAttribute(
        "type",
        "search"
      );
      await expect(homepage.locators.searchProductsPlaceholder).toHaveValue("");

      // actions
      await homepage.locators.fullNamePlaceholder.fill("FirstName LastName");
      await homepage.locators.phoneNumberPlaceholder.fill("123-456-7890");
      await homepage.locators.messagePlaceholder.fill(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      );
      await homepage.locators.searchProductsPlaceholder.fill("Product 123");

      // assertions
      await expect(homepage.locators.fullNamePlaceholder).toHaveValue(
        "FirstName LastName"
      );
      await expect(homepage.locators.phoneNumberPlaceholder).toHaveValue(
        "123-456-7890"
      );
      await expect(homepage.locators.messagePlaceholder).toHaveValue(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      );
      await expect(homepage.locators.searchProductsPlaceholder).toHaveValue(
        "Product 123"
      );
    }
  );

  test(
    "Get By AltText",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Validates image elements using their alt text attribute, asserting visibility and source.",
        },
      ],
    },
    async ({ page }) => {
      await expect(homepage.locators.playwrightLogo).toBeVisible();
      await expect(homepage.locators.playwrightLogo).toHaveAttribute(
        "src",
        "https://playwright.dev/img/playwright-logo.svg"
      );
      await expect(homepage.locators.playwrightLogo).toHaveAttribute(
        "alt",
        "logo image"
      );
    }
  );

  test(
    "Get By Title",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Asserts elements based on their title attribute, verifying visibility, text content, and tooltip behavior on hover.",
        },
      ],
    },
    async ({ page }) => {
      await expect(homepage.locators.homePageLinkTitle).toBeVisible();
      await expect(homepage.locators.homePageLinkTitle).toHaveText("Home");

      await expect(homepage.locators.htmlTitle).toBeVisible();
      await expect(homepage.locators.htmlTitle).toHaveText("HTML");

      await expect(homepage.locators.tooltipText).toBeVisible();
      await expect(homepage.locators.tooltipText).toHaveText(
        "This text has a tooltip"
      );

      await expect(homepage.locators.saveChangesButtonTitle).toBeVisible();
      await expect(homepage.locators.saveChangesButtonTitle).toHaveText("Save");

      // Note: Generaally to validate tooltips, you need to hover over the element
      // in playwrwright youse validate the title attribute of the element
      // and then you can use the getByTitle locator to validate the tooltip text
      await homepage.locators.tooltipText.hover();
      await expect(homepage.locators.tooltipText).toHaveAttribute(
        "title",
        "Tooltip text"
      );
    }
  );

  test(
    "Get By TestId",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Verifies elements identified by custom test IDs, including buttons, product cards, and navigation items, for robust test automation.",
        },
      ],
    },
    async ({ page }) => {
      // Locators
      await expect(homepage.locators.editProfileButton).toBeVisible();
      await expect(homepage.locators.editProfileButton).toBeEnabled();
      await expect(homepage.locators.editProfileButton).toHaveText(
        "Edit Profile"
      );

      await expect(homepage.locators.productCard1).toBeVisible();
      await expect(homepage.locators.productCard1).toBeEnabled();
      await expect(homepage.locators.productName1).toHaveText("Product A");
      await expect(homepage.locators.productPrice1).toHaveText("$19.99");

      await expect(homepage.locators.productCard2).toBeVisible();
      await expect(homepage.locators.productCard2).toBeEnabled();
      await expect(homepage.locators.productName2).toHaveText("Product B");
      await expect(homepage.locators.productPrice2).toHaveText("$29.99");

      await expect(homepage.locators.productCard3).toBeVisible();
      await expect(homepage.locators.productCard3).toBeEnabled();
      await expect(homepage.locators.productName3).toHaveText("Product C");
      await expect(homepage.locators.productPrice3).toHaveText("$39.99");

      await expect(homepage.locators.mainNavigation).toBeVisible();
      await expect(homepage.locators.mainNavigation).toBeEnabled();
      await expect(homepage.locators.navHomeLink).toBeVisible();
      await expect(homepage.locators.navHomeLink).toHaveText("Home");
      await expect(homepage.locators.navProductsLink).toBeVisible();
      await expect(homepage.locators.navProductsLink).toHaveText("Products");
      await expect(homepage.locators.navContactLink).toBeVisible();
      await expect(homepage.locators.navContactLink).toHaveText("Contact");
    }
  );
});
