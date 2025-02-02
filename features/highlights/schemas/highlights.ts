import { z } from 'zod';

export const highlightSchema = z.object({
  content: z.string().min(1, 'Highlight cannot be empty'),
});
