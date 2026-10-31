import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../input/input";
import { Label } from "./label";

const meta = {
  title: "Components/Label",
  component: Label,
  args: {
    children: "Product name",
  },
  decorators: [
    (Story) => (
      <div className="flex w-80 flex-col gap-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Pair the label with a field through `htmlFor` and `id`. Clicking the label
 * focuses the field.
 */
export const Default: Story = {
  render: (args) => (
    <>
      <Label {...args} htmlFor="product-name" />
      <Input id="product-name" placeholder="Heineken Long Neck 330ml" />
    </>
  ),
};

/**
 * The indicator is visual only. Set `required` on the field too, so screen
 * readers announce it.
 */
export const Required: Story = {
  render: (args) => (
    <>
      <Label {...args} htmlFor="product-sku" required>
        SKU
      </Label>
      <Input id="product-sku" placeholder="HNK-LN-330" required />
    </>
  ),
};
