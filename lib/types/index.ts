import z from "zod";
import { 
    applicationSchema,
    bannerSchema, 
    enquirySchema, 
    jobSchema, 
    newsletterSchema, 
    serviceCategorySchema, 
    serviceSchema, 
    testimonialSchema, 
    upcommingEventSchema, 
    userSchema 
} from "../validators";

export type User = z.infer<typeof userSchema>
export type Banner = z.infer<typeof bannerSchema>
export type Enquiry = z.infer<typeof enquirySchema>
export type ServiceCategory = z.infer<typeof serviceCategorySchema>
export type Service = z.infer<typeof serviceSchema>
export type Newsletter = z.infer<typeof newsletterSchema>
export type Testimonial = z.infer<typeof testimonialSchema>
export type UpcommingEvent = z.infer<typeof upcommingEventSchema>
export type Job = z.infer<typeof jobSchema>
export type Application = z.infer<typeof applicationSchema>

export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export enum UpcomingEventStatus {
    COMPLETED = "COMPLETED",
    NEW = "NEW",
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export enum EmploymentType {
    FULL_TIME = "FULL_TIME",
    PART_TIME = "PART_TIME",
    CONTRACT = "CONTRACT",
    FREELANCE = "FREELANCE",
    INTERNSHIP = "INTERNSHIP",
}

export enum WorkMode {
    REMOTE = "REMOTE",
    HYBRID = "HYBRID",
    ONSITE = "ONSITE",
}

export enum ApplicationStatus {
    PENDING = "PENDING",
    REVIEWING = "REVIEWING",
    SHORTLISTED = "SHORTLISTED",
    REJECTED = "REJECTED",
    HIRED = "HIRED",
}






