import { test, expect, Locator, chromium } from "@playwright/test";

test.describe("Playwright Actions and  Assertions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
    await page.waitForLoadState("networkidle");
  });
  test("Text Input and assertions", async ({ page }) => {
    // Locators
    // note since these fields have no name attribute, so what playwright does is first it looks for the label
    // associated with these, if it doesnt find any then it falls back to next field that is placeholder
    const name = page.getByRole("textbox", { name: "Enter Name" });
    const email = page.getByPlaceholder("Enter EMail");
    const phone = page.getByPlaceholder("Enter Phone");
    const address = page.getByRole("textbox", { name: "Address:" });

    // values
    const name_value = "John";
    const email_value = "email@email.com";
    const phone_value = "123456789";
    const address_value =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    // assertions before actions
    // Visible
    await expect(name).toBeVisible();
    await expect(email).toBeVisible();
    await expect(phone).toBeVisible();
    await expect(address).toBeVisible();
    // enabled
    await expect(name).toBeEnabled();
    await expect(email).toBeEnabled();
    await expect(phone).toBeEnabled();
    await expect(address).toBeEnabled();
    // value and attribute assertions
    await expect(name).toHaveValue("");
    expect(await name.getAttribute("maxlength")).toBe("15");
    await expect(email).toHaveValue("");
    expect(await email.getAttribute("maxlength")).toBe("25");
    await expect(phone).toHaveValue("");
    expect(await phone.getAttribute("maxlength")).toBe("10");
    await expect(address).toHaveValue("");

    // actions
    await name.fill(name_value);
    await email.fill(email_value);
    await phone.fill(phone_value);
    await address.fill(address_value);
    // assertions after actions
    await expect(name).toHaveValue(name_value);
    await expect(email).toHaveValue(email_value);
    await expect(phone).toHaveValue(phone_value);
    await expect(address).toHaveValue(address_value);
  });

  test("Checkbox and Radio Button assertions", async ({ page }) => {
    // locators
    const gender = page.getByText("Gender:");
    const radio_male = page.getByRole("radio", { name: "Male", exact: true });
    const radio_female = page.getByRole("radio", { name: "Female" });
    const days = page.getByText("Days:");
    const sunday = page.getByRole("checkbox", { name: "Sunday" });
    const monday = page.getByRole("checkbox", { name: "Monday" });
    const tuesday = page.getByRole("checkbox", { name: "Tuesday" });
    const wednesday = page.getByRole("checkbox", { name: "Wednesday" });
    const thursday = page.getByRole("checkbox", { name: "Thursday" });
    const friday = page.getByRole("checkbox", { name: "Friday" });
    const saturday = page.getByRole("checkbox", { name: "Saturday" });

    const days_array: string[] = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Assertions before actions
    for (const day of days_array) {
      const checkbox = page.getByRole("checkbox", { name: day });
      await expect(checkbox).toBeVisible();
      await expect(checkbox).toBeEnabled();
      await expect(checkbox).not.toBeChecked();
    }
    // visibility
    await expect(gender).toBeVisible();
    await expect(radio_male).toBeVisible();
    await expect(radio_male).toBeEnabled();
    await expect(radio_female).toBeVisible();
    await expect(radio_female).toBeEnabled();
    await expect(days).toBeVisible();

    // actions
    await radio_male.check();
    await monday.check();
    await tuesday.check();
    await wednesday.check();
    await thursday.check();
    await friday.check();

    // assertions after actions
    await expect(radio_male).toBeChecked();
    expect(await radio_female.isChecked()).toBe(false);
    await expect(monday).toBeChecked();
    await expect(tuesday).toBeChecked();
    await expect(wednesday).toBeChecked();
    await expect(thursday).toBeChecked();
    await expect(friday).toBeChecked();
    await expect(saturday).not.toBeChecked();
    await expect(sunday).not.toBeChecked();
  });

  test("Single and multi-select Dropdowns assertions", async ({ page }) => {
    // Locators
    const country_dropdown_default = page.getByLabel("country");
    const colors_dropdown_default = page.locator("#colors");
    const sorted_list_dropdown_default = page.locator("#animals");
    const colors_dropdown = page.locator("#colors option");
    const country_dropdown = page.locator("#country option");
    const sorted_list_dropdown = page.locator("#animals option");

    const country_dropdown_options_raw =
      await country_dropdown.allTextContents();
    const country_dropdown_options = country_dropdown_options_raw.map((opt) =>
      opt.trim()
    );
    const colors_dropdown_options_raw = await colors_dropdown.allTextContents();
    const colors_dropdown_options = colors_dropdown_options_raw.map((e) =>
      e.trim()
    );
    const sorted_list_dropdown_options_raw =
      await sorted_list_dropdown.allTextContents();
    const sorted_list_dropdown_options = sorted_list_dropdown_options_raw.map(
      (e) => e.trim()
    );

    // Print all dropdown Options
    console.log(country_dropdown_options);
    console.log(colors_dropdown_options);
    console.log(sorted_list_dropdown_options);

    // Country Dropdown Validation
    await expect(country_dropdown_default).toHaveValue("usa");
    await expect(country_dropdown_options).toContain("India");
    await expect(country_dropdown_options).toHaveLength(10);
    await country_dropdown_default.selectOption("India");
    await expect(country_dropdown_default).toHaveValue("india");

    // Colors Multiselect dropdown
    await expect(colors_dropdown_options).toHaveLength(7);
    await colors_dropdown_default.selectOption(["Yellow", "White"]);

    // Sorted list dropdown
    const sorted_list_dropdown_options_original = [
      ...sorted_list_dropdown_options,
    ];
    const sorted_list_dropdown_options_sorted = [
      ...sorted_list_dropdown_options,
    ].sort();
    expect(sorted_list_dropdown_options_original).toEqual(
      sorted_list_dropdown_options_sorted
    );
  });

  test("Static Web Table", async ({ page }) => {
    // Table and its validations
    const BookTable: Locator = page
      .getByText("Static Web Table BookName")
      .getByRole("table");

    await expect(BookTable).toBeVisible();

    const rows: Locator = BookTable.locator("tbody tr");
    await expect(rows).toHaveCount(7);
    expect(await rows.count()).toBe(7);

    const columns: Locator = BookTable.locator("tbody th");
    await expect(columns).toHaveCount(4);
    expect(await columns.count()).toBe(4);

    // Read all the data from 2nd row
    const second_row_cells: Locator = rows.nth(1).locator("td");
    const second_row_cells_text: string[] =
      await second_row_cells.allInnerTexts();

    console.log(second_row_cells_text);
    expect(second_row_cells_text).toContain("Selenium");

    // Read all the data from the table
    console.log("Printing all the table data");
    const all_rows: Locator[] = await rows.all();

    for (const row of all_rows) {
      // Pretty print all row data
      console.log((await row.locator("td,th").allInnerTexts()).join("\t"));
    }

    // Based on book name, find the author
    const bookname: string = "Learn JS";

    for (const row of all_rows) {
      const row_data = await row.locator("td,th").allInnerTexts();
      if (row_data.includes(bookname)) {
        console.log("The AUTHOR IS " + row_data[1]);
        break;
      }
    }

    // Calculate the total price of the books
    let total_sum = 0;
    for (const row of all_rows.slice(1)) {
      const cells = await row.locator("td,th").allInnerTexts();
      const price = Number(cells[3]);
      total_sum += price;
    }

    console.log("Total price of the books:", total_sum);
    expect(total_sum).toEqual(7100);
  });

  test("Dynamic Web Table", async ({ page }) => {
    const dynamic_table = page.locator("#taskTable");
    const dynamic_table_head = dynamic_table.locator("thead");
    const dynamic_table_body = dynamic_table.locator("tbody");
    const dynamic_table_body_rows = dynamic_table_body.locator("tr");

    expect(dynamic_table).toBeVisible();

    // For Chrome Process get the value of CPU Load
    // in dynamic table order of rows and column may change so
    // First we have to identify the column order before targetting rows
    const column_names_locator: Locator[] = await dynamic_table_head.all();
    let column_names_array: string[] = [];
    let process_name_index: number;
    let cpu_index: number;
    for (const column of column_names_locator) {
      column_names_array = await column.locator("th").allInnerTexts();
    }
    console.log(column_names_array);
    process_name_index = column_names_array.indexOf("Name");
    cpu_index = column_names_array.indexOf("CPU (%)");

    const all_rows = await dynamic_table_body_rows.all();
    for (const row of all_rows) {
      const row_data_array = await row.locator("td").allTextContents();
      if (row_data_array.includes("Chrome")) {
        const validation_message =
          `CPU load of Chrome process: ` + row_data_array[cpu_index];
        console.log(validation_message);
        expect(await page.getByText("CPU load of ").innerText()).toEqual(
          validation_message
        );
        break;
      }
    }
  });

  test("Pagination Web Table", async ({ page }) => {
    // Objective is read and print all data of pagination table
    const pagination_web_table = page.getByText("Pagination Web Table ID Name");
    const pagination_list = pagination_web_table.locator("ul li a");
    const pagination_table = pagination_web_table.locator("table");
    const pagination_table_rows = pagination_table.locator("tbody tr");
    for (const page_link of await pagination_list.all()) {
      await page_link.click();
      await page.waitForLoadState("networkidle");
      for (const row of await pagination_table_rows.all()) {
        console.log(await row.innerText());
      }
    }
  });

  test("Handling Mouse Actions", async ({ page }) => {
    // Handling Hover actions
    const point_me_button = page.getByRole("button", { name: "Point Me" });
    await point_me_button.hover();
    await page.locator(".dropdown-content  a").first().hover();
    await page.waitForTimeout(5000);
  });
});

