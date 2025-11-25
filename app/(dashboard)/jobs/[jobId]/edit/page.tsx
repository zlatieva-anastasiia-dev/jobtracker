import { JobForm } from "@/components/jobs/JobForm";
import { fetchJobById } from "@/lib/jobService";

interface EditPageProps {
  params: {
    jobId: string;
  };
}

export default async function EditJobPage({ params }: EditPageProps) {
  const jobId = params.jobId;

  const jobData = await fetchJobById(jobId);

  if (!jobData) {
    // Best Practice: Handle 404/Not Found gracefully
    // In a real app, you would use notFound() from next/navigation
    return <h1>Job ID {jobId} Not Found</h1>;
  }

  return (
    <div className="p-8">
      <h2>Edit Job Application: {jobData.title}</h2>
      <JobForm mode="edit" jobId={jobId} initialData={jobData} />
    </div>
  );
}
