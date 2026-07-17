// useState es un "hook" de React: una función especial que nos deja
// guardar datos que pueden CAMBIAR con el tiempo (estado).
// useEffect es OTRO hook: sirve para ejecutar código "aparte" del
// dibujado, como efectos secundarios (guardar en disco, pedir datos...).
// Los dos se importan desde 'react'.
import { useState, useEffect } from 'react'
// SubmitEvent es el TIPO del evento que dispara un formulario al enviarse.
// Lo importamos con "type" porque es solo un tipo de TypeScript.
import type { SubmitEvent } from 'react'

// Importamos las materias REALES del plan desde el archivo de datos.
// El "as materiasIniciales" RENOMBRA el import dentro de este archivo:
// el array de datos pasa a llamarse materiasIniciales acá, para que no
// choque con el estado "materias" que creamos abajo con useState.
// El nombre lo dice todo: es el valor INICIAL, la foto de arranque.
import { materias as materiasIniciales } from './data/materias'

// Volvemos a necesitar la interface Materia: la usamos para tipar
// el estado nuevo que elige el usuario en el <select>.
import type { Materia } from '../../types'

// Importamos los estilos del componente. Con Vite, importar un .css
// hace que esos estilos se apliquen a la página.
import './App.css'

// ============================================================
// PERSISTENCIA con localStorage
// ============================================================
// localStorage es un almacén clave→valor que el NAVEGADOR guarda en
// el disco, por sitio web. A diferencia del estado de React (que vive
// en memoria y muere al recargar), lo que guardás acá sobrevive a
// recargas y a cerrar el navegador. Solo guarda STRINGS, por eso
// usamos JSON.stringify (objeto → texto) y JSON.parse (texto → objeto).

// La clave bajo la que guardamos todo. Constante para no escribir
// el string a mano en dos lugares (y evitar errores de tipeo).
const CLAVE_STORAGE = 'gestor-materias'

// Calcula el estado INICIAL de las materias:
// - Si hay datos guardados de una sesión anterior → restauramos los
//   ESTADOS guardados sobre el plan actual de materias.ts.
// - Si no hay nada guardado (primera visita) o los datos están rotos
//   → arrancamos con materias.ts tal cual.
//
// Detalle importante: NO usamos el array guardado entero. Solo le
// "robamos" el campo estado, y el resto (nombre, previas, semestre...)
// sale SIEMPRE de materias.ts. ¿Por qué? Porque materias.ts es la
// fuente de verdad del plan: si mañana corregís un semestre ahí,
// no queremos que una copia vieja guardada en el navegador lo pise.
function cargarMaterias(): Materia[] {
  // try/catch: si CUALQUIER línea de adentro explota (JSON inválido,
  // localStorage bloqueado, etc.), saltamos al catch y devolvemos el
  // plan por defecto. La app nunca se rompe por datos corruptos.
  try {
    // getItem devuelve el string guardado, o null si no existe la clave.
    const guardado = localStorage.getItem(CLAVE_STORAGE)
    if (guardado === null) {
      return materiasIniciales // primera visita: no hay nada guardado
    }

    // JSON.parse convierte el texto de vuelta a un array de objetos.
    // Si el texto está corrupto, ACÁ se lanza el error → catch.
    const guardadas = JSON.parse(guardado) as Materia[]

    // Lista de estados válidos, para descartar valores corruptos
    // (localStorage lo puede editar cualquiera desde las DevTools).
    const estadosValidos = ['sin aprobar', 'cursando', 'aprobado']

    // Por cada materia del plan actual, buscamos si había un estado
    // guardado para ese código y, si es válido, lo aplicamos.
    return materiasIniciales.map((m) => {
      const g = guardadas.find((x) => x.codigo === m.codigo)
      return g && estadosValidos.includes(g.estado)
        ? { ...m, estado: g.estado } // restauramos SOLO el estado
        : m
    })
  } catch {
    // Datos rotos → como si no hubiera nada guardado.
    return materiasIniciales
  }
}

