import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { csvReader } from "../utils/csvReader";

const loginData = csvReader("test_data/LoginData.csv");

loginData.forEach((data: any) => {
  if (data.run !== "true") return; // Skip test if run is not true

  test(`Login with ${data.username}/${data.password}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToApplication();
    await loginPage.navigateToLoginPage();
    await loginPage.login(data.username, data.password);

    if (data.expected.toLowerCase() === "success") {
      await expect(page).toHaveURL(/.*account.*/);
      await expect(page).toHaveTitle("My Account");
    } else {
      await expect(loginPage.errorMessage).toBeVisible();
    }
  });
});
