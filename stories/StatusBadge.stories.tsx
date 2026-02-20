import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { JobStatusVariant } from "@/types/job";

type StoryProps = ComponentProps<typeof StatusBadge>;

const meta: Meta<StoryProps> = {
  component: StatusBadge,
  title: "UI/StatusBadge",
  tags: ["autodocs"],
  argTypes: {
    status: {
      options: ["applied", "interview", "rejected", "offer", "closed"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Applied: Story = {
  args: {
    status: "applied",
  },
};

export const Interview: Story = {
  args: {
    status: "interview",
  },
};

export const Rejected: Story = {
  args: {
    status: "rejected",
  },
};

export const Offer: Story = {
  args: {
    status: "offer",
  },
};

export const Closed: Story = {
  args: {
    status: "closed",
  },
};

export const AllStatuses: Story = {
  render: () => {
    const statuses: JobStatusVariant[] = [
      "applied",
      "interview",
      "rejected",
      "offer",
      "closed",
    ];

    return (
      <div className="flex flex-wrap gap-3">
        {statuses.map((status) => (
          <StatusBadge key={status} status={status} />
        ))}
      </div>
    );
  },
};
