import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage_old";

test("Loginn Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToApplication();
  await loginPage.navigateToLoginPage();
  await loginPage.login("tomtom", "12345678");
  await loginPage.verifyLoginSuccess();
});
