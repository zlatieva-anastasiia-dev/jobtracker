"use client";

export function JobForm({
  mode,
  jobId,
}: {
  mode: "new" | "edit";
  jobId?: string;
}) {
  console.log({ mode, jobId });
  return (
    <div>
      Job Form Component
      <p>isEditing: {mode}</p>
      <p>jobId: {jobId}</p>
    </div>
  );
}
