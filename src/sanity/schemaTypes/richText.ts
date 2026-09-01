/** Portable Text block with headings, lists, bold, italic, links. */
export const richTextBlock = {
  type: "block" as const,
  styles: [
    { title: "Normal", value: "normal" },
    { title: "Heading 2", value: "h2" },
    { title: "Heading 3", value: "h3" },
    { title: "Heading 4", value: "h4" },
    { title: "Quote", value: "blockquote" },
  ],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Numbered", value: "number" },
  ],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
      { title: "Underline", value: "underline" },
      { title: "Code", value: "code" },
    ],
    annotations: [
      {
        name: "link",
        type: "object",
        title: "Link",
        fields: [
          {
            name: "href",
            type: "url",
            title: "URL",
            validation: (r: { required: () => unknown }) => r.required(),
          },
          {
            name: "openInNewTab",
            type: "boolean",
            title: "Open in new tab",
            initialValue: true,
          },
        ],
      },
    ],
  },
};

export const sortableFeaturedFields = [
  {
    name: "sortOrder",
    title: "Display order",
    type: "number",
    description: "Lower numbers appear first in listings.",
    initialValue: 100,
  },
  {
    name: "featured",
    title: "Feature on homepage",
    type: "boolean",
    initialValue: false,
  },
  {
    name: "featuredOrder",
    title: "Homepage feature order",
    type: "number",
    description: "Lower numbers appear first among featured items.",
    initialValue: 100,
    hidden: ({ parent }: { parent?: { featured?: boolean } }) => !parent?.featured,
  },
] as const;
