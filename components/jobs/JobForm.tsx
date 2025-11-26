"use client";

import { createJob, editJob } from "@/app/actions/jobActions";
import { initialActionState } from "@/lib/constants";
import { Job } from "@/types/types";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export function JobForm({
  mode,
  jobId,
  initialData,
}: {
  mode: "new" | "edit";
  jobId?: string;
  initialData?: Job;
}) {
  const router = useRouter();

  const action = mode === "new" ? createJob : editJob;
  const [state, formAction, isPending] = useActionState(
    action,
    initialActionState
  );

  const handleCloseForm = () => {
    router.replace("/jobs");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        {mode === "new" ? "Create New Job" : "Edit Job"}
      </h2>
      <form className="space-y-6" action={formAction} noValidate>
        {mode === "edit" && <input type="hidden" name="jobId" value={jobId} />}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={initialData?.title || ""}
            placeholder="e.g. Software Engineer"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            defaultValue={initialData?.company || ""}
            placeholder="e.g. Tech Corp"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            defaultValue={initialData?.location || ""}
            placeholder="e.g. New York, NY"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Application Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            defaultValue={
              initialData?.date
                ? new Date(initialData.date).toISOString().split("T")[0]
                : ""
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            name="status"
            required
            defaultValue={initialData?.status || "applied"}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Job description, requirements, notes..."
            defaultValue={initialData?.description || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-vertical"
          />
        </div>

        <fieldset className="border border-gray-200 rounded-lg p-4">
          <legend className="text-sm font-medium text-gray-700 px-2">
            Contact Information
          </legend>
          <div className="space-y-4 mt-2">
            <div>
              <label
                htmlFor="contactName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contact Name
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                placeholder="e.g. Jane Doe"
                defaultValue={initialData?.contact?.name || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="contactEmail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                placeholder="jane.doe@company.com"
                defaultValue={initialData?.contact?.email || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="contactPhone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                placeholder="123-456-7890"
                defaultValue={initialData?.contact?.phone || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>
        </fieldset>

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <button
            onClick={handleCloseForm}
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {mode === "new" ? "Create Job" : "Update Job"}
          </button>
          {state.message && (
            <p
              aria-live="polite"
              className={state.success ? "text-green-600" : "text-red-600"}
            >
              {state.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
