import { defineType, defineField } from "sanity";

export default defineType({
  name: "work",
  title: "Work Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Subtitle",
    }),
    defineField({
      name: "videoUrl",
      type: "url",
      title: "Video / Image URL",
    }),
    defineField({
      name: "thumbnail",
      type: "image",
      title: "Thumbnail",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
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