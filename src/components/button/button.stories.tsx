import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Button",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    iconOnly: { control: false },
    asChild: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Without props, a button is `secondary` and `md`. */
export const Default: Story = {};

/** For the main action of a view. Use it intentionally, usually once per view. */
export const Primary: Story = {
  args: { variant: "primary", children: "Save product" },
};

/** For supporting actions. This is the default variant. */
export const Secondary: Story = {
  args: { variant: "secondary", children: "Export" },
};

/** For actions that need less emphasis than secondary, such as filters. */
export const Outline: Story = {
  args: { variant: "outline", children: "Filters" },
};

/** For low-emphasis actions, often inside tables, toolbars and menus. */
export const Ghost: Story = {
  args: { variant: "ghost", children: "Cancel" },
};

/** For actions that delete data or can't be undone. */
export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete product" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant={args.variant} size="sm">
        Small
      </Button>
      <Button variant={args.variant} size="md">
        Medium
      </Button>
      <Button variant={args.variant} size="lg">
        Large
      </Button>
    </div>
  ),
};

/** Icons are sized automatically, unless they set a `size-*` class themselves. */
export const WithIcon: Story = {
  args: {
    variant: "primary",
    children: (
      <>
        <Plus />
        Add product
      </>
    ),
  },
};

/**
 * Icon-only buttons are square and require an accessible name through
 * `aria-label` or `aria-labelledby`, enforced by the component's types.
 */
export const IconOnly: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant={args.variant} size="sm" iconOnly aria-label="Delete">
        <Trash2 />
      </Button>
      <Button variant={args.variant} size="md" iconOnly aria-label="Delete">
        <Trash2 />
      </Button>
      <Button variant={args.variant} size="lg" iconOnly aria-label="Delete">
        <Trash2 />
      </Button>
    </div>
  ),
};

/** Each variant has its own disabled style. */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
    </div>
  ),
};

/** With `asChild`, the button styles are applied to its child, such as a link. */
export const AsLink: Story = {
  args: {
    asChild: true,
    variant: "primary",
    children: (
      <a href="#products">
        View products
        <ArrowRight />
      </a>
    ),
  },
};
