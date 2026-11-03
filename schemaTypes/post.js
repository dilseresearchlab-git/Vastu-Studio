import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',

  fields: [
    // Basic information

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description:
        'A short summary of the article used in blog cards and SEO descriptions.',
      validation: (Rule) => Rule.max(300),
    }),

    // Author

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    }),

    // Main image

    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'imageAlt',
      title: 'Image alt text',
      type: 'string',
      description:
        'Describe the image for accessibility and search engines.',
    }),

    defineField({
      name: 'imageCaption',
      title: 'Image caption',
      type: 'string',
      description:
        'Optional caption displayed below the main image.',
    }),

    // Categories

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
        },
      ],
    }),

    // Publishing

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      description:
        'The date and time used as the article publication date.',
    }),

    // Article body

    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),

    // Related content

    defineField({
      name: 'relatedArticles',
      title: 'Related articles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
        },
      ],
      description:
        'Select other published articles related to this post.',
    }),

    defineField({
      name: 'relatedGuide',
      title: 'Related guide',
      type: 'string',
      description:
        'Optional guide slug or identifier. Convert this to a reference when a guide schema is available.',
    }),

    // SEO

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',

      fields: [
        defineField({
          name: 'title',
          title: 'SEO title',
          type: 'string',
          description:
            'Recommended length: approximately 50–60 characters.',
          validation: (Rule) => Rule.max(60),
        }),

        defineField({
          name: 'description',
          title: 'SEO description',
          type: 'text',
          rows: 3,
          description:
            'Recommended length: approximately 140–160 characters.',
          validation: (Rule) => Rule.max(160),
        }),

        defineField({
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description:
            'Use this only when the article should have a canonical URL different from its normal VastuGuru URL.',
        }),

        defineField({
          name: 'noIndex',
          title: 'No index',
          type: 'boolean',
          initialValue: false,
          description:
            'Prevent search engines from indexing this article.',
        }),

        defineField({
          name: 'noFollow',
          title: 'No follow',
          type: 'boolean',
          initialValue: false,
          description:
            'Tell search engines not to follow links on this article.',
        }),

        defineField({
          name: 'ogImage',
          title: 'Social sharing image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description:
            'Optional image used when the article is shared on social platforms.',
        }),
      ],
    }),
  ],

  // Studio preview

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      status: 'status',
    },

    prepare(selection) {
      const {author, status} = selection

      return {
        ...selection,
        subtitle: `${status || 'draft'}${author ? ` • by ${author}` : ''}`,
      }
    },
  },
})