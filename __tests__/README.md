# Testing Guide

This project uses **Vitest** for unit and integration tests, and **Playwright** for end-to-end (E2E) tests.

## Quick Start

```bash
# Run all unit/integration tests
npm test

# Run tests in watch mode (recommended during development)
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## Test Structure

```
__tests__/
  ├── components/     # Component tests
  ├── validation/     # Validation schema tests
  └── utils/          # Utility function tests

tests/                # E2E tests (Playwright)
```

## Writing Tests

### Component Tests

```typescript
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("handles user interaction", async () => {
    const user = userEvent.setup();
    render(<MyComponent />);
    
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Clicked")).toBeInTheDocument();
  });
});
```

### Validation Tests

```typescript
import { describe, expect, it } from "vitest";
import { mySchema } from "@/lib/validation/mySchema";

describe("mySchema", () => {
  it("validates correct data", () => {
    const result = mySchema.safeParse({ field: "value" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid data", () => {
    const result = mySchema.safeParse({ field: "" });
    expect(result.success).toBe(false);
  });
});
```

### Utility Function Tests

```typescript
import { describe, expect, it } from "vitest";
import { myFunction } from "@/utils/myFunction";

describe("myFunction", () => {
  it("returns expected output", () => {
    expect(myFunction("input")).toBe("expected output");
  });
});
```

## Test Coverage

View coverage reports after running:

```bash
npm run test:coverage
```

Open `coverage/index.html` in your browser to see detailed coverage reports.

## Best Practices

1. **Write descriptive test names** - Use "it should..." format
2. **Test behavior, not implementation** - Focus on what the component/function does
3. **Keep tests isolated** - Each test should be independent
4. **Use proper matchers** - Choose the right assertion for clarity
5. **Mock external dependencies** - Network calls, timers, etc.
6. **Test edge cases** - Empty inputs, errors, boundary conditions

## Mocked Modules

The following are automatically mocked in `vitest.setup.ts`:

- `next/navigation` (useRouter, usePathname, etc.)
- Environment variables (NEXT_PUBLIC_*)

## Testing React Server Components

For Server Components, focus on:
- Unit testing the logic separately
- Testing with transformed data
- E2E tests for full flow

## Debugging Tests

```bash
# Run specific test file
npm test -- TextField.test.tsx

# Run tests matching pattern
npm test -- --grep "validation"

# Debug in VS Code
# Add breakpoint and use "JavaScript Debug Terminal"
```

## CI/CD Integration

Tests run automatically on:
- Pull requests
- Commits to main branch

Ensure all tests pass before merging!

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright Documentation](https://playwright.dev/)
