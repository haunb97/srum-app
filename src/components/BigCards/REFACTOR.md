# BigCard Component Refactoring

## Issues Found

### 1. **Misleading Naming**

- Component named `BigCart` (typo, should be `BigCard`)
- State variable `isShowTwelfthCard` is misleading - it's not specifically about the 12th card
- Callback prop accepts `boolean` but always called with `false`

### 2. **Code Structure**

- All logic mixed in one component
- Console.logs left in production code
- Unnecessary callback wrapper in `handleDelay`
- Inline styles instead of constants

### 3. **Type Safety**

- Generic `Props` interface name
- Callback signature doesn't match usage

### 4. **Accessibility**

- No keyboard support for card flip interaction
- Missing ARIA labels
- No semantic role for interactive elements

### 5. **Code Quality**

- Unnecessary async/await complexity
- `delay` function defined but only used once
- Template literal with unnecessary spaces

## Refactoring Plan

### Phase 1: Extract Custom Hook

- Create `useCardFlip` hook to manage flip state logic
- Move delay logic into the hook
- Return clean interface: `{ isFlipped, flipCard, resetFlip }`

### Phase 2: Extract Constants

- Create `constants.ts` for card and button styles
- Extract magic numbers (delay duration)
- Make styles reusable and maintainable

### Phase 3: Simplify Component Interface

- Fix prop types: `backToListCard: () => void` (no boolean param)
- Rename to descriptive names: `BigCardProps`
- Fix component name typo: `BigCart` → `BigCard`

### Phase 4: Add Accessibility

- Add keyboard handlers (Enter, Space)
- Add ARIA labels for screen readers
- Add `role="button"` and `tabIndex` for interactive div

### Phase 5: Clean Up Code

- Remove console.logs
- Remove unnecessary async complexity
- Simplify string interpolation
- Better variable names: `isShowTwelfthCard` → `isFlipped`

## File Structure

```
BigCards/
├── index.tsx              # Re-export for backward compatibility
├── BigCard.tsx            # Main component
├── BigCard.test.tsx       # Component tests
├── constants.ts           # Styling and config constants
├── hooks/
│   └── useCardFlip.ts     # Card flip logic hook
└── REFACTOR.md            # This file
```

## Improvements

### Type Safety

- ✅ Proper TypeScript interfaces with descriptive names
- ✅ Correct callback signature
- ✅ No unused parameters

### Code Quality

- ✅ Separated concerns (component, hook, constants)
- ✅ Removed console.logs
- ✅ Simplified async logic
- ✅ Better variable names

### Accessibility

- ✅ Keyboard support (Enter/Space keys)
- ✅ ARIA labels for screen readers
- ✅ Semantic roles for interactive elements

### Maintainability

- ✅ Constants extracted for easy styling changes
- ✅ Custom hook makes logic reusable
- ✅ Comprehensive test coverage
- ✅ Clean component structure

## Testing Coverage

- ✅ Renders with/without card number
- ✅ Flip on click
- ✅ Flip on Enter key
- ✅ Flip on Space key
- ✅ Back button calls callback and resets
- ✅ Number display logic
