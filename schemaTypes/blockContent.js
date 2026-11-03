import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',

  of: [
    // Standard Portable Text block
    defineArrayMember({
      title: 'Block',
      type: 'block',

      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],

      // Native Portable Text lists
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],

      // Inline formatting and annotations
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],

        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',

            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),

    // Image
    defineArrayMember({
      type: 'image',
      options: {
        hotspot: true,
      },

      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description:
            'Describe the image for accessibility and search engines.',
        },

        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Optional caption displayed below the image.',
        },
      ],
    }),

    // Table
    defineArrayMember({
      type: 'table',
    }),

    // Checklist
    defineArrayMember({
      type: 'checklist',
    }),

    // FAQ
    defineArrayMember({
      type: 'faq',
    }),

    // Callout
    defineArrayMember({
      type: 'callout',
    }),
  ],
})