# Home Component Refactoring Instructions

## Current Issues

### 1. Type Safety

- `number` state typed as `any` instead of `number | undefined`
- `listCart` array typed as `any[]`
- Missing key prop on list items
- `value` parameter typed as `any` in `onClick`

### 2. Naming Conventions

- `renderTwelfthCard` → misleading, renders all 12 cards
- `isShowTwelfthCard` → confusing, actually controls flip state
- `listCart` → typo, should be `listCard` or `cards`

### 3. Component Structure

- Inline card rendering should be extracted to separate component
- Logic mixed with presentation
- Missing proper TypeScript interfaces

### 4. Business Logic Issues

- `onClick` toggles flip state - should just open card
- No proper card selection state management
- Console.log in production code

### 5. Styling Issues

- Long className strings
- Hardcoded Tailwind classes in JSX
- No CSS module or styled component

## Refactoring Plan

### Phase 1: Extract Components

1. Create `CardGrid` component for the 12 cards
2. Create `Card` component for individual card
3. Create `CardDetail` component for BigCard view

### Phase 2: Improve State Management

1. Rename `isShowTwelfthCard` → `isCardFlipped`
2. Type `selectedCard` as `number | null`
3. Separate flip logic from card selection

### Phase 3: Add TypeScript

1. Create proper interfaces for all props
2. Type all state variables
3. Add return types for functions

### Phase 4: Clean Code

1. Remove console.logs
2. Add comments for complex logic
3. Extract magic numbers to constants
4. Use proper event handlers

### Phase 5: Testing

1. Unit tests for state logic
2. Component tests for rendering
3. Integration tests for user interactions

## Refactored Structure

```
src/pages/home/
├── index.tsx                    # Main container
├── Home.test.tsx               # Integration tests
├── components/
│   ├── CardGrid.tsx            # Grid of 12 cards
│   ├── CardGrid.test.tsx
│   ├── Card.tsx                # Individual card
│   ├── Card.test.tsx
│   └── CardDetail.tsx          # Detailed card view
│       └── CardDetail.test.tsx
├── hooks/
│   └── useCardFlip.ts          # Custom hook for flip logic
└── constants.ts                # Constants (CARD_COUNT, etc)
```

## Expected Improvements

### Before

- 47 lines, mixed concerns
- No type safety
- Hard to test
- Poor naming

### After

- Separated concerns (~20 lines per file)
- Full TypeScript types
- Testable components
- Clear naming
- Reusable logic
