import { test, expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly accountMenu: Locator;
  readonly loginlink: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountMenu = page.getByRole("link", { name: "Account" });
    this.loginlink = page.getByText("Login").first();
    this.username = page.locator("#loginFrm_loginname");
    this.password = page.locator("#loginFrm_password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.locator("//div[contains(@class,'alert-danger')]");
  }

  async navigateToApplication() {
    await this.page.goto("https://automationteststore.com/");
  }

  async navigateToLoginPage() {
    await this.accountMenu.hover();
    await this.loginlink.click();
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: "visible" });
    return this.errorMessage;
  }
}

module.exports = { LoginPage };
