import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      initialValue: "PASADA (T)",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Care • Hope • Dignity",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      initialValue: "info@pasada.or.tz",
    }),
    defineField({
      name: "donationEmail",
      title: "Donations email/gateway",
      type: "string",
      initialValue: "info@pasada.or.tz",
    }),
    defineField({
      name: "careersEmail",
      title: "Careers email",
      type: "string",
      initialValue: "recruitment@pasada.or.tz",
    }),
    defineField({
      name: "volunteerEmail",
      title: "Volunteers email",
      type: "string",
      initialValue: "volunteer@pasada.or.tz",
    }),
    defineField({
      name: "whistleblowerChannel1Url",
      title: "Whistle-blower / Tupe taarifa — Channel 1 URL",
      type: "url",
      initialValue:
        "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAob4kyZUME5RVlRHVlZUWEVKUE42TEw2OEFMRDhFMy4u",
    }),
    defineField({
      name: "whistleblowerChannel2Url",
      title: "Whistle-blower / Tupe taarifa — Channel 2 URL",
      type: "url",
      initialValue:
        "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__qiYUi9UQUpVNDhPWk1QQTNRVkY5TFZBNjdXUElUWi4u",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      initialValue: "+255 22 286 6618",
    }),
    defineField({
      name: "address",
      title: "Address / Location",
      type: "string",
      initialValue: "Dar es Salaam, Tanzania",
    }),
    defineField({
      name: "maxFeaturedPosts",
      title: "Max featured blog posts on homepage",
      type: "number",
      initialValue: 3,
      validation: (r) => r.min(1).max(5),
    }),
    defineField({
      name: "maxFeaturedProjects",
      title: "Max featured projects on homepage",
      type: "number",
      initialValue: 3,
      validation: (r) => r.min(1).max(5),
    }),
    defineField({
      name: "maxFeaturedServices",
      title: "Max featured services on homepage",
      type: "number",
      initialValue: 6,
      validation: (r) => r.min(1).max(8),
    }),
  ],
});
