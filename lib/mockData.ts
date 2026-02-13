import type { Job } from "@/types/job";

export const jobs: Array<Job> = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Tech Corp",
    description: "Develop and maintain web applications. ",
    location: "New York, NY",
    contact: {
      name: "Jane Doe",
      email: "",
      phone: "123-456-7890",
    },
    status: "applied",
    date: "2024-06-01",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "Business Inc",
    description: "Oversee product development from conception to launch.",
    location: "San Francisco, CA",
    contact: {
      name: "John Smith",
      email: "",
      phone: "987-654-3210",
    },
    status: "interview",
    date: "2024-06-05",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "DataWorks",
    description: "Analyze and interpret complex data sets.",
    location: "Boston, MA",
    contact: {
      name: "Alice Johnson",
      email: "",
      phone: "555-123-4567",
    },
    status: "offer",
    date: "2024-06-10",
  },
];
