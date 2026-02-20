# Storybook Interaction Testing

This project uses Storybook's play functions to test component interactions directly in Storybook.

## What are Play Functions?

Play functions allow you to write interaction tests that run in Storybook. They simulate user behavior and verify component responses.

## Setup

The project has `@storybook/addon-interactions` and `@storybook/test` installed for interaction testing.

## How to Use

### Basic Play Function Structure

```typescript
import { expect, userEvent, within } from "@storybook/test";

export const YourStory: Story = {
  args: {
    // your args
  },
  play: async ({ args, canvasElement }) => {
    // 1. Get the canvas (component's rendered area)
    const canvas = within(canvasElement);
    
    // 2. Find elements
    const button = canvas.getByRole("button", { name: "Click Me" });
    
    // 3. Simulate interactions
    await userEvent.click(button);
    
    // 4. Assert expectations
    await expect(args.onClick).toHaveBeenCalled();
  },
};
```

## Examples in This Project

### 1. Button with Click Testing
See: `stories/Button.stories.tsx`

```typescript
export const Primary: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
```

### 2. Modal with Open/Close Testing
See: `stories/Modal.stories.tsx`

```typescript
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Open modal
    const openButton = canvas.getByRole("button", { name: "Open Modal" });
    await userEvent.click(openButton);
    
    // Check modal exists
    const modal = within(document.body);
    const modalDialog = await modal.findByRole("dialog");
    await expect(modalDialog).toBeInTheDocument();
    
    // Close modal
    const closeButton = modal.getByRole("button", { name: "Close modal" });
    await userEvent.click(closeButton);
  },
};
```

### 3. Password Field Toggle Testing
See: `stories/PasswordField.stories.tsx`

```typescript
export const WithToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const passwordInput = canvas.getByLabelText("Password");
    await userEvent.type(passwordInput, "SecretPass123");
    
    // Test toggle button changes input type
    const toggleButton = canvas.getByRole("button", { name: "Show password" });
    await userEvent.click(toggleButton);
    await expect(passwordInput).toHaveAttribute("type", "text");
  },
};
```

## Available Test Utilities

From `@storybook/test`:

- **`userEvent`**: Simulate user interactions
  - `userEvent.click(element)`
  - `userEvent.type(element, text)`
  - `userEvent.hover(element)`
  - `userEvent.keyboard('{Enter}')`

- **`within(element)`**: Query elements within a specific container
  - `canvas.getByRole(role, options)`
  - `canvas.getByText(text)`
  - `canvas.getByLabelText(label)`
  - `canvas.findByRole()` (async version)

- **`expect`**: Make assertions
  - `expect(element).toBeInTheDocument()`
  - `expect(element).toHaveAttribute(name, value)`
  - `expect(fn).toHaveBeenCalled()`
  - `expect(element).toBeDisabled()`

- **`fn()`**: Create mock functions
  - Used in args for tracking function calls

## Running Tests

1. Start Storybook:
   ```bash
   npm run storybook
   ```

2. Navigate to a story with a play function

3. Click the "Interactions" panel at the bottom

4. Watch the interactions run automatically

5. See step-by-step execution and results

## When to Use Play Functions

Use play functions for:

- ✅ Testing click handlers
- ✅ Testing form inputs and validation
- ✅ Testing toggle/show/hide functionality
- ✅ Testing keyboard interactions
- ✅ Testing complex user flows
- ✅ Visual regression testing with interactions

Don't use play functions for:

- ❌ Simple visual states (use regular stories)
- ❌ Server-side logic
- ❌ Complex async operations (use Vitest or E2E tests)

## Best Practices

1. **Keep play functions focused**: Test one interaction path per story
2. **Use descriptive names**: Name stories based on what they test
3. **Wait for async updates**: Use `await` and `findBy` queries
4. **Use mock functions**: Use `fn()` to track function calls
5. **Test accessibility**: Use role-based queries when possible

## Tips

- Play functions run **automatically** when you view a story
- Failed assertions show up in the Interactions panel
- You can **rerun** play functions using the panel controls
- Use `within(document.body)` for portaled elements (modals, tooltips)
- Check the browser console for detailed error messages

## Resources

- [Storybook Interaction Testing Docs](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [User Event API](https://testing-library.com/docs/user-event/intro)
