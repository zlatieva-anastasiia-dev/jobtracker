"use client";
import { JobCardList } from "@/components/jobs/JobCardList";
import { JobForm } from "@/components/jobs/JobForm";
import CreateJobButton from "@/components/layout/CreateJobButton";
import { Modal } from "@/components/ui/Modal";
import { Job } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";

export default function JobDashboardPage({ jobData }: { jobData: Array<Job> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalState = searchParams.get("modal");
  const jobId = searchParams.get("jobId");
  const isEditing = modalState === "edit";

  const isModalOpen = modalState === "new" || isEditing;
  const handleClose = () => router.replace("/jobs");

  const initialJobData = jobData.find((job) => job.id === jobId);
  return (
    <div className="space-y-4">
      <h1 className="flex justify-center items-center text-2xl font-bold">
        All Job Applications
      </h1>
      <JobCardList jobs={jobData} />
      {isModalOpen && (
        <Modal onClose={handleClose}>
          <JobForm
            mode={modalState}
            jobId={jobId || undefined}
            initialData={initialJobData}
          />
        </Modal>
      )}
      <CreateJobButton />
    </div>
  );
}
