import { defineField, defineType } from "sanity";
import { richTextBlock, sortableFeaturedFields } from "@/sanity/schemaTypes/richText";

export const post = defineType({
  name: "post",
  title: "Blog posts",
  type: "document",
  orderings: [
    {
      title: "Display order",
      name: "sortOrderAsc",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "publishedAt", direction: "desc" },
      ],
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
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    ...sortableFeaturedFields.map((f) => defineField(f)),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Additional photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "video",
      title: "Short video (optional)",
      type: "file",
      options: {
        accept: "video/mp4,video/webm,video/quicktime",
      },
    }),
    defineField({
      name: "content",
      title: "Article body",
      description: "Use headings, bold, lists and links for structured articles.",
      type: "array",
      of: [richTextBlock],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      category: "category.title",
      featured: "featured",
    },
    prepare({ title, media, category, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: category ? `Category: ${category}` : undefined,
        media,
      };
    },
  },
});
