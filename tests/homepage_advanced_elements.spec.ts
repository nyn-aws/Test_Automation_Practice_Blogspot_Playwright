import { test, expect } from "@playwright/test";
import { Homepage } from "../src/pages/homepage";
import fs from "fs";

test.describe("Playwright Actions and Assertions", () => {
  let homepage: Homepage;
  test.beforeEach(async ({ page }, testInfo) => {
    homepage = new Homepage(page);
    await homepage.goto();
    await page.waitForLoadState("networkidle");
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
    "Text Input and assertions",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Validates text input fields by filling them with data and asserting their values and attributes.",
        },
      ],
    },
    async ({ page }) => {
      // Locators
      // Note: since these fields have no name attribute,
      // Playwright first looks for an associated label.
      // If no label is found, itfalls back to the placeholder attribute.
      // Values
      const name_value = "John";
      const email_value = "email@email.com";
      const phone_value = "123456789";
      const address_value =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

      // Assertions before actions
      // Visible
      await expect(homepage.locators.nameInput).toBeVisible();
      await expect(homepage.locators.emailInput).toBeVisible();
      await expect(homepage.locators.phoneInput).toBeVisible();
      await expect(homepage.locators.addressInput).toBeVisible();
      // Enabled
      await expect(homepage.locators.nameInput).toBeEnabled();
      await expect(homepage.locators.emailInput).toBeEnabled();
      await expect(homepage.locators.phoneInput).toBeEnabled();
      await expect(homepage.locators.addressInput).toBeEnabled();
      // Value and attribute assertions
      await expect(homepage.locators.nameInput).toHaveValue("");
      expect(await homepage.locators.nameInput.getAttribute("maxlength")).toBe(
        "15"
      );
      await expect(homepage.locators.emailInput).toHaveValue("");
      expect(await homepage.locators.emailInput.getAttribute("maxlength")).toBe(
        "25"
      );
      await expect(homepage.locators.phoneInput).toHaveValue("");
      expect(await homepage.locators.phoneInput.getAttribute("maxlength")).toBe(
        "10"
      );
      await expect(homepage.locators.addressInput).toHaveValue("");

      // Actions
      await homepage.locators.nameInput.fill(name_value);
      await homepage.locators.emailInput.fill(email_value);
      await homepage.locators.phoneInput.fill(phone_value);
      await homepage.locators.addressInput.fill(address_value);

      // Assertions after actions
      await expect(homepage.locators.nameInput).toHaveValue(name_value);
      await expect(homepage.locators.emailInput).toHaveValue(email_value);
      await expect(homepage.locators.phoneInput).toHaveValue(phone_value);
      await expect(homepage.locators.addressInput).toHaveValue(address_value);
    }
  );

  test(
    "Checkbox and Radio Button assertions",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Verifies the functionality of checkboxes and radio buttons, including their visibility, enabled state, and checked status after interactions.",
        },
      ],
    },
    async ({ page }) => {
      // Locators

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
      // Visibility
      await expect(homepage.locators.genderText).toBeVisible();
      await expect(homepage.locators.maleRadio).toBeVisible();
      await expect(homepage.locators.maleRadio).toBeEnabled();
      await expect(homepage.locators.femaleRadio).toBeVisible();
      await expect(homepage.locators.femaleRadio).toBeEnabled();
      await expect(homepage.locators.daysText).toBeVisible();

      // Actions
      await homepage.locators.maleRadio.check();
      await homepage.locators.mondayCheckbox.check();
      await homepage.locators.tuesdayCheckbox.check();
      await homepage.locators.wednesdayCheckbox.check();
      await homepage.locators.thursdayCheckbox.check();
      await homepage.locators.fridayCheckbox.check();

      // Assertions after actions
      await expect(homepage.locators.maleRadio).toBeChecked();
      expect(await homepage.locators.femaleRadio.isChecked()).toBe(false);
      await expect(homepage.locators.mondayCheckbox).toBeChecked();
      await expect(homepage.locators.tuesdayCheckbox).toBeChecked();
      await expect(homepage.locators.wednesdayCheckbox).toBeChecked();
      await expect(homepage.locators.thursdayCheckbox).toBeChecked();
      await expect(homepage.locators.fridayCheckbox).toBeChecked();
      await expect(homepage.locators.saturdayCheckbox).not.toBeChecked();
      await expect(homepage.locators.sundayCheckbox).not.toBeChecked();
    }
  );

  test(
    "Single and multi-select Dropdowns assertions",
    {
      tag: "@regression",
      annotation: [
        {
          type: "functional",
          description:
            "Tests single and multi-select dropdowns, including validating options, selecting values, and asserting selections.",
        },
      ],
    },
    async ({ page }) => {
      // Locators

      const country_dropdown_options_raw =
        await homepage.locators.countryDropdownOptions.allTextContents();
      const country_dropdown_options = country_dropdown_options_raw.map((opt) =>
        opt.trim()
      );
      const colors_dropdown_options_raw =
        await homepage.locators.colorsDropdownOptions.allTextContents();
      const colors_dropdown_options = colors_dropdown_options_raw.map((e) =>
        e.trim()
      );
      const sorted_list_dropdown_options_raw =
        await homepage.locators.sortedListDropdownOptions.allTextContents();
      const sorted_list_dropdown_options = sorted_list_dropdown_options_raw.map(
        (e) => e.trim()
      );

      // Print all dropdown options
      console.log(country_dropdown_options);
      console.log(colors_dropdown_options);
      console.log(sorted_list_dropdown_options);

      // Country Dropdown Validation
      await expect(homepage.locators.countryDropdownDefault).toHaveValue("usa");
      await expect(country_dropdown_options).toContain("India");
      await expect(country_dropdown_options).toHaveLength(10);
      await homepage.locators.countryDropdownDefault.selectOption("India");
      await expect(homepage.locators.countryDropdownDefault).toHaveValue(
        "india"
      );

      // Colors Multi-select dropdown
      await expect(colors_dropdown_options).toHaveLength(7);
      await homepage.locators.colorsDropdownDefault.selectOption([
        "Yellow",
        "White",
      ]);

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
    }
  );

  test(
    "Static Web Table",
    {
      tag: "@regression",
      annotation: [
        {
          type: "functional",
          description:
            "Performs comprehensive validations on a static web table, including row/column counts, reading specific data, and calculating totals.",
        },
      ],
    },
    async ({ page }) => {
      // Table and its validations
      await expect(homepage.locators.staticWebTableBookTable).toBeVisible();

      await expect(homepage.locators.staticWebTableRows).toHaveCount(7);
      expect(await homepage.locators.staticWebTableRows.count()).toBe(7);

      await expect(homepage.locators.staticWebTableColumns).toHaveCount(4);
      expect(await homepage.locators.staticWebTableColumns.count()).toBe(4);

      // Read all the data from 2nd row
      const second_row_cells_text: string[] =
        await homepage.locators.staticWebTableSecondRowCells.allInnerTexts();

      console.log(second_row_cells_text);
      expect(second_row_cells_text).toContain("Selenium");

      // Read all the data from the table
      console.log("Printing all the table data");
      const all_rows = await homepage.locators.staticWebTableRows.all();

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
    }
  );

  test(
    "Dynamic Web Table",
    {
      tag: "@regression",
      annotation: [
        {
          type: "functional",
          description:
            "Validates data extraction from a dynamic web table by identifying column order and retrieving specific process information like CPU load.",
        },
      ],
    },
    async ({ page }) => {
      await expect(homepage.locators.dynamicWebTable).toBeVisible();

      // For Chrome Process, get the value of CPU Load.
      // In dynamic tables, the order of rows and columns may change.
      // First, we have to identify the column order before targeting rows.
      const column_names_locator =
        await homepage.locators.dynamicWebTableHead.all();
      let column_names_array: string[] = [];
      let process_name_index: number;
      let cpu_index: number;
      for (const column of column_names_locator) {
        column_names_array = await column.locator("th").allInnerTexts();
      }
      console.log(column_names_array);
      process_name_index = column_names_array.indexOf("Name");
      cpu_index = column_names_array.indexOf("CPU (%)");

      const all_rows = await homepage.locators.dynamicWebTableBodyRows.all();
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
    }
  );

  test(
    "Pagination Web Table",
    {
      tag: "@regression",
      annotation: [
        {
          type: "functional",
          description:
            "Reads and prints all data from a paginated web table by iterating through all pages.",
        },
      ],
    },
    async ({ page }) => {
      // Objective is to read and print all data of the pagination table
      await expect(homepage.locators.paginationWebTableSection).toBeVisible();
      for (const page_link of await homepage.locators.paginationWebTableList.all()) {
        await page_link.click();
        await page.waitForLoadState("networkidle");
        for (const row of await homepage.locators.paginationWebTableRows.all()) {
          console.log(await row.innerText());
        }
      }
    }
  );

  test(
    "Handling Mouse and Keyboard Actions",
    {
      tag: "@regression",
      annotation: [
        {
          type: "functional",
          description:
            "Tests various user interactions including hover, double click, drag and drop, slider manipulation, and selection from scrolling dropdowns.",
        },
      ],
    },
    async ({ page }) => {
      // Handling Hover actions
      await homepage.locators.pointMeButton.hover();
      await page.locator(".dropdown-content  a").first().hover();

      // Double click
      await expect(homepage.locators.field2Input).toHaveValue("");
      await homepage.locators.copyTextButton.dblclick();
      await expect(homepage.locators.field2Input).toHaveValue("Hello World!");

      // Drag and Drop
      await homepage.locators.sourceElement.dragTo(
        homepage.locators.targetElement
      );
      await page.waitForTimeout(1000);
      await expect(homepage.locators.targetElement).toHaveText("Dropped!");

      // Slider element
      console.log(await homepage.locators.priceRangeLocator.inputValue());
      // Press ArrowLeft 5 times using loop
      for (let i = 0; i < 5; i++) {
        await homepage.locators.sliderElement1.press("ArrowLeft");
      }
      // Press ArrowRight 15 times using loop
      for (let i = 0; i < 15; i++) {
        await homepage.locators.sliderElement2.press("ArrowRight");
      }
      expect(await homepage.locators.priceRangeLocator.inputValue()).toEqual(
        "$70 - $315"
      );

      // Selecting an element from Scrolling Dropdown
      await homepage.locators.comboBoxInput.click();
      await homepage.locators.item86Option.click();
      await expect(homepage.locators.comboBoxInput).toHaveValue("Item 86");
    }
  );

  test(
    "Download Files",
    {
      tag: "@regression",
      annotation: [
        {
          type: "functional",
          description:
            "Tests file download functionality, including generating and downloading text and PDF files, and asserting their content.",
        },
      ],
    },
    async ({ page }) => {
      await homepage.locators.downloadFilesLink.click();
      await page.waitForLoadState("networkidle");

      await expect(homepage.locators.downloadFilesHeading).toBeVisible();
      await expect(homepage.locators.downloadTextOrPdfHeading).toBeVisible();
      await expect(homepage.locators.enterTextField).toBeVisible();

      // Info: Whatever text is input in this textbox will be available for download in text or PDF format

      await expect(
        homepage.locators.generateAndDownloadTextFileButton
      ).toBeVisible();
      await expect(
        homepage.locators.generateAndDownloadPdfFileButton
      ).toBeVisible();
      await expect(homepage.locators.downloadPdfFileButton).toBeVisible();

      await homepage.locators.enterTextField.fill("This is test data");
      await homepage.locators.generateAndDownloadTextFileButton.click();
      const [download1] = await Promise.all([
        page.waitForEvent("download"),
        homepage.locators.txtDownloadLink.click(),
      ]);
      // Save downloaded file to desired location
      const downloadPath = "tests/downloads/" + download1.suggestedFilename();
      await download1.saveAs(downloadPath);
      await homepage.locators.generateAndDownloadPdfFileButton.click();
      const [download2] = await Promise.all([
        page.waitForEvent("download"),
        homepage.locators.pdfDownloadLink.click(),
      ]);

      // Save downloaded file to desired location
      const downloadPath2 = "tests/downloads/" + download2.suggestedFilename();
      await download2.saveAs(downloadPath2);
      await page.waitForLoadState("networkidle");
      // Asynchronously delete downloaded files
      await fs.promises.rm("tests/downloads", { recursive: true, force: true });

      await page.waitForLoadState("networkidle");
    }
  );

  // Test.afterEach
});

