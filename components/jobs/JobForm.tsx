"use client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { createJobAction, editJobAction } from "@/app/actions/job";
import {
  EmailField,
  Form,
  SelectField,
  TelField,
  TextareaField,
  TextField,
} from "@/components/form";
import { initialActionState } from "@/lib/constants";
import type { Job } from "@/types/job";

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
    <Form
      state={state}
      initialData={initialData}
      action={formAction}
      isPending={isPending}
      variant="modal"
    >
      {mode === "edit" && <input type="hidden" name="jobId" value={jobId} />}
      <Form.Heading>
        {mode === "new" ? "Create New Job" : "Edit Job"}
      </Form.Heading>
      <Form.Message />
      <Form.Fields>
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
        <Form.Section title="Contact Information">
          <TextField id="contactName" name="contactName" label="Contact Name" />
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
        </Form.Section>
      </Form.Fields>
      <Form.Actions>
        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <Form.Button
            type="button"
            variant="secondary"
            onClick={handleCloseForm}
          >
            Cancel
          </Form.Button>
          <Form.Button type="submit" disabled={isPending}>
            {mode === "new" ? "Create Job" : "Update Job"}
          </Form.Button>
        </div>
      </Form.Actions>
    </Form>
  );
}
