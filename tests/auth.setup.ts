import { expect, test as setup } from "@playwright/test";

const STORAGE_STATE = "playwright/.auth/user.json";
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL || "";
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD || "";

setup("authenticate", async ({ page }) => {
  // Navigate to login page
  await page.goto("/auth/login");

  // Fill in login credentials
  await page.getByLabel("Email").fill(TEST_USER_EMAIL);
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(TEST_USER_PASSWORD);

  // Click login button
  await page.getByRole("button", { name: "Log in" }).click();

  // Wait for navigation to complete
  await page.waitForLoadState("networkidle");

  // Verify we're logged in by checking URL
  await expect(page).toHaveURL("/jobs", { timeout: 5000 });

  // Save authentication state
  await page.context().storageState({ path: STORAGE_STATE });
});
