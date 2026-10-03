/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import pkg from "./package.json" with { type: "json" };

// Runtime dependencies are installed by the consumer's package manager,
// so they must never be bundled into the library output.
const externalPackages = [
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.dependencies ?? {}),
];

// Matches each package and its subpaths (e.g. "react/jsx-runtime").
const external = externalPackages.map((name) => new RegExp(`^${name}(/|$)`));

const resolvePath = (relativePath: string) =>
  fileURLToPath(new URL(relativePath, import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: "./tsconfig.lib.json",
      entryRoot: "src",
      exclude: ["**/*.stories.tsx", "**/*.test.tsx"],
    }),
  ],
  resolve: {
    alias: { "@": resolvePath("./src") },
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
    projects: [
      {
        // Renders every story in a real browser and fails if any of them throws.
        // See https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
        extends: true,
        plugins: [storybookTest({ configDir: resolvePath("./.storybook") })],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
