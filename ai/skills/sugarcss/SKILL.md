---
name: sugarcss
description: Blackbyte sugarcss skill
license: MIT  
metadata:
  author: blackbyte.space
  version: '1.0.0'
---

# SugarCSS Skill

SugarCSS is a LightningCSS plugin that extends CSS with custom functions, at-rules, and CSS custom property declarations for design tokens (colors, spacing, typography, grids, etc.).

## Setup

```ts
import sugarcss, { sugarize } from '@blackbyte/sugarcss';

// With LightningCSS directly
const visitors = sugarcss(settings);

// Or use sugarize() for a full TransformOptions object
const options = sugarize(lightningcssOptions, settings);
```

### Settings (`TSugarCssSettings`)

| Setting | Default | Description |
|---|---|---|
| `remFactor` | `0.0625` | Multiplier for px→rem conversion |
| `pxToRem` | `true` | Auto-convert `px` to `rem` |
| `mobileFirst` | `false` | Mobile-first media queries |
| `scalable` | `['padding']` | CSS properties affected by `@s-scale` |
| `verbose` | `false` | Log registered tokens |
| `opacityZeroValue` | `0.0001` | Replace `opacity: 0` with this value |

---

## Declarations (CSS Custom Properties)

Declare design tokens in `:root {}`.

### Colors & Shades
```css
--s-color-<name>: <hex|rgb|hsl>;
--s-shade-<name>: --darken 10 --saturate 5;   /* reusable color modifier */
```

### Media Breakpoints
```css
--s-media-<name>: <min> <max>;
/* e.g. */ --s-media-desktop: 1024px 9999px;
```

### Easing
```css
--s-ease-<name>: cubic-bezier(...);
```

### Spacing & Sizing (scale-based)
```css
--s-spaces: <min> <max> [easing];   /* global space scale */
--s-space-<name>: <value>;          /* named space */
--s-sizes: <min> <max> [easing];    /* global size scale */
--s-size-<name>: <value>;           /* named size */
```

### Transitions
```css
--s-transition-<name>: <property> <duration> <timing-function> [delay];
```

### Radius
```css
--s-radius-<name>: <topLeft> [topRight] [bottomRight] [bottomLeft];
```

### Fonts
```css
--s-font-family-<name>: "Family Name", fallback;
--s-font-<name>: <family> <weight> <style> <variant> <letter-spacing>;
```

### Typography
```css
--s-typo-<name>: s-font(<name>) s-size(<name>) <line-height> <letter-spacing> [text-transform] [text-decoration];
```

### Containers
```css
--s-container-<name>: <minWidth> <maxWidth> <sidePadding>;
```

### Grids
```css
--s-grid-<name>: <layout>;  /* e.g. 1 1 2 _ 3 3 3  (_ = new row, . = empty) */
```

### Delays
```css
--s-delay-<name>: <value>;
```

### Z-indexes & Weights
```css
--s-zindex-<name>: <number>;
--s-weight-<name>: <number>;
```

### Settings override
```css
--s-setting-<key>: <value>;
```

---

## Functions

Used as CSS values inline.

| Function | Signature | Description |
|---|---|---|
| `s-color` | `s-color(<name> [, <shade\|modifiers>])` | Apply a registered color with optional shade or modifiers (`--lighten`, `--darken`, `--saturate`, `--desaturate`, `--hue`, `--spin`, `--alpha`) |
| `s-space` | `s-space(<number\|name> [false])` | Scale-based space value; pass `false` to disable scalability |
| `s-size` | `s-size(<number\|name> [false])` | Scale-based size value |
| `s-font` | `s-font(<name>)` | Apply full font shorthand (style variant weight size/line-height family) |
| `s-font-family` | `s-font-family(<name>)` | Apply font-family only |
| `s-transition` | `s-transition([name='default'])` | Apply registered transition |
| `s-radius` | `s-radius([name='default'])` | Apply registered border-radius |
| `s-container` | `s-container([prop='width'] [, container='default'])` | Get container property: `width`, `minWidth`, `maxWidth`, `sidePadding` |
| `s-ease` | `s-ease([name='default'])` | Apply registered easing |
| `s-delay` | `s-delay([name='default'] [, extra=0])` | Apply registered delay + optional extra |
| `s-rem` | `s-rem(<px>...)` | Convert px value(s) to rem |
| `s-zindex` | `s-zindex(<name> [, offset=0])` | Get z-index value with optional offset |
| `s-weight` | `s-weight(<name>)` | Get font-weight (supports named: thin/light/bold/etc.) |
| `s-scalable` | `s-scalable(<value>...)` | Wrap value(s) in `calc(value + var(--scale, 1))` |

