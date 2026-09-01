import { defineField, defineType } from "sanity";
import { richTextBlock } from "@/sanity/schemaTypes/richText";

export const tender = defineType({
  name: "tender",
  title: "Tenders",
  type: "document",
  orderings: [
    {
      title: "Deadline",
      name: "deadlineAsc",
      by: [{ field: "deadline", direction: "asc" }],
    },
    {
      title: "Published date",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Tender title",
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
      name: "tenderNumber",
      title: "Tender / reference number",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["Open", "Closed"] },
      initialValue: "Open",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "date",
    }),
    defineField({
      name: "deadline",
      title: "Submission deadline",
      type: "datetime",
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "document",
      title: "Tender document",
      description: "Upload the full tender document (PDF or Word) for download.",
      type: "file",
      options: {
        accept:
          "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    }),
    defineField({
      name: "content",
      title: "Full tender details",
      type: "array",
      of: [richTextBlock],
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email for inquiries",
      type: "string",
      initialValue: "info@pasada.or.tz",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "mainImage" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `Status: ${subtitle}` : undefined, media };
    },
  },
});
