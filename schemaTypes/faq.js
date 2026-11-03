import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "FAQ section title",
      type: "string",
      initialValue: "Frequently Asked Questions",
      description:
        "Optional heading displayed above the FAQ section.",
    }),

    defineField({
      name: "items",
      title: "Questions and answers",
      type: "array",
      of: [
        defineField({
          name: "faqItem",
          title: "FAQ item",
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],

          preview: {
            select: {
              title: "question",
            },
            prepare({ title }) {
              return {
                title: title || "FAQ question",
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
        title: title || "Frequently Asked Questions",
        subtitle: `${items?.length || 0} question${
          items?.length === 1 ? "" : "s"
        }`,
      };
    },
  },
});