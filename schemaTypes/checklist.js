import { defineField, defineType } from "sanity";

export default defineType({
  name: "checklist",
  title: "Checklist",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Checklist title",
      type: "string",
      description: "Optional title displayed above the checklist.",
    }),

    defineField({
      name: "items",
      title: "Checklist items",
      type: "array",
      of: [
        defineField({
          name: "item",
          title: "Item",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "checked",
              title: "Checked",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "text",
              checked: "checked",
            },
            prepare({ title, checked }) {
              return {
                title: `${checked ? "☑" : "☐"} ${title}`,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],

  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare({ title, items }) {
      return {
        title: title || "Checklist",
        subtitle: `${items?.length || 0} item${items?.length === 1 ? "" : "s"}`,
      };
    },
  },
});