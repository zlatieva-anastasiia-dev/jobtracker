export type StatusVariant =
  | "applied"
  | "interview"
  | "rejected"
  | "offer"
  | "closed";

export type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  date: string;
  contact?: {
    name: string;
    email: string;
    phone: string;
  };
  status: StatusVariant;
  description?: string;
};

export interface JobActionState {
  success: boolean;
  errors?: { [key: string]: string };
  message: string;
  values?: { [key: string]: string };
}
