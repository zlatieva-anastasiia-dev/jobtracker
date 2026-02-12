# Test Setup

## Login Flow Tests

The login flow tests are located in `tests/login.spec.ts` and cover:

- ✅ Login form display and validation
- ✅ Empty field validation
- ✅ Invalid email format validation
- ✅ Incorrect credentials handling
- ✅ Successful login with valid credentials
- ✅ Navigation to signup and forgot password pages
- ✅ Form state during submission
- ✅ Value preservation after failed login

## Authentication Setup

The `tests/auth.setup.ts` file handles authentication for tests that require a logged-in user. It stores the authentication state in `playwright/.auth/user.json`.

## Environment Variables

For the tests to work, you need to set up test credentials. You can either:

1. **Use environment variables** (recommended):
   ```bash
   export TEST_USER_EMAIL="your-test-user@example.com"
   export TEST_USER_PASSWORD="your-test-password"
   ```

2. **Update the test files** with hardcoded test credentials (not recommended for production):
   - Update `tests/auth.setup.ts` line 7-8
   - Update `tests/login.spec.ts` line 53-54

## Running Tests

```bash
# Run all tests
npm run test

# Run only login tests
npx playwright test login

# Run tests in UI mode
npx playwright test --ui

# Run tests in headed mode (see browser)
npx playwright test --headed

# View test report
npx playwright show-report
```

## Test Projects

The Playwright config includes:
- `chromium-unauthenticated` - For login tests (no auth needed)
- `chromium-logged-in` - For authenticated tests (uses stored auth state)
- `firefox-logged-in` - Firefox tests with auth
- `webkit-logged-in` - Safari tests with auth
