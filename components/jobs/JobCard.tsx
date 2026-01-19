import { Contact, MapPin } from "lucide-react";
import type { Job } from "@/types/job";
import { StatusBadge } from "../ui/StatusBadge";
import { JobCardActions } from "./JobCardActions";

export type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="group relative bg-amber-50 text-black grid gap-2 border p-4 rounded-md shadow-md hover:shadow-lg transition-shadow" data-testid="job-card">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{job.title}</h2>
        <StatusBadge status={job.status} />
      </div>
      <dl className="text-sm text-gray-700 space-y-2 mb-2">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-gray-500" />
          <dt className="sr-only">Location</dt>
          <dd>
            {job.company} - {job.location}
          </dd>
        </div>
        <div className="flex items-center gap-1">
          <Contact className="w-4 h-4 text-gray-500" />
          <dt className="sr-only">Contact Details</dt>
          <dd>
            {job.contact ? (
              <>
                <span>{job.contact.name}</span> |
                <span>{job.contact.email}</span> |
                <span>{job.contact.phone}</span>
              </>
            ) : (
              <span className="text-gray-500">No contact info</span>
            )}
          </dd>
        </div>
      </dl>
      <p className="text-gray-700 text-md line-clamp-1">{job.description}</p>
      <hr className="border-gray-300" />
      <div className="flex justify-between items-center">
        <dl className="text-sm text-gray-600">
          <dt className="inline">Posted on:</dt>
          <dd className="inline ml-1">
            <time dateTime={job.date}>
              {new Date(job.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </dd>
        </dl>
        <JobCardActions jobId={job.id} />
      </div>
    </div>
  );
}
