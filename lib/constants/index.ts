import { Status } from "@/lib/generated/prisma/client";

export const APP_NAME = process.env.NEXT_APP_APP_NAME;
export const APP_DESCRIPTION = process.env.NEXT_APP_DESCRIPTION;
export const SERVER_URL = process.env.NEXT_APP_SERVER_URL ?? "http://localhost:3000";

export const roleDefaultValues = {
  name: "",
  description: "",
  status: Status.INACTIVE,
};

export const userDefaultValues = {
  name: "",
  email: "",
  image: "",
  password: "",
  status: Status.ACTIVE,
};

export const bannerDefaultValues = {
  tagline: "",
  title: "",
  description: "",
  image: "",
  status: Status.ACTIVE,
};

export const enquiryDefaultValues = {
  fullName: "",
  email: "",
  companyName: "",
  subject: "",
  message: "",
  phoneNumber: "",
}

export const newsletterDefaultValues = {
  email: "",
  status: Status.ACTIVE,
}

export const serviceCategoryDefaultValues = {
  name: "",
  description: "",
  status: Status.ACTIVE,
};

export const serviceDefaultValues = {
  title: "",
  shortDescription: "",
  description: "",
  image: "",
  status: Status.ACTIVE,
  categoryId: "",
  serviceBenefits: { title: "", description: "", items: [""] },
  capabilities: { title: "", description: "", items: [""] },
  deliveryProcess: { title: "", description: "", items: [""] },
  outcomeFocuses: { title: "", description: "", items: [""] },
};

export const testimonialDefaultValues = {
  name: "",
  designation: "",
  company: "",
  tag: "",
  content: "",
  image: "",
  status: Status.ACTIVE,
};

export const jobsDefaultValues = {
  title: "",
  shortDescription: "",
  description: "",
  employmentType: "",
  workMode: "",
  experience: "",
  location: "",
  vacancies: "",
  status: Status.ACTIVE,
};

