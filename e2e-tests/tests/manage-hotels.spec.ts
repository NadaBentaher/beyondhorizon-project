import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5174/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // Cliquez sur le bouton de connexion
  await page.getByRole("link", { name: "Sign In" }).click();

  // Vérifiez si la page de connexion est visible
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // Remplissez les champs d'email et de mot de passe
  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  // Cliquez sur le bouton de connexion
  await page.getByRole("button", { name: "Login" }).click();

  // Vérifiez si la connexion est réussie
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);
  
  // Remplissez les détails de l'hôtel
  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  // Choisissez le type d'hôtel
  await page.getByText("Budget").click();

  // Cochez les installations
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  // Remplissez les nombres d'invités
  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  // Téléchargez des images
  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.png"),
    path.join(__dirname, "files", "2.png"),
  ]);

  // Cliquez sur le bouton de sauvegarde
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});


test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  // Vérifiez si les détails de l'hôtel sont visibles
  await expect(page.getByText("Dublin Getaways")).toBeVisible();
  await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
  await expect(page.getByText("Dublin, Ireland")).toBeVisible();
  await expect(page.getByText("All Inclusive")).toBeVisible();
  await expect(page.getByText("£119 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 3 children")).toBeVisible();
  await expect(page.getByText("2 Star Rating")).toBeVisible();

  // Vérifiez si les boutons sont visibles
  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  // Cliquez sur le bouton "View Details" du premier hôtel
  await page.getByRole("link", { name: "View Details" }).first().click();

  // Attendre que la page de détails de l'hôtel se charge
  await page.waitForSelector('[name="name"]', { state: "attached" });
  // Vérifiez si le nom de l'hôtel est correct et mettez à jour
  await expect(page.locator('[name="name"]')).toHaveValue("Dublin Getaways");
  await page.locator('[name="name"]').fill("Dublin Getaways UPDATED");
  await page.getByRole("button", { name: "Save" }).click();
  // Vérifiez si l'hôtel est sauvegardé avec succès
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
  // Rechargez la page et vérifiez si le nom de l'hôtel est mis à jour
  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue(
    "Dublin Getaways UPDATED"
  );
  // Revenez au nom original de l'hôtel et sauvegardez
  await page.locator('[name="name"]').fill("Dublin Getaways");
  await page.getByRole("button", { name: "Save" }).click();
});
