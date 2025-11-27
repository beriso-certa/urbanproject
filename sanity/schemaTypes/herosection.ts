
import { defineField, defineType } from 'sanity'
import type { Rule } from 'sanity'

export default {
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Main Heading',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
      initialValue: 'Get Started'
    },
    {
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'url'
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}