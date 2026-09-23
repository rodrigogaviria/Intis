import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";

/** Placeholder para validar el pipeline. Se reemplaza con el modelo real. */
export const notas = mysqlTable("notas", {
  id: int("id").autoincrement().primaryKey(),
  texto: varchar("texto", { length: 200 }).notNull(),
  creadaAt: timestamp("creada_at").notNull().defaultNow(),
});
