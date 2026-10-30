import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "lucide-react";
import { Button } from "../button/button";
import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
  args: {
    "aria-label": "Product name",
    placeholder: "Heineken Long Neck 330ml",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "Coca-Cola Zero 600ml" },
};

/**
 * Set `aria-invalid` to show the error state. The same attribute tells
 * assistive technologies the value is invalid, so both always stay in sync.
 */
export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "Heineken 600" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Heineken Lata 350ml" },
};

export const File: Story = {
  args: { type: "file", "aria-label": "Product image", placeholder: undefined },
};

/**
 * The input matches the height of a medium button, so they align without
 * extra styles.
 */
export const WithButton: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Input
        {...args}
        aria-label="Search products"
        placeholder="Search products"
      />
      <Button variant="primary" iconOnly aria-label="Search">
        <Search />
      </Button>
    </div>
  ),
};

/** Override the height through `className` to match other button sizes. */
export const CustomHeight: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input
          {...args}
          className="h-9"
          aria-label="Small search"
          placeholder="Small"
        />
        <Button size="sm">Filter</Button>
      </div>
      <div className="flex items-center gap-2">
        <Input
          {...args}
          className="h-12"
          aria-label="Large search"
          placeholder="Large"
        />
        <Button size="lg">Filter</Button>
      </div>
    </div>
  ),
};
