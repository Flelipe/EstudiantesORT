# Ideas — Backlog

## Núcleo (versión 1, lo que estoy construyendo ahora)
- [x] Cargar materias y marcar estado (pendiente / cursando / aprobada)
- [x] Porcentaje de carrera realizada
- [ ] Ver qué materias puedo cursar según lo aprobado

## Pendientes / próximos pasos
- [ ] Confirmar semestre real de las 3 materias de gestión
      (Adm. general 1781, Finanzas 6411, Economía 7668 — hoy con
      semestre: 0 en materias.ts). Revisar en el portal de Gestión.
- [ ] Refinar el % de carrera: hoy es provisorio sobre 33 materias;
      el total real del plan incluye genéricas/electivas (ver PDF).
- [ ] Ojo al calcular "¿qué puedo cursar?": las electivas de los grupos
      de Proyecto no existen como materias propias en el array.
- [ ] Semana 3 (capítulo grande): backend + base de datos (persistencia
      real más allá del navegador) y lógica "¿qué puedo cursar?".

## Fase 2 (después, si hay tiempo)
- [ ] Recomendación: "aprobé X, ¿qué curso el próximo semestre?" (según correlativas)
- [ ] Links organizados a archivos de cada materia (prácticos, teóricos)

## Fase avanzada (requiere backend + seguridad)
- [ ] Login real multiusuario: cada alumno entra con su identificación
      y contraseña. Requiere base de datos de usuarios, contraseñas
      hasheadas, sesiones/tokens. (Tema de Seguridad informática, sem 7).
      NO hacer hasta tener backend sólido.
- [ ] IA integrada como asistente de recomendación (¿qué me conviene
      cursar?), usando una API de IA desde el backend. Requiere backend
      con API keys seguras. No hacer hasta tener backend.

## Descartadas / fuera de alcance por ahora
- Recomendaciones entre estudiantes (necesita varios usuarios y login)
- API de ORT (no hay API pública; uso mis propios datos del plan)

## Ideas sueltas (por clasificar)
- acceder a los datos de la ORT mediante una API key ? para saber las materias, 
creditos, etc... 

