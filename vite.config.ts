/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import pkg from "./package.json" with { type: "json" };

const runtimeDependencies = Object.keys(pkg.dependencies ?? {});

// Runtime dependencies are installed by the consumer's package manager,
// so they must never be bundled into the library output.
const externalPackages = [
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...runtimeDependencies,
];

// Matches each package and its subpaths (e.g. "react/jsx-runtime").
const external = externalPackages.map((name) => new RegExp(`^${name}(/|$)`));

const resolvePath = (relativePath: string) =>
  fileURLToPath(new URL(relativePath, import.meta.url));

// Both test projects run in a real Chromium instance through Playwright.
const chromium = () => ({
  enabled: true,
  headless: true,
  provider: playwright(),
  instances: [{ browser: "chromium" as const }],
});

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: "./tsconfig.lib.json",
      entryRoot: "src",
      exclude: ["**/*.stories.tsx", "**/*.test.{ts,tsx}"],
    }),
  ],
  resolve: {
    alias: { "@": resolvePath("./src") },
  },
  optimizeDeps: {
    // Pre-bundle runtime dependencies up front. Otherwise Vite discovers them
    // mid-run in browser tests and reloads the page, breaking test imports.
    include: runtimeDependencies,
  },
  build: {
    lib: { entry: "src/index.ts", formats: ["es"], cssFileName: "styles" },
    sourcemap: true,
    minify: false,
    rolldownOptions: {
      external,
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
  },
  test: {
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.stories.tsx", "src/**/*.test.{ts,tsx}", "src/**/*.d.ts", "src/index.ts"],
    },
    projects: [
      {
        // Renders every story in a real browser and fails if any of them throws.
        // See https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
        extends: true,
        plugins: [storybookTest({ configDir: resolvePath("./.storybook") })],
        test: {
          name: "storybook",
          browser: chromium(),
        },
      },
      {
        // Hand-written behavior tests, colocated with each component.
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.test.{ts,tsx}"],
          browser: chromium(),
        },
      },
    ],
  },
});
