import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import loginData from "../test_data/loginDataNew.json";

loginData.forEach((data) => {
  if (!data.run) return; // skip test if run is false

  test(`login with test data ${data.username}/${data.password}`, async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToApplication();
    await loginPage.navigateToLoginPage();
    await loginPage.login(data.username, data.password);

    if (data.expected === "success") {
      await expect(page).toHaveURL(/.*account.*/);
      await expect(page).toHaveTitle("My Account");
    } else {
      await expect(loginPage.errorMessage).toBeVisible();
    }
  });
});
