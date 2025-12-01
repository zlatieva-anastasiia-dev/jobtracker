"use client";
import { createJob, editJob } from "@/app/actions/jobActions";
import { initialActionState } from "@/lib/constants";
import { Job } from "@/types/types";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { FieldControl } from "../form/FieldControl";
import { FieldInput } from "../form/FieldInput";
import { FieldLabel } from "../form/FieldLabel";
import { FieldError } from "../form/FieldError";
import { FieldSelect } from "../form/FieldSelect";
import { FieldTextarea } from "../form/FieldTextarea";

interface JobFormProps {
  mode: "new" | "edit";
  jobId?: string;
  initialData?: Job;
}

export function JobForm({ mode, jobId, initialData }: JobFormProps) {
  const router = useRouter();

  const action = mode === "new" ? createJob : editJob.bind(null);
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
      <form className="space-y-3" action={formAction} noValidate>
        {mode === "edit" && <input type="hidden" name="jobId" value={jobId} />}
        <FieldControl
          id="title"
          isRequired
          isInvalid={!!state.errors?.title}
          errorMessage={state.errors?.title}
        >
          <FieldLabel>Job Title</FieldLabel>
          <FieldInput
            type="text"
            name="title"
            defaultValue={state.values?.title ?? initialData?.title ?? ""}
            placeholder="e.g. Software Engineer"
          />
          <FieldError />
        </FieldControl>
        <FieldControl
          id="company"
          isRequired
          isInvalid={!!state.errors?.company}
          errorMessage={state.errors?.company}
        >
          <FieldLabel>Company</FieldLabel>
          <FieldInput
            type="text"
            name="company"
            defaultValue={state.values?.company ?? initialData?.company ?? ""}
            placeholder="e.g. Tech Corp"
          />
          <FieldError />
        </FieldControl>
        <FieldControl
          id="location"
          isInvalid={!!state.errors?.location}
          errorMessage={state.errors?.location}
        >
          <FieldLabel>Location</FieldLabel>
          <FieldInput
            type="text"
            name="location"
            defaultValue={state.values?.location ?? initialData?.location ?? ""}
            placeholder="e.g. New York, NY"
          />
          <FieldError />
        </FieldControl>
        <FieldControl
          id="date"
          isRequired
          isInvalid={!!state.errors?.date}
          errorMessage={state.errors?.date}
        >
          <FieldLabel>Application Date</FieldLabel>
          <FieldInput type="date" name="date" defaultValue={dateValue} />
          <FieldError />
        </FieldControl>
        <FieldControl
          id="status"
          isInvalid={!!state.errors?.status}
          errorMessage={state.errors?.status}
        >
          <FieldLabel>Status</FieldLabel>
          <FieldSelect
            name="status"
            defaultValue={
              state.values?.status ?? initialData?.status ?? "applied"
            }
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="closed">Closed</option>
          </FieldSelect>
          <FieldError />
        </FieldControl>

        <FieldControl
          id="description"
          isInvalid={!!state.errors?.description}
          errorMessage={state.errors?.description}
        >
          <FieldLabel>Description</FieldLabel>
          <FieldTextarea
            name="description"
            defaultValue={
              state.values?.description ?? initialData?.description ?? ""
            }
          />

          <FieldError />
        </FieldControl>

        <fieldset className="border border-gray-200 rounded-lg p-4">
          <legend className="text-sm font-medium px-2">
            Contact Information
          </legend>
          <div className="space-y-4 mt-2">
            <FieldControl
              id="contactName"
              isInvalid={!!state.errors?.contactName}
              errorMessage={state.errors?.contactName}
            >
              <FieldLabel>Contact Name</FieldLabel>
              <FieldInput
                type="text"
                name="contactName"
                defaultValue={
                  state.values?.contactName ?? initialData?.contact?.name ?? ""
                }
                placeholder="e.g. Jane Doe"
              />
              <FieldError />
            </FieldControl>
            <FieldControl
              id="contactEmail"
              isInvalid={!!state.errors?.contactEmail}
              errorMessage={state.errors?.contactEmail}
            >
              <FieldLabel>Contact Email</FieldLabel>
              <FieldInput
                type="email"
                name="contactEmail"
                defaultValue={
                  state.values?.contactEmail ??
                  initialData?.contact?.email ??
                  ""
                }
                placeholder="jane.doe@company.com"
              />
              <FieldError />
            </FieldControl>
            <FieldControl
              id="contactPhone"
              isInvalid={!!state.errors?.contactPhone}
              errorMessage={state.errors?.contactPhone}
            >
              <FieldLabel>Contact Phone</FieldLabel>
              <FieldInput
                type="tel"
                name="contactPhone"
                defaultValue={
                  state.values?.contactPhone ??
                  initialData?.contact?.phone ??
                  ""
                }
                placeholder="123-456-7890"
              />
              <FieldError />
            </FieldControl>
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
        </div>
      </form>
    </div>
  );
}
