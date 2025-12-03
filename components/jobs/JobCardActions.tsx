"use client";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteJobAction } from "@/app/actions/job";
import { IconButton } from "../ui/IconButton";

type JobActionsProps = {
  jobId: string;
};

export function JobCardActions({ jobId }: JobActionsProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleEdit = () => {
    router.push(`/jobs?modal=edit&jobId=${jobId}`, { scroll: false });
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    startTransition(async () => {
      await deleteJobAction(jobId);
      router.refresh();
    });
  };

  return (
    <div className="flex gap-2">
      <IconButton icon={Pencil} onClick={handleEdit} aria-label="Edit job" />
      <IconButton
        icon={Trash2}
        onClick={handleDelete}
        aria-label="Delete job"
        disabled={isPending}
        variant="danger"
      />
    </div>
  );
}
