import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import "./preview.css";
import "@fontsource-variable/inter";

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    // Toggles the `dark` class on <html>, which is what the theme's dark variant targets.
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    a11y: {
      // Fails story tests on accessibility violations, so CI blocks them.
      test: "error",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
