import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

type StoryProps = ComponentProps<typeof Modal>;

const meta: Meta<StoryProps> = {
  component: Modal,
  title: "UI/Modal",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
            <p className="text-gray-600">
              This is the modal content. You can put any content here.
            </p>
          </Modal>
        )}
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the open button
    const openButton = canvas.getByRole("button", { name: "Open Modal" });
    await userEvent.click(openButton);

    // Wait for modal to appear in the document body
    const modal = within(document.body);
    const modalDialog = await modal.findByRole("dialog");
    await expect(modalDialog).toBeInTheDocument();

    // Check modal content
    const heading = modal.getByText("Modal Title");
    await expect(heading).toBeInTheDocument();

    // Close modal with close button
    const closeButton = modal.getByRole("button", { name: "Close modal" });
    await userEvent.click(closeButton);

    // Modal should be gone
    await expect(modalDialog).not.toBeInTheDocument();
  },
};

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <h2 className="text-2xl font-bold mb-4">Add New Job</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="job-title"
                  className="block text-sm font-medium mb-1"
                >
                  Job Title
                </label>
                <input
                  id="job-title"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium mb-1"
                >
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Tech Corp"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="secondary"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Modal>
        )}
      </>
    );
  },
};

export const WithLongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Long Content Modal</Button>
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
            <div className="space-y-4 text-gray-600">
              {Array.from({ length: 10 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: Static lorem ipsum content that won't reorder
                <p key={`paragraph-${i}`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              ))}
            </div>
          </Modal>
        )}
      </>
    );
  },
};

export const ConfirmationDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete Job
        </Button>
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <h2 className="text-xl font-bold mb-2">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this job? This action cannot be
              undone.
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  alert("Job deleted!");
                  setIsOpen(false);
                }}
              >
                Delete
              </Button>
            </div>
          </Modal>
        )}
      </>
    );
  },
};
