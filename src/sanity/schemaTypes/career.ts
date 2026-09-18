import { defineField, defineType } from "sanity";
import { richTextBlock } from "@/sanity/schemaTypes/richText";

export const career = defineType({
  name: "career",
  title: "Careers",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: ["Programme", "Health", "Education", "Finance", "Administration", "Communications"],
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Bagamoyo, Pwani / Mbezi Beach, Dar es Salaam",
    }),
    defineField({
      name: "type",
      title: "Employment type",
      type: "string",
      options: { list: ["Full-time", "Part-time", "Volunteer", "Internship", "Consultancy"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "deadline",
      title: "Application deadline",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Feature on careers page",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "summary",
      title: "Short description",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "content",
      title: "Full job description",
      type: "array",
      of: [richTextBlock],
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "deadline", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "type", deadline: "deadline" },
    prepare({ title, subtitle, deadline }) {
      return {
        title,
        subtitle: [subtitle, deadline ? `Deadline: ${deadline}` : "No deadline"].filter(Boolean).join(" · "),
      };
    },
  },
});
