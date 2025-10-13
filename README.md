![Blackbyte Sugar](https://github.com/Blackbytespace/sugarcss/blob/main/assets/blackbyte-sugarcss-og.png?raw=true)

# Blackbyte SugarCSS

The CSS toolkit that you missed... like a sugar in your coffee!

## [Go to website!](https://sugarcss.blackbyte.space)

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Blackbyte SugarCSS](#blackbyte-sugarcss)
  - [Go to website!](#go-to-website)
  - [What is this?](#what-is-this)
  - [Get started](#get-started)
    - [1. Install the package](#1-install-the-package)
    - [2. Configure Vite](#2-configure-vite)
    - [3. Discover the API](#3-discover-the-api)
  - [Samples](#samples)
      - [](#)
      - [Color management](#color-management)
      - [Color manipulation](#color-manipulation)
      - [The `current` color](#the-current-color)
      - [Typography management](#typography-management)
      - [Spaces management](#spaces-management)
      - [Media queries like a boss](#media-queries-like-a-boss)
      - [Grid? You said grid?...](#grid-you-said-grid)
      - [Useful mixins](#useful-mixins)
  - [Contribute](#contribute)

<!-- /code_chunk_output -->

---

## What is this?

This project has for goal to provide high quality CSS utilities like color management, color manipilation, typography management, spaces management, easy media queries handling, easy grid creation and a lot more to discuver...

It will continue to grow with utilities that make sens and that we can make use of everyday. The goal is to make our daily job as pleasant as possible.

Don't be afraid to propose some new utilities. Make sure to read [our contribution guidelines first](./CONTRIBUTE.md).

## Get started

Start using `@blackbyte/sugarcss` in your project with this quick guide.

### 1. Install the package

You can install `@blackbyte/sugarcss` using npm, yarn or pnpm.

```sh
npm install @blackbyte/sugarcss
```

### 2. Configure Vite

Make use of sugarcss throught [Vite](https://vitejs.dev/) is as simple as configuring it like in this example.

For more configuration options, make sure to check the official [Lightningcss documentation](https://lightningcss.dev/docs.html)

```ts
import { sugarize } from '@blackbyte/sugarcss';
export default {
  css: {
    transformer: 'lightningcss',
    lightningcss: sugarize(),
  },
};
```

Go to the official [sugarcss.blackbyte.space](https://sugarcss.blackbyte.space) website to discover the full API.

### 3. Discover the API

Press `CMD + P` on the website to open the command palette and start typing to search for available functions.

## Samples

####

#### Color management

Define your colors and shades in your config and use them throughout your CSS.

```css
/**
 * Declare your colors as simple css variables
 * and use them across your code with the s-color() function.
 * Shades are some variant of your colors that you can define
 * and use them as well as the second parameter of the s-color() function.
 */
:root {
  --s-color-main: #101010;
  --s-color-accent: #f4ad20;
  --s-color-complementary: #00fffb;
  --s-shade-foreground: --lightness 90;
}

.btn {
  background: s-color(main);
  color: s-color(main, foreground);

  &:hover {
    background: s-color(accent);
    color: s-color(accent, foreground);
  }
}
```

#### Color manipulation

Apply some color modifiers through shades of inline

```css
/**
 * Manipulate with ease your colors by applying some modifiers through
 * shades or inline as the second parameter of the s-color() function.
 * 
 * --lighten <percentage>
 * --darken <percentage>
 * --saturate <percentage>
 * --desaturate <percentage>
 * --alpha <percentage>
 * --spin <degrees>
 */
:root {
  --s-color-main: #101010;
  --s-color-accent: #f4ad20;
  --s-shade-foreground: --lightness 90;
}
.btn {
  color: s-color(main, foreground);

  &:hover {
    color: s-color(accent, --darken 10 --saturate 20);
  }
}
```

#### The `current` color

Use the "current" color in your code as if it was the "currentColor" CSS variable.

```css
/**
 * The "current" color is a special color that represents the current color of the element.
 * You can apply it to any property you want and then,
 * map the color you want to the "current" color like in this example.
 */
:root {
  --s-color-main: #101010;
  --s-color-accent: #f4ad20;
  --s-color-complementary: #00fffb;
  --s-color-current: s-color(main);
}

.btn {
  background: s-color(current);
  &:hover {
    background: s-color(current, --lighten 10);
  }
  &.-accent {
    @s-map-color (accent);
  }
  &.-complementary {
    @s-map-color (complementary);
  }
}
```

#### Typography management

Define your typography styles in your config and use them throughout your CSS.

```css
/**
 * Declare your typography styles as simple css variables
 */
:root {
  /* font families */
  --s-font-family-sans: 'Roboto', sans-serif;
  --s-font-family-serif: 'Merriweather', serif;
  /* fonts */
  --s-font-default: s-font-family(sans);
  --s-font-lead: s-font-family(serif);
  /* font sizes */
  --s-size-h1: 32px;
  --s-size-lead: 20px;
  --s-size-p: 16px;
  /* typography */
  --s-typo-h1: s-font(title) s-size(h1) 1.4 0.1em uppercase underline;
  --s-typo-lead: s-font(lead) s-size(lead) 1.6 0.05em;
  --s-typo-p: s-font(default) s-size(p) 1.4;
}
/**
 * Apply your typography styles to your elements with the @s-typo rule
 */
.my-title {
  @s-typo (h1);
}
.my-paragraph {
  @s-typo (p);
}
```

#### Spaces management

Define your spaces in your config and use them throughout your CSS.

```css
/**
 * Declare your spacing styles as simple css variables
 */
:root {
  --s-space-small: 10px;
  --s-space-medium: 20px;
  --s-space-large: 40px;
}
/**
 * Apply your spacing styles to your elements with the `s-space` function
 */
.my-element {
  padding: s-space(small); // 10px
  padding: s-space(medium); // 20px
  padding: s-space(large); // 40px
}
```

#### Media queries like a boss

Write your media queries in a more efficient way with the @s-media rule.

```css
/**
* Declare your breakpoints in your config through css variables
* and use them throughout your CSS with the @s-media rule.
* Special prefixes are available to write quick and efficient media queries.
*/
:root {
  --s-setting-mobile-first: true;
  --s-media-xs: 0px 474px;
  --s-media-sm: 475px 639px;
  --s-media-md: 640px 767px;
  --s-media-lg: 768px 1023px;
  --s-media-xl: 1024px;
}
.my-element {
  background: red;
  @media sm {
    background: blue;
  }
  @media md {
    background: green;
  }
  /**
   * Special prefixes are available:
   * e- : equal
   * lt- : less than
   * gt- : greater than
   * lte- : less than or equal to
   * gte- : greater than or equal to
   */
  @media lt-lg {
    background: yellow;
  }
}
```

#### Grid? You said grid?...

Declare with ease complexe grid layouts and apply them as easily on your elements.

```css
/**
 * Declare your grid layouts in your config through css variables
 * --s-grid-<name>: '<template>' <gap>;
 */
:root {
  --s-grid-mygrid: '1 1 2 _ 3 3 3' 20px;
}
/**
 * Apply your grid layouts to your elements with the @s-grid rule
 */
.my-element {
  /* registered grid */
  @s-grid (mygrid);
  /* custom grid */
  @s-grid ('1 1 2', 20px);
}
/**
 * Generated grid
 */
|------------|------------|------------|
| Area #1                 | Area #2    |
|------------|------------|------------|
| Area #3                              |
|------------|------------|------------|
/**
 * The HTML structure
 */
<div class="s-grid-mygrid">
  <div>Area #1</div>
  <div>Area #2</div>
  <div>Area #3</div>
</div>
```

#### Useful mixins

A set of useful mixins to simplify your CSS code.

```css
/**
 * Apply the `destyle` reset css
 */
@s-destyle;
/**
 * Apply the custom sugar css reset. It basically is `destyle` with these additions:
 * - Reset `mark` background color
 * - Font smoothing to "antialiased" for --webkit browsers
 * - Apply `user-select: none` to all elements except `input`, `textarea`, and `[contenteditable]`
 * - Remove the default outline
 */
@s-reset;
/**
 * Create a burger icon with ease
 */
.my-menu {
  @include s-burger-menu;

  &:hover {
    @include s-burger-menu-active;
  }
}
```

## Contribute

To contribute, make sure to [follow our contribution rules](./CONTRIBUTE.md).

Everyone is welcome as long that it's made in good intelligence and respect 💜.
