import { Page, Locator } from "@playwright/test";
class Datatables_Homepage {
  private page: Page;
  public locators: Record<string, Locator>;
  constructor(page: Page) {
    this.page = page;
    this.locators = this.initLocators();
  }

  async goto() {
    await this.page.goto("https://datatables.net/");
    await this.page.waitForLoadState("networkidle");
  }

  private initLocators() {
    return {
      // Pagination Web Table : https://datatables.net/
      dataTablesExampleRows: this.page.locator("#example tbody tr"),
      nextButtonDataTables: this.page.locator("//button[@aria-label='Next']"),
      numberOfRowsDropdown: this.page.locator("#dt-length-0"),
      searchInDataTables: this.page.getByRole("searchbox", { name: "Search:" }),
    };
  }
}
export default Datatables_Homepage;
