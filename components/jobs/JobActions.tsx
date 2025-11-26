"use client";
import { useRouter } from "next/navigation";
import { IconButton } from "../ui/IconButton";
import { Trash2, Pencil } from "lucide-react";
import { deleteJob } from "@/app/actions/jobActions";
import { useTransition } from "react";

type JobActionsProps = {
  jobId: string;
};

export function JobActions({ jobId }: JobActionsProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleEdit = () => {
    router.push(`/jobs?modal=edit&jobId=${jobId}`, { scroll: false });
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    startTransition(async () => {
      await deleteJob(jobId);
      router.refresh();
    });
  };

  return (
    <>
      <div className="flex gap-2">
        <IconButton
          icon={Pencil}
          colorClass="text-gray-800"
          onClick={handleEdit}
          aria-label="Edit job"
        />
        <IconButton
          icon={Trash2}
          colorClass="text-red-500"
          onClick={handleDelete}
          aria-label="Delete job"
          disabled={isPending}
          className="text-red-500"
        />
      </div>
    </>
  );
}
