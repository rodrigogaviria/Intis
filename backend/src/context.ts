/** Contexto por request. Vacio por ahora: aqui ira la autenticacion. */
export async function crearContexto() {
  return {};
}

export type Contexto = Awaited<ReturnType<typeof crearContexto>>;
