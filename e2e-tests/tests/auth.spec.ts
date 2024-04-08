import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5174/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

   // Clique sur le bouton de connexion
  await page.getByRole("link", { name: "Sign In" }).click();

   // Vérifie que l'en-tête "Sign In" est visible
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // Remplit les champs "email" et "password"
  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  // Clique sur le bouton de connexion
  await page.getByRole("button", { name: "Login" }).click();

  // Vérifie que le texte "Sign in Successful!" est visible
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
   // Vérifie que les liens "My Bookings" et "My Hotels" sont visibles
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  // Vérifie que le bouton "Sign Out" est visible
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;
  await page.goto(UI_URL);

  // Clique sur le bouton de connexion
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();
  
   // Remplit les champs "firstName", "lastName", "email", "password" et "confirmPassword"
  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  // Clique sur le bouton de création de compte
  await page.getByRole("button", { name: "Create Account" }).click();

  // Vérifie que le texte "Registration Success!" est visible
  await expect(page.getByText("Registration Success!")).toBeVisible();
  
  // Vérifie que les liens "My Bookings" et "My Hotels" sont visibles
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  // Vérifie que le bouton "Sign Out" est visible
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
