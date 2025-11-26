import { fetchJobApplications } from "@/lib/data";
import JobDashboard from "./JobDashboard";

export default async function JobsRoutePage() {
  const jobs = await fetchJobApplications();
  return <JobDashboard jobData={jobs} />;
}
