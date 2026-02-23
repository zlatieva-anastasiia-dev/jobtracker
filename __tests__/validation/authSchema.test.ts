import { describe, expect, it } from "vitest";
import {
  LoginSchema,
  ResetPasswordSchema,
  SignUpSchema,
} from "@/lib/validation/authSchema";

describe("Auth Validation Schemas", () => {
  describe("LoginSchema", () => {
    it("validates correct sign in data", () => {
      const validData = {
        email: "test@example.com",
        password: "Password123!",
      };

      const result = LoginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("rejects invalid email", () => {
      const invalidData = {
        email: "not-an-email",
        password: "Password123!",
      };

      const result = LoginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("email");
      }
    });

    it("rejects password shorter than 6 characters", () => {
      const invalidData = {
        email: "test@example.com",
        password: "12345",
      };

      const result = LoginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain(
          "at least 6 characters",
        );
      }
    });
  });

  describe("SignUpSchema", () => {
    it("validates correct sign up data", () => {
      const validData = {
        email: "test@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      };

      const result = SignUpSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("rejects mismatched passwords", () => {
      const invalidData = {
        email: "test@example.com",
        password: "Password123!",
        confirmPassword: "DifferentPassword123!",
      };

      const result = SignUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("do not match");
      }
    });

    it("rejects password shorter than 6 characters", () => {
      const invalidData = {
        email: "test@example.com",
        password: "weak",
        confirmPassword: "weak",
      };

      const result = SignUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("ResetPasswordSchema", () => {
    it("validates matching new passwords", () => {
      const validData = {
        password: "NewPassword123!",
        confirmPassword: "NewPassword123!",
      };

      const result = ResetPasswordSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("rejects when passwords don't match", () => {
      const invalidData = {
        password: "NewPassword123!",
        confirmPassword: "DifferentPassword123!",
      };

      const result = ResetPasswordSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("do not match");
      }
    });
  });
});
