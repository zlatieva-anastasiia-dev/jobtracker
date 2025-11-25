import { Job, JobActionState, StatusVariant } from "../types/types";

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

export const statusOptions: StatusVariant[] = [
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
