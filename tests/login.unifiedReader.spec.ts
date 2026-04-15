import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { readData } from "../utils/dataReader";

// const testData = readData("./test_data/loginDataNew.json");
// const testData = readData("./test_data/LoginData.csv");
const testData = readData("./test_data/LoginData.xlsx", "Sheet1");

test.describe("Login Tests", () => {
  for (const data of testData) {
    // if (data.run !== "yes") continue; // skip test if run is false

    test(`Login test for - ${data.username}`, async ({ page }) => {
      test.skip(data.run !== "yes", "Skipping test as run is set to false");

      const loginPage = new LoginPage(page);

      await test.step("Navigate to application", async () => {
        await loginPage.navigateToApplication();
      });

      await test.step("Navigate to login page", async () => {
        await loginPage.navigateToLoginPage();
      });

      await test.step("Perform login steps", async () => {
        await loginPage.login(data.username, data.password);
      });

      await test.step("Verify login results", async () => {
        if (data.expected === "success") {
          await expect(page).toHaveURL(/.*account.*/);
          await expect(page).toHaveTitle("My Account");
        } else {
          await expect(loginPage.errorMessage).toBeVisible();
        }
      });
    });
  }
});
