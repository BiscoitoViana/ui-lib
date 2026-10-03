import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { Hello } from "./hello";

describe("Hello", () => {
  it("greets the given name", async () => {
    const screen = await render(<Hello name="Wallace" />);

    await expect
      .element(screen.getByText("Hello, Wallace"))
      .toBeInTheDocument();
  });
});
