// ============================================================
// types.ts
// ------------------------------------------------------------
// Este archivo sirve para guardar los TIPOS e INTERFACES del
// proyecto. En vez de repetir la "forma" de los datos en cada
// archivo, los definimos una sola vez acá y los reutilizamos.
// ============================================================

// Una interface es un "contrato" que describe qué campos (y de qué
// tipo) debe tener un objeto — no genera código, solo lo describe.

// Un grupo de previas "al menos una de": alcanza con aprobar UNA
// de las opciones. Ej: el track "Big Data" de Proyecto.

export interface GrupoPrevias {
  nombre: string;      // el nombre del track, ej: "Big Data"
  opciones: string[];  // códigos de las materias; alcanza con aprobar una
}
export interface Materia {
  // acá van los campos:
  nombre: string;
  codigo: string;
  semestre: number;
  estado: "sin aprobar" | "cursando" | "aprobado"; 
  previas: string[]; // Previas OBLIGATORIAS: hay que aprobar TODAS. Lista de códigos.
  // Requisito de créditos: cantidad de materias del título aprobadas.
  // Opcional (?): muchas materias no lo piden.
  requisitoCreditos?: number;
  // Grupos "al menos una de": hay que aprobar una de cada grupo.
  // Opcional (?): solo algunas materias (Proyecto, ISA 1) los tienen.
  grupos?: GrupoPrevias[];
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
