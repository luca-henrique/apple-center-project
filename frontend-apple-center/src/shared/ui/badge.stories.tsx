import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Shared/UI/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Novo Lacrado",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Seminovo Premium",
  },
};

export const Discount: Story = {
  args: {
    variant: "discount",
    children: "10% OFF no Pix",
  },
};
