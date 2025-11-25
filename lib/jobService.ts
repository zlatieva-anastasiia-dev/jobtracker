import { jobs } from "./mockData";

export function fetchJobById(jobId: string) {
  return jobs.find((job) => job.id === jobId) || null;
}
