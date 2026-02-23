import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "@/components/ui/Modal";

describe("Modal Component", () => {
  it("renders modal content", () => {
    const mockOnClose = vi.fn();
    const { getByText, getByRole } = render(
      <Modal onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>,
    );
    expect(getByText("Modal Content")).toBeInTheDocument();
    expect(document.body).toContainElement(getByRole("dialog"));
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnClose = vi.fn();

    const { getByRole } = render(
      <Modal onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    const closeButton = getByRole("button", { name: /close modal/i });
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", async () => {
    const user = userEvent.setup();
    const mockOnClose = vi.fn();

    render(
      <Modal onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    await user.keyboard("{Escape}");

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("has correct accessibility attributes", () => {
    const mockOnClose = vi.fn();

    const { getByRole } = render(
      <Modal onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    const dialog = getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("renders with custom children", () => {
    const mockOnClose = vi.fn();

    const { getByText, getByRole } = render(
      <Modal onClose={mockOnClose}>
        <h1>Custom Title</h1>
        <p>Custom paragraph</p>
        <button type="button">Custom Button</button>
      </Modal>,
    );

    expect(getByText("Custom Title")).toBeInTheDocument();
    expect(getByText("Custom paragraph")).toBeInTheDocument();
    expect(getByRole("button", { name: "Custom Button" })).toBeInTheDocument();
  });

  it("does not call onClose when clicking inside modal content", async () => {
    const user = userEvent.setup();
    const mockOnClose = vi.fn();

    const { getByText } = render(
      <Modal onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    await user.click(getByText("Modal Content"));

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
