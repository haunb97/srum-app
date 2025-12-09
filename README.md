# Demo Scrum App

A modern Scrum card flipping demo application built with React, Redux Toolkit, and Tailwind CSS. Features 12 selectable cards with flip animations to reveal details.

## 🚀 Tech Stack

- **React 18.2+** - UI library
- **TypeScript 5.3+** - Type safety
- **Redux Toolkit 1.9+** - State management
- **React Hook Form 7.50+** - Form handling
- **Zod 3.22+** - Schema validation
- **Tailwind CSS 3.4+** - Styling
- **Craco 6.2+** - CRA configuration override
- **Jest + React Testing Library** - Testing

## 📋 Prerequisites

- **Node.js**: 18.20.8+ (Node 20+ recommended for better ESM support)
- **Yarn**: 1.22+ (preferred) or npm 8+

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/haunb97/srum-app.git
cd srum-app

# Install dependencies
yarn install
```

## 🎯 Available Scripts

### Development

```bash
# Start development server
yarn dev
# or
yarn start

# Access at http://localhost:3000
```

### Testing

```bash
# Run tests in interactive watch mode
yarn test

# Run tests once (CI mode)
yarn test:ci
```

### Code Quality

```bash
# Check for linting errors
yarn lint

# Fix linting errors automatically
yarn lint:fix

# Format code with Prettier
yarn format

# Check code formatting
yarn format:check
```

### Build

```bash
# Build for production
yarn build

# Output: build/ folder with optimized production bundle
```

## 🔧 Git Hooks (Husky)

Automated quality checks run on git operations:

### Pre-commit Hook

- ✅ Runs ESLint on staged files
- ✅ Checks Prettier formatting
- ❌ **Blocks commit** if issues found
- 💡 Fix with: `yarn lint:fix` and `yarn format`

### Pre-push Hook

- ✅ Runs full test suite
- ❌ **Blocks push** if tests fail
- 💡 Fix tests before pushing

## 📁 Project Structure

```
src/
├── app/                    # Redux store & hooks
│   ├── store.ts           # configureStore setup
│   ├── hooks.ts           # Typed Redux hooks
│   └── assets/images/     # Static assets
├── features/              # Redux slices
│   └── counter/
│       ├── counterSlice.ts
│       ├── counterAPI.ts
│       └── Counter.tsx
├── components/            # Presentational components
│   ├── BigCards/
│   ├── SmallCards/
│   └── BackOfTheCard/
├── pages/                 # Page/container components
│   ├── home/
│   └── Login/
│       ├── LoginForm.tsx
│       └── LoginForm.test.tsx
├── App.tsx
└── index.tsx
```

## 🧪 Testing

Tests are written with Jest and React Testing Library:

- **Unit tests**: Redux slices, utilities
- **Component tests**: User interactions, form validation
- **Integration tests**: Full user flows

Run tests:

```bash
yarn test              # Watch mode
yarn test:ci          # Run once
yarn test --coverage  # With coverage report
```

## 🎨 Code Style

### ESLint

- Extends `react-app` config
- Prettier integration enabled
- TypeScript strict mode

### Prettier

- Semi-colons: enabled
- Single quotes: disabled (double quotes)
- Print width: 80
- Tab width: 2 spaces

Configuration files:

- `.eslintrc` (in package.json)
- `.prettierrc`
- `.lintstagedrc.json`

## 🐛 Known Issues

### Minimatch ESM/CJS Compatibility (Node 18)

- **Issue**: `minimatch@9.x` is ESM-only, conflicts with CJS dependencies
- **Solution**: Using `minimatch@5.1.6` in resolutions (see `package.json`)
- **Alternative**: Upgrade to Node 20+ for better ESM support

## 🚢 Deployment

```bash
# Build production bundle
yarn build

# Deploy build/ folder to your hosting provider
# Compatible with: Vercel, Netlify, GitHub Pages, etc.
```

## 📖 Learn More

- [Create React App Documentation](https://create-react-app.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod Documentation](https://zod.dev/)

## 📝 License

This project is private and for demonstration purposes.

## 👤 Author

**haunb97**

- GitHub: [@haunb97](https://github.com/haunb97)

---

Built with ❤️ using Create React App + Redux Toolkit template
