import { JobForm } from "@/components/jobs/JobForm";
import { fetchJobById } from "@/lib/jobService";

export default async function JobFormWrapper({
  jobId,
  mode,
}: {
  jobId: string | undefined;
  mode: string | null;
}) {
  const isEditing = mode === "edit" && jobId;
  let initialData = undefined;

  if (isEditing) {
    initialData = await fetchJobById(jobId);
    if (!initialData) {
      return <div className="p-4 text-red-600">Error: Could not find job.</div>;
    }
  }

  return (
    <JobForm
      mode={mode as "new" | "edit"}
      jobId={jobId}
      initialData={initialData}
    />
  );
}