test.describe("Date Picker", () => {
  let homepage: Homepage;
  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    await homepage.goto();
  });
  test(
    "Date Picker: Type 1",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Verifies simple date input by filling the date picker field with a string value.",
        },
      ],
    },
    async ({ page }) => {
      // Simple use fill methods
      // Provide string of the date
      await expect(homepage.locators.jQueryDatepicker).toHaveValue("");
      const date_value = "12/12/2122";
      await homepage.locators.jQueryDatepicker.fill(date_value);
      await expect(homepage.locators.jQueryDatepicker).toHaveValue(date_value);
    }
  );

  test(
    "Date Picker: Type 1 : Method 2",
    {
      tag: "@regression",
      annotation: [
        {
          type: "functional",
          description:
            "Tests date selection using an interactive date picker, navigating through years and months to select a specific date.",
        },
      ],
    },
    async ({ page }) => {
      // Target date
      const targetYear = 2027;
      const targetMonth = "December";
      const targetDay = "12";

      // Open datepicker
      await homepage.locators.jQueryDatepicker.click();

      // Adjust year
      while (
        parseInt(await homepage.locators.uiDatepickerYear.innerText()) !==
        targetYear
      ) {
        if (
          parseInt(await homepage.locators.uiDatepickerYear.innerText()) <
          targetYear
        ) {
          await homepage.locators.nextButton.click();
        } else {
          await homepage.locators.prevButton.click();
        }
      }

      while (
        (await homepage.locators.uiDatepickerMonth.innerText()) !== targetMonth
      ) {
        const currentMonth =
          await homepage.locators.uiDatepickerMonth.innerText();
        if (
          homepage.months.indexOf(currentMonth) <
          homepage.months.indexOf(targetMonth)
        ) {
          await homepage.locators.nextButton.click();
        } else {
          await homepage.locators.prevButton.click();
        }
      }

      // Select the target day
      const ui_day = homepage.locators.uiDatepickerWidget.locator(
        `//a[text()="${targetDay}"]`
      );
      await ui_day.click();

      await expect(homepage.locators.jQueryDatepicker).toHaveValue(
        `${homepage.months.indexOf(targetMonth) + 1}/${targetDay}/${targetYear}`
      );
    }
  );

  test(
    "DatePicker: Type 2",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Verifies date selection using a dropdown-based date picker by selecting specific month, year, and day.",
        },
      ],
    },
    async ({ page }) => {
      // Target Date
      const month = "December";
      const year = 2080;
      const day = 12;
      await homepage.locators.datePickerType2.click();
      await homepage.locators.selectMonthDropdown.selectOption({
        value: `${homepage.months.indexOf(month)}`,
      });
      await homepage.locators.selectYearDropdown.selectOption("2035");
      await homepage.locators.selectYearDropdown.selectOption("2045");
      await homepage.locators.selectYearDropdown.selectOption("2055");
      await homepage.locators.selectYearDropdown.selectOption("2045");
      await homepage.locators.uiDatepickerDivType2
        .locator(`//*[@data-date='${day}']`)
        .click();

      // Assertions
      await expect(homepage.locators.datePickerType2).toHaveValue(
        `${homepage.months.indexOf(month) + 1}/${day}/2045`
      );
    }
  );
});

