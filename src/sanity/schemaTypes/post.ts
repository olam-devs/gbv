import { defineField, defineType } from "sanity";
import { richTextBlock, sortableFeaturedFields } from "@/sanity/schemaTypes/richText";

export const post = defineType({
  name: "post",
  title: "Resources",
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
      title: "Type",
      description: "Choose Articles or News.",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "topic",
      title: "Topic",
      description: "Articles only — the subject area this article covers.",
      type: "string",
      options: {
        list: [
          { title: "GBV Awareness", value: "awareness" },
          { title: "Legal Aid", value: "legal" },
          { title: "Health & Wellbeing", value: "health" },
          { title: "Education", value: "education" },
          { title: "Community Stories", value: "community" },
          { title: "Policy & Research", value: "policy" },
        ],
      },
      hidden: ({ document }) => document?.category?._ref !== "cat-blog-articles",
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
      topic: "topic",
      featured: "featured",
    },
    prepare({ title, media, category, topic, featured }) {
      const label = [category, topic].filter(Boolean).join(" · ");
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: label || undefined,
        media,
      };
    },
  },
});
