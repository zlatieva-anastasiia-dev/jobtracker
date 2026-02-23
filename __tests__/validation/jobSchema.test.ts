import { describe, expect, it } from "vitest";
import { JobFormSchema } from "@/lib/validation/jobSchema";

describe("JobFormSchema", () => {
  const validJobData = {
    title: "Software Engineer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    date: "2026-02-17",
    contactName: "John Doe",
    contactEmail: "john@techcorp.com",
    contactPhone: "+1234567890",
    status: "applied" as const,
    description: "Great opportunity",
  };

  it("validates correct job data", () => {
    const result = JobFormSchema.safeParse(validJobData);
    expect(result.success).toBe(true);
  });

  it("transforms contact data correctly", () => {
    const result = JobFormSchema.safeParse(validJobData);

    if (result.success) {
      expect(result.data.contact).toEqual({
        name: "John Doe",
        email: "john@techcorp.com",
        phone: "+1234567890",
      });
    }
  });

  it("rejects missing required title", () => {
    const invalidData = { ...validJobData, title: "" };
    const result = JobFormSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("Job Title is required");
    }
  });

  it("rejects missing required company", () => {
    const invalidData = { ...validJobData, company: "" };
    const result = JobFormSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("Company is required");
    }
  });

  it("rejects missing application date", () => {
    const invalidData = { ...validJobData, date: "" };
    const result = JobFormSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain(
        "Application date is required",
      );
    }
  });

  it("rejects invalid email format", () => {
    const invalidData = {
      ...validJobData,
      contactEmail: "not-an-email",
    };
    const result = JobFormSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("Invalid email");
    }
  });

  it("accepts valid status values", () => {
    const statuses = ["applied", "interview", "offer", "rejected", "closed"];

    statuses.forEach((status) => {
      const data = { ...validJobData, status };
      const result = JobFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  it("rejects invalid status", () => {
    const invalidData = { ...validJobData, status: "invalid" };
    const result = JobFormSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });

  it("accepts optional fields as empty/undefined", () => {
    const minimalData = {
      title: "Software Engineer",
      company: "Tech Corp",
      date: "2026-02-17",
      status: "applied" as const,
    };

    const result = JobFormSchema.safeParse(minimalData);
    expect(result.success).toBe(true);
  });

  it("handles empty email by treating as undefined", () => {
    const dataWithEmptyEmail = {
      ...validJobData,
      contactEmail: "",
    };

    const result = JobFormSchema.safeParse(dataWithEmptyEmail);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.contact.email).toBe("");
    }
  });

  it("trims whitespace from title and company", () => {
    const dataWithWhitespace = {
      ...validJobData,
      title: "  Software Engineer  ",
      company: "  Tech Corp  ",
    };

    const result = JobFormSchema.safeParse(dataWithWhitespace);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe("Software Engineer");
      expect(result.data.company).toBe("Tech Corp");
    }
  });

  it("rejects description longer than 1000 characters", () => {
    const longDescription = "a".repeat(1001);
    const invalidData = {
      ...validJobData,
      description: longDescription,
    };

    const result = JobFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
