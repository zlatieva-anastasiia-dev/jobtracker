"use server";

import { createJobInDB, deleteJobFromDB, editJobInDB } from "@/lib/data";
import { JobFormSchema } from "@/lib/validation/jobSchema";
import { JobActionState } from "@/types/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createJob(
  prevState: JobActionState,
  formData: FormData
): Promise<JobActionState> {
  const rawData = Object.fromEntries(formData.entries());

  const validatedJobData = JobFormSchema.safeParse(rawData);

  if (!validatedJobData.success) {
    const formFieldErrors = validatedJobData.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Validation failed. Please check the form.",
      errors: Object.fromEntries(
        Object.entries(formFieldErrors).map(([key, value]) => [
          key,
          value?.[0] ?? "",
        ])
      ),
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
    await createJobInDB(jobDataForDB);
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

export async function deleteJob(jobId: string): Promise<void> {
  try {
    await deleteJobFromDB(jobId);
    revalidatePath("/jobs");
  } catch (error) {
    console.log("Database error:", error);
  }
}

export async function editJob(
  prevState: JobActionState,
  formData: FormData
): Promise<JobActionState> {
  console.log("formData in action:", formData);
  const jobId = formData.get("jobId") as string;
  if (!jobId) {
    return { success: false, message: "Missing jobId" };
  }
  const rawData = Object.fromEntries(formData.entries());

  const validatedJobData = JobFormSchema.safeParse(rawData);

  if (!validatedJobData.success) {
    const formFieldErrors = validatedJobData.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Validation failed. Please check the form.",
      errors: Object.fromEntries(
        Object.entries(formFieldErrors).map(([key, value]) => [
          key,
          value?.[0] ?? "",
        ])
      ),
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
    await editJobInDB(jobId, jobDataForDB);
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
