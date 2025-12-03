import type { JobActionState } from "@/types/actions";
import type { Job, JobStatusVariant } from "../types/job";

export const initialJobData: Job = {
  id: "",
  title: "",
  contact: {
    name: "",
    email: "",
    phone: "",
  },
  company: "",
  location: "",
  date: "",
  status: "applied",
  description: "",
};

export const statusOptions: JobStatusVariant[] = [
  "applied",
  "interview",
  "offer",
  "rejected",
  "closed",
];

export const initialActionState: JobActionState = {
  success: false,
  message: "",
};
