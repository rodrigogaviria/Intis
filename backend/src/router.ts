import { z } from "zod";
import { router, publicProcedure } from "./trpc/base.js";
import { verificarConexion } from "./db/index.js";

export const appRouter = router({
  /** Valida que la Lambda responde y que alcanza RDS. */
  salud: publicProcedure.query(async () => ({
    ok: true,
    servicio: "intis",
    db: await verificarConexion(),
  })),

  /** Valida el patron de mutation + validacion con zod. */
  eco: publicProcedure
    .input(z.object({ mensaje: z.string().min(1).max(200) }))
    .mutation(({ input }) => ({
      mensaje: input.mensaje,
      recibidoEn: new Date().toISOString(),
    })),
});

export type AppRouter = typeof appRouter;
