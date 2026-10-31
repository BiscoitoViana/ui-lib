import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { Input } from "../input/input";
import { Label } from "./label";

describe("Label", () => {
  it("names the associated field", async () => {
    const screen = await render(
      <>
        <Label htmlFor="product-name">Product name</Label>
        <Input id="product-name" />
      </>,
    );

    await expect
      .element(screen.getByRole("textbox", { name: "Product name" }))
      .toBeInTheDocument();
  });

  it("focuses the associated field when clicked", async () => {
    const screen = await render(
      <>
        <Label htmlFor="product-name">Product name</Label>
        <Input id="product-name" />
      </>,
    );

    await screen.getByText("Product name").click();

    await expect
      .element(screen.getByRole("textbox", { name: "Product name" }))
      .toHaveFocus();
  });

  it("keeps the required indicator out of the accessible name", async () => {
    const screen = await render(
      <>
        <Label htmlFor="product-name" required>
          Product name
        </Label>
        <Input id="product-name" required />
      </>,
    );

    await expect
      .element(screen.getByText("*"))
      .toHaveAttribute("aria-hidden", "true");
    await expect
      .element(screen.getByRole("textbox", { name: "Product name" }))
      .toBeRequired();
  });

  it("lets a custom className override default styles", async () => {
    const screen = await render(
      <Label className="text-label-sm">Product name</Label>,
    );
    const label = screen.getByText("Product name");

    await expect.element(label).toHaveClass("text-label-sm");
    await expect.element(label).not.toHaveClass("text-label-md");
  });
});
