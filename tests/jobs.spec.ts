import { test, expect } from "@playwright/test";

test.describe("Job Tracker App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/jobs");
  });
  test("homepage loads correctly", async ({ page }) => {
    await expect(page).toHaveTitle(/Job Tracker/);
  });

  test("homepage has correct header", async ({ page }) => {
    const header = page.locator('header:has-text("Job Tracker")');
    await expect(header).toBeVisible();
  });

  test("jobs page shows job cards or no jobs message", async ({ page }) => {
    const jobCards = page.locator('[data-testid="job-card"]');

    const hasJobs = (await jobCards.count()) > 0;

    const noJobsMessage = page.getByText(
      "No job applications found. Please add a job."
    );

    if (hasJobs) {
      expect(jobCards.first()).toBeVisible();
    } else {
      await expect(noJobsMessage).toBeVisible();
    }
  });

  test("user can create a job", async ({ page }) => {
    await page.getByRole("button", { name: "Add Job" }).click();

    await expect(
      page.getByRole("heading", { name: "Create New Job" })
    ).toBeVisible();

    await page.getByLabel("Job Title").fill("Test Job Title");
    await page.getByLabel("Company").fill("Test Company");
    await page.getByLabel("Application Date").fill("2024-06-15");

    await page.getByRole("button", { name: "Create Job" }).click();

    await expect(page.getByText("Test Job Title")).toBeVisible();
  });

  test("form shows validation errors when creating a job with missing required fields", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Add Job" }).click();

    await expect(
      page.getByRole("heading", { name: "Create New Job" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Create Job" }).click();

    await expect(page.getByText("Job Title is required")).toBeVisible();
    await expect(page.getByText("Company is required")).toBeVisible();
    await expect(page.getByText("Application Date is required")).toBeVisible();
  });

  test("user can edit existing job", async ({ page }) => {
    const firstCard = page.locator('[data-testid="job-card"]').first();
    await firstCard.getByRole("button", { name: "Edit" }).click();

    await expect(page.getByRole("heading", { name: "Edit Job" })).toBeVisible();

    await page.getByLabel("Job Title").fill("Updated Job Title");
    await page.getByRole("button", { name: "Update Job" }).click();

    await expect(page.getByText("Updated Job Title")).toBeVisible();
  });

  test("user can delete a job", async ({ page }) => {
    const firstCard = page.locator('[data-testid="job-card"]').first();
    page.once("dialog", async (dialog) => await dialog.accept());
    await firstCard.getByRole("button", { name: "Delete job" }).click();
    await expect(firstCard).not.toBeVisible();
  });
  test("intentional failure", async ({ page }) => {
    await page.goto("https://example.com");
    await expect(page.locator("h1")).toHaveText("THIS WILL FAIL");
  });
  test("intentional failure2", async ({ page }) => {
    await page.goto("https://example.com");
    await expect(page.locator("h1")).toHaveText("THIS WILL FAIL");
  });
});
