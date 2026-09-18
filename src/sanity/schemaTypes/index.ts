import { siteSettings } from "@/sanity/schemaTypes/siteSettings";
import { page } from "@/sanity/schemaTypes/page";
import { service } from "@/sanity/schemaTypes/service";
import { project } from "@/sanity/schemaTypes/project";
import { testimonial } from "@/sanity/schemaTypes/testimonial";
import { post } from "@/sanity/schemaTypes/post";
import { category } from "@/sanity/schemaTypes/category";
import { career } from "@/sanity/schemaTypes/career";
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
  career,
];
