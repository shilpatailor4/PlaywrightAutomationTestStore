import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage_old";
import loginData from "../test_data/loginData.json";

test.describe("Login Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test("Login with valid credentials", async ({ page }) => {
    await loginPage.navigateToApplication();
    await loginPage.navigateToLoginPage();
    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password,
    );

    //verify login success and redirect to account page
    await expect(page).toHaveURL(/.*account.*/);
    await expect(page).toHaveTitle("My Account");
  });

  test("Login with invalid credentials", async ({ page }) => {
    await loginPage.navigateToApplication();
    await loginPage.navigateToLoginPage();
    await loginPage.login(
      loginData.invalidUser.username,
      loginData.invalidUser.password,
    );

    //verify error message is displayed
    // expect(loginPage.).toBeTruthy();
    // expect(loginPage.errorMessage?.trim()).toEqual(
    //   "Error: Incorrect login or password provided.",
    // );
  });
});
