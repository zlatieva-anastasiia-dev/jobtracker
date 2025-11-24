import { JobForm } from "@/components/jobs/JobForm";

export default async function EditJobPage({
  params,
}: {
  params: { jobId: string };
}) {
  const { jobId } = await params;
  return (
    <div className="p-6">
      <JobForm mode="edit" jobId={jobId} />
    </div>
  );
}
