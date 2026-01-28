export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator("[type='submit']");
    this.logo = page.locator("[alt='Nuvio']");
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL);
  }

  async login(username, password) {
    await this.usernameInput.fill(process.env.NUVIO_USERNAME);
    await this.passwordInput.fill(process.env.NUVIO_PASSWORD);
    await this.submitButton.click();
  }

  async verifyLoginSuccess() {
    await this.logo.waitFor({ state: 'visible', timeout: 10000 });
    return await this.logo.isVisible();
  }
}
