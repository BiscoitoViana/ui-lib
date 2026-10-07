# UI Lib

[![CI](https://github.com/BiscoitoViana/ui-lib/actions/workflows/ci.yml/badge.svg)](https://github.com/BiscoitoViana/ui-lib/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/Storybook-live-ff4785?logo=storybook&logoColor=white)](https://biscoitoviana.github.io/ui-lib/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

An accessible React component library built with Radix UI, Tailwind CSS v4 and TypeScript, with a two-layer design token system and first-class light and dark themes.

**[View the live documentation →](https://biscoitoviana.github.io/ui-lib/)**

## Highlights

- **Design tokens in two layers.** A palette of OKLCH color scales, and semantic tokens that map to different steps per theme. Components only use semantic tokens, so dark mode never requires per-component overrides.
- **Accessible by default.** Every story runs axe-core checks in CI, and component types enforce accessibility rules, such as requiring an accessible name for icon-only buttons.
- **Tested in a real browser.** Behavior tests and story tests run in Chromium through Vitest browser mode and Playwright.
- **Safe to consume.** No global CSS reset, every token can be overridden with plain CSS, and the published stylesheet only contains classes the library actually uses.
- **Tree-shakeable.** ESM-only output with one file per module, so apps only bundle the components they import.

## Usage

> The package is not published to npm yet.

Requires React 19.

```bash
pnpm add @biscoitoviana/ui-lib
```

Import the stylesheet once, at your app's entry point:

```tsx
import "@biscoitoviana/ui-lib/styles.css";
```

The library uses [Inter](https://rsms.me/inter/) but doesn't load it, so your app can optimize font delivery. For example, with Fontsource:

```bash
pnpm add @fontsource-variable/inter
```

```tsx
import "@fontsource-variable/inter";
```

Then use the components:

```tsx
import { Button } from "@biscoitoviana/ui-lib";

export function ProductActions() {
  return (
    <>
      <Button variant="primary">Save product</Button>
      <Button>Export</Button>
    </>
  );
}
```

### Dark mode

Add the `dark` class to the `<html>` element.

### Theming

Tokens live in a CSS cascade layer, so plain CSS in your app overrides them regardless of import order:

```css
:root {
  /* Rebrand: replace steps of a palette scale */
  --color-primary-700: oklch(50% 0.2 280);

  /* Or remap a single role to a different step */
  --primary: var(--color-primary-600);

  /* Or change the font */
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
}
```

See [Foundations/Colors](https://biscoitoviana.github.io/ui-lib/?path=/docs/foundations-colors--docs) for the full palette and token list.

## Development

Requires Node.js 24 and pnpm (version pinned in `package.json`; run `corepack enable` to use it automatically).

```bash
pnpm install
pnpm exec playwright install chromium
pnpm storybook
```

| Script | Description |
| --- | --- |
| `pnpm storybook` | Starts Storybook at `localhost:6006` |
| `pnpm build` | Builds the library to `dist` |
| `pnpm test` | Runs behavior, story and accessibility tests |
| `pnpm test:watch` | Runs tests in watch mode |
| `pnpm test:coverage` | Runs tests with a coverage report |
| `pnpm typecheck` | Type-checks library, stories, tests and tooling |
| `pnpm lint` | Checks formatting and lint rules with Biome |
| `pnpm lint:fix` | Fixes formatting and safe lint issues |

## Design decisions

Each pull request describes the reasoning behind its changes. Some highlights:

- [Two-layer design tokens](https://github.com/BiscoitoViana/ui-lib/pull/7): palette and semantic layers, and why Tailwind's default palette is removed
- [Button component](https://github.com/BiscoitoViana/ui-lib/pull/8): Figma parity, type-enforced accessibility, and two issues found along the way
- [Browser testing setup](https://github.com/BiscoitoViana/ui-lib/pull/4): why tests run in a real browser instead of jsdom
- [Biome over ESLint](https://github.com/BiscoitoViana/ui-lib/pull/5): a choice driven by TypeScript 7

## License

[MIT](./LICENSE)
