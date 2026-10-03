import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/addon-docs", "@storybook/addon-vitest"],
  framework: "@storybook/react-vite",
  // Storybook reuses vite.config.ts, which is set up to build the library.
  // Type declarations are only needed for the published package, so the
  // declaration plugin is removed from the docs site build.
  async viteFinal(viteConfig) {
    viteConfig.plugins = viteConfig.plugins
      ?.flat()
      .filter(
        (plugin) =>
          !(plugin && "name" in plugin && plugin.name.includes("dts")),
      );
    return viteConfig;
  },
};

export default config;
