import { defineField, defineType } from "sanity";

export const job = defineType({
  name: "job",
  title: "Job postings",
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
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Dar es Salaam, Tanzania",
    }),
    defineField({
      name: "employmentType",
      title: "Employment type",
      type: "string",
      options: {
        list: ["Full-time", "Part-time", "Contract", "Volunteer", "Internship"],
      },
    }),
    defineField({
      name: "postedAt",
      title: "Posted date",
      type: "date",
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "applyEmail",
      title: "Apply email",
      type: "string",
      initialValue: "recruitment@pasada.or.tz",
    }),
    defineField({
      name: "isActive",
      title: "Active listing",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide from the website without deleting.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "department", active: "isActive" },
    prepare({ title, subtitle, active }) {
      return {
        title: active ? title : `${title} (inactive)`,
        subtitle,
      };
    },
  },
});
