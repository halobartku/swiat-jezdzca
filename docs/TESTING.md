# Testing Guide

This guide outlines testing strategies, patterns, and best practices for the Świat Jeźdźca website.

## Testing Stack

- Jest: Testing framework
- React Testing Library: Component testing
- Cypress: End-to-end testing
- MSW (Mock Service Worker): API mocking

## Test Types

### 1. Unit Tests

Unit tests focus on testing individual components and functions in isolation.

#### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Products } from '../components/Products';

describe('Products', () => {
  it('renders product categories correctly', () => {
    render(<Products />);
    
    expect(screen.getByText('Przeszkody Treningowe')).toBeInTheDocument();
    expect(screen.getByText('Przeszkody Turniejowe')).toBeInTheDocument();
    expect(screen.getByText('Przeszkody Sponsorskie')).toBeInTheDocument();
    expect(screen.getByText('Akcesoria')).toBeInTheDocument();
  });

  it('shows enlarged image on hover', async () => {
    render(<Products />);
    
    const productImage = screen.getAllByRole('img')[0];
    await userEvent.hover(productImage);
    
    expect(screen.getByTestId('enlarged-preview')).toBeInTheDocument();
  });
});
```

#### Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react';
import { useHorseshoe } from '../hooks/useHorseshoe';

describe('useHorseshoe', () => {
  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useHorseshoe());
    
    expect(result.current.horseshoesCollected).toBe(0);
    expect(result.current.spawnEnabled).toBe(false);
  });

  it('updates horseshoes collected on collection', () => {
    const { result } = renderHook(() => useHorseshoe());
    
    act(() => {
      result.current.collectHorseshoe({
        clientX: 100,
        clientY: 100
      } as React.MouseEvent);
    });
    
    expect(result.current.horseshoesCollected).toBe(1);
  });
});
```

#### Utility Function Testing

```typescript
import { generateDiscountCode } from '../data/discountWords';

describe('generateDiscountCode', () => {
  it('generates unique pairs of words', () => {
    const code1 = generateDiscountCode();
    const code2 = generateDiscountCode();
    
    expect(code1.word1).not.toBe(code1.word2);
    expect(code2.word1).not.toBe(code2.word2);
  });
});
```

### 2. Integration Tests

Integration tests verify that multiple components work together correctly.

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HorseshoeProvider } from '../context/HorseshoeContext';
import { HorseshoeCollector } from '../components/HorseshoeCollector';
import { HorseshoeSpawner } from '../components/HorseshoeSpawner';

describe('Horseshoe Game Integration', () => {
  it('updates collector when horseshoe is collected', async () => {
    render(
      <HorseshoeProvider>
        <HorseshoeCollector horseshoesCollected={0} />
        <HorseshoeSpawner />
      </HorseshoeProvider>
    );
    
    // Enable game
    const gameToggle = screen.getByText('Gra');
    await userEvent.click(gameToggle);
    
    // Collect horseshoe
    const horseshoe = screen.getByTestId('horseshoe');
    await userEvent.click(horseshoe);
    
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows discount code at 10 horseshoes', async () => {
    render(
      <HorseshoeProvider initialCount={10}>
        <HorseshoeCollector horseshoesCollected={10} />
      </HorseshoeProvider>
    );
    
    expect(screen.getByText(/Gratulacje! Otrzymujesz kod rabatowy 5%/i)).toBeInTheDocument();
  });
});
```

### 3. End-to-End Tests

E2E tests verify the complete user flow using Cypress.

```typescript
// cypress/e2e/navigation.cy.ts
describe('Navigation Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('completes full user journey', () => {
    // Check hero section
    cy.get('[data-testid="hero-section"]').should('be.visible');
    
    // Navigate to Products
    cy.get('[data-testid="nav-products"]').click();
    cy.get('[data-testid="product-card"]').should('have.length', 4);
    
    // Check product details
    cy.get('[data-testid="product-card"]').first().trigger('mouseover');
    cy.get('[data-testid="enlarged-preview"]').should('be.visible');
    
    // Play horseshoe game
    cy.get('[data-testid="game-toggle"]').click();
    cy.get('[data-testid="horseshoe"]').click({ multiple: true });
    cy.get('[data-testid="horseshoes-collected"]').should('have.text', '1');
    
    // Submit offer request
    cy.get('[data-testid="nav-offer"]').click();
    cy.get('[data-testid="offer-form"]').within(() => {
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('textarea[name="message"]').type('Test Message');
      cy.get('button[type="submit"]').click();
    });
    
    cy.get('[data-testid="success-message"]').should('be.visible');
  });
});
```

## Test Organization

### Directory Structure

```
src/
├── __tests__/
│   ├── components/
│   │   ├── Products.test.tsx
│   │   ├── HorseshoeCollector.test.tsx
│   │   └── ...
│   ├── hooks/
│   │   └── useHorseshoe.test.tsx
│   └── utils/
│       └── discountWords.test.ts
├── cypress/
│   ├── e2e/
│   │   ├── navigation.cy.ts
│   │   └── horseshoe-game.cy.ts
│   └── support/
│       └── commands.ts
└── ...
```

## Testing Best Practices

### 1. Component Testing

- Test component rendering
- Verify user interactions
- Check error states
- Test accessibility

```typescript
describe('Component', () => {
  it('meets accessibility standards', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 2. Mock Implementation

```typescript
// Mock discount code generation
jest.mock('../data/discountWords', () => ({
  generateDiscountCode: () => ({
    word1: 'TestWord1',
    word2: 'TestWord2'
  })
}));
```

### 3. Test Coverage

Maintain high test coverage:

```bash
npm run test:coverage
```

Coverage goals:
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

### 4. Continuous Integration

Configure GitHub Actions for automated testing:

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run test:e2e
```

## Testing Utilities

### Custom Render Function

```typescript
// test-utils.tsx
import { render } from '@testing-library/react';
import { HorseshoeProvider } from '../context/HorseshoeContext';

const AllTheProviders = ({ children }) => {
  return (
    <HorseshoeProvider>
      {children}
    </HorseshoeProvider>
  );
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Test Data Generators

```typescript
// test-utils/generators.ts
export const generateProduct = (overrides = {}) => ({
  id: Math.random().toString(),
  title: 'Przeszkoda Treningowa',
  imagePath: '/images/Products/Treningowe',
  images: ['test-image.jpg'],
  ...overrides
});
```

## Debugging Tests

### Jest Debug Config

```json
{
  "jest": {
    "verbose": true,
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": [
      "<rootDir>/src/setupTests.ts"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    }
  }
}
```

### Visual Debugging

```typescript
screen.debug(); // Print DOM state
console.log(prettyDOM(container)); // Pretty print DOM
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress Documentation](https://docs.cypress.io)
- [MSW Documentation](https://mswjs.io/docs/)
