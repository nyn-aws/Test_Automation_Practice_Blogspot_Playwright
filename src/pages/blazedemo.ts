import { Page, Locator } from "@playwright/test";

class BlazeDemoHomepage {
  private page: Page;
  public locators: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.locators = this.initLocators();
  }

  async goto() {
    await this.page.goto("https://blazedemo.com/");
    await this.page.waitForLoadState("networkidle");
  }

  private initLocators(): Record<string, Locator> {
    const flightDetailsTable = this.page.getByRole("table");

    return {
      blazeDemoWelcomeHeading: this.page.getByRole("heading", {
        name: "Welcome to the Simple Travel",
      }),
      blazeDemoDepartureDropdown: this.page.locator('select[name="fromPort"]'),
      blazeDemoDestinationDropdown: this.page.locator('select[name="toPort"]'),
      blazeDemoFindFlightsButton: this.page.getByRole("button", {
        name: "Find Flights",
      }),
      blazeDemoFlightDetailsHeading: this.page.getByText(
        "Flights from Boston to London:"
      ),
      blazeDemoFlightDetailsTable: flightDetailsTable,
      blazeDemoFlightRows: flightDetailsTable.locator("tbody tr"),
      blazeDemoReservationHeading: this.page.getByRole("heading", {
        name: "has been reserved",
      }),
      blazeDemoYourNameInput: this.page.getByPlaceholder("First Last"),
      blazeDemoYourAddressInput: this.page.getByLabel("address"),
      blazeDemoYourCityInput: this.page.getByLabel("city"),
      blazeDemoYourStateInput: this.page.getByLabel("state"),
      blazeDemoYourZipCodeInput: this.page.locator("#zipCode"),
      blazeDemoCardTypeDropdown: this.page.locator("#cardType"),
      blazeDemoCreditCardNumberInput: this.page.locator("#creditCardNumber"),
      blazeDemoCreditCardMonthInput: this.page.getByPlaceholder("Month"),
      blazeDemoCreditCardYearInput: this.page.getByPlaceholder("Year"),
      blazeDemoNameOnCardInput: this.page.getByLabel("Name on Card"),
      blazeDemoRememberMeCheckbox: this.page.getByRole("checkbox"),
      blazeDemoPurchaseFlightButton: this.page.getByRole("button", {
        name: "Purchase Flight",
      }),
      blazeDemoPurchaseConfirmation: this.page.getByText(
        "Thank you for your purchase today!"
      ),
    };
  }
}
export default BlazeDemoHomepage;
