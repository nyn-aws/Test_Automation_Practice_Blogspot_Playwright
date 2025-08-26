import { Page, Locator, FrameLocator } from "@playwright/test";
export class Homepage {
  private page: Page;
  public locators: Record<string, Locator>;
  public frameLocators: Record<string, FrameLocator>;
  public months: string[];
  constructor(page: Page) {
    this.page = page;
    this.locators = this.initLocators();
    this.frameLocators = this.initFrameLocators();
    this.months = [
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
  }

  //   got will goto baseURL in config by default but we can also specify the url as parameter
  async goto(url: string = "") {
    await this.page.goto(url);
    await this.page.waitForLoadState("networkidle");
  }

  private initLocators(): Record<string, Locator> {
    const roleLocatorsSection = this.page.locator("#role-locators");
    const textLocatorsSection = this.page.locator("#text-locators");
    const labelLocatorSection = this.page.locator("#label-locators");
    const placeholderLocatorsSection = this.page.locator(
      "#placeholder-locators"
    );
    const alttextLocators = this.page.locator("#alttext-locators");
    const titleLocatorsSection = this.page.locator("#title-locators");
    const testidLocatorsSection = this.page.locator("#testid-locators");
    const staticWebTableBookTable = this.page
      .getByText("Static Web Table BookName")
      .getByRole("table");
    const dynamicWebTable = this.page.locator("#taskTable");
    const paginationWebTableSection = this.page.getByText(
      "Pagination Web Table ID Name"
    );
    const uiDatepickerWidget = this.page.locator(
      "//div[contains(@class, 'ui-datepicker ui-widget')] "
    );
    const flightDetailsTable = this.page.getByRole("table");

    return {
      // Get By Role
      roleLocatorsSection: roleLocatorsSection,
      buttonsHeading: this.page.getByRole("heading", { name: "Buttons" }),
      primaryActionButton: this.page.getByRole("button", {
        name: "Primary Action",
      }),
      toggleButton: this.page.getByRole("button", { name: "Toggle Button" }),
      divWithButtonRole: this.page.getByRole("button", {
        name: "Div with button role",
      }),
      formElementsHeading: this.page.getByRole("heading", {
        name: "Form Elements",
      }),
      textbox: roleLocatorsSection.getByRole("textbox"),
      acceptTermsCheckbox: roleLocatorsSection.getByRole("checkbox", {
        name: "Accept terms",
      }),
      navigationHeading: this.page.getByRole("heading", { name: "Navigation" }),
      homeLink: roleLocatorsSection.getByRole("link", { name: "Home" }),
      productsLink: roleLocatorsSection.getByRole("link", { name: "Products" }),
      contactLink: roleLocatorsSection.getByRole("link", { name: "Contact" }),

      // Get By Text
      getByTextHeading: textLocatorsSection.getByText("getByText()"),
      textByTextContent: textLocatorsSection.getByText(
        "Locate elements by their text content."
      ),
      importantTextParagraph: textLocatorsSection.getByText(
        "This paragraph contains some important text that you might want to locate."
      ),
      coloredTextParagraph: textLocatorsSection.getByText(
        "Another paragraph with colored text for demonstration."
      ),
      listItem1: textLocatorsSection.getByText("List item 1"),
      listItem2WithLink: textLocatorsSection.getByText("List item 2 with link"),
      specialUniqueTextIdentifier: this.page.getByText(
        "Special: Unique text identifier"
      ),
      submitFormButton: textLocatorsSection.getByText("Submit Form"),
      submitInformationText: textLocatorsSection.getByText(
        "Click the button above to submit your information."
      ),

      // Get By Label
      emailAddressInput: labelLocatorSection.getByLabel("Email Address:"),
      passwordInput: labelLocatorSection.getByLabel("Password:"),
      ageInput: labelLocatorSection.getByLabel("Your Age:"),
      shippingStandardRadio: labelLocatorSection.getByLabel("Standard"),
      shippingExpressRadio: labelLocatorSection.getByLabel("Express"),

      // Get By Placeholder
      fullNamePlaceholder: placeholderLocatorsSection.getByPlaceholder(
        "Enter your full name"
      ),
      phoneNumberPlaceholder: placeholderLocatorsSection.getByPlaceholder(
        "Phone number (xxx-xxx-xxxx)"
      ),
      messagePlaceholder: placeholderLocatorsSection.getByPlaceholder(
        "Type your message here..."
      ),
      searchProductsPlaceholder:
        placeholderLocatorsSection.getByPlaceholder("Search products..."),

      // Get By AltText
      playwrightLogo: alttextLocators.getByAltText("logo image"),

      // Get By Title
      homePageLinkTitle: titleLocatorsSection.getByTitle("Home page link"),
      htmlTitle: titleLocatorsSection.getByTitle("HyperText Markup Language"),
      tooltipText: titleLocatorsSection.getByTitle("Tooltip text"),
      saveChangesButtonTitle: titleLocatorsSection.getByTitle(
        "Click to save your changes"
      ),

      // Get By TestId
      editProfileButton: testidLocatorsSection.getByTestId("edit-profile-btn"),
      productCard1: testidLocatorsSection.getByTestId("product-card-1"),
      productName1: testidLocatorsSection
        .getByTestId("product-card-1")
        .getByTestId("product-name"),
      productPrice1: testidLocatorsSection
        .getByTestId("product-card-1")
        .getByTestId("product-price"),
      productCard2: testidLocatorsSection.getByTestId("product-card-2"),
      productName2: testidLocatorsSection
        .getByTestId("product-card-2")
        .getByTestId("product-name"),
      productPrice2: testidLocatorsSection
        .getByTestId("product-card-2")
        .getByTestId("product-price"),
      productCard3: testidLocatorsSection.getByTestId("product-card-3"),
      productName3: testidLocatorsSection
        .getByTestId("product-card-3")
        .getByTestId("product-name"),
      productPrice3: testidLocatorsSection
        .getByTestId("product-card-3")
        .getByTestId("product-price"),
      mainNavigation: testidLocatorsSection.getByTestId("main-navigation"),
      navHomeLink: testidLocatorsSection
        .getByTestId("main-navigation")
        .getByTestId("nav-home")
        .getByRole("link", { name: "Home" }),
      navProductsLink: testidLocatorsSection
        .getByTestId("main-navigation")
        .getByTestId("nav-products")
        .getByRole("link", { name: "Products" }),
      navContactLink: testidLocatorsSection
        .getByTestId("main-navigation")
        .getByTestId("nav-contact")
        .getByRole("link", { name: "Contact" }),

      // Static Web Table
      staticWebTableBookTable: staticWebTableBookTable,
      staticWebTableRows: staticWebTableBookTable.locator("tbody tr"),
      staticWebTableColumns: staticWebTableBookTable.locator("tbody th"),
      staticWebTableSecondRowCells: staticWebTableBookTable
        .locator("tbody tr")
        .nth(1)
        .locator("td"),

      // Dynamic Web Table
      dynamicWebTable: dynamicWebTable,
      dynamicWebTableHead: dynamicWebTable.locator("thead"),
      dynamicWebTableBody: dynamicWebTable.locator("tbody"),
      dynamicWebTableBodyRows: dynamicWebTable.locator("tbody tr"),

      // Pagination Web Table (from test.spec.ts)
      paginationWebTableSection: paginationWebTableSection,
      paginationWebTableList: paginationWebTableSection.locator("ul li a"),
      paginationWebTableTable: paginationWebTableSection.locator("table"),
      paginationWebTableRows: paginationWebTableSection.locator("tbody tr"),

      // Handling Mouse and Keyboard Actions
      pointMeButton: this.page.getByRole("button", { name: "Point Me" }),
      copyTextButton: this.page.getByRole("button", { name: "Copy Text" }),
      sourceElement: this.page.getByText("Drag me to my target"),
      targetElement: this.page.locator("#droppable"),
      sliderElement1: this.page.locator(".ui-slider-handle ").first(),
      sliderElement2: this.page.locator(".ui-slider-handle ").nth(1),
      priceRangeLocator: this.page.getByLabel("Price range:"),
      comboBoxInput: this.page.locator("#comboBox"),
      item86Option: this.page.locator(
        '//div[@class="option"][text()="Item 86"]'
      ),
      field2Input: this.page.locator("#field2"), // From test_2.spec.ts, but used in Mouse/Keyboard test

      // Download Files
      downloadFilesLink: this.page.getByText("Download Files"),
      downloadFilesHeading: this.page.getByRole("heading", {
        name: "Download Files",
      }),
      downloadTextOrPdfHeading: this.page.getByRole("heading", {
        name: "Download a Text or PDF File",
      }),
      enterTextField: this.page.getByRole("textbox", { name: "Enter text" }),
      generateAndDownloadTextFileButton: this.page.getByRole("button", {
        name: "Generate and Download Text File",
      }),
      generateAndDownloadPdfFileButton: this.page.getByRole("button", {
        name: "Generate and Download PDF File",
        exact: true,
      }),
      downloadPdfFileButton: this.page.getByRole("button", {
        name: "Download PDF File",
        exact: true,
      }),
      txtDownloadLink: this.page.locator("#txtDownloadLink"),
      pdfDownloadLink: this.page.locator("#pdfDownloadLink"),

      // Text Input and Assertions (from test_2.spec.ts)
      nameInput: this.page.getByRole("textbox", { name: "Enter Name" }),
      emailInput: this.page.getByPlaceholder("Enter EMail"),
      phoneInput: this.page.getByPlaceholder("Enter Phone"),
      addressInput: this.page.getByRole("textbox", { name: "Address:" }),

      // Checkbox and Radio Button Assertions (from test_2.spec.ts)
      genderText: this.page.getByText("Gender:"),
      maleRadio: this.page.getByRole("radio", { name: "Male", exact: true }),
      femaleRadio: this.page.getByRole("radio", { name: "Female" }),
      daysText: this.page.getByText("Days:"),
      sundayCheckbox: this.page.getByRole("checkbox", { name: "Sunday" }),
      mondayCheckbox: this.page.getByRole("checkbox", { name: "Monday" }),
      tuesdayCheckbox: this.page.getByRole("checkbox", { name: "Tuesday" }),
      wednesdayCheckbox: this.page.getByRole("checkbox", { name: "Wednesday" }),
      thursdayCheckbox: this.page.getByRole("checkbox", { name: "Thursday" }),
      fridayCheckbox: this.page.getByRole("checkbox", { name: "Friday" }),
      saturdayCheckbox: this.page.getByRole("checkbox", { name: "Saturday" }),

      // Single and multi-select Dropdowns assertions (from test_2.spec.ts)
      countryDropdownDefault: this.page.getByLabel("country"),
      colorsDropdownDefault: this.page.locator("#colors"),
      sortedListDropdownDefault: this.page.locator("#animals"),
      colorsDropdownOptions: this.page.locator("#colors option"),
      countryDropdownOptions: this.page.locator("#country option"),
      sortedListDropdownOptions: this.page.locator("#animals option"),

      // Date Picker
      jQueryDatepicker: this.page.locator("#datepicker"),
      uiDatepickerWidget: uiDatepickerWidget,
      uiDatepickerMonth: uiDatepickerWidget.locator(".ui-datepicker-month"),
      uiDatepickerYear: uiDatepickerWidget.locator(".ui-datepicker-year"),
      nextButton: uiDatepickerWidget.locator("//a[@title='Next']"),
      prevButton: uiDatepickerWidget.locator("//a[@title='Prev']"),
      datePickerType2: this.page.locator("#txtDate"),
      uiDatepickerDivType2: this.page.locator("#ui-datepicker-div"),
      selectMonthDropdown: this.page.getByLabel("Select month"),
      selectYearDropdown: this.page.getByLabel("Select year"),

      // Different Alerts
      simpleAlertButton: this.page.getByRole("button", {
        name: "Simple Alert",
      }),
      confirmationAlertButton: this.page.getByRole("button", {
        name: "Confirmation Alert",
      }),
      confirmationMessage: this.page.getByText("You pressed OK!"),
      promptAlertButton: this.page.getByRole("button", {
        name: "Prompt Alert",
      }),

      // Handling Tabs and Popup Windows
      newTabButton: this.page.getByRole("button", { name: "New Tab" }),
      popupWindowsButton: this.page.getByRole("button", {
        name: "Popup Windows",
      }),
    };
  }

  private initFrameLocators(): Record<string, FrameLocator> {
    return {
      frame1ByUrl: this.page.frameLocator('iframe[src="frame_1.html"]'),
      frame2BySrc: this.page.frameLocator('[src="frame_2.html"]'),
      frame3ByUrl: this.page.frameLocator('iframe[src="frame_3.html"]'),
      frame4BySrc: this.page.frameLocator('[src="frame_4.html"]'),
    };
  }
}