test.describe("Date Picker", () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  test.beforeEach(async ({ page }) => {
    await page.goto("");
    await page.waitForLoadState("networkidle");
  });
  test("Date Picker: Type 1", async ({ page }) => {
    // Simple use fill methods
    // provide string of the date
    const jQuery_datepicker = page.locator("#datepicker");
    await expect(jQuery_datepicker).toHaveValue("");
    const date_value = "12/12/2122";
    await jQuery_datepicker.fill(date_value);
    await expect(jQuery_datepicker).toHaveValue(date_value);
  });

  test("Date Picker: Type 1 : Method 2", async ({ page }) => {
    // Using datepicker on the same page (no redirection)
    const jQuery_datepicker = page.locator("#datepicker");
    await expect(jQuery_datepicker).toHaveValue("");

    // Target date
    const targetYear = 2027;
    const targetMonth = "December";
    const targetDay = "12";

    // Open datepicker
    await jQuery_datepicker.click();

    const ui_datepicker_widget = page.locator(
      "//div[contains(@class, 'ui-datepicker ui-widget')]"
    );
    const ui_month = ui_datepicker_widget.locator(".ui-datepicker-month");
    const ui_year = ui_datepicker_widget.locator(".ui-datepicker-year");
    const next_button = ui_datepicker_widget.locator("//a[@title='Next']");
    const prev_button = ui_datepicker_widget.locator("//a[@title='Prev']");

    // Adjust year
    while (parseInt(await ui_year.innerText()) !== targetYear) {
      if (parseInt(await ui_year.innerText()) < targetYear) {
        await next_button.click();
      } else {
        await prev_button.click();
      }
    }

    while ((await ui_month.innerText()) !== targetMonth) {
      const currentMonth = await ui_month.innerText();
      if (months.indexOf(currentMonth) < months.indexOf(targetMonth)) {
        await next_button.click();
      } else {
        await prev_button.click();
      }
    }

    // Select the target day
    const ui_day = ui_datepicker_widget.locator(`//a[text()="${targetDay}"]`);
    await ui_day.click();

    await expect(jQuery_datepicker).toHaveValue(
      `${months.indexOf(targetMonth) + 1}/${targetDay}/${targetYear}`
    );
  });

  test("DatePicker: Type 2", async ({ page }) => {
    const date_picker_2 = page.locator("#txtDate");
    const jQuery_datepicker_2 = page.locator("#ui-datepicker-div");
    const select_month = page.getByLabel("Select month");
    const select_year = page.getByLabel("Select year");

    // Target Date
    const month = "December";
    const year = 2080;
    const day = 12;
    await date_picker_2.click();
    await select_month.selectOption({ value: `${months.indexOf(month)}` });
    await select_year.selectOption("2035");
    await select_year.selectOption("2045");
    await select_year.selectOption("2055");
    await select_year.selectOption("2045");
    await jQuery_datepicker_2.locator(`//*[@data-date='${day}']`).click();

    // assertions
    await expect(date_picker_2).toHaveValue(
      `${months.indexOf(month) + 1}/${day}/${year}`
    );
  });
});

