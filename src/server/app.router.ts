import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import {
  createNoteController,
  deleteNoteController,
  findAllNotesController,
  findNoteController,
  updateNoteController,
} from "./note.controller";
import {
  createNoteSchema,
  filterQuery,
  params,
  updateNoteSchema,
} from "./note.schema";

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  getHello: t.procedure.query((req) => {
    return { message: "Welcome to Full-Stack tRPC CRUD App with Next.js" };
  }),
  createNote: t.procedure
    .input(createNoteSchema)
    .mutation(({ input }) => createNoteController({ input })),
  updateNote: t.procedure
    .input(updateNoteSchema)
    .mutation(({ input }) =>
      updateNoteController({ paramsInput: input.params, input: input.body })
    ),
  deleteNote: t.procedure
    .input(params)
    .mutation(({ input }) => deleteNoteController({ paramsInput: input })),
  getNote: t.procedure
    .input(params)
    .query(({ input }) => findNoteController({ paramsInput: input })),
  getNotes: t.procedure
    .input(filterQuery)
    .query(({ input }) => findAllNotesController({ filterQuery: input })),
});

export type AppRouter = typeof appRouter;
