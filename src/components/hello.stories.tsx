import type { Meta, StoryObj } from "@storybook/react-vite";
import { Hello } from "./hello";

const meta = {
  title: "Temporary/Hello",
  component: Hello,
  args: { name: "Storybook" },
} satisfies Meta<typeof Hello>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
