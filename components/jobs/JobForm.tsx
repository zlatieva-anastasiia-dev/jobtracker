"use client";
import { createJob, editJob } from "@/app/actions/jobActions";
import { initialActionState } from "@/lib/constants";
import { Job } from "@/types/types";
import { useRouter } from "next/navigation";
import { useActionState, useMemo } from "react";

interface JobFormProps {
  mode: "new" | "edit";
  jobId?: string;
  initialData?: Job;
}

export function JobForm({ mode, jobId, initialData }: JobFormProps) {
  const router = useRouter();

  const action = useMemo(() => (mode === "new" ? createJob : editJob), [mode]);
  const [state, formAction, isPending] = useActionState(
    action,
    initialActionState
  );

  const handleCloseForm = () => {
    router.replace("/jobs");
  };

  const formatDateForInput = (dateValue: string | Date | undefined): string => {
    if (!dateValue) return "";
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);

    if (isNaN(date.getTime())) return "";

    return date.toISOString().split("T")[0];
  };

  const initialDate = state.values?.date ?? initialData?.date;
  const dateValue = formatDateForInput(initialDate);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        {mode === "new" ? "Create New Job" : "Edit Job"}
      </h2>
      <form className="space-y-6" action={formAction} noValidate>
        {mode === "edit" && <input type="hidden" name="jobId" value={jobId} />}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={state.values?.title ?? initialData?.title ?? ""}
            placeholder="e.g. Software Engineer"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {state.errors?.title && (
            <p className="text-red-600 text-sm mt-1">{state.errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            defaultValue={state.values?.company ?? initialData?.company ?? ""}
            placeholder="e.g. Tech Corp"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {state.errors?.company && (
            <p className="text-red-600 text-sm mt-1">{state.errors.company}</p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={state.values?.location ?? initialData?.location ?? ""}
            placeholder="e.g. New York, NY"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {state.errors?.location && (
            <p className="text-red-600 text-sm mt-1">{state.errors.location}</p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Application Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            defaultValue={dateValue}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {state.errors?.date && (
            <p className="text-red-600 text-sm mt-1">{state.errors.date}</p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            required
            defaultValue={
              state.values?.status ?? initialData?.status ?? "applied"
            }
            className="w-full px-4 py-2 border rounded-lg bg-white"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="closed">Closed</option>
          </select>
          {state.errors?.status && (
            <p className="text-red-600 text-sm mt-1">{state.errors.status}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Job description, requirements, notes..."
            defaultValue={
              state.values?.description ?? initialData?.description ?? ""
            }
            className="w-full px-4 py-2 border rounded-lg resize-vertical"
          />
          {state.errors?.description && (
            <p className="text-red-600 text-sm mt-1">
              {state.errors.description}
            </p>
          )}
        </div>

        <fieldset className="border border-gray-200 rounded-lg p-4">
          <legend className="text-sm font-medium px-2">
            Contact Information
          </legend>

          <div className="space-y-4 mt-2">
            <div>
              <label
                htmlFor="contactName"
                className="block text-sm font-medium mb-2"
              >
                Contact Name
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                defaultValue={
                  state.values?.contactName ?? initialData?.contact?.name ?? ""
                }
                placeholder="e.g. Jane Doe"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {state.errors?.contactName && (
                <p className="text-red-600 text-sm mt-1">
                  {state.errors.contactName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contactEmail"
                className="block text-sm font-medium mb-2"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                defaultValue={
                  state.values?.contactEmail ??
                  initialData?.contact?.email ??
                  ""
                }
                placeholder="jane.doe@company.com"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {state.errors?.contactEmail && (
                <p className="text-red-600 text-sm mt-1">
                  {state.errors.contactEmail}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contactPhone"
                className="block text-sm font-medium mb-2"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                defaultValue={
                  state.values?.contactPhone ??
                  initialData?.contact?.phone ??
                  ""
                }
                placeholder="123-456-7890"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {state.errors?.contactPhone && (
                <p className="text-red-600 text-sm mt-1">
                  {state.errors.contactPhone}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <button
            onClick={handleCloseForm}
            type="button"
            className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            disabled={isPending}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isPending
              ? "Submitting..."
              : mode === "new"
              ? "Create Job"
              : "Update Job"}
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
