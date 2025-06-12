import z from 'zod/v4'

export const habitZodSchema = z.object({
  name: z.string().min(4, {
    error: 'Please enter a habit name.',
  }),
  description: z.string().min(1, {
    error: 'We need to know.',
  }),
  category: z.object(
    {
      value: z.string({
        error: (issue) =>
          issue.input === undefined
            ? 'Please select a category'
            : 'Not a string',
      }),
      label: z.string(),
    },
    {
      error: (issue) =>
        issue.input === undefined ? 'Please select a category' : 'Not a string',
    },
  ),
  duration: z.coerce.number(),
  enableNotifications: z.boolean(),
})
