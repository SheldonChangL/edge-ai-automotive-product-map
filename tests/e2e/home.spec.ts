import { expect, test } from "@playwright/test";

test("renders the explorer and supports shared filters", async ({ page }) => {
  await page.goto("/?priority=high&category=adas&q=BEV");

  await expect(
    page.getByRole("heading", { name: "車用電子 AI 產品全景圖" }),
  ).toBeVisible();
  await expect(page.getByText("Showing 2 / 47")).toBeVisible();
  await expect(page.getByRole("heading", { name: "ADAS 先進駕駛輔助" })).toBeVisible();
  await expect(page.getByText("環景攝影機系統 (AVM)")).toBeVisible();
  await expect(page.getByText("感測融合控制器 (Fusion ECU)")).toBeVisible();
});
