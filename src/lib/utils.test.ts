import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("ignores falsy values", () => {
    expect(cn("px-2", false, null, undefined, "py-1")).toBe("px-2 py-1");
  });

  it("lets the last conflicting class win", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("resolves conflicts between theme token colors", () => {
    expect(cn("text-primary", "text-muted-foreground")).toBe("text-muted-foreground");
  });

  it("keeps classes that only share a prefix", () => {
    expect(cn("text-lg", "text-primary")).toBe("text-lg text-primary");
  });
});
