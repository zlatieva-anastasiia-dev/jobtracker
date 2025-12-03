"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createJob, deleteJob, editJob } from "@/lib/services/job";
import { JobFormSchema } from "@/lib/validation/jobSchema";
import type { JobActionState } from "@/types/actions";

export async function createJobAction(
  _prevState: JobActionState,
  formData: FormData
): Promise<JobActionState> {
  const rawData = Object.fromEntries(formData.entries()) as {
    [key: string]: string;
  };

  const validatedJobData = JobFormSchema.safeParse(rawData);

  if (!validatedJobData.success) {
    const formFieldErrors = validatedJobData.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Validation failed. Please check the form.",
      errors: formFieldErrors as Record<string, string>,
      values: rawData,
    };
  }

  const cleanData = validatedJobData.data;

  const jobDataForDB = {
    title: cleanData.title,
    company: cleanData.company,
    location: cleanData.location,
    date: cleanData.date,
    status: cleanData.status,
    description: cleanData.description,
    contact: cleanData.contact,
  };

  try {
    await createJob(jobDataForDB);
    revalidatePath("/jobs");
  } catch (_error) {
    return {
      success: false,
      message: "Failed to create job due to a database error.",
    };
  }
  redirect("/jobs");
}

export async function deleteJobAction(jobId: string): Promise<void> {
  try {
    await deleteJob(jobId);
    revalidatePath("/jobs");
  } catch (error) {
    console.log("Database error:", error);
  }
}

export async function editJobAction(
  _prevState: JobActionState,
  formData: FormData
): Promise<JobActionState> {
  const jobId = formData.get("jobId") as string;

  const rawData = Object.fromEntries(formData.entries()) as {
    [key: string]: string;
  };

  const validatedJobData = JobFormSchema.safeParse(rawData);

  if (!validatedJobData.success) {
    const formFieldErrors = validatedJobData.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Validation failed. Please check the form.",
      errors: formFieldErrors as Record<string, string>,
      values: rawData,
    };
  }

  const cleanData = validatedJobData.data;

  const jobDataForDB = {
    title: cleanData.title,
    company: cleanData.company,
    location: cleanData.location,
    date: cleanData.date,
    status: cleanData.status,
    description: cleanData.description,
    contact: cleanData.contact,
  };

  try {
    await editJob(jobId, jobDataForDB);
    revalidatePath("/jobs");
  } catch (error) {
    console.log("Database error:", error);
    return {
      success: false,
      message: "An unexpected database error occurred.",
      errors: undefined,
    };
  }
  redirect("/jobs");
}
