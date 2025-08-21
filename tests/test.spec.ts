import { test, expect } from "@playwright/test";

test("Validate URL and title", async ({ page }) => {
  await page.goto("/p/playwrightpractice.html");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveTitle(
    "Automation Testing Practice: PlaywrightPractice"
  );
  await expect(page).toHaveURL(
    "https://testautomationpractice.blogspot.com/p/playwrightpractice.html"
  );
});

test.describe("Playwright Locators", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/p/playwrightpractice.html");
    await page.waitForLoadState("networkidle");
  });
  test("Get By Role", { tag: ["@smoke"] }, async ({ page }) => {
    const role_locators_section = page.locator("#role-locators");
    await expect(page.getByRole("heading", { name: "Buttons" })).toBeVisible();
    await page.getByRole("button", { name: "Primary Action" }).hover();
    await page.getByRole("button", { name: "Toggle Button" }).click();
    await page.getByRole("button", { name: "Div with button role" }).hover();

    await expect(
      page.getByRole("heading", { name: "Form Elements" })
    ).toBeVisible();
    await role_locators_section.getByRole("textbox").fill("Hello World");
    await role_locators_section
      .getByRole("checkbox", { name: "Accept terms" })
      .check();
    await expect(
      role_locators_section.getByRole("checkbox", { name: "Accept terms" })
    ).toBeChecked();

    // Navigation Links
    await expect(
      page.getByRole("heading", { name: "Navigation" })
    ).toBeVisible();
    const home = role_locators_section.getByRole("link", { name: "Home" });
    const products = role_locators_section.getByRole("link", {
      name: "Products",
    });
    const contact = role_locators_section.getByRole("link", {
      name: "Contact",
    });

    // Different assertions to be used on links
    // Visibility
    await expect(home).toBeVisible();
    await expect(products).toBeVisible();
    await expect(contact).toBeVisible();

    // State
    await expect(home).toBeEnabled();
    await expect(products).toBeEnabled();
    await expect(contact).toBeEnabled();

    // Href attribure
    await expect(home).toHaveAttribute("href", "#");
    await expect(products).toHaveAttribute("href", "#");
    await expect(contact).toHaveAttribute("href", "#");

    // Text Content
    await expect(home).toHaveText("Home");
    await expect(products).toHaveText("Products");
    await expect(contact).toHaveText("Contact");
  });

  test("Get By Text", { tag: ["@smoke"] }, async ({ page }) => {
    const text_locators_section = page.locator("#text-locators");

    await expect(text_locators_section.getByText("getByText()")).toBeVisible();

    const text_2 = text_locators_section.getByText(
      "Locate elements by their text content."
    );
    await expect(text_2).toBeVisible();
    await expect(text_2).toHaveText("Locate elements by their text content.");

    const text_3 = text_locators_section.getByText(
      "This paragraph contains some important text that you might want to locate."
    );
    await expect(text_3).toBeVisible();
    await expect(text_3).toContainText("important text");

    const text_4 = text_locators_section.getByText(
      "Another paragraph with colored text for demonstration."
    );
    await expect(text_4).toBeVisible();

    const text_5 = text_locators_section.getByText("List item 1");
    await expect(text_5).toBeVisible();
    await expect(text_5).toHaveText("List item 1");

    const text_6 = text_locators_section.getByText("List item 2 with link");
    await expect(text_6).toBeVisible();
    await expect(text_6).toContainText("link");

    const text_7 = page.getByText("Special: Unique text identifier");
    await expect(text_7).toBeVisible();
    await expect(text_7).toHaveText("Special: Unique text identifier");

    const submit_form_button_1 = text_locators_section.getByText("Submit Form");
    await expect(submit_form_button_1).toBeVisible();
    await expect(submit_form_button_1).toBeEnabled();

    const text_8 = text_locators_section.getByText(
      "Click the button above to submit your information."
    );
    await expect(text_8).toBeVisible();
    await expect(text_8).toContainText("submit your information");
  });

  test("Get By Label", { tag: ["@smoke"] }, async ({ page }) => {
    const label_locator_section = page.locator("#label-locators");
    const email_address_input =
      label_locator_section.getByLabel("Email Address:");
    const password_input = label_locator_section.getByLabel("Password:");
    const age_input = label_locator_section.getByLabel("Your Age:");
    const shipping_standard = label_locator_section.getByLabel("Standard");
    const shipping_express = label_locator_section.getByLabel("Express");

    // assertions
    await expect(email_address_input).toBeVisible();
    await expect(email_address_input).toBeEnabled();
    await expect(email_address_input).toHaveAttribute("type", "email");
    await expect(email_address_input).toHaveValue("");

    await expect(password_input).toBeVisible();
    await expect(password_input).toBeEnabled();
    await expect(password_input).toHaveAttribute("type", "password");
    await expect(password_input).toHaveValue("");

    await expect(age_input).toBeVisible();
    await expect(age_input).toBeEnabled();
    await expect(age_input).toHaveAttribute("type", "number");
    await expect(age_input).toHaveValue("");

    await expect(shipping_standard).toBeVisible();
    await expect(shipping_standard).toBeEnabled();
    await expect(shipping_standard).toHaveAttribute("type", "radio");
    await expect(shipping_standard).toHaveValue("standard");

    await expect(shipping_express).toBeVisible();
    await expect(shipping_express).toBeEnabled();
    await expect(shipping_express).toHaveAttribute("type", "radio");
    await expect(shipping_express).toHaveValue("express");

    // actions
    await email_address_input.fill("email@email.com");
    await password_input.fill("password");
    for (let index = 0; index < 70; index++) {
      await age_input.press("ArrowUp");
    }
    await shipping_standard.click();
    await shipping_express.click();

    // assertions
    await expect(email_address_input).toHaveValue("email@email.com");
    await expect(password_input).toHaveValue("password");
    await expect(age_input).toHaveValue("70");
    await expect(shipping_express).toBeChecked();
    await expect(shipping_standard).not.toBeChecked();
  });

  test("Get By Placeholder", { tag: ["@smoke"] }, async ({ page }) => {
    const placeholder_locators_section = page.locator("#placeholder-locators");
    const fullname_placeholder = placeholder_locators_section.getByPlaceholder(
      "Enter your full name"
    );
    const phone_number_placeholder =
      placeholder_locators_section.getByPlaceholder(
        "Phone number (xxx-xxx-xxxx)"
      );
    const message_placeholder = placeholder_locators_section.getByPlaceholder(
      "Type your message here..."
    );
    const search_products_placeholder =
      placeholder_locators_section.getByPlaceholder("Search products...");
    const message_text =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    // assertions
    await expect(fullname_placeholder).toBeVisible();
    await expect(fullname_placeholder).toBeEnabled();
    await expect(fullname_placeholder).toHaveAttribute("type", "text");
    await expect(fullname_placeholder).toHaveValue("");

    await expect(phone_number_placeholder).toBeVisible();
    await expect(phone_number_placeholder).toBeEnabled();
    await expect(phone_number_placeholder).toHaveAttribute("type", "tel");
    await expect(phone_number_placeholder).toHaveValue("");

    await expect(message_placeholder).toBeVisible();
    await expect(message_placeholder).toBeEnabled();
    await expect(message_placeholder).toHaveValue("");

    await expect(search_products_placeholder).toBeVisible();
    await expect(search_products_placeholder).toBeEnabled();
    await expect(search_products_placeholder).toHaveAttribute("type", "search");
    await expect(search_products_placeholder).toHaveValue("");

    // actions
    await fullname_placeholder.fill("FirstName LastName");
    await phone_number_placeholder.fill("123-456-7890");
    await message_placeholder.fill(message_text);
    await search_products_placeholder.fill("Product 123");

    // assertions
    await expect(fullname_placeholder).toHaveValue("FirstName LastName");
    await expect(phone_number_placeholder).toHaveValue("123-456-7890");
    await expect(message_placeholder).toHaveValue(message_text);
    await expect(search_products_placeholder).toHaveValue("Product 123");
  });

  test("Get By AltText", { tag: ["@smoke"] }, async ({ page }) => {
    const alttext_locators = page.locator("#alttext-locators");
    const playwright_logo = alttext_locators.getByAltText("logo image");
    // assertions
    await expect(playwright_logo).toBeVisible();
    await expect(playwright_logo).toHaveAttribute(
      "src",
      "https://playwright.dev/img/playwright-logo.svg"
    );
    await expect(playwright_logo).toHaveAttribute("alt", "logo image");
  });

  test("Get By Title", { tag: ["@smoke"] }, async ({ page }) => {
    const title_locators_section = page.locator("#title-locators");
    const home_title = title_locators_section.getByTitle("Home page link");
    const HTML_title = title_locators_section.getByTitle(
      "HyperText Markup Language"
    );
    const tooltip_title = title_locators_section.getByTitle("Tooltip text");
    const save_button_title = title_locators_section.getByTitle(
      "Click to save your changes"
    );

    // assertions
    await expect(home_title).toBeVisible();
    await expect(home_title).toHaveText("Home");

    await expect(HTML_title).toBeVisible();
    await expect(HTML_title).toHaveText("HTML");

    await expect(tooltip_title).toBeVisible();
    await expect(tooltip_title).toHaveText("This text has a tooltip");

    await expect(save_button_title).toBeVisible();
    await expect(save_button_title).toHaveText("Save");

    // Note: Generaally to validate tooltips, you need to hover over the element
    // in playwrright youse validate the title attribute of the element
    // and then you can use the getByTitle locator to validate the tooltip text
    await tooltip_title.hover();
    await expect(tooltip_title).toHaveAttribute("title", "Tooltip text");
  });

  test("Get By TestId", { tag: ["@smoke"] }, async ({ page }) => {
    // Locators
    const testid_locators_section = page.locator("#testid-locators");
    const edit_profile_btn =
      testid_locators_section.getByTestId("edit-profile-btn");
    const product_card_1 =
      testid_locators_section.getByTestId("product-card-1");
    const product_name_1 = product_card_1.getByTestId("product-name");
    const product_price_1 = product_card_1.getByTestId("product-price");
    const product_card_2 =
      testid_locators_section.getByTestId("product-card-2");
    const product_name_2 = product_card_2.getByTestId("product-name");
    const product_price_2 = product_card_2.getByTestId("product-price");
    const product_card_3 =
      testid_locators_section.getByTestId("product-card-3");
    const product_name_3 = product_card_3.getByTestId("product-name");
    const product_price_3 = product_card_3.getByTestId("product-price");
    const main_navigation =
      testid_locators_section.getByTestId("main-navigation");
    const home_link = main_navigation
      .getByTestId("nav-home")
      .getByRole("link", { name: "Home" });
    const products_link = main_navigation
      .getByTestId("nav-products")
      .getByRole("link", { name: "Products" });
    const contact_link = main_navigation
      .getByTestId("nav-contact")
      .getByRole("link", { name: "Contact" });

    // assertions
    await expect(edit_profile_btn).toBeVisible();
    await expect(edit_profile_btn).toBeEnabled();
    await expect(edit_profile_btn).toHaveText("Edit Profile");

    await expect(product_card_1).toBeVisible();
    await expect(product_card_1).toBeEnabled();
    await expect(product_name_1).toHaveText("Product A");
    await expect(product_price_1).toHaveText("$19.99");

    await expect(product_card_2).toBeVisible();
    await expect(product_card_2).toBeEnabled();
    await expect(product_name_2).toHaveText("Product B");
    await expect(product_price_2).toHaveText("$29.99");

    await expect(product_card_3).toBeVisible();
    await expect(product_card_3).toBeEnabled();
    await expect(product_name_3).toHaveText("Product C");
    await expect(product_price_3).toHaveText("$39.99");

    await expect(main_navigation).toBeVisible();
    await expect(main_navigation).toBeEnabled();
    await expect(home_link).toBeVisible();
    await expect(home_link).toHaveText("Home");
    await expect(products_link).toBeVisible();
    await expect(products_link).toHaveText("Products");
    await expect(contact_link).toBeVisible();
    await expect(contact_link).toHaveText("Contact");
  });
});
