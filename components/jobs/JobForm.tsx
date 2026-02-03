"use client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { createJobAction, editJobAction } from "@/app/actions/job";
import { initialActionState } from "@/lib/constants";
import type { Job } from "@/types/job";
import { EmailField } from "../form/EmailField";
import { Form } from "../form/Form";
import { SelectField } from "../form/SelectField";
import { TelField } from "../form/TelField";
import { TextareaField } from "../form/TextareaField";
import TextField from "../form/TextField";
import { Button } from "../ui/Button";

interface JobFormProps {
  mode: "new" | "edit";
  jobId?: string;
  initialData?: Job;
}

export function JobForm({ mode, jobId, initialData }: JobFormProps) {
  const router = useRouter();

  const action = mode === "new" ? createJobAction : editJobAction;
  const [state, formAction, isPending] = useActionState(
    action,
    initialActionState,
  );

  const handleCloseForm = () => {
    router.replace("/jobs");
  };

  const formatDateForInput = (dateValue: string | Date | undefined): string => {
    if (!dateValue) return "";
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "";

    return date.toISOString().split("T")[0];
  };
  const initialDate = state.values?.date ?? initialData?.date;
  const dateValue = formatDateForInput(initialDate);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        {mode === "new" ? "Create New Job" : "Edit Job"}
      </h2>
      <Form state={state} initialData={initialData} action={formAction}>
        {mode === "edit" && <input type="hidden" name="jobId" value={jobId} />}
        <TextField id="title" isRequired name="title" label="Job Title" />
        <TextField id="company" isRequired name="company" label="Company" />
        <TextField id="location" name="location" label="Location" />
        <TextField
          id="date"
          name="date"
          label="Application Date"
          type="date"
          defaultValue={dateValue}
        />
        <SelectField id="status" name="status" label="Status">
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
          <option value="closed">Closed</option>
        </SelectField>
        <TextareaField
          id="description"
          name="description"
          label="Description"
          rows={3}
        />
        <fieldset className="border border-gray-200 rounded-lg p-4">
          <legend className="text-sm font-medium px-2">
            Contact Information
          </legend>
          <div className="space-y-4 mt-2">
            <TextField
              id="contactName"
              name="contactName"
              label="Contact Name"
            />
            <EmailField
              id="contactEmail"
              name="contactEmail"
              label="Contact Email"
              placeholder="jane.doe@company.com"
            />
            <TelField
              id="contactPhone"
              name="contactPhone"
              label="Contact Phone"
            />
          </div>
        </fieldset>
        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <Button
            onClick={handleCloseForm}
            type="button"
            disabled={isPending}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? "Submitting..."
              : mode === "new"
                ? "Create Job"
                : "Update Job"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
