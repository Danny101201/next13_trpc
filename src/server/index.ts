import { publicProcedure, router } from "./trpc";
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { todos } from "./db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const sqlite = new Database('sqlite.db');
const db: BetterSQLite3Database = drizzle(sqlite);
migrate(db, { migrationsFolder: "drizzle" });
export const appRouters = router({
  getTodos: publicProcedure.query(async () => {
    return await db.select().from(todos).all();
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
    await db.insert(todos).values({ cotext: opts.input, done: 0 }).run()
  }),
  toggleTodo: publicProcedure.input(z.object({
    id: z.number(),
    done: z.number()
  })).mutation(async (opts) => {
    await db.update(todos)
      .set({ done: opts.input.done })
      .where(eq(todos.id, opts.input.id))
      .run()
  }),
  deleteTodos: publicProcedure.mutation(async () => {
    await db.delete(todos)
  })
})


export type AppRouter = typeof appRouters