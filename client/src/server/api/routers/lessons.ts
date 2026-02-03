import { publicProcedure, createTRPCRouter } from "../trpc";

export const lessonRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.lesson.findMany({
      include: {
        blocks: { orderBy: { order: "asc" } },
        questions: true,
      },
      orderBy: { id: "asc" },
    });
  }),

  getById: publicProcedure
    .input((val: unknown) => Number(val))
    .query(({ ctx, input }) => {
      return ctx.db.lesson.findUnique({
        where: { id: input },
        include: {
          blocks: { orderBy: { order: "asc" } },
          questions: true,
        },
      });
    }),
});
