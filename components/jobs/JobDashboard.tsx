"use client";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { JobCardList } from "@/components/jobs/JobCardList";
import { JobForm } from "@/components/jobs/JobForm";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { createClient } from "@/lib/supabase/client";
import type { Job } from "@/types/job";

export function JobDashboard({ jobData }: { jobData: Array<Job> }) {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalState = searchParams.get("modal");
  const jobId = searchParams.get("jobId");
  const isEditing = modalState === "edit";

  const isModalOpen = modalState === "new" || isEditing;
  const handleClose = () => router.replace("/jobs");

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      router.replace("/login");
    }
  };

  const initialJobData = jobData.find((job) => job.id === jobId);
  return (
    <div className="space-y-4">
      <button
        type="button"
        className=" bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        onClick={handleSignOut}
      >
        Sign out
      </button>
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
      <div className="fixed bottom-8 right-8">
        <IconButton
          aria-label="Add job"
          icon={Plus}
          size={24}
          variant="filled"
          onClick={() => router.push("/jobs?modal=new")}
        />
      </div>
    </div>
  );
}