test.describe("Pagination Web Table : https://datatables.net/", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://datatables.net/");
    await page.waitForLoadState("networkidle");
  });

  test("Pagination Web Table - Read all pages", async ({ page }) => {
    const data_tables_example_rows = page.locator("#example tbody tr");

    while (true) {
      const all_rows = await data_tables_example_rows.all();
      for (const row of all_rows) {
        console.log(await row.innerText());
      }
      const next_button = page.locator("//button[@aria-label='Next']");
      if (await next_button.isEnabled()) {
        await next_button.click();
      } else {
        break;
      }
    }
  });

  test("Pagination Web Table - Change number of rows", async ({ page }) => {
    const data_tables_example_rows = page.locator("#example tbody tr");
    const number_of_rows_dropdown = page.locator("#dt-length-0");

    await expect(data_tables_example_rows).toHaveCount(10);
    await number_of_rows_dropdown.selectOption("25");
    await expect(data_tables_example_rows).toHaveCount(25);
    await number_of_rows_dropdown.selectOption("50");
    await expect(data_tables_example_rows).toHaveCount(50);
    await number_of_rows_dropdown.selectOption("100");
    await expect(data_tables_example_rows).toHaveCount(57);
  });

  test("Pagination Web Table - Search validation", async ({ page }) => {
    const data_tables_example_rows = page.locator("#example tbody tr");
    const search_in_data_table = page.getByRole("searchbox", {
      name: "Search:",
    });
    const name_to_search = "Michael Bruce";

    await search_in_data_table.fill(name_to_search);
    await page.waitForLoadState("networkidle");

    for (const row of await data_tables_example_rows.all()) {
      const row_data = await row.allInnerTexts();
      if (row_data.includes(name_to_search)) {
        console.log("Found:", row_data);
        expect(row_data).toContain(name_to_search);
      }
    }
  });
});

