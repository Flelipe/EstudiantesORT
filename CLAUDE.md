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
  - `src/App.tsx` — componente principal (login visual + lista de materias)
  - `src/data/materias.ts` — datos de las materias del plan (en construcción)
- `types.ts` (raíz) — interfaces del proyecto (ej: `Materia`)
- `IDEAS.md` — backlog de ideas
- `correlativas.md` — previaturas recopiladas de Gestión ORT (en construcción)

## Modelo de datos
- Interface `Materia`: nombre (string), codigo (string), semestre (number),
  estado ("sin aprobar" | "cursando" | "aprobado").
- El % de carrera se CALCULA (aprobadas ÷ total), no se guarda.

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