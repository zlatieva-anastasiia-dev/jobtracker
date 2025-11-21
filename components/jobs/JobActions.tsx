"use client";
import { useRouter } from "next/navigation";
import { IconButton } from "../ui/IconButton";
import { Trash2, Pencil } from "lucide-react";

type JobActionsProps = {
  jobId: string;
  onEdit?: (jobId: string) => void;
  onDelete?: (jobId: string) => void;
};

export function JobActions({ jobId, onEdit, onDelete }: JobActionsProps) {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/jobs?modal=edit&jobId=${jobId}`);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(jobId);
    } else {
      console.log("Delete", jobId);
    }
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
        />
      </div>
    </>
  );
}
