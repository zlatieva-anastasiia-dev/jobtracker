"use server";
import { revalidatePath } from "next/cache";
import type { Job } from "@/types/job";
import { createSupabaseServerClient } from "../supabase/server";

export async function getJobs(): Promise<Job[]> {
  try {
    const supabaseServer = await createSupabaseServerClient();
    const { data: jobs, error } = await supabaseServer
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching jobs:", error);
      throw new Error("Failed to fetch job applications");
    }

    return jobs as Job[];
  } catch (err) {
    console.error("Unexpected error fetching jobs:", err);
    return [];
  }
}

export async function createJob(jobData: Omit<Job, "id">): Promise<Job> {
  const supabaseServer = await createSupabaseServerClient();
  const { data, error } = await supabaseServer
    .from("jobs")
    .insert([jobData])
    .select()
    .single();

  if (error) {
    console.error("Error creating job:", error);
    throw new Error("Failed to create job");
  }

  revalidatePath("/jobs");
  return data as Job;
}

export async function deleteJob(jobId: string): Promise<void> {
  const supabaseServer = await createSupabaseServerClient();
  const { error } = await supabaseServer.from("jobs").delete().eq("id", jobId);

  if (error) {
    console.error("Error deleting job:", error);
    throw new Error("Failed to delete job");
  }
  revalidatePath("/jobs");
}

export async function editJob(
  jobId: string,
  jobData: Partial<Omit<Job, "id" | "created_at">>,
): Promise<Job> {
  const supabaseServer = await createSupabaseServerClient();
  const { data, error } = await supabaseServer
    .from("jobs")
    .update(jobData)
    .eq("id", jobId)
    .select()
    .single();

  if (error) {
    console.error("Error editing job:", error);
    throw new Error("Failed to edit job");
  }
  revalidatePath("/jobs");

  return data as Job;
}
