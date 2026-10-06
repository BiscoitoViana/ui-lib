import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Button } from "./button";

describe("Button", () => {
  it("defaults to type button to avoid accidental form submissions", async () => {
    const screen = await render(<Button>Save</Button>);

    await expect
      .element(screen.getByRole("button", { name: "Save" }))
      .toHaveAttribute("type", "button");
  });

  it("respects an explicit type", async () => {
    const screen = await render(<Button type="submit">Save</Button>);

    await expect
      .element(screen.getByRole("button", { name: "Save" }))
      .toHaveAttribute("type", "submit");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    const screen = await render(<Button onClick={onClick}>Save</Button>);

    await screen.getByRole("button", { name: "Save" }).click();

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    const screen = await render(
      <Button onClick={onClick} disabled>
        Save
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Save" });

    await expect.element(button).toBeDisabled();
    await button.click({ force: true });

    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders its child element when asChild is set", async () => {
    const screen = await render(
      <Button asChild>
        <a href="/products">View products</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "View products" });

    await expect.element(link).toHaveAttribute("href", "/products");
    await expect.element(link).not.toHaveAttribute("type");
  });

  it("exposes the aria-label as the accessible name of icon-only buttons", async () => {
    const screen = await render(
      <Button iconOnly aria-label="Delete product">
        <svg aria-hidden="true" />
      </Button>,
    );

    await expect
      .element(screen.getByRole("button", { name: "Delete product" }))
      .toBeInTheDocument();
  });

  it("requires an accessible name for icon-only buttons", () => {
    // @ts-expect-error Icon-only buttons must have aria-label or aria-labelledby.
    const element = <Button iconOnly>Delete</Button>;

    expect(element).toBeDefined();
  });

  it("lets a custom className override variant styles", async () => {
    const screen = await render(<Button className="px-8">Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });

    await expect.element(button).toHaveClass("px-8");
    await expect.element(button).not.toHaveClass("px-4");
  });

  it("forwards the ref to the button element", async () => {
    let ref: HTMLButtonElement | null = null;

    await render(
      <Button
        ref={(element) => {
          ref = element;
        }}
      >
        Save
      </Button>,
    );

    expect(ref).toBeInstanceOf(HTMLButtonElement);
  });
});