test.describe("BlazeDemo: Flight Booking Automation: https://blazedemo.com/", () => {
  test("Flight Booking Automation", async ({ page }) => {
    // Navigate to homepage
    await page.goto("https://blazedemo.com/");

    // Validate welcome heading
    const welcome_heading = page.getByRole("heading", {
      name: "Welcome to the Simple Travel",
    });
    await expect(welcome_heading).toBeVisible();

    // Dropdowns
    const departure_dropdown = page.locator('select[name="fromPort"]');
    const destination_dropdown = page.locator('select[name="toPort"]');

    await expect(departure_dropdown).toBeVisible();
    await expect(destination_dropdown).toBeVisible();

    // Validate default dropdown values
    await expect(departure_dropdown).toHaveValue("Paris");
    await expect(destination_dropdown).toHaveValue("Buenos Aires");

    // Select departure = Boston, destination = London
    await departure_dropdown.selectOption("Boston");
    await destination_dropdown.selectOption("London");

    // Click Find Flights
    const find_flights_button = page.getByRole("button", {
      name: "Find Flights",
    });
    await find_flights_button.click();
    await page.waitForLoadState("networkidle");

    // Validate flights page
    const flight_details_heading = page.getByText(
      "Flights from Boston to London:"
    );
    await expect(flight_details_heading).toBeVisible();

    // Read flight details
    const flight_details_table = page.getByRole("table");
    const flight_rows = flight_details_table.locator("tbody tr");

    console.log(`Available flights: ${await flight_rows.count()}`);
    await expect(flight_rows).toHaveCount(5);

    // Extract all prices
    const flight_prices: string[] = [];
    for (const row of await flight_rows.all()) {
      const price = await row.locator("td:nth-child(7)").innerText();
      flight_prices.push(price);
    }
    console.log(`Flight prices: ${flight_prices.join(", ")}`);

    // Convert string prices → numbers
    const prices = flight_prices.map((p) => Number(p.slice(1)));
    console.log(prices);

    const sorted_prices = [...prices].sort((a, b) => a - b);
    console.log(`The Lowest fare is ${sorted_prices[0]}`);

    const indexOf_lowest_price = prices.indexOf(sorted_prices[0]);

    // Select the lowest-priced flight
    for (const row of await flight_rows.all()) {
      const row_Data = row.locator("td").allInnerTexts();
      if ((await row_Data).includes(flight_prices[indexOf_lowest_price])) {
        await row.getByRole("button").click();
        await page.waitForLoadState("networkidle");
        break;
      }
    }

    // Reservation form
    const reservation_heading = page.getByRole("heading", {
      name: "has been reserved",
    });

    const your_name = page.getByPlaceholder("First Last");
    const your_address = page.getByLabel("address");
    const your_city = page.getByLabel("city");
    const your_state = page.getByLabel("state");
    const your_state_zipcode = page.locator("#zipCode");
    const card_type = page.locator("#cardType");
    const cc_number = page.locator("#creditCardNumber");
    const cc_month = page.getByPlaceholder("Month");
    const cc_year = page.getByPlaceholder("Year");
    const name_on_card = page.getByLabel("Name on Card");
    const remember_me_checkbox = page.getByRole("checkbox");
    const purchase_flight_button = page.getByRole("button", {
      name: "Purchase Flight",
    });

    // Validate form fields
    await expect(reservation_heading).toBeVisible();
    await expect(your_name).toBeVisible();
    await expect(your_address).toBeVisible();
    await expect(your_city).toBeVisible();
    await expect(your_state).toBeVisible();
    await expect(your_state_zipcode).toBeVisible();
    await expect(card_type).toBeVisible();
    await expect(cc_number).toBeVisible();
    await expect(cc_month).toBeVisible();
    await expect(cc_year).toBeVisible();
    await expect(name_on_card).toBeVisible();
    await expect(remember_me_checkbox).toBeVisible();
    await expect(purchase_flight_button).toBeVisible();

    // Fill in form
    await your_name.fill("John Doe");
    await your_address.fill("123 Main St");
    await your_city.fill("Anytown");
    await your_state.fill("CA");
    await your_state_zipcode.fill("12345");
    await card_type.selectOption("Visa");
    await cc_number.fill("4111111111111111");
    await cc_month.fill("12");
    await cc_year.fill("2025");
    await name_on_card.fill("John Doe");
    await remember_me_checkbox.check();

    // Assertions on entered values
    await expect(your_name).toHaveValue("John Doe");
    await expect(your_address).toHaveValue("123 Main St");
    await expect(your_city).toHaveValue("Anytown");
    await expect(your_state).toHaveValue("CA");
    await expect(your_state_zipcode).toHaveValue("12345");
    await expect(card_type).toHaveValue("visa");
    await expect(cc_number).toHaveValue("4111111111111111");
    await expect(cc_month).toHaveValue("12");
    await expect(cc_year).toHaveValue("2025");
    await expect(name_on_card).toHaveValue("John Doe");
    await expect(remember_me_checkbox).toBeChecked();

    // Submit form
    await purchase_flight_button.click();

    // Confirmation
    const purchase_confirmation = page.getByText(
      "Thank you for your purchase today!"
    );
    await expect(purchase_confirmation).toBeVisible();
  });
});

