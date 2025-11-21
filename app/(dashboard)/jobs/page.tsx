"use client";
import { JobCardList } from "@/components/jobs/JobCardList";
import { JobForm } from "@/components/jobs/JobForm";
import CreateJobButton from "@/components/layout/CreateJobButton";
import { useSearchParams } from "next/navigation";

export default function JobListPage() {
  const searchParams = useSearchParams();
  const modalState = searchParams.get("modal");
  const isEditing = modalState === "edit";

  const isModalOpen = modalState === "new" || isEditing;

  return (
    <div className="space-y-4">
      <h1 className="flex justify-center items-center text-2xl font-bold">
        All Job Applications
      </h1>
      <JobCardList />
      {isModalOpen && <JobForm isEditing={isEditing} jobId={"1"} />}
      <CreateJobButton />
    </div>
  );
}
