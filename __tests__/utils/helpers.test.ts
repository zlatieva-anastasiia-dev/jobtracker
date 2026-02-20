import { describe, expect, it } from "vitest";
import { cn } from "@/utils/helpers";

describe("cn Utility Function", () => {
  it("merges class names correctly", () => {
    const result = cn("bg-red-500", "text-white");
    expect(result).toBe("bg-red-500 text-white");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class active-class");
  });

  it("removes false/null/undefined values", () => {
    const result = cn("base-class", false && "hidden", null, undefined);
    expect(result).toBe("base-class");
  });

  it("handles Tailwind conflicts by merging correctly", () => {
    const result = cn("px-4 py-2", "px-8");
    expect(result).toBe("py-2 px-8");
  });

  it("handles array of classes", () => {
    const result = cn(["bg-blue-500", "text-white"]);
    expect(result).toBe("bg-blue-500 text-white");
  });

  it("handles object syntax", () => {
    const result = cn({
      "bg-blue-500": true,
      "text-white": true,
      hidden: false,
    });
    expect(result).toBe("bg-blue-500 text-white");
  });

  it("combines multiple input types", () => {
    const isActive = true;
    const result = cn(
      "base-class",
      ["additional-class"],
      { "conditional-class": isActive },
      "final-class",
    );
    expect(result).toContain("base-class");
    expect(result).toContain("additional-class");
    expect(result).toContain("conditional-class");
    expect(result).toContain("final-class");
  });
});