test.describe("Different Alerts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
    await page.waitForLoadState("networkidle");
  });
  test("Simple Alert", async ({ page }) => {
    const simple_alert = page.getByRole("button", { name: "Simple Alert" });
    page.on("dialog", async (dialog) => {
      console.log("Dialog Type:", dialog.type());
      console.log("Dialog message:", dialog.message());
      await dialog.accept();
    });
    await simple_alert.click();
  });

  test("Confirmation Alert", async ({ page }) => {
    const confirm_dialog = page.getByRole("button", {
      name: "Confirmation Alert",
    });
    page.on("dialog", async (dialog) => {
      console.log("Dialog Type:", dialog.type());
      console.log("Dialog message:", dialog.message());
      await dialog.accept();
    });
    await confirm_dialog.click();

    const confirmation_message = page.getByText("You pressed OK!");
    await expect(confirmation_message).toBeVisible();
  });

  test("Prompt Alert", async ({ page }) => {
    const prompt_dialog = page.getByRole("button", { name: "Prompt Alert" });
    const username = "Test User";
    page.on("dialog", async (dialog) => {
      console.log("Dialog Type:", dialog.type());
      console.log("Dialog message:", dialog.message());
      console.log("Dialog default value:", dialog.defaultValue());

      await dialog.accept(username);
    });
    await prompt_dialog.click();
    expect(
      await page.getByText(`Hello ${username}! How are you today?`)
    ).toBeTruthy();
  });
});

