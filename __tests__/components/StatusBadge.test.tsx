import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "@/components/ui/StatusBadge";

describe("StatusBadge Component", () => {
  it("renders with applied status", () => {
    const { getByText } = render(<StatusBadge status="applied" />);
    expect(getByText("Applied")).toBeInTheDocument();
  });

  it("renders with interview status", () => {
    const { getByText } = render(<StatusBadge status="interview" />);
    expect(getByText("Interview")).toBeInTheDocument();
  });

  it("renders with offer status", () => {
    const { getByText } = render(<StatusBadge status="offer" />);
    expect(getByText("Offer")).toBeInTheDocument();
  });

  it("renders with rejected status", () => {
    const { getByText } = render(<StatusBadge status="rejected" />);
    expect(getByText("Rejected")).toBeInTheDocument();
  });

  it("renders with closed status", () => {
    const { getByText } = render(<StatusBadge status="closed" />);
    expect(getByText("Closed")).toBeInTheDocument();
  });

  it("applies correct CSS class for applied status", () => {
    const { container } = render(<StatusBadge status="applied" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-blue");
  });

  it("applies correct CSS class for interview status", () => {
    const { container } = render(<StatusBadge status="interview" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-amber");
  });

  it("applies correct CSS class for offer status", () => {
    const { container } = render(<StatusBadge status="offer" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-green");
  });

  it("applies correct CSS class for rejected status", () => {
    const { container } = render(<StatusBadge status="rejected" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-red");
  });

  it("applies correct CSS class for closed status", () => {
    const { container } = render(<StatusBadge status="closed" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-gray");
  });
});
