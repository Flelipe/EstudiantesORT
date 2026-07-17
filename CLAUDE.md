# Gestor de Materias — Seguimiento de Carrera

## Qué es
App full-stack para llevar el seguimiento de mi carrera (Ingeniería en
Sistemas, Universidad ORT, plan 2019). Cargo mis materias, marco su estado
y veo mi progreso (% de carrera, qué puedo cursar según correlativas).

## Stack
- Frontend: React + TypeScript + Vite (carpeta `frontend/`)
- Backend: Node + Express (más adelante, carpeta `backend/`)
- Base de datos: PostgreSQL o MongoDB (más adelante)

## Estructura actual
- `frontend/` — la app React (Vite)
  - `src/App.tsx` — componente principal: login visual, lista de materias
    con cambio de estado, persistencia en localStorage y % de carrera
  - `src/data/materias.ts` — las 33 materias reales del plan, tipadas
- `types.ts` (raíz) — interfaces del proyecto (`Materia`, `GrupoPrevias`)
- `correlativas.md` — previaturas oficiales de las 33 materias (completo)
- `Plan2019.pdf` — plan oficial (fuente de nombres, códigos y semestres)
- `IDEAS.md` — backlog de ideas

## Modelo de datos
- Interface `Materia`: nombre (string), codigo (string), semestre (number),
  estado ("sin aprobar" | "cursando" | "aprobado"), previas (string[] de
  códigos, obligatorias), requisitoCreditos (number, opcional),
  grupos (GrupoPrevias[], opcional).
- Interface `GrupoPrevias`: nombre (string), opciones (string[]) — para
  requisitos "al menos una de", como en Proyecto e Ing. de software ágil 1.
- El % de carrera se CALCULA (aprobadas ÷ total), no se guarda.

## Estado actual (julio 2026)
- Frontend React + TypeScript + Vite funcionando en `frontend/`.
- Las 33 materias reales cargadas y tipadas en `src/data/materias.ts`
  (3 materias de gestión con `semestre: 0` = a confirmar).
- App.tsx: estilo ORT (header bordó, tarjetas, badges por estado),
  cambio de estado por materia con <select> (useState), progreso
  persistido en localStorage (useEffect), % de carrera derivado
  con barra de progreso (provisorio, sobre 33).
- Login solo visual: no valida nada todavía.
- Pendiente: backend, base de datos y lógica "¿qué puedo cursar?".

## Reglas sobre datos (IMPORTANTE)
- Las materias, códigos y semestres salen del PDF oficial del plan (Plan2019).
- Las correlativas/previaturas salen SOLO del portal de Gestión de ORT.
  NUNCA se inventan. Si un dato no está confirmado, se deja marcado como
  "a confirmar", no se completa a ojo.

## Reglas para Claude Code
- Explicame lo que hacés, no me des código sin contexto. Estoy aprendiendo.
- Prefiero pasos chicos y entendibles antes que soluciones grandes de golpe.
- No agregues librerías ni features sin avisarme antes.
- No inventes datos académicos (materias, previas, créditos): si no están
  en una fuente que te di, avisá en vez de suponer.