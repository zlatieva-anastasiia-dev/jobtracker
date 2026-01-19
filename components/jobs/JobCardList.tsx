import type { Job } from "@/types/job";
import { JobCard } from "./JobCard";

export function JobCardList({ jobs }: { jobs: Array<Job> }) {
  if (jobs.length === 0) {
    return <p className="text-center text-gray-500">No jobs found</p>;
  }
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(30rem,1fr))] gap-4">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}
