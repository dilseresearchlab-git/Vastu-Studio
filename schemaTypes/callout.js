import { defineField, defineType } from "sanity";

export default defineType({
  name: "callout",
  title: "Callout",
  type: "object",

  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Note", value: "note" },
          { title: "Tip", value: "tip" },
          { title: "Important", value: "important" },
          { title: "Warning", value: "warning" },
        ],
        layout: "dropdown",
      },
      initialValue: "note",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional heading for the callout.",
    }),

    defineField({
      name: "text",
      title: "Content",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      type: "type",
      title: "title",
      text: "text",
    },

    prepare({ type, title, text }) {
      return {
        title: title || `${type || "Note"} callout`,
        subtitle: text
          ? text.length > 80
            ? `${text.slice(0, 80)}…`
            : text
          : "No content",
      };
    },
  },
});