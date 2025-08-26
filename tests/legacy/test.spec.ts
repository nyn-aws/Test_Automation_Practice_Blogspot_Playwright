// import { test, expect, Locator } from "@playwright/test";
// import fs from "fs";
// test("Validate URL and title", async ({ page }) => {
//   await page.goto("/p/playwrightpractice.html");
//   await page.waitForLoadState("networkidle");
//   await expect(page).toHaveTitle(
//     "Automation Testing Practice: PlaywrightPractice"
//   );
//   await expect(page).toHaveURL(
//     "https://testautomationpractice.blogspot.com/p/playwrightpractice.html"
//   );
// });

// test.describe("Playwright Locators", () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     await page.goto("/p/playwrightpractice.html");
//     // Log test info and with Proper message execution started for a given test
//     console.log(`Test started: ${testInfo.title}`);
//   });
//   test.afterEach(async ({ page }, testInfo) => {
//     await page.waitForLoadState("networkidle");
//     // Log test execution details with passed and fail along with timing in one line also add if for undefined
//     console.log(
//       `Test finished: ${testInfo.title} | Test status: ${testInfo.status} | Test duration: ${testInfo.duration}ms`
//     );
//   });

//   test("Get By Role", { tag: ["@smoke"] }, async ({ page }) => {
//     const role_locators_section: Locator = page.locator("#role-locators");
//     await expect(page.getByRole("heading", { name: "Buttons" })).toBeVisible();
//     await page.getByRole("button", { name: "Primary Action" }).hover();
//     await page.getByRole("button", { name: "Toggle Button" }).click();
//     await page.getByRole("button", { name: "Div with button role" }).hover();

//     await expect(
//       page.getByRole("heading", { name: "Form Elements" })
//     ).toBeVisible();
//     await role_locators_section.getByRole("textbox").fill("Hello World");
//     await role_locators_section
//       .getByRole("checkbox", { name: "Accept terms" })
//       .check();
//     await expect(
//       role_locators_section.getByRole("checkbox", { name: "Accept terms" })
//     ).toBeChecked();

//     // Navigation Links
//     await expect(
//       page.getByRole("heading", { name: "Navigation" })
//     ).toBeVisible();
//     const home = role_locators_section.getByRole("link", { name: "Home" });
//     const products = role_locators_section.getByRole("link", {
//       name: "Products",
//     });
//     const contact = role_locators_section.getByRole("link", {
//       name: "Contact",
//     });

//     // Different assertions to be used on links
//     // Visibility
//     await expect(home).toBeVisible();
//     await expect(products).toBeVisible();
//     await expect(contact).toBeVisible();

//     // State
//     await expect(home).toBeEnabled();
//     await expect(products).toBeEnabled();
//     await expect(contact).toBeEnabled();

//     // Href attribure
//     await expect(home).toHaveAttribute("href", "#");
//     await expect(products).toHaveAttribute("href", "#");
//     await expect(contact).toHaveAttribute("href", "#");

//     // Text Content
//     await expect(home).toHaveText("Home");
//     await expect(products).toHaveText("Products");
//     await expect(contact).toHaveText("Contact");
//   });

//   test("Get By Text", { tag: ["@smoke"] }, async ({ page }) => {
//     const text_locators_section: Locator = page.locator("#text-locators");

//     await expect(text_locators_section.getByText("getByText()")).toBeVisible();

//     const text_2 = text_locators_section.getByText(
//       "Locate elements by their text content."
//     );
//     await expect(text_2).toBeVisible();
//     await expect(text_2).toHaveText("Locate elements by their text content.");

//     const text_3 = text_locators_section.getByText(
//       "This paragraph contains some important text that you might want to locate."
//     );
//     await expect(text_3).toBeVisible();
//     await expect(text_3).toContainText("important text");

//     const text_4 = text_locators_section.getByText(
//       "Another paragraph with colored text for demonstration."
//     );
//     await expect(text_4).toBeVisible();

//     const text_5 = text_locators_section.getByText("List item 1");
//     await expect(text_5).toBeVisible();
//     await expect(text_5).toHaveText("List item 1");

//     const text_6 = text_locators_section.getByText("List item 2 with link");
//     await expect(text_6).toBeVisible();
//     await expect(text_6).toContainText("link");

//     const text_7 = page.getByText("Special: Unique text identifier");
//     await expect(text_7).toBeVisible();
//     await expect(text_7).toHaveText("Special: Unique text identifier");