// Componente principal de la app.
function App() {
  // ============================================================
  // ESTADO con useState
  // ============================================================
  // useState(false) crea una "cajita" de estado que arranca en false,
  // y devuelve DOS cosas (por eso los corchetes, se llama destructuring):
  //   1. sesionIniciada    → el valor ACTUAL del estado
  //   2. setSesionIniciada → la función para CAMBIARLO
  //
  // La regla de oro: el estado NUNCA se cambia a mano
  // (sesionIniciada = true ❌). Siempre se usa la función set
  // (setSesionIniciada(true) ✅), porque eso le avisa a React que
  // tiene que volver a ejecutar el componente y redibujar la pantalla.
  const [sesionIniciada, setSesionIniciada] = useState(false)

  // Estado para los campos del formulario. Son "inputs controlados":
  // React guarda lo que el usuario escribe (ver los input más abajo).
  const [numeroEstudiante, setNumeroEstudiante] = useState('')
  const [contrasena, setContrasena] = useState('')

  // ============================================================
  // LAS MATERIAS AHORA SON ESTADO
  // ============================================================
  // Antes usábamos el array importado directo. El problema: si el
  // usuario cambia el estado de una materia, ese cambio tiene que
  // REDIBUJAR la pantalla — y React solo redibuja cuando cambia un
  // estado (useState). Un array importado es "invisible" para React.
  //
  // El estado "materias" ahora arranca con lo que diga cargarMaterias():
  // lo guardado en localStorage si existe, o materias.ts si no.
  //
  // Ojo al detalle: pasamos la FUNCIÓN (useState(cargarMaterias)),
  // NO su resultado (useState(cargarMaterias())). Se llama "inicializador
  // perezoso" (lazy initializer): React la ejecuta UNA sola vez, al montar
  // el componente. Si pusiéramos los paréntesis, leeríamos localStorage
  // en CADA redibujado — funciona, pero es trabajo inútil.
  const [materias, setMaterias] = useState(cargarMaterias)

  // ============================================================
  // useEffect: GUARDAR cada vez que cambian las materias
  // ============================================================
  // useEffect ejecuta código DESPUÉS de que React dibuja. Recibe:
  //   1. una función con el código a ejecutar (el "efecto")
  //   2. un array de DEPENDENCIAS: [materias] significa "ejecutá el
  //      efecto solo cuando materias cambie".
  //
  // ¿Por qué no guardar directo dentro de cambiarEstado? Se podría,
  // pero este patrón es más robusto: no importa DESDE DÓNDE cambien
  // las materias (el select de hoy, un botón de mañana, el backend
  // de pasado mañana) — este efecto SIEMPRE se entera y guarda.
  // Es "reactivo": reacciona al dato, no a quién lo tocó.
  //
  // El flujo completo queda así:
  //   usuario elige en el select → setMaterias → React redibuja
  //   → useEffect ve que materias cambió → guarda en localStorage.
  useEffect(() => {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(materias))
  }, [materias])

  // Cambia el estado de UNA materia, identificada por su código.
  // Materia['estado'] es un "tipo indexado": le pedimos a TypeScript
  // el tipo del campo estado de la interface, o sea el union
  // "sin aprobar" | "cursando" | "aprobado". Así, si mañana agregás
  // un estado nuevo a la interface, esta función lo acepta sola.
  //
  // ¿Por qué NO mutar? (regla clave de React)
  // ❌ materia.estado = nuevoEstado  → muta el objeto existente.
  //    React compara el array nuevo con el viejo por REFERENCIA
  //    (¿es el mismo array u otro?). Si mutás adentro, el array sigue
  //    siendo "el mismo" y React puede no enterarse → no redibuja.
  // ✅ .map() crea un array NUEVO, y para la materia que cambia
  //    creamos un objeto NUEVO. React ve "array distinto" → redibuja.
  //
  // { ...m, estado: nuevoEstado } es "spread": copiá todos los campos
  // de m tal cual, y pisá estado con el valor nuevo. Copia + cambio
  // en una sola expresión.
  function cambiarEstado(codigo: string, nuevoEstado: Materia['estado']) {
    setMaterias(
      materias.map((m) =>
        // ¿Es la materia que el usuario tocó? → objeto nuevo con el
        // estado nuevo. ¿No es? → la dejamos pasar tal cual.
        m.codigo === codigo ? { ...m, estado: nuevoEstado } : m
      )
    )
  }

  // Función que se ejecuta al enviar el formulario de login.
  // e.preventDefault() frena el comportamiento por defecto del navegador
  // (recargar la página al enviar un form), que en React no queremos.
  // Por ahora NO validamos nada: solo cambiamos el estado a true,
  // y React automáticamente redibuja mostrando las materias.
  function manejarLogin(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setSesionIniciada(true)
  }

  // ============================================================
  // RENDERIZADO CONDICIONAL
  // ============================================================
  // "Renderizado condicional" = mostrar una cosa u otra según el estado.
  // Acá usamos un if con return anticipado: si NO hay sesión iniciada,
  // devolvemos la pantalla de login y la función termina acá — la lista
  // de materias de abajo ni se dibuja.
  //
  // Cuando el usuario aprieta el botón, setSesionIniciada(true) cambia
  // el estado → React vuelve a ejecutar App() → esta vez el if no entra
  // → se devuelve la lista de materias. Esa es la magia de React:
  // vos cambiás el DATO y React se encarga de cambiar la PANTALLA.
  if (!sesionIniciada) {
    return (
      <div className="login-pantalla">
        {/* onSubmit: el form llama a manejarLogin al enviarse (con el
            botón o apretando Enter en un campo). */}
        <form className="login-card" onSubmit={manejarLogin}>
          <h1>Gestor de Materias</h1>
          <p className="login-subtitulo">Ingresá con tu cuenta de estudiante</p>

          {/* INPUT CONTROLADO: el circuito completo es así:
              1. value={numeroEstudiante} → el input muestra lo que dice el estado
              2. el usuario tipea una letra → se dispara onChange
              3. e.target.value es el texto actual del input
              4. setNumeroEstudiante(...) guarda ese texto en el estado
              5. React redibuja y el input muestra el nuevo valor
              Así React siempre "sabe" lo que hay escrito, y el dato
              queda disponible en una variable para usarlo después. */}
          <label className="login-label">
            Número de estudiante
            <input
              type="text"
              value={numeroEstudiante}
              onChange={(e) => setNumeroEstudiante(e.target.value)}
              placeholder="Ej: 123456"
            />
          </label>

          {/* type="password" hace que se vean puntitos en vez del texto. */}
          <label className="login-label">
            Contraseña
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {/* type="submit" → este botón dispara el onSubmit del form,
              que llama a manejarLogin y cambia el estado. */}
          <button type="submit" className="login-boton">
            Iniciar sesión
          </button>
        </form>
      </div>
    )
  }

  // ============================================================
  // % DE CARRERA — dato DERIVADO (no es estado)
  // ============================================================
  // Esto NO va en un useState. ¿Por qué? Porque se puede CALCULAR
  // a partir de las materias, que ya son estado. Si lo guardáramos
  // aparte, habría que acordarse de actualizarlo en cada cambio
  // (propenso a bugs y a que quede desincronizado). Calculándolo acá,
  // en cada render, siempre está correcto solo: cambia una materia →
  // React re-ejecuta App() → estas líneas se recalculan → listo.
  // Es el principio de "una sola fuente de verdad": el estado guarda
  // lo MÍNIMO, y todo lo deducible se deriva.
  //
  // ⚠️ PROVISORIO: calcula sobre las 33 materias cargadas. El plan
  // real tiene además materias genéricas/electivas (ver Plan2019.pdf),
  // así que el total a futuro no es exactamente 33. Refinar cuando
  // definamos cómo contar electivas.
  const aprobadas = materias.filter((m) => m.estado === 'aprobado').length
  const porcentaje = Math.round((aprobadas / materias.length) * 100)

  // Si llegamos hasta acá es porque sesionIniciada es true:
  // se muestra la app de siempre, con la lista de materias.
  return (
    <div>
      <header className="header">
        <h1>Gestor de Materias</h1>
        <p>Ingeniería en Sistemas — Universidad ORT</p>
      </header>

      <main className="contenido">
        {/* Panel de progreso: usa los valores DERIVADOS calculados arriba.
            No hay ningún estado nuevo acá — cuando cambiás una materia
            en el select, React redibuja y esta barra se actualiza sola. */}
        <section
          className="card"
          style={{ flexDirection: 'column', alignItems: 'stretch', marginBottom: '20px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h2 style={{ margin: 0, fontSize: '16px' }}>Progreso de la carrera</h2>
            <span style={{ fontWeight: 600, color: 'var(--bordo)' }}>
              {/* aprobadas de un total provisorio de 33 (ver comentario arriba) */}
              {aprobadas} / {materias.length} · {porcentaje}%
            </span>
          </div>

          {/* Barra de progreso "a mano": un riel gris de fondo, y adentro
              un relleno bordó cuyo ANCHO es el porcentaje. width dinámico
              con template literal: `${porcentaje}%` → ej: "42%". */}
          <div
            style={{
              backgroundColor: 'var(--sin-aprobar-bg)',
              borderRadius: '999px',
              height: '10px',
              overflow: 'hidden', // recorta el relleno a los bordes redondeados
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--bordo)',
                height: '100%',
                width: `${porcentaje}%`,
                borderRadius: '999px',
                transition: 'width 0.3s', // animación suave al cambiar
              }}
            />
          </div>
        </section>

        <ul className="lista-materias">
          {/* .map() recorre el array y transforma cada materia en un <li>
              (una tarjeta). key={materia.codigo} le da a React un
              identificador único por elemento. */}
          {materias.map((materia) => (
            <li key={materia.codigo} className="card">
              <div>
                <h2>{materia.nombre}</h2>
                <p className="detalle">
                  {/* Operador ternario: condición ? siAsí : siNo.
                      semestre 0 es nuestro marcador de "sin confirmar"
                      (las 3 materias de gestión), así que en ese caso
                      mostramos un texto en vez de un "Semestre 0" falso. */}
                  {materia.codigo} ·{' '}
                  {materia.semestre === 0
                    ? 'Semestre a confirmar'
                    : `Semestre ${materia.semestre}`}
                </p>
              </div>

              {/* Columna derecha de la tarjeta: badge arriba, select abajo.
                  style={{...}} es un ESTILO INLINE en JSX: la primera llave
                  es "acá va JavaScript" y la segunda es un objeto con las
                  propiedades CSS (en camelCase: flexDirection, no flex-direction).
                  Lo usamos acá por ser poquitas líneas; si crece, va a App.css. */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                {/* Badge de estado: la clase se arma dinámicamente con
                    template literals; .replace(' ', '-') convierte
                    "sin aprobar" en "sin-aprobar" (las clases CSS no
                    admiten espacios). Cada clase tiene su color. */}
                <span className={`badge badge-${materia.estado.replace(' ', '-')}`}>
                  {materia.estado}
                </span>

                {/* SELECT CONTROLADO: mismo circuito que los inputs del login.
                    - value={materia.estado} → el select muestra el estado
                      actual de ESTA materia (el dato manda sobre la pantalla).
                    - onChange → cuando el usuario elige otra opción,
                      llamamos a cambiarEstado con el código de esta materia
                      y el valor elegido (e.target.value).
                    - "as Materia['estado']": e.target.value llega como string
                      genérico; le decimos a TS "confiá, es uno de los tres
                      estados válidos" — seguro acá porque las <option> solo
                      pueden ser esos tres valores. */}
                <select
                  value={materia.estado}
                  onChange={(e) => cambiarEstado(materia.codigo, e.target.value as Materia['estado'])}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid var(--borde)',
                    fontFamily: 'inherit',
                    fontSize: '13px',
                    color: 'var(--texto)',
                    backgroundColor: 'var(--blanco)',
                    cursor: 'pointer',
                  }}
                >
                  <option value="sin aprobar">sin aprobar</option>
                  <option value="cursando">cursando</option>
                  <option value="aprobado">aprobado</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

// Exportamos el componente para que main.tsx pueda importarlo y montarlo.
export default App
