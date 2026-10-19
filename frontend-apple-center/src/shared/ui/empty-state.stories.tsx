import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./empty-state";

const meta: Meta<typeof EmptyState> = {
  title: "Shared/UI/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: "search_off",
    title: "Nenhum aparelho encontrado",
    description: "Tente ajustar seus filtros ou buscar por outro modelo ou capacidade de armazenamento.",
    actionLabel: "Limpar Filtros",
  },
};
