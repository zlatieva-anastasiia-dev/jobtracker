import { getJobs } from "@/lib/services/job";
import { JobDashboard } from "../../../components/jobs/JobDashboard";

export default async function JobsRoutePage() {
  const jobs = await getJobs();
  return <JobDashboard jobData={jobs} />;
}