//     const submit_form_button_1 = text_locators_section.getByText("Submit Form");
//     await expect(submit_form_button_1).toBeVisible();
//     await expect(submit_form_button_1).toBeEnabled();

//     const text_8 = text_locators_section.getByText(
//       "Click the button above to submit your information."
//     );
//     await expect(text_8).toBeVisible();
//     await expect(text_8).toContainText("submit your information");
//   });

//   test("Get By Label", { tag: ["@smoke"] }, async ({ page }) => {
//     const label_locator_section: Locator = page.locator("#label-locators");
//     const email_address_input: Locator =
//       label_locator_section.getByLabel("Email Address:");
//     const password_input: Locator =
//       label_locator_section.getByLabel("Password:");
//     const age_input: Locator = label_locator_section.getByLabel("Your Age:");
//     const shipping_standard: Locator =
//       label_locator_section.getByLabel("Standard");
//     const shipping_express: Locator =
//       label_locator_section.getByLabel("Express");

//     // assertions
//     await expect(email_address_input).toBeVisible();
//     await expect(email_address_input).toBeEnabled();
//     // two ways to validate an attribute
//     await expect(email_address_input).toHaveAttribute("type", "email");
//     expect(await email_address_input.getAttribute("type")).toBe("email");
//     await expect(email_address_input).toHaveValue("");

//     await expect(password_input).toBeVisible();
//     await expect(password_input).toBeEnabled();
//     await expect(password_input).toHaveAttribute("type", "password");
//     await expect(password_input).toHaveValue("");

//     await expect(age_input).toBeVisible();
//     await expect(age_input).toBeEnabled();
//     await expect(age_input).toHaveAttribute("type", "number");
//     await expect(age_input).toHaveValue("");

//     await expect(shipping_standard).toBeVisible();
//     await expect(shipping_standard).toBeEnabled();
//     await expect(shipping_standard).toHaveAttribute("type", "radio");
//     await expect(shipping_standard).toHaveValue("standard");

//     await expect(shipping_express).toBeVisible();
//     await expect(shipping_express).toBeEnabled();
//     await expect(shipping_express).toHaveAttribute("type", "radio");
//     await expect(shipping_express).toHaveValue("express");

//     // actions
//     await email_address_input.fill("email@email.com");
//     await password_input.fill("password");
//     for (let index = 0; index < 70; index++) {
//       await age_input.press("ArrowUp");
//     }
//     await shipping_standard.click();
//     await shipping_express.click();

//     // assertions
//     await expect(email_address_input).toHaveValue("email@email.com");
//     // another way to validate the input value
//     expect(await email_address_input.inputValue()).toBe("email@email.com");
//     await expect(password_input).toHaveValue("password");
//     await expect(age_input).toHaveValue("70");
//     await expect(shipping_express).toBeChecked();
//     await expect(shipping_standard).not.toBeChecked();
//   });

//   test("Get By Placeholder", { tag: ["@smoke"] }, async ({ page }) => {
//     const placeholder_locators_section: Locator = page.locator(
//       "#placeholder-locators"
//     );
//     const fullname_placeholder: Locator =
//       placeholder_locators_section.getByPlaceholder("Enter your full name");
//     const phone_number_placeholder: Locator =
//       placeholder_locators_section.getByPlaceholder(
//         "Phone number (xxx-xxx-xxxx)"
//       );
//     const message_placeholder: Locator =
//       placeholder_locators_section.getByPlaceholder(
//         "Type your message here..."
//       );
//     const search_products_placeholder: Locator =
//       placeholder_locators_section.getByPlaceholder("Search products...");
//     const message_text =
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
//     // assertions
//     await expect(fullname_placeholder).toBeVisible();
//     await expect(fullname_placeholder).toBeEnabled();
//     await expect(fullname_placeholder).toHaveAttribute("type", "text");
//     await expect(fullname_placeholder).toHaveValue("");

//     await expect(phone_number_placeholder).toBeVisible();
//     await expect(phone_number_placeholder).toBeEnabled();
//     await expect(phone_number_placeholder).toHaveAttribute("type", "tel");
//     await expect(phone_number_placeholder).toHaveValue("");

//     await expect(message_placeholder).toBeVisible();
//     await expect(message_placeholder).toBeEnabled();
//     await expect(message_placeholder).toHaveValue("");

//     await expect(search_products_placeholder).toBeVisible();
//     await expect(search_products_placeholder).toBeEnabled();
//     await expect(search_products_placeholder).toHaveAttribute("type", "search");
//     await expect(search_products_placeholder).toHaveValue("");

