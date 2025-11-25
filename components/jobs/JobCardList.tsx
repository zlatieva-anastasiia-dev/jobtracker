import { Job } from "@/types/types";
import { JobCard } from "./JobCard";

export function JobCardList({ jobs }: { jobs: Array<Job> }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}