test.describe("Different Alerts", () => {
  let homepage: Homepage;
  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    await homepage.goto();
  });
  test(
    "Simple Alert",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Tests the handling of a simple alert by accepting it and logging its type and message.",
        },
      ],
    },
    async ({ page }) => {
      page.on("dialog", async (dialog) => {
        console.log("Dialog Type:", dialog.type());
        console.log("Dialog message:", dialog.message());
        await dialog.accept();
      });
      await homepage.locators.simpleAlertButton.click();
    }
  );

  test(
    "Confirmation Alert",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Tests the handling of a confirmation alert by accepting it and verifying a success message.",
        },
      ],
    },
    async ({ page }) => {
      page.on("dialog", async (dialog) => {
        console.log("Dialog Type:", dialog.type());
        console.log("Dialog message:", dialog.message());
        await dialog.accept();
      });
      await homepage.locators.confirmationAlertButton.click();

      await expect(homepage.locators.confirmationMessage).toBeVisible();
    }
  );

  test(
    "Prompt Alert",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Tests the handling of a prompt alert by providing input and asserting the displayed message.",
        },
      ],
    },
    async ({ page }) => {
      const username = "Test User";
      page.on("dialog", async (dialog) => {
        console.log("Dialog Type:", dialog.type());
        console.log("Dialog message:", dialog.message());
        console.log("Dialog default value:", dialog.defaultValue());

        await dialog.accept(username);
      });
      await homepage.locators.promptAlertButton.click();
      expect(
        await page.getByText(`Hello ${username}! How are you today?`)
      ).toBeTruthy();
    }
  );
});

