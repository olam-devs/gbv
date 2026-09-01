import { defineField, defineType } from "sanity";

export const testimonialCategory = defineType({
  name: "testimonialCategory",
  title: "Testimonial categories",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "description",
      title: "Description (optional)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "image",
      title: "Category image",
      type: "image",
      description: "Representative photo for this category (e.g. clients, volunteers).",
      options: { hotspot: true },
    }),
  ],
});

