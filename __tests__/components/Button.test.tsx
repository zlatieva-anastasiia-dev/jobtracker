import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/ui/Button";

describe("Button Component", () => {
  it("renders with children text", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText("Click Me")).toBeInTheDocument();
  });

  it("applies primary variant styles by default", () => {
    const { getByRole } = render(<Button>Primary Button</Button>);
    const button = getByRole("button", { name: "Primary Button" });
    expect(button).toHaveClass("bg-blue-500");
  });

  it("applies secondary variant styles", () => {
    const { getByRole } = render(
      <Button variant="secondary">Secondary Button</Button>,
    );
    const button = getByRole("button", { name: "Secondary Button" });
    expect(button).toHaveClass("bg-gray-500");
  });

  it("applies danger variant styles", () => {
    const { getByRole } = render(<Button variant="danger">Delete</Button>);
    const button = getByRole("button", { name: "Delete" });
    expect(button).toHaveClass("bg-red-500");
  });

  it("applies custom className", () => {
    const { getByRole } = render(
      <Button className="custom-class">Custom Button</Button>,
    );
    const button = getByRole("button", { name: "Custom Button" });
    expect(button).toHaveClass("custom-class");
  });

  it("handles disabled state", () => {
    const { getByRole } = render(<Button disabled>Disabled Button</Button>);
    const button = getByRole("button", { name: "Disabled Button" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });

  it("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const { getByRole } = render(
      <Button onClick={handleClick}>Click Me</Button>,
    );

    const button = getByRole("button", { name: "Click Me" });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const { getByRole } = render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>,
    );

    const button = getByRole("button", { name: "Disabled Button" });
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
