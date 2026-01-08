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

### ✅ Available Components

| Component | Description |
|-----------|-------------|
| **Button** | Squishy buttons with spring physics, multiple variants |
| **IconButton** | Circular icon-only button with squishy animation |
| **Input** | Text input with floating label animation |
| **Checkbox** | Bouncy checkmark animation |
| **Switch** | Toggle switch with spring physics |
| **Card** | Content container with hover lift, subcomponents |
| **Badge** | Status indicators with multiple colors |

### 🚧 Planned Components

**Buttons & Interactive**
- ButtonGroup, Toggle, ToggleGroup, FloatingActionButton

**Form Components**
- InputGroup, InputOTP, Textarea, Radio/RadioGroup, Slider, Select, NativeSelect, Combobox, DatePicker, Calendar, Label, Field, Form

**Layout**
- Stack, Container, Divider/Separator, AspectRatio, Resizable, ScrollArea, Collapsible, Accordion

**Feedback**
- Toast/Sonner, Modal/Dialog, AlertDialog, Alert, Tooltip, Progress, Skeleton, Spinner, Empty

**Navigation**
- Navbar, Tabs, Breadcrumb, NavLink, Pagination, Sidebar, Menubar

**Data Display**
- Avatar, Typography, Kbd, Table, DataTable, Chart, Carousel

**Overlay & Menus**
- Popover, HoverCard, DropdownMenu, ContextMenu, Command, Sheet, Drawer

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
    primary: '#6366F1',
    accent: '#EC4899',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
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

```tsx
import { themes } from '@mellow-ui/react';

// themes.mellow  - Default warm (lavender, cream, peach)
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
