import JobDashboard from "./JobDashboard";
import { jobs } from "@/lib/mockData";

export default async function JobsRoutePage() {
  return <JobDashboard jobData={jobs} />;
}