test.describe("Frames", () => {
  let homepage: Homepage;
  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    await page.goto("https://ui.vision/demo/webtest/frames/");
  });

  test(
    "Validating Number of Frames",
    {
      tag: "@regression",
      annotation: [
        {
          type: "functional",
          description:
            "Validates frame handling by checking the number of frames and interacting with elements within both legacy frames and FrameLocators.",
        },
      ],
    },
    async ({ page }) => {
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
      await homepage.frameLocators.frame2BySrc
        .getByRole("textbox")
        .fill("Testing frame 2");
      await expect(
        homepage.frameLocators.frame2BySrc.getByRole("textbox")
      ).toHaveValue("Testing frame 2");

      await homepage.frameLocators.frame4BySrc
        .getByRole("textbox")
        .fill("Testing frame 4");
      await expect(
        homepage.frameLocators.frame4BySrc.getByRole("textbox")
      ).toHaveValue("Testing frame 4");

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
        // Assertion
        await expect(childFrames.length).toBeGreaterThan(0);
        for (const childFrame of childFrames) {
          console.log("Child frame URL:", childFrame.url());
        }
      } else {
        console.log("Parent frame is not available");
      }
    }
  );
});

test.describe("Handling Tabs and Popup Windows", () => {
  let homepage: Homepage;
  test(
    "Handling Tabs",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Tests handling of new browser tabs, verifying URL and titles of opened pages.",
        },
      ],
    },
    async ({ browser }) => {
      const context = await browser.newContext();
      const page1 = await context.newPage();
      homepage = new Homepage(page1);
      await homepage.goto();

      // We require both of these to happen in parallel
      const [page2] = await Promise.all([
        context.waitForEvent("page"),
        homepage.locators.newTabButton.click(),
      ]);
      console.log(page2.url());

      // Use this approach when we have more than two pages
      const pages = context.pages();
      console.log(await pages[0].title());
      console.log(await pages[1].title());
    }
  );

  test(
    "Handling Popup",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Tests handling of new popup windows, verifying the number of popups and logging their titles and URLs.",
        },
      ],
    },
    async ({ context }) => {
      const page1 = await context.newPage();

      homepage = new Homepage(page1);
      await homepage.goto();

      const popups = await Promise.all([
        page1.waitForEvent("popup"),
        homepage.locators.popupWindowsButton.click(),
      ]);

      const allPopupWindows = context.pages();
      console.log(allPopupWindows.length);

      console.log("All popup windows:");
      allPopupWindows.forEach(async (popup) => {
        console.log(`- ${await popup.title()}`);
        console.log(`- ${await popup.url()}`);
      });
    }
  );
});
