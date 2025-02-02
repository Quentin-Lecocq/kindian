import { z } from 'zod';

export const noteSchema = z.object({
  content: z.string().min(1, 'Note cannot be empty'),
});
