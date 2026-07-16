// ============================================================
// types.ts
// ------------------------------------------------------------
// Este archivo sirve para guardar los TIPOS e INTERFACES del
// proyecto. En vez de repetir la "forma" de los datos en cada
// archivo, los definimos una sola vez acá y los reutilizamos.
// ============================================================

// Una interface es un "contrato" que describe qué campos (y de qué
// tipo) debe tener un objeto — no genera código, solo lo describe.

export interface Materia {
  // acá van los campos:
  nombre: string;
  codigo: string;
  semestre: number;
  estado: "sin aprobar" | "cursando" | "aprobado"; 
}

// ------------------------------------------------------------
// ¿Qué hace "export"?
// La palabra "export" hace que esta interface sea visible desde
// afuera de este archivo. Sin export, Materia solo existiría acá
// adentro. Lo vamos a necesitar para que otros archivos (por
// ejemplo, los componentes de React) puedan hacer:
//   import { Materia } from "./types";
// y así usar el mismo tipo en todo el proyecto.
// ------------------------------------------------------------
