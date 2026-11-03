import { defineField, defineType } from "sanity";

export default defineType({
  name: "table",
  title: "Table",
  type: "object",

  fields: [
    defineField({
      name: "caption",
      title: "Table caption",
      type: "string",
      description: "Optional short description of what the table shows.",
    }),

    defineField({
      name: "hasHeader",
      title: "Use first row as header",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          name: "tableRow",
          title: "Table row",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            prepare() {
              return {
                title: "Table row",
              };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      caption: "caption",
    },
    prepare({ caption }) {
      return {
        title: caption || "Table",
        subtitle: "Article table",
      };
    },
  },
});