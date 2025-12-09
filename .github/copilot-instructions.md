# Copilot Instructions for Scrum Demo App

#

---

## Workspace & Terminal Location

**Current terminal location:**

- You are currently in the project root directory: `d:/project/srum-app`
- All commands and instructions assume you are already inside the project folder in your terminal.
- No need to `cd` into the project before running build, start, or test commands.

---

## Project Overview

This is a **Create React App (CRA)** with **Redux Toolkit** and **Tailwind CSS**. The app is a Scrum card flipping demo with 12 selectable cards that flip to reveal details. Build pipeline uses `craco` to extend CRA configuration.

**Key Stack:**

- React 18.2+ with TypeScript (strict mode)
- Redux Toolkit 1.9+, React Hook Form 7.50+ + Zod 3.22+
- Tailwind CSS 3.4+ via craco 6.2+
- Jest + React Testing Library 14+

**Node Version & Compatibility:**

- Current setup: Node 18.20.8+ with `react-scripts@5.0.1`
- ⚠️ **Known issue**: `minimatch@^9.0.3` in resolutions causes `minimatch_1.default is not a function` error
- **Reason**: `minimatch@9.x` is ESM-only, incompatible with CJS modules in `react-scripts` dependencies
- **Fix options**:
  1. Downgrade: Change `resolutions` to `"minimatch": "^5.1.6"` (recommended for Node 18)
  2. Upgrade: Use Node 20+ (supports ESM better, but may need other adjustments)
- After changing resolutions, run `yarn install` and `yarn start`

---

## Project Structure

```
src/
├── app/                          # Redux store & hooks (centralized)
│   ├── store.ts                  # configureStore setup
│   ├── hooks.ts                  # useAppDispatch, useAppSelector
│   └── assets/images/
├── features/                     # Feature slices (Redux state)
│   └── counter/
│       ├── counterSlice.ts
│       ├── counterAPI.ts
│       ├── Counter.tsx
│       └── counterSlice.spec.ts
├── components/                   # Presentational components (dumb)
│   ├── BigCards/index.tsx
│   ├── SmallCards/index.tsx
│   └── BackOfTheCard/index.tsx
├── pages/                        # Page components (container)
│   ├── home/index.tsx
│   └── Login/
│       ├── LoginForm.tsx
│       ├── LoginForm.css
│       └── LoginForm.test.tsx
├── App.tsx
├── index.tsx
└── setupTests.ts
```

---

## Key Patterns

**Redux Slices** - Define state, reducers, thunks, selectors in one file:

```typescript
export const selectCount = (state: RootState) => state.counter.value;
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(incrementAsync.fulfilled, (state, action) => {
      state.value += action.payload;
    });
  },
});
export default counterSlice.reducer;
```

**Components** - Smart (Redux) vs Dumb (pure props):

```typescript
// Smart: handles Redux
const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const user = useAppSelector(selectUser);
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [userId, dispatch]);
  return <UserCard user={user} />;
};

// Dumb: pure props only
const UserCard: React.FC<{ user: User | null }> = ({ user }) => (
  <div>{user?.name}</div>
);
```

**Forms** - React Hook Form + Zod:

```typescript
const schema = z.object({
  email: z.string().email("Invalid"),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <button disabled={!isValid}>Submit</button>
    </form>
  );
};
```

---

## Build & Development

### Scripts

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  }
}
```

### Node 18 Compatibility

**For Node v18.20.8+**, use these versions with `resolutions`:

```json
{
  "dependencies": {
    "react": "^17.0.2",
    "react-scripts": "4.0.3",
    "@reduxjs/toolkit": "^1.5.1",
    "react-hook-form": "^7.68.0",
    "zod": "^4.1.13"
  },
  "resolutions": {
    "minimatch": "^9.0.3"
  }
}
```

Note: `minimatch@^9.0.3` downgrade enables Node 18 support (webpack v5 requires v10+ for Node 20+)

---

## Testing Strategy

### Best Practices

**1. Redux Slices:**

```typescript
describe("counterSlice", () => {
  it("should increment", () => {
    const state = counterReducer(undefined, increment());
    expect(state.value).toBe(1);
  });
});
```

**2. Components:**

```typescript
describe("LoginForm", () => {
  it("disables button when invalid", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    expect(screen.getByRole("button")).toBeDisabled();

    await user.type(screen.getByLabelText("Email"), "test@example.com");
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});
```

**3. With Redux Store:**

```typescript
const store = configureStore({
  reducer: {
    /* */
  },
});
render(
  <Provider store={store}>
    <Component />
  </Provider>
);
```

---

## Code Guidelines for AI Agents

**Be Concise:**

- ✅ Write only needed code, no unnecessary abstractions
- ❌ Avoid adding "future-proof" patterns without requirements
- ✅ Comment only when logic is non-obvious
- ❌ Don't explain obvious code

**Be Accurate:**

- ✅ Verify types match Redux state shape
- ✅ Check prop interfaces before using components
- ✅ Ensure error handling covers actual edge cases
- ❌ Don't guess at API contracts

**Don't Assume:**

- ✅ Ask or read actual code before refactoring
- ✅ Base suggestions on current codebase patterns
- ❌ Never suggest patterns not already used
- ❌ Don't assume requirements not explicitly stated

**Example:**

```typescript
// ✅ Accurate: Based on actual slice definition
const count = useAppSelector(selectCount);

// ❌ Assuming: No evidence this function exists
const count = useAppSelector(selectCountAndStatus);

// ✅ Concise: Only what's needed
const UserCard: React.FC<{ user: User }> = ({ user }) => <div>{user.name}</div>;

// ❌ Over-engineering: No requirement for this
const UserCard: React.FC<{ user: User; onEdit?: (id: string) => void }> = ({
  user,
}) => <div>{user.name}</div>;
```

---

## Code Conventions

- **TypeScript**: Strict mode, interfaces for props, no `any`
- **Components**: Arrow functions, destructure props, one per file, `React.FC<Props>` pattern
- **Redux**: Selectors in slice files, use `useAppDispatch`/`useAppSelector`, track status: `'idle' | 'loading' | 'failed'`
- **CSS**: Tailwind utilities (`flex`, `w-full`, `bg-blue-500`), CSS modules for complex styles
- **Forms**: React Hook Form + Zod, real-time validation (`mode: 'onChange'`), disable button when invalid

---

## Comments: When & How

**Do comment:** Complex logic, WHY not WHAT, error handling, edge cases, API calls, form rules
**Don't comment:** Obvious code, simple loops, commented-out code

```typescript
// ✅ Good - explains edge case
// Problem: Race condition when user switches rapidly
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string, { signal }) => {
    // Signal allows cancellation if userId changes before request completes
    return fetch(`/api/users/${userId}`, { signal });
  }
);

// ✅ Form validation rules
const schema = z.object({
  // Email unique check done by backend
  email: z.string().email(),
  // Password: 6+ chars, 1 uppercase, 1 number required
  password: z.string().min(6).regex(/[A-Z]/).regex(/[0-9]/),
});

// ❌ Bad - obvious
const name = user.name; // Get user name
```

---

## Common Pitfalls

| Issue                | Solution                                |
| -------------------- | --------------------------------------- |
| minimatch Node 18    | Add `minimatch@^9.0.3` to `resolutions` |
| Type errors          | Use `useAppDispatch`, `useAppSelector`  |
| State mutations      | Only in reducers/thunks                 |
| Tests fail           | Wrap with `<Provider store={store}>`    |
| Tailwind not working | Check `craco.config.js`                 |

---

## Resources

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
