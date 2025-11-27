import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Short Description",
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Order",
    }),
  ],
  orderings: [
    {
      title: "Order Asc",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});