//     // actions
//     await fullname_placeholder.fill("FirstName LastName");
//     await phone_number_placeholder.fill("123-456-7890");
//     await message_placeholder.fill(message_text);
//     await search_products_placeholder.fill("Product 123");

//     // assertions
//     await expect(fullname_placeholder).toHaveValue("FirstName LastName");
//     await expect(phone_number_placeholder).toHaveValue("123-456-7890");
//     await expect(message_placeholder).toHaveValue(message_text);
//     await expect(search_products_placeholder).toHaveValue("Product 123");
//   });

//   test("Get By AltText", { tag: ["@smoke"] }, async ({ page }) => {
//     const alttext_locators: Locator = page.locator("#alttext-locators");
//     const playwright_logo: Locator =
//       alttext_locators.getByAltText("logo image");
//     // assertions
//     await expect(playwright_logo).toBeVisible();
//     await expect(playwright_logo).toHaveAttribute(
//       "src",
//       "https://playwright.dev/img/playwright-logo.svg"
//     );
//     await expect(playwright_logo).toHaveAttribute("alt", "logo image");
//   });

//   test("Get By Title", { tag: ["@smoke"] }, async ({ page }) => {
//     const title_locators_section: Locator = page.locator("#title-locators");
//     const home_title: Locator =
//       title_locators_section.getByTitle("Home page link");
//     const HTML_title: Locator = title_locators_section.getByTitle(
//       "HyperText Markup Language"
//     );
//     const tooltip_title: Locator =
//       title_locators_section.getByTitle("Tooltip text");
//     const save_button_title: Locator = title_locators_section.getByTitle(
//       "Click to save your changes"
//     );

//     // assertions
//     await expect(home_title).toBeVisible();
//     await expect(home_title).toHaveText("Home");

//     await expect(HTML_title).toBeVisible();
//     await expect(HTML_title).toHaveText("HTML");

//     await expect(tooltip_title).toBeVisible();
//     await expect(tooltip_title).toHaveText("This text has a tooltip");

//     await expect(save_button_title).toBeVisible();
//     await expect(save_button_title).toHaveText("Save");

//     // Note: Generaally to validate tooltips, you need to hover over the element
//     // in playwrwright youse validate the title attribute of the element
//     // and then you can use the getByTitle locator to validate the tooltip text
//     await tooltip_title.hover();
//     await expect(tooltip_title).toHaveAttribute("title", "Tooltip text");
//   });

//   test("Get By TestId", { tag: ["@smoke"] }, async ({ page }) => {
//     // Locators
//     const testid_locators_section: Locator = page.locator("#testid-locators");
//     const edit_profile_btn: Locator =
//       testid_locators_section.getByTestId("edit-profile-btn");
//     const product_card_1: Locator =
//       testid_locators_section.getByTestId("product-card-1");
//     const product_name_1: Locator = product_card_1.getByTestId("product-name");
//     const product_price_1: Locator =
//       product_card_1.getByTestId("product-price");
//     const product_card_2: Locator =
//       testid_locators_section.getByTestId("product-card-2");
//     const product_name_2: Locator = product_card_2.getByTestId("product-name");
//     const product_price_2: Locator =
//       product_card_2.getByTestId("product-price");
//     const product_card_3: Locator =
//       testid_locators_section.getByTestId("product-card-3");
//     const product_name_3: Locator = product_card_3.getByTestId("product-name");
//     const product_price_3: Locator =
//       product_card_3.getByTestId("product-price");
//     const main_navigation: Locator =
//       testid_locators_section.getByTestId("main-navigation");
//     const home_link: Locator = main_navigation
//       .getByTestId("nav-home")
//       .getByRole("link", { name: "Home" });
//     const products_link: Locator = main_navigation
//       .getByTestId("nav-products")
//       .getByRole("link", { name: "Products" });
//     const contact_link: Locator = main_navigation
//       .getByTestId("nav-contact")
//       .getByRole("link", { name: "Contact" });

//     // assertions
//     await expect(edit_profile_btn).toBeVisible();
//     await expect(edit_profile_btn).toBeEnabled();
//     await expect(edit_profile_btn).toHaveText("Edit Profile");

//     await expect(product_card_1).toBeVisible();
//     await expect(product_card_1).toBeEnabled();
//     await expect(product_name_1).toHaveText("Product A");
//     await expect(product_price_1).toHaveText("$19.99");

//     await expect(product_card_2).toBeVisible();
//     await expect(product_card_2).toBeEnabled();
//     await expect(product_name_2).toHaveText("Product B");
//     await expect(product_price_2).toHaveText("$29.99");

