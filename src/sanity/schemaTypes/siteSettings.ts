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
      initialValue: "GI-Desk",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Stop Violence",
    }),
    defineField({
      name: "email",
      title: "General email",
      type: "string",
      initialValue: "genderdeskhelp@gmail.com",
    }),
    defineField({
      name: "donationEmail",
      title: "Donations email/gateway",
      type: "string",
      initialValue: "genderdeskhelp@gmail.com",
    }),
    defineField({
      name: "careersEmail",
      title: "Careers email",
      type: "string",
      initialValue: "genderdeskhelp@gmail.com",
    }),
    defineField({
      name: "volunteerEmail",
      title: "Volunteers email",
      type: "string",
      initialValue: "genderdeskhelp@gmail.com",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      initialValue: "+255 757 128 222",
    }),
    defineField({
      name: "address",
      title: "Head office address",
      type: "string",
      initialValue: "Kiharaka-kiembeni St, Mapinga Ward, Bagamoyo District, Pwani",
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
