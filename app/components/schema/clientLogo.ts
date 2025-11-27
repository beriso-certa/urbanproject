import { defineType, defineField } from "sanity";

export default defineType({
  name: "clientLogo",
  title: "Client Logo",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Client Name",
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Order",
    }),
  ],
});