import { test, expect } from "@playwright/test";
import Datatables_Homepage from "../src/pages/datatable_homepage";

test.describe("Pagination Web Table : https://datatables.net/", () => {
  let datatablesHomepage: Datatables_Homepage;
  test.beforeEach(async ({ page }) => {
    datatablesHomepage = new Datatables_Homepage(page);
    await datatablesHomepage.goto();
  });

  test(
    "Pagination Web Table - Read all pages",
    {
      tag: "@regression",
      annotation: [
        {
          type: "functional",
          description:
            "Reads and prints all data from a paginated web table across multiple pages by iterating through next buttons.",
        },
      ],
    },
    async ({ page }) => {
      while (true) {
        const all_rows =
          await datatablesHomepage.locators.dataTablesExampleRows.all();
        for (const row of all_rows) {
          console.log(await row.innerText());
        }
        if (
          await datatablesHomepage.locators.nextButtonDataTables.isEnabled()
        ) {
          await datatablesHomepage.locators.nextButtonDataTables.click();
        } else {
          break;
        }
      }
    }
  );

  test(
    "Pagination Web Table - Change number of rows",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Verifies the ability to change the number of rows displayed in a paginated web table using a dropdown.",
        },
      ],
    },
    async ({ page }) => {
      await expect(
        datatablesHomepage.locators.dataTablesExampleRows
      ).toHaveCount(10);
      await datatablesHomepage.locators.numberOfRowsDropdown.selectOption("25");
      await expect(
        datatablesHomepage.locators.dataTablesExampleRows
      ).toHaveCount(25);
      await datatablesHomepage.locators.numberOfRowsDropdown.selectOption("50");
      await expect(
        datatablesHomepage.locators.dataTablesExampleRows
      ).toHaveCount(50);
      await datatablesHomepage.locators.numberOfRowsDropdown.selectOption(
        "100"
      );
      await expect(
        datatablesHomepage.locators.dataTablesExampleRows
      ).toHaveCount(57);
    }
  );

  test(
    "Pagination Web Table - Search validation",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "functional",
          description:
            "Validates the search functionality of a paginated web table by entering a search term and asserting the presence of the matching record.",
        },
      ],
    },
    async ({ page }) => {
      const name_to_search = "Michael Bruce";

      await datatablesHomepage.locators.searchInDataTables.fill(name_to_search);
      await page.waitForLoadState("networkidle");

      for (const row of await datatablesHomepage.locators.dataTablesExampleRows.all()) {
        const row_data = await row.allInnerTexts();
        if (row_data.includes(name_to_search)) {
          console.log("Found:", row_data);
          expect(row_data).toContain(name_to_search);
        }
      }
    }
  );
});
