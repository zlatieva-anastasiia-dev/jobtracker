import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getJobs } from "@/lib/services/job";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { JobDashboard } from "../../../components/jobs/JobDashboard";

export default async function JobsRoutePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const jobs = await getJobs();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobDashboard jobData={jobs} />
    </Suspense>
  );
}
