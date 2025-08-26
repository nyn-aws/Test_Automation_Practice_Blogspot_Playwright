import { test, expect } from "@playwright/test";

test.describe("Infinite Scroll", () => {
  test(
    "Infinite Scroll",
    {
      tag: "@regression",
      annotation: [
        {
          type: "e2e",
          description:
            "Tests infinite scroll functionality on a website by continuously scrolling down until no new content is loaded.",
        },
      ],
    },
    async ({ page }) => {
      test.skip(); // This is the correct placement for test.skip()
      test.slow();

      await page.goto(
        "https://www.booksbykilo.in/books?weightrange=201to500gm"
      );
      await page.waitForLoadState("networkidle");

      while (true) {
        let current_height = await page.evaluate(() => {
          return document.body.scrollHeight;
        });

        // Incorrect way: Inside page.evaluate, the function runs in the browser context, not in Node/Playwright’s context.
        // That means variables like current_height don’t exist there unless you pass them in explicitly.
        // await page.evaluate(() => {
        //   window.scrollTo(0, current_height);
        // });

        // Correct way
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
    }
  );
});