//     await expect(product_card_3).toBeVisible();
//     await expect(product_card_3).toBeEnabled();
//     await expect(product_name_3).toHaveText("Product C");
//     await expect(product_price_3).toHaveText("$39.99");

//     await expect(main_navigation).toBeVisible();
//     await expect(main_navigation).toBeEnabled();
//     await expect(home_link).toBeVisible();
//     await expect(home_link).toHaveText("Home");
//     await expect(products_link).toBeVisible();
//     await expect(products_link).toHaveText("Products");
//     await expect(contact_link).toBeVisible();
//     await expect(contact_link).toHaveText("Contact");
//   });

//   test("Static Web Table", async ({ page }) => {
//     // Table and its validations
//     const BookTable: Locator = page
//       .getByText("Static Web Table BookName")
//       .getByRole("table");

//     await expect(BookTable).toBeVisible();

//     const rows: Locator = BookTable.locator("tbody tr");
//     await expect(rows).toHaveCount(7);
//     expect(await rows.count()).toBe(7);

//     const columns: Locator = BookTable.locator("tbody th");
//     await expect(columns).toHaveCount(4);
//     expect(await columns.count()).toBe(4);

//     // Read all the data from 2nd row
//     const second_row_cells: Locator = rows.nth(1).locator("td");
//     const second_row_cells_text: string[] =
//       await second_row_cells.allInnerTexts();

//     console.log(second_row_cells_text);
//     expect(second_row_cells_text).toContain("Selenium");

//     // Read all the data from the table
//     console.log("Printing all the table data");
//     const all_rows: Locator[] = await rows.all();

//     for (const row of all_rows) {
//       // Pretty print all row data
//       console.log((await row.locator("td,th").allInnerTexts()).join("\t"));
//     }

//     // Based on book name, find the author
//     const bookname: string = "Learn JS";

//     for (const row of all_rows) {
//       const row_data = await row.locator("td,th").allInnerTexts();
//       if (row_data.includes(bookname)) {
//         console.log("The AUTHOR IS " + row_data[1]);
//         break;
//       }
//     }

//     // Calculate the total price of the books
//     let total_sum = 0;
//     for (const row of all_rows.slice(1)) {
//       const cells = await row.locator("td,th").allInnerTexts();
//       const price = Number(cells[3]);
//       total_sum += price;
//     }

//     console.log("Total price of the books:", total_sum);
//     expect(total_sum).toEqual(7100);
//   });

//   test("Dynamic Web Table", async ({ page }) => {
//     const dynamic_table: Locator = page.locator("#taskTable");
//     const dynamic_table_head: Locator = dynamic_table.locator("thead");
//     const dynamic_table_body: Locator = dynamic_table.locator("tbody");
//     const dynamic_table_body_rows: Locator = dynamic_table_body.locator("tr");

//     expect(dynamic_table).toBeVisible();

//     // For Chrome Process, get the value of CPU Load.
//     // In dynamic tables, the order of rows and columns may change.
//     // First, we have to identify the column order before targeting rows.
//     const column_names_locator: Locator[] = await dynamic_table_head.all();
//     let column_names_array: string[] = [];
//     let process_name_index: number;
//     let cpu_index: number;
//     for (const column of column_names_locator) {
//       column_names_array = await column.locator("th").allInnerTexts();
//     }
//     console.log(column_names_array);
//     process_name_index = column_names_array.indexOf("Name");
//     cpu_index = column_names_array.indexOf("CPU (%)");

//     const all_rows = await dynamic_table_body_rows.all();
//     for (const row of all_rows) {
//       const row_data_array = await row.locator("td").allTextContents();
//       if (row_data_array.includes("Chrome")) {
//         const validation_message =
//           `CPU load of Chrome process: ` + row_data_array[cpu_index];
//         console.log(validation_message);
//         expect(await page.getByText("CPU load of ").innerText()).toEqual(
//           validation_message
//         );
//         break;
//       }
//     }
//   });

//   test("Pagination Web Table", async ({ page }) => {
//     // Objective is to read and print all data of the pagination table
//     const pagination_web_table: Locator = page.getByText(
//       "Pagination Web Table ID Name"
//     );
//     const pagination_list: Locator = pagination_web_table.locator("ul li a");
//     const pagination_table: Locator = pagination_web_table.locator("table");
//     const pagination_table_rows: Locator = pagination_table.locator("tbody tr");
//     for (const page_link of await pagination_list.all()) {
//       await page_link.click();
//       await page.waitForLoadState("networkidle");
//       for (const row of await pagination_table_rows.all()) {
//         console.log(await row.innerText());
//       }
//     }
//   });

