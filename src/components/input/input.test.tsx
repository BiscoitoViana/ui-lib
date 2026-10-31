import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Input } from "./input";

describe("Input", () => {
  it("renders a text field with its accessible name", async () => {
    const screen = await render(<Input aria-label="Product name" />);

    await expect
      .element(screen.getByRole("textbox", { name: "Product name" }))
      .toBeInTheDocument();
  });

  it("updates its value as the user types", async () => {
    const screen = await render(<Input aria-label="Product name" />);
    const input = screen.getByRole("textbox", { name: "Product name" });

    await input.fill("Heineken Long Neck");

    await expect.element(input).toHaveValue("Heineken Long Neck");
  });

  it("calls onChange when the value changes", async () => {
    const onChange = vi.fn();
    const screen = await render(
      <Input aria-label="Product name" onChange={onChange} />,
    );

    await screen
      .getByRole("textbox", { name: "Product name" })
      .fill("Coca-Cola");

    expect(onChange).toHaveBeenCalled();
  });

  it("passes the type to the native input", async () => {
    const screen = await render(
      <Input type="password" aria-label="Password" />,
    );

    await expect
      .element(screen.getByLabelText("Password"))
      .toHaveAttribute("type", "password");
  });

  it("exposes the invalid state through aria-invalid", async () => {
    const screen = await render(
      <Input aria-label="Product name" aria-invalid />,
    );

    await expect
      .element(screen.getByRole("textbox", { name: "Product name" }))
      .toHaveAttribute("aria-invalid", "true");
  });

  it("can be disabled", async () => {
    const screen = await render(<Input aria-label="Product name" disabled />);

    await expect
      .element(screen.getByRole("textbox", { name: "Product name" }))
      .toBeDisabled();
  });

  it("lets a custom className override the default height", async () => {
    const screen = await render(
      <Input aria-label="Product name" className="h-9" />,
    );
    const input = screen.getByRole("textbox", { name: "Product name" });

    await expect.element(input).toHaveClass("h-9");
    await expect.element(input).not.toHaveClass("h-10.5");
  });

  it("forwards the ref to the input element", async () => {
    let ref: HTMLInputElement | null = null;

    await render(
      <Input
        aria-label="Product name"
        ref={(element) => {
          ref = element;
        }}
      />,
    );

    expect(ref).toBeInstanceOf(HTMLInputElement);
  });
});
