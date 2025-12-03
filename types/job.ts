export type JobStatusVariant =
  | "applied"
  | "interview"
  | "rejected"
  | "offer"
  | "closed";

export type JobContact = {
  name: string;
  email: string;
  phone: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  date: string;
  contact?: JobContact;
  status: JobStatusVariant;
  description?: string;
};
