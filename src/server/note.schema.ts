import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  content: z.string({
    required_error: "Content is required",
  }),
  category: z.string().optional(),
  published: z.boolean().optional(),
});

export const params = z.object({
  noteId: z.string(),
});

export const updateNoteSchema = z.object({
  params,
  body: z
    .object({
      title: z.string(),
      content: z.string(),
      category: z.string(),
      published: z.boolean(),
    })
    .partial(),
});

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type ParamsInput = z.TypeOf<typeof params>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
export type CreateNoteInput = z.TypeOf<typeof createNoteSchema>;
export type UpdateNoteInput = z.TypeOf<typeof updateNoteSchema>;
