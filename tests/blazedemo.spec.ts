import { test, expect } from "@playwright/test";
import BlazeDemoHomepage from "../src/pages/blazedemo";

test.describe("BlazeDemo: Flight Booking Automation: https://blazedemo.com/", () => {
  let blazeDemoHomepage: BlazeDemoHomepage;
  test(
    "Flight Booking Automation",
    {
      tag: "@regression",
      annotation: [
        {
          type: "e2e",
          description:
            "Automates the flight booking process on BlazeDemo, including selection of departure/destination, finding flights, filling reservation form, and confirming purchase.",
        },
      ],
    },
    async ({ page }) => {
      blazeDemoHomepage = new BlazeDemoHomepage(page);
      await blazeDemoHomepage.goto();

      // Validate welcome heading
      await expect(
        blazeDemoHomepage.locators.blazeDemoWelcomeHeading
      ).toBeVisible();

      // Dropdowns
      await expect(
        blazeDemoHomepage.locators.blazeDemoDepartureDropdown
      ).toBeVisible();
      await expect(
        blazeDemoHomepage.locators.blazeDemoDestinationDropdown
      ).toBeVisible();

      // Validate default dropdown values
      await expect(
        blazeDemoHomepage.locators.blazeDemoDepartureDropdown
      ).toHaveValue("Paris");
      await expect(
        blazeDemoHomepage.locators.blazeDemoDestinationDropdown
      ).toHaveValue("Buenos Aires");

      // Select departure = Boston, destination = London
      await blazeDemoHomepage.locators.blazeDemoDepartureDropdown.selectOption(
        "Boston"
      );
      await blazeDemoHomepage.locators.blazeDemoDestinationDropdown.selectOption(
        "London"
      );

      // Click Find Flights
      await blazeDemoHomepage.locators.blazeDemoFindFlightsButton.click();
      await page.waitForLoadState("networkidle");

      // Validate flights page
      await expect(
        blazeDemoHomepage.locators.blazeDemoFlightDetailsHeading
      ).toBeVisible();

      // Read flight details
      console.log(
        `Available flights: ${await blazeDemoHomepage.locators.blazeDemoFlightRows.count()}`
      );
      await expect(blazeDemoHomepage.locators.blazeDemoFlightRows).toHaveCount(
        5
      );

      // Extract all prices
      const flight_prices: string[] = [];
      for (const row of await blazeDemoHomepage.locators.blazeDemoFlightRows.all()) {
        const price = await row.locator("td:nth-child(7)").innerText();
        flight_prices.push(price);
      }
      console.log(`Flight prices: ${flight_prices.join(", ")}`);

      // Convert string prices to numbers
      const prices = flight_prices.map((p) => Number(p.slice(1)));
      console.log(prices);

      const sorted_prices = [...prices].sort((a, b) => a - b);
      console.log(`The lowest fare is ${sorted_prices[0]}`);

      const indexOf_lowest_price = prices.indexOf(sorted_prices[0]);

      // Select the lowest-priced flight
      for (const row of await blazeDemoHomepage.locators.blazeDemoFlightRows.all()) {
        const row_Data = row.locator("td").allInnerTexts();
        if ((await row_Data).includes(flight_prices[indexOf_lowest_price])) {
          await row.getByRole("button").click();
          await page.waitForLoadState("networkidle");
          break;
        }
      }

      // Reservation form
      await expect(
        blazeDemoHomepage.locators.blazeDemoReservationHeading
      ).toBeVisible();

      await expect(
        blazeDemoHomepage.locators.blazeDemoYourNameInput
      ).toBeVisible();
      await expect(
        blazeDemoHomepage.locators.blazeDemoYourAddressInput
      ).toBeVisible();
      await expect(
        blazeDemoHomepage.locators.blazeDemoYourCityInput
      ).toBeVisible();
      await expect(
        blazeDemoHomepage.locators.blazeDemoYourStateInput
      ).toBeVisible();
      await expect(
        blazeDemoHomepage.locators.blazeDemoYourZipCodeInput
      ).toBeVisible();
      await expect(
        blazeDemoHomepage.locators.blazeDemoCardTypeDropdown
      ).toBeVisible();
      await expect(
        blazeDemoHomepage.locators.blazeDemoCreditCardNumberInput
      ).toBeVisible();
      await expect(
        blazeDemoHomepage.locators.blazeDemoCreditCardMonthInput
      ).toBeVisible();
      await expect(
        blazeDemoHomepage.locators.blazeDemoCreditCardYearInput
      ).toBeVisible();
      await expect(
        blazeDemoHomepage.locators.blazeDemoNameOnCardInput
      ).toBeVisible();
      await expect(
        blazeDemoHomepage.locators.blazeDemoRememberMeCheckbox
      ).toBeVisible();
      await expect(
        blazeDemoHomepage.locators.blazeDemoPurchaseFlightButton
      ).toBeVisible();

      // Fill in form
      await blazeDemoHomepage.locators.blazeDemoYourNameInput.fill("John Doe");
      await blazeDemoHomepage.locators.blazeDemoYourAddressInput.fill(
        "123 Main St"
      );
      await blazeDemoHomepage.locators.blazeDemoYourCityInput.fill("Anytown");
      await blazeDemoHomepage.locators.blazeDemoYourStateInput.fill("CA");
      await blazeDemoHomepage.locators.blazeDemoYourZipCodeInput.fill("12345");
      await blazeDemoHomepage.locators.blazeDemoCardTypeDropdown.selectOption(
        "Visa"
      );
      await blazeDemoHomepage.locators.blazeDemoCreditCardNumberInput.fill(
        "4111111111111111"
      );
      await blazeDemoHomepage.locators.blazeDemoCreditCardMonthInput.fill("12");
      await blazeDemoHomepage.locators.blazeDemoCreditCardYearInput.fill(
        "2025"
      );
      await blazeDemoHomepage.locators.blazeDemoNameOnCardInput.fill(
        "John Doe"
      );
      await blazeDemoHomepage.locators.blazeDemoRememberMeCheckbox.check();

      // Assertions on entered values
      await expect(
        blazeDemoHomepage.locators.blazeDemoYourNameInput
      ).toHaveValue("John Doe");
      await expect(
        blazeDemoHomepage.locators.blazeDemoYourAddressInput
      ).toHaveValue("123 Main St");
      await expect(
        blazeDemoHomepage.locators.blazeDemoYourCityInput
      ).toHaveValue("Anytown");
      await expect(
        blazeDemoHomepage.locators.blazeDemoYourStateInput
      ).toHaveValue("CA");
      await expect(
        blazeDemoHomepage.locators.blazeDemoYourZipCodeInput
      ).toHaveValue("12345");
      await expect(
        blazeDemoHomepage.locators.blazeDemoCardTypeDropdown
      ).toHaveValue("visa");
      await expect(
        blazeDemoHomepage.locators.blazeDemoCreditCardNumberInput
      ).toHaveValue("4111111111111111");
      await expect(
        blazeDemoHomepage.locators.blazeDemoCreditCardMonthInput
      ).toHaveValue("12");
      await expect(
        blazeDemoHomepage.locators.blazeDemoCreditCardYearInput
      ).toHaveValue("2025");
      await expect(
        blazeDemoHomepage.locators.blazeDemoNameOnCardInput
      ).toHaveValue("John Doe");
      await expect(
        blazeDemoHomepage.locators.blazeDemoRememberMeCheckbox
      ).toBeChecked();

      // Submit form
      await blazeDemoHomepage.locators.blazeDemoPurchaseFlightButton.click();

      // Confirmation
      await expect(
        blazeDemoHomepage.locators.blazeDemoPurchaseConfirmation
      ).toBeVisible();
    }
  );
});
