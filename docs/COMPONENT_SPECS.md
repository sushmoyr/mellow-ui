# MellowUI Component Specifications

This document provides detailed specifications for each component family.

---

## Buttons

### Button

The primary interactive element. Must feel satisfying to click.

**Variants:**
- `solid` — Filled background, default
- `soft` — Subtle tinted background
- `outline` — Border only, transparent fill
- `ghost` — No background, text only

**Sizes:**
- `sm` — height: 32px, padding: 12px 16px, font: 14px
- `md` — height: 40px, padding: 16px 24px, font: 16px
- `lg` — height: 48px, padding: 20px 32px, font: 18px

**Colors:**
- `primary` — Lavender gradient
- `secondary` — Cream with border
- `accent` — Peach glow
- `ghost` — Transparent

**States & Animations:**
| State | Visual | Animation |
|-------|--------|-----------|
| Idle | Default | — |
| Hover | Lift + glow | translateY(-2px), shadow increase |
| Press | Squish | scale(0.96), shadow decrease |
| Focus | Ring | Soft outer glow (not harsh outline) |
| Disabled | Faded | opacity(0.5), no transform |

**Props:**
```typescript
interface ButtonProps {
  variant?: 'solid' | 'soft' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}
```

---

### IconButton

Circular button for icon-only actions.

**Sizes:**
- `sm` — 32px × 32px
- `md` — 40px × 40px
- `lg` — 48px × 48px

**Animation:**
- Hover: Subtle rotation (±5deg) + glow
- Press: Scale to 0.9

---

## Form Inputs

### Input

Text input with floating label and soft focus.

**Features:**
- Floating label animation on focus/filled
- Soft glow on focus (no harsh outline)
- Error state with gentle shake animation
- Character counter option

**States:**
| State | Border | Background | Label |
|-------|--------|------------|-------|
| Empty | Muted | Transparent | Inside, muted |
| Focus | Primary gradient | Subtle tint | Float up, primary color |
| Filled | Muted | Transparent | Float up, muted |
| Error | Rose | Rose/5% | Rose color |
| Disabled | None | Muted 50% | Muted |

**Props:**
```typescript
interface InputProps {
  label: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  showCharCount?: boolean;
  maxLength?: number;
}
```

---

### Switch

Toggle switch with jelly physics.

**Animation Details:**
1. Background transitions with spring (300ms)
2. Thumb slides with overshoot (bouncy spring)
3. Subtle scale pulse on state change

**Sizes:**
- `sm` — 36px × 20px
- `md` — 44px × 24px
- `lg` — 52px × 28px

---

### Checkbox

Checkbox with bouncy checkmark.

**Animation Sequence:**
1. Click → Box scales to 0.85
2. Box bounces back to 1.0
3. Checkmark draws in with spring
4. Subtle color wash fills box

---

### Slider

Range slider with springy thumb.

**Features:**
- Thumb follows finger/mouse with spring physics
- Value bubble appears on drag
- Track fills with gradient
- Snap points with haptic feedback feel

---

## Feedback

### Toast

Non-intrusive notification.

**Entry Animation:**
```
translateY(100%) → translateY(0)
with bounce overshoot
```

**Exit Animation:**
```
translateY(0) → translateY(100%)
opacity 1 → 0
300ms spring
```

**Variants:**
- `info` — Lavender accent
- `success` — Sage accent
- `warning` — Peach accent
- `error` — Rose accent (still soft!)

---

### Modal

Centered dialog with backdrop blur.

**Animations:**
- Backdrop: `opacity 0 → 0.5` + `backdrop-filter: blur(8px)`
- Content: `scale(0.9) → scale(1)` + `opacity 0 → 1`

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  children: ReactNode;
}
```

---

### Tooltip

Hover hint with float animation.

**Behavior:**
- Delay before show: 300ms
- Fade + float in from anchor direction
- Arrow follows placement

---

## Layout

### Card

Content container with soft shadow.

**Variants:**
- `elevated` — Multi-layer shadow, lifted feel
- `outlined` — Subtle border, flat
- `filled` — Background fill, no shadow

**Hover State:**
- translateY(-4px)
- Shadow depth increases
- Spring transition

---

### Stack

Flexbox helper for spacing.

**Props:**
```typescript
interface StackProps {
  direction?: 'row' | 'column';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  children: ReactNode;
}
```

---

## Navigation

### Tabs

Tab navigation with sliding indicator.

**Animation:**
- Indicator slides between tabs with spring
- Tab text color transitions smoothly
- No content jump on switch

---

### NavLink

Navigation link with growing underline.

**Hover Animation:**
```
underline width: 0% → 100%
origin: center
duration: 200ms spring
```

---

## Spacing Scale Reference

| Token | Value | Usage |
|-------|-------|-------|
| `0` | 0px | — |
| `1` | 4px | Tight gaps |
| `2` | 8px | Icon gaps |
| `3` | 12px | Related items |
| `4` | 16px | Default gap |
| `5` | 20px | Comfortable |
| `6` | 24px | Section internal |
| `8` | 32px | Between sections |
| `10` | 40px | Large spacing |
| `12` | 48px | Hero spacing |
| `16` | 64px | Page sections |

---

## Shadow Scale Reference

| Token | Layers | Usage |
|-------|--------|-------|
| `sm` | 1 layer, 2px blur | Subtle lift |
| `md` | 2 layers, 8px blur | Cards |
| `lg` | 3 layers, 16px blur | Modals |
| `xl` | 4 layers, 24px blur | Popovers |
| `glow` | 1 layer, colored, 20px spread | Focus/active |
