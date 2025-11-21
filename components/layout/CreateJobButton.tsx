"use client";
import { useRouter } from "next/navigation";

export default function CreateJobButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.push("/jobs?modal=new")}>create job</button>
  );
}
