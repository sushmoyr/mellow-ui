# MellowUI

A React component library built for **Atmosphere** — soft, squishy, delightful interfaces.

> While most UI libraries are built for Enterprise Density, MellowUI is built for creative apps, personal portfolios, music tools, and wellness platforms.

## ✨ Features

- 🫧 **Squishy Physics** — Spring animations that feel physical and satisfying
- 🌅 **Warm Palettes** — Cream, lavender, peach, sage color schemes
- 🎯 **Accessible** — Full keyboard navigation and WCAG AA contrast
- 🌙 **Dark Mode** — Beautiful light and dark themes
- ⚡ **Lightweight** — Tree-shakeable, optimized bundle

## 📦 Installation

```bash
npm install @mellow-ui/react framer-motion
```

## 🚀 Quick Start

```tsx
import { MellowProvider, Button } from '@mellow-ui/react';
import '@mellow-ui/react/styles.css';

function App() {
  return (
    <MellowProvider>
      <Button variant="solid" color="primary">
        Hello Mellow! ✨
      </Button>
    </MellowProvider>
  );
}
```

## 🧩 Components

### Buttons
- `Button` — Squishy, delightful buttons with spring physics

*More components coming soon...*

## 🎨 Design Tokens

Access design tokens directly:

```tsx
import { colors, spacing, radii, shadows } from '@mellow-ui/react';

// Use in your custom components
const myStyle = {
  backgroundColor: colors.lavender[500],
  padding: spacing[4],
  borderRadius: radii.lg,
};
```

## 🎭 Animation Hooks

Create your own squishy interactions:

```tsx
import { useSquishy, useHover } from '@mellow-ui/react';

function MyComponent() {
  const { scale, handlers } = useSquishy();
  
  return (
    <motion.div style={{ scale }} {...handlers}>
      Press me!
    </motion.div>
  );
}
```

## 🌙 Theme

Control light/dark mode:

```tsx
import { useTheme } from '@mellow-ui/react';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button onClick={toggleTheme}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </Button>
  );
}
```

## 🎨 Custom Theming

Create a custom color theme to match your brand:

```tsx
import { MellowProvider, createTheme } from '@mellow-ui/react';

const brandTheme = createTheme({
  name: 'my-brand',
  colors: {
    primary: '#6366F1',      // Your brand primary color
    accent: '#EC4899',       // Accent/secondary color
    success: '#10B981',      // Success states
    warning: '#F59E0B',      // Warning states
    error: '#EF4444',        // Error states
    backgroundLight: '#F8FAFC',
    backgroundDark: '#0F172A',
  },
});

function App() {
  return (
    <MellowProvider theme={brandTheme}>
      <YourApp />
    </MellowProvider>
  );
}
```

### Pre-built Themes

MellowUI includes ready-to-use themes:

```tsx
import { themes } from '@mellow-ui/react';

// Available themes:
// themes.mellow  - Default warm, atmospheric (lavender, cream, peach)
// themes.ocean   - Cool blues and cyans
// themes.forest  - Natural greens
// themes.sunset  - Warm oranges and pinks

<MellowProvider theme={themes.ocean}>
  <App />
</MellowProvider>
```

## 📚 Documentation

See the `docs/` folder for detailed documentation:
- [Design Philosophy](./docs/DESIGN_PHILOSOPHY.md)
- [Component Specs](./docs/COMPONENT_SPECS.md)

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run tests
npm run test

# Build library
npm run build:lib
```

## 📄 License

MIT © MellowUI Team
