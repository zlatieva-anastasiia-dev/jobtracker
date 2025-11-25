import { JobForm } from "@/components/jobs/JobForm";

export default function CreateJobPage() {
  return (
    <div className="flex  items-center justify-center ">
      <div className="bg-white p-6 rounded-2xl max-w-2xl w-full text-black mx-4 max-h-[90vh] overflow-y-auto">
        <JobForm mode="new" />
      </div>
    </div>
  );
}
