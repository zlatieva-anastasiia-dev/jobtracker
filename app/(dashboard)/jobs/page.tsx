import { Suspense } from "react";
import { getJobs } from "@/lib/services/job";
import { JobDashboard } from "../../../components/jobs/JobDashboard";

export const dynamic = "force-dynamic";

export default async function JobsRoutePage() {
  const jobs = await getJobs();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobDashboard jobData={jobs} />
    </Suspense>
  );
}
