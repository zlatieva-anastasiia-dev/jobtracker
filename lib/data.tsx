import type { Job } from "@/types/types";
import { supabaseServer } from "./supabase/server";

export async function fetchJobApplications(): Promise<Job[]> {
  try {
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

export async function createJobInDB(
  jobData: Omit<Job, "id" | "created_at">,
): Promise<Job> {
  const { data, error } = await supabaseServer
    .from("jobs")
    .insert([jobData])
    .select()
    .single();

  if (error) {
    console.error("Error creating job:", error);
    throw new Error("Failed to create job");
  }

  return data as Job;
}

export async function deleteJobFromDB(jobId: string): Promise<void> {
  const { error } = await supabaseServer.from("jobs").delete().eq("id", jobId);

  if (error) {
    console.error("Error deleting job:", error);
    throw new Error("Failed to delete job");
  }
}

export async function editJobInDB(
  jobId: string,
  jobData: Partial<Omit<Job, "id" | "created_at">>,
): Promise<Job> {
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

  return data as Job;
}
