import { siteSettings } from "@/sanity/schemaTypes/siteSettings";
import { page } from "@/sanity/schemaTypes/page";
import { service } from "@/sanity/schemaTypes/service";
import { project } from "@/sanity/schemaTypes/project";
import { testimonial } from "@/sanity/schemaTypes/testimonial";
import { post } from "@/sanity/schemaTypes/post";
import { category } from "@/sanity/schemaTypes/category";
import { job } from "@/sanity/schemaTypes/job";
import { tender } from "@/sanity/schemaTypes/tender";
import { projectCategory } from "@/sanity/schemaTypes/projectCategory";
import { serviceCategory } from "@/sanity/schemaTypes/serviceCategory";
import { testimonialCategory } from "@/sanity/schemaTypes/testimonialCategory";

export const schemaTypes = [
  siteSettings,
  page,
  category,
  projectCategory,
  serviceCategory,
  testimonialCategory,
  service,
  project,
  testimonial,
  post,
  job,
  tender,
];