//   test("Handling Mouse and Keyboard Actions", async ({ page }) => {
//     // Handling Hover actions
//     const point_me_button: Locator = page.getByRole("button", {
//       name: "Point Me",
//     });
//     await point_me_button.hover();
//     await page.locator(".dropdown-content  a").first().hover();

//     // Double click
//     await expect(page.locator("#field2")).toHaveValue("");
//     const copy_text_button: Locator = page.getByRole("button", {
//       name: "Copy Text",
//     });
//     await copy_text_button.dblclick();
//     await expect(page.locator("#field2")).toHaveValue("Hello World!");

//     // Drag and Drop
//     const source_element: Locator = page.getByText("Drag me to my target");
//     const target_element: Locator = page.locator("#droppable");
//     await source_element.dragTo(target_element);
//     await page.waitForTimeout(1000);
//     await expect(target_element).toHaveText("Dropped!");

//     // Slider element
//     const slider_element_1: Locator = page
//       .locator(".ui-slider-handle ")
//       .first();
//     const slider_element_2: Locator = page.locator(".ui-slider-handle ").nth(1);
//     const price_range_locator: Locator = page.getByLabel("Price range:");
//     console.log(await price_range_locator.inputValue());
//     // Press ArrowLeft 5 times using loop
//     for (let i = 0; i < 5; i++) {
//       await slider_element_1.press("ArrowLeft");
//     }
//     // Press ArrowRight 15 times using loop
//     for (let i = 0; i < 15; i++) {
//       await slider_element_2.press("ArrowRight");
//     }
//     expect(await price_range_locator.inputValue()).toEqual("$70 - $315");

//     // Selecting an element from Scrolling Dropdown
//     const combobox_input: Locator = page.locator("#comboBox");
//     await combobox_input.click();
//     const item_86: Locator = page.locator(
//       '//div[@class="option"][text()="Item 86"]'
//     );
//     await item_86.click();
//     await expect(combobox_input).toHaveValue("Item 86");
//   });

//   test("Download Files", async ({ page }) => {
//     const download_files_link: Locator = page.getByText("Download Files");
//     await download_files_link.click();
//     await page.waitForLoadState("networkidle");

//     const download_files_heading: Locator = page.getByRole("heading", {
//       name: "Download Files",
//     });
//     await expect(download_files_heading).toBeVisible();
//     const download_text_or_pdf_heading: Locator = page.getByRole("heading", {
//       name: "Download a Text or PDF File",
//     });

//     await expect(download_text_or_pdf_heading).toBeVisible();
//     const enter_text_field: Locator = page.getByRole("textbox", {
//       name: "Enter text",
//     });
//     await expect(enter_text_field).toBeVisible();

//     // Info: Whatever text is input in this textbox will be available for download in text or PDF format

//     const text_download_button: Locator = page.getByRole("button", {
//       name: "Generate and Download Text File",
//     });
//     const pdf_download_button: Locator = page.getByRole("button", {
//       name: "Generate and Download PDF File",
//       exact: true,
//     });
//     const pdf_download_button_2: Locator = page.getByRole("button", {
//       name: "Download PDF File",
//       exact: true,
//     });

//     await expect(text_download_button).toBeVisible();
//     await expect(pdf_download_button).toBeVisible();
//     await expect(pdf_download_button_2).toBeVisible();

//     const download_text_link: Locator = page.locator("#txtDownloadLink");
//     const download_pdf_link: Locator = page.locator("#pdfDownloadLink");
//     await enter_text_field.fill("This is test data");
//     await text_download_button.click();
//     const [download1] = await Promise.all([
//       page.waitForEvent("download"),
//       download_text_link.click(),
//     ]);
//     // Save downloaded file to desired location
//     const downloadPath = "tests/downloads/" + download1.suggestedFilename();
//     await download1.saveAs(downloadPath);
//     await pdf_download_button.click();
//     const [download2] = await Promise.all([
//       page.waitForEvent("download"),
//       download_pdf_link.click(),
//     ]);

//     // Save downloaded file to desired location
//     const downloadPath2 = "tests/downloads/" + download2.suggestedFilename();
//     await download2.saveAs(downloadPath2);
//     await page.waitForLoadState("networkidle");
//     // Asynchronously delete downloaded files
//     await fs.promises.rm("tests/downloads", { recursive: true, force: true });

//     await page.waitForLoadState("networkidle");
//   });
// });