test.describe("Frames", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");
  });

  test("Validating Number of Frames", async ({ page }) => {
    const all_frames = page.frames();
    console.log("Number of frames:", all_frames.length);

    // Approach 1
    const frame1 = page.frame({
      url: "https://ui.vision/demo/webtest/frames/frame_1.html",
    });
    if (frame1) {
      console.log("Frame 1 is available");
      const frame1_text = frame1.getByRole("textbox");
      await frame1_text.fill("Testing frame 1");
      await expect(frame1_text).toHaveValue("Testing frame 1");
    } else {
      console.log("Frame 1 is not available");
    }

    // Approach using FrameLocator
    const frame2 = page.frameLocator('[src="frame_2.html"]');
    await frame2.getByRole("textbox").fill("Testing frame 2");
    await expect(frame2.getByRole("textbox")).toHaveValue("Testing frame 2");

    const frame4 = page.frameLocator('[src="frame_4.html"]');
    await frame4.getByRole("textbox").fill("Testing frame 4");
    await expect(frame4.getByRole("textbox")).toHaveValue("Testing frame 4");

    // Nested Frames

    const parentFrame = page.frame({
      url: "https://ui.vision/demo/webtest/frames/frame_3.html",
    });
    if (parentFrame) {
      await parentFrame.getByRole("textbox").fill("Testing frame 3");
      await expect(parentFrame.getByRole("textbox")).toHaveValue(
        "Testing frame 3"
      );
      const childFrames = parentFrame.childFrames();
      console.log("Number of child frames:", childFrames.length);
      // assertion
      await expect(childFrames.length).toBeGreaterThan(0);
      for (const childFrame of childFrames) {
        console.log("Child frame URL:", childFrame.url());
      }
    } else {
      console.log("Parent frame is not available");
    }
  });
});

test.describe("Handling Tabs and Popup Windows", () => {
  test("Handling Tabs", async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("");
    const new_tab_button = page1.getByRole("button", { name: "New Tab" });

    // We require both of this to happen parallely
    const [page2] = await Promise.all([
      context.waitForEvent("page"),
      new_tab_button.click(),
    ]);
    await console.log(page2.url());

    // Use this approach when we have more than two pages
    const pages = context.pages();
    console.log(await pages[0].title());
    console.log(await pages[1].title());
  });

  test("Handling Popup", async ({ context }) => {
    const page1 = await context.newPage();

    await page1.goto("");
    const popup_button = page1.getByRole("button", { name: "Popup Windows" });

    const popups = await Promise.all([
      page1.waitForEvent("popup"),
      popup_button.click(),
    ]);

    const allPopupWindows = context.pages();
    console.log(allPopupWindows.length);

    console.log("All popup windows:");
    allPopupWindows.forEach(async (popup) => {
      console.log(`- ${await popup.title()}`);
      console.log(`- ${await popup.url()}`);
    });
  });
});

test.describe("Infinite Scroll", () => {
  test("Infinite Scroll", async ({ page }) => {
    test.slow();
    await page.goto("https://www.booksbykilo.in/books?weightrange=201to500gm");
    await page.waitForLoadState("networkidle");

    while (true) {
      let current_height = await page.evaluate(() => {
        return document.body.scrollHeight;
      });

      // Incorrect way:: Inside page.evaluate, the function runs in the browser context, not in Node/Playwright’s context.
      // That means variables like current_height don’t exist there unless you pass them in explicitly.
      // await page.evaluate(() => {
      //   window.scrollTo(0, current_height);
      // });

      // correct way
      await page.evaluate((height_value) => {
        window.scrollTo(0, height_value);
      }, current_height);
      await page.waitForTimeout(2000);
      await page.waitForLoadState("networkidle");

      let new_height = await page.evaluate(() => {
        return document.body.scrollHeight;
      });

      if (new_height === current_height) {
        break;
      }
    }

    console.log("Infinite scroll completed");
  });
});
