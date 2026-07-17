// ============================================================
// materias.ts — datos del plan de estudios
// ------------------------------------------------------------
// Las 33 materias de Ingeniería en Sistemas (ORT, plan 2019).
// Fuentes:
//   - nombre, código y semestre → Plan2019.pdf (plan oficial)
//   - previas, créditos y grupos → correlativas.md (portal de Gestión)
// Regla del proyecto: NO se inventan datos. Lo no confirmado está
// marcado "A CONFIRMAR" al final del archivo.
// ============================================================

// Importamos los tipos desde types.ts en la raíz del proyecto
// (../../../ = subir de data/ a src/, de src/ a frontend/, y a la raíz).
import type { Materia } from '../../../types'

export const materias: Materia[] = [
  // ---------- Semestre 1 ----------
  {
    nombre: 'Álgebra lineal',
    codigo: '2103',
    semestre: 1,
    estado: 'sin aprobar',
    previas: [],
  },
  {
    nombre: 'Cálculo en una variable',
    codigo: '7660',
    semestre: 1,
    estado: 'sin aprobar',
    previas: [],
  },
  {
    nombre: 'Programación 1',
    codigo: '1479',
    semestre: 1,
    estado: 'sin aprobar',
    previas: [],
  },
  {
    nombre: 'Taller de tecnologías 1',
    codigo: '7687',
    semestre: 1,
    estado: 'sin aprobar',
    previas: [],
  },

  // ---------- Semestre 2 ----------
  {
    nombre: 'Fundamentos de sistemas ciberfísicos',
    codigo: '7670',
    semestre: 2,
    estado: 'sin aprobar',
    previas: ['7660'], // Cálculo en una variable
  },
  {
    nombre: 'Fundamentos de computación',
    codigo: '6449',
    semestre: 2,
    estado: 'sin aprobar',
    previas: [],
  },
  {
    nombre: 'Matemática discreta',
    codigo: '6580',
    semestre: 2,
    estado: 'sin aprobar',
    previas: [],
  },
  {
    nombre: 'Programación 2',
    codigo: '1743',
    semestre: 2,
    estado: 'sin aprobar',
    previas: ['1479'], // Programación 1
  },

  // ---------- Semestre 3 ----------
  {
    nombre: 'Arquitectura de sistemas',
    codigo: '3831',
    semestre: 3,
    estado: 'sin aprobar',
    previas: [],
    requisitoCreditos: 2,
  },
  {
    nombre: 'Estructuras de datos y algoritmos 1',
    codigo: '1774',
    semestre: 3,
    estado: 'sin aprobar',
    previas: ['1743', '6449'], // Programación 2, Fundamentos de computación
  },
  {
    nombre: 'Lógica para computación',
    codigo: '6563',
    semestre: 3,
    estado: 'sin aprobar',
    previas: ['6449'], // Fundamentos de computación
    requisitoCreditos: 2,
  },
  {
    nombre: 'Probabilidad y estadística',
    codigo: '1780',
    semestre: 3,
    estado: 'sin aprobar',
    previas: ['2103', '7660'], // Álgebra lineal, Cálculo en una variable
    requisitoCreditos: 2,
  },

  // ---------- Semestre 4 ----------
  {
    nombre: 'Bases de datos 1',
    codigo: '3837',
    semestre: 4,
    estado: 'sin aprobar',
    previas: ['1743'], // Programación 2
    requisitoCreditos: 6,
  },
  {
    nombre: 'Estructuras de datos y algoritmos 2',
    codigo: '1778',
    semestre: 4,
    estado: 'sin aprobar',
    previas: ['1774', '6580'], // EDA 1, Matemática discreta
  },
  {
    nombre: 'Fundamentos de Ingeniería de software',
    codigo: '7669',
    semestre: 4,
    estado: 'sin aprobar',
    previas: ['1743'], // Programación 2
    requisitoCreditos: 6,
  },
  {
    nombre: 'Sistemas operativos',
    codigo: '6409',
    semestre: 4,
    estado: 'sin aprobar',
    previas: ['3831'], // Arquitectura de sistemas
    requisitoCreditos: 6,
  },

  // ---------- Semestre 5 ----------
  {
    nombre: 'Bases de datos 2',
    codigo: '3839',
    semestre: 5,
    estado: 'sin aprobar',
    previas: ['3837', '6563'], // Bases de datos 1, Lógica para computación
    requisitoCreditos: 6,
  },
  {
    nombre: 'Diseño de aplicaciones 1',
    codigo: '3924',
    semestre: 5,
    estado: 'sin aprobar',
    previas: ['1774', '3837', '7669'], // EDA 1, BD 1, Fund. Ing. software
    requisitoCreditos: 6,
  },
  {
    nombre: 'Redes',
    codigo: '3838',
    semestre: 5,
    estado: 'sin aprobar',
    previas: ['6409'], // Sistemas operativos
    requisitoCreditos: 9,
  },
  {
    nombre: 'Teoría de la computación',
    codigo: '6452',
    semestre: 5,
    estado: 'sin aprobar',
    previas: ['1774', '6563'], // EDA 1, Lógica para computación
    requisitoCreditos: 9,
  },

  // ---------- Semestre 6 ----------
  {
    nombre: 'Diseño de aplicaciones 2',
    codigo: '6343',
    semestre: 6,
    estado: 'sin aprobar',
    previas: ['3924', '7669'], // Diseño de apps 1, Fund. Ing. software
    requisitoCreditos: 9,
  },
  {
    nombre: 'Ingeniería de software ágil 1',
    codigo: '7674',
    semestre: 6,
    estado: 'sin aprobar',
    previas: ['3924', '7669'], // Diseño de apps 1, Fund. Ing. software
    requisitoCreditos: 12,
    // Además de las obligatorias, pide UNA de estas tres de gestión:
    grupos: [
      {
        nombre: 'al menos una de',
        opciones: ['1781', '6411', '7668'], // Adm. general, Finanzas, Economía
      },
    ],
  },
  {
    nombre: 'Programación de redes',
    codigo: '6498',
    semestre: 6,
    estado: 'sin aprobar',
    previas: ['3924', '6409'], // Diseño de apps 1, Sistemas operativos
    requisitoCreditos: 12,
  },
  {
    nombre: 'Taller de tecnologías 2',
    codigo: '7688',
    semestre: 6,
    estado: 'sin aprobar',
    // EDA 2, BD 1, Redes, Diseño de apps 1, Fund. ciberfísicos, Taller 1
    previas: ['1778', '3837', '3838', '3924', '7670', '7687'],
    requisitoCreditos: 12,
  },

  // ---------- Semestre 7 ----------
  {
    nombre: 'Arquitectura de software',
    codigo: '3851',
    semestre: 7,
    estado: 'sin aprobar',
    previas: ['1778', '3839', '6343', '6498'], // EDA 2, BD 2, DA 2, Prog. redes
    requisitoCreditos: 16,
  },
  {
    nombre: 'Ingeniería de software ágil 2',
    codigo: '7675',
    semestre: 7,
    estado: 'sin aprobar',
    previas: ['3924', '6343', '6498', '7674'], // DA 1, DA 2, Prog. redes, ISA 1
    requisitoCreditos: 16,
  },
  {
    nombre: 'Inteligencia artificial',
    codigo: '3876',
    semestre: 7,
    estado: 'sin aprobar',
    previas: ['1778', '1780', '6563'], // EDA 2, Prob. y estadística, Lógica
    requisitoCreditos: 16,
  },

  // ---------- Semestre 8 ----------
  {
    nombre: 'Arquitectura de software en la práctica',
    codigo: '6455',
    semestre: 8,
    estado: 'sin aprobar',
    previas: ['3851', '6498', '7675'], // Arq. software, Prog. redes, ISA 2
    requisitoCreditos: 20,
    grupos: [
      {
        nombre: 'al menos una de',
        // ML p/ sistemas inteligentes, ML p/ análisis de datos, ML p/ secuencias
        opciones: ['7349', '7678', '7679'],
      },
    ],
  },
  {
    nombre: 'Trabajo integrador',
    codigo: '6435',
    semestre: 8,
    estado: 'sin aprobar',
    // BD 2, DA 2, Teoría de la computación, Prog. redes, ISA 1
    previas: ['3839', '6343', '6452', '6498', '7674'],
    requisitoCreditos: 20,
  },

  // ---------- Semestre 9 ----------
  {
    nombre: 'Proyecto',
    codigo: '1798',
    semestre: 9,
    estado: 'sin aprobar',
    previas: ['3851', '3876', '7675', '7688'], // Arq. soft, IA, ISA 2, Taller 2
    requisitoCreditos: 30,
    // Además de las obligatorias, pide UNA materia de CADA uno de estos tracks:
    grupos: [
      {
        nombre: 'Big Data',
        opciones: ['3437', '3842', '7466', '7657', '7664', '7673', '7692', '7715'],
      },
      {
        nombre: 'Seguridad',
        opciones: ['4231', '6147', '7271', '8082', '8149'],
      },
      {
        nombre: 'Emprendedurismo',
        opciones: ['4518', '6852', '6934', '7686'],
      },
      {
        nombre: 'Machine Learning',
        opciones: ['7349', '7678', '7679'],
      },
      {
        nombre: 'cierre de carrera',
        opciones: ['6435', '7682', '8419', '8420', '8583'],
      },
    ],
  },

  // ============================================================
  // ⚠️ A CONFIRMAR — revisar manualmente en el portal de Gestión
  // ------------------------------------------------------------
  // Estas 3 materias NO aparecen con su código en la grilla del
  // Plan2019.pdf (el PDF solo muestra categorías genéricas tipo
  // "Materia de Ciencias sociales"). Por eso no tienen semestre
  // confirmado: semestre: 0 es un MARCADOR, no un dato real.
  // Cuando confirmes el semestre de cada una, reemplazá el 0 y
  // movela a su sección. Previas y créditos SÍ están confirmados
  // (vienen de correlativas.md).
  // ============================================================
  {
    nombre: 'Administración general',
    codigo: '1781',
    semestre: 0, // ⚠️ A CONFIRMAR
    estado: 'sin aprobar',
    previas: [],
    requisitoCreditos: 9,
  },
  {
    nombre: 'Finanzas y valoración de proyectos',
    codigo: '6411',
    semestre: 0, // ⚠️ A CONFIRMAR
    estado: 'sin aprobar',
    previas: [],
    requisitoCreditos: 16,
  },
  {
    nombre: 'Economía y organización empresarial',
    codigo: '7668',
    semestre: 0, // ⚠️ A CONFIRMAR
    estado: 'sin aprobar',
    previas: [],
    requisitoCreditos: 9,
  },
]
