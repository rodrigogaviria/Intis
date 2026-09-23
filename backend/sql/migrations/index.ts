import m0001 from "./0001_inicial.sql";

export interface Migracion {
  version: string;
  nombre: string;
  sql: string;
}

/** En orden. Una migracion ya aplicada nunca se edita: se agrega una nueva. */
export const MIGRACIONES: Migracion[] = [
  { version: "0001", nombre: "inicial", sql: m0001 },
];
