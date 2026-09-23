import { initTRPC } from "@trpc/server";
import type { Contexto } from "../context.js";

const t = initTRPC.context<Contexto>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
