import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";


export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey(),
  cotext: text("cotext"),
  done: integer("done")
})

