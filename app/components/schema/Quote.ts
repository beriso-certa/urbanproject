import { defineType, defineField } from "sanity";

export default defineType({
  name: "quote",
  title: "Quote Section",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      type: "text",
      title: "Quote",
    }),
    defineField({
      name: "author",
      type: "string",
      title: "Author",
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Role / Company",
    }),
  ],
});