---

## At-Rules (Mixins)

Used inside selectors.

| At-Rule | Signature | Description |
|---|---|---|
| `@s-color` | — | *(see declarations)* |
| `@s-transition` | `@s-transition([name='default'])` | Set `transition` property from registered token |
| `@s-radius` | `@s-radius([name='default'])` | Set `border-radius` from registered token |
| `@s-font` | `@s-font(<name>)` | Apply all font properties |
| `@s-typo` | `@s-typo(<name>)` | Apply full typography styles |
| `@s-fit` | `@s-fit([position='absolute'] [, center=false])` | `position` + `inset: 0`; optionally center with translate |
| `@s-container` | `@s-container([name='default'])` | Make element a container (width, padding, margin auto) |
| `@s-grid` | `@s-grid(<nameOrLayout> [, gap=0])` | Apply CSS grid layout (`_` = new row, `.` = empty cell) |
| `@s-map-color` | `@s-map-color(<name> [, to='current'])` | Remap a color to another (useful for component theming) |
| `@s-scale` | `@s-scale(<ratio>)` | Set `--scale` CSS var to affect `s-space`/`s-size` children |
| `@s-scrollbar` | `@s-scrollbar(<size\|'hide'> [, thumbColor] [, trackColor])` | Style or hide scrollbar |
| `@s-tooltip` | `@s-tooltip([size=10] [, offset=0] [, color='current'])` | Make element a CSS tooltip with arrow |
| `@s-zindex` | `@s-zindex(<name> [, offset=0])` | Set `z-index` from registered token |
| `@s-weight` | `@s-weight(<name>)` | Set `font-weight` from registered token |
| `@media <query>` | — | Enhanced media queries (see below) |

### `@media` enhanced syntax
```css
@media phone { }          /* registered breakpoint */
@media lt-desktop { }     /* lower than */
@media lte-desktop { }    /* lower than or equal */
@media gt-phone { }       /* greater than */
@media gte-phone { }      /* greater than or equal */
@media e-tablet { }       /* equal */
@media dark { }           /* prefers-color-scheme: dark */
@media light { }          /* prefers-color-scheme: light */
@media theme-<name> { }   /* targets .theme-<name> ancestor */
@media cs-<name> { }      /* targets .cs-<name> ancestor (color scheme) */
```

---

## Mixin System

```css
@mixin my-mixin {
  padding: s-space(10);
  @s-radius();
}

.my-element {
  @include my-mixin;
}
```

---

## Complete Example

```css
:root {
  --s-color-accent: #ff6b35;
  --s-shade-muted: --darken 20 --alpha 0.7;
  --s-media-mobile: 0 767px;
  --s-media-desktop: 1024px 9999px;
  --s-spaces: 0 80px;
  --s-sizes: 0 120px;
  --s-ease-default: cubic-bezier(0.745, 0, 0.18, 1);
  --s-transition-default: all 0.3s s-ease();
  --s-radius-default: 8px;
  --s-font-family-body: "Inter", sans-serif;
  --s-font-body: s-font-family(body) 400 normal normal;
  --s-typo-h1: s-font(body) s-size(80) 1.2 0 uppercase;
  --s-container-default: 320px 1200px 20px;
  --s-grid-main: 1 2 _ 3 3;
  --s-zindex-header: 100;
}

.card {
  padding: s-space(20);
  color: s-color(accent);
  color: s-color(accent, muted);
  color: s-color(accent, --darken 10 --alpha 0.5);
  font-size: s-size(30);
  font: s-font(body);
  transition: s-transition();
  border-radius: s-radius();
  z-index: s-zindex(header, -1);

  @s-typo(h1);
  @s-transition();
  @s-radius();
  @s-container();
  @s-grid(main, 20px);
  @s-fit(absolute, true);
  @s-scrollbar(8px, s-color(accent), s-color(accent, --darken 20));
  @s-tooltip(10px, 5px, s-color(accent));
  @s-scale(1.5);

  @media mobile { font-size: s-size(20); }
  @media dark { background: s-color(accent, --darken 30); }
}
```
