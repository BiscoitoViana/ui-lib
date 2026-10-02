import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

import pkg from "./package.json" with { type: "json" };

// Runtime dependencies are installed by the consumer's package manager,
// so they must never be bundled into the library output.
const externalPackages = [
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.dependencies ?? {}),
];

// Matches each package and its subpaths (e.g. "react/jsx-runtime").
const external = externalPackages.map((name) => new RegExp(`^${name}(/|$)`));

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
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    lib: { entry: "src/index.ts", formats: ["es"], cssFileName: "styles" },
    sourcemap: true,
    rolldownOptions: {
      external,
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
    minify: false,
  },
});
