import { test, expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly accountMenu: Locator;
  readonly loginlink: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountMenu = page.getByRole("link", { name: "Account" });
    this.loginlink = page.getByText("Login").first();
    this.username = page.locator("#loginFrm_loginname");
    this.password = page.locator("#loginFrm_password");
    this.loginButton = page.getByRole("button", { name: "Login" });
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

  async verifyLoginSuccess() {
    expect(this.page.url()).toContain("account");
    await expect(this.page).toHaveTitle("My Account");
  }
}

module.exports = { LoginPage };
