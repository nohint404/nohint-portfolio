import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const responsiveViewports = [
  [320, 720],
  [360, 800],
  [375, 812],
  [390, 844],
  [430, 932],
  [768, 1024],
  [820, 1180],
  [1024, 768],
  [1024, 1366],
  [1280, 800],
  [1366, 900],
  [1440, 900],
  [1920, 1080],
  [900, 500],
] as const;

test.describe("portfolio shell", () => {
  test("loads the homepage with the featured project and no runtime errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        const source = message.location().url;
        errors.push(source ? `${message.text()} @ ${source}` : message.text());
      }
    });

    await page.goto("/");

    await expect(page).toHaveTitle(/nohint404/);
    await expect(page.getByRole("heading", { level: 1, name: /nohint404/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Selected work" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "nohint.dev" })).toBeVisible();
    await expect(page.locator("body")).not.toContainText(/NaN|undefined/);
    expect(errors).toEqual([]);
  });

  test("opens, filters, closes, and restores focus for the command palette", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open command palette" });

    await trigger.focus();
    await page.keyboard.press("Control+K");
    await expect(page.getByRole("dialog")).toBeVisible();
    const input = page.getByPlaceholder("Type a destination…");
    await input.fill("not-a-destination");
    await expect(page.getByText("No matching destination.")).toBeVisible();
    await input.fill("labs");
    await expect(page.getByRole("option", { name: /Labs/ })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("navigates to Labs and renders the honest empty state", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Labs", exact: true }).first().click();

    await expect(page).toHaveURL(/\/labs$/);
    await expect(page.getByRole("heading", { level: 1, name: /Quiet for now/i })).toBeVisible();
    await expect(page.getByText("No experiments published", { exact: true })).toBeVisible();
  });

  test("renders a useful branded 404", async ({ page }) => {
    const response = await page.goto("/missing-route");

    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "404" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Return home/ })).toBeVisible();
  });

  test("does not overflow at a narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto("/");

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("passes automated accessibility checks on core routes and the dialog", async ({ page }) => {
    for (const route of ["/", "/labs", "/missing-route"]) {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `axe violations on ${route}`).toEqual([]);
    }

    await page.goto("/");
    await page.getByRole("button", { name: "Open command palette" }).click();
    const dialogResults = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
    expect(dialogResults.violations, "axe violations in command palette").toEqual([]);
  });

  test("passes the responsive overflow matrix", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "The full viewport matrix runs once in Chromium.");

    for (const [width, height] of responsiveViewports) {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${width}x${height} horizontal overflow`).toBeLessThanOrEqual(1);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });

  test("keeps visible touch targets at least 44 pixels", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Touch-target geometry runs once in Chromium.");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const undersized = await page.locator("a, button").evaluateAll((elements) =>
      elements.flatMap((element) => {
        if (element.closest("[data-nextjs-dev-tools]") || element.getAttribute("aria-label")?.includes("Next.js")) return [];
        const rect = element.getBoundingClientRect();
        const visible = rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
        if (!visible || (rect.width >= 44 && rect.height >= 44)) return [];
        return [{ label: element.getAttribute("aria-label") ?? element.textContent?.trim(), width: rect.width, height: rect.height }];
      }),
    );

    expect(undersized).toEqual([]);
  });

  test("honors reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const styles = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const target = document.querySelector(".link-line") || document.querySelector("a") || document.body;
      const link = getComputedStyle(target as Element);
      return { scrollBehavior: root.scrollBehavior, transitionDuration: link.transitionDuration };
    });
    expect(styles.scrollBehavior).toBe("auto");
    expect(Number.parseFloat(styles.transitionDuration)).toBeLessThanOrEqual(0.00001);
  });

  test("supports the command palette on touch iPad WebKit", async ({ browser, browserName }) => {
    test.skip(browserName !== "webkit", "iPad touch behavior is a WebKit-specific gate.");
    const context = await browser.newContext({
      viewport: { width: 820, height: 1180 },
      hasTouch: true,
      isMobile: true,
    });
    const touchPage = await context.newPage();
    await touchPage.goto("/");
    await touchPage.getByRole("button", { name: "Open command palette" }).tap();
    await expect(touchPage.getByRole("dialog")).toBeVisible();
    await touchPage.getByPlaceholder("Type a destination…").fill("labs");
    await touchPage.getByRole("option", { name: /Labs/ }).tap();
    await expect(touchPage).toHaveURL(/\/labs$/);

    await touchPage.setViewportSize({ width: 1180, height: 820 });
    const overflow = await touchPage.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
    await context.close();
  });
});
