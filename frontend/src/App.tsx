// useState es un "hook" de React: una función especial que nos deja
// guardar datos que pueden CAMBIAR con el tiempo (estado). Hay que
// importarlo desde 'react' para poder usarlo.
import { useState } from 'react'
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
  // Por eso: useState(materiasIniciales) crea el estado "materias"
  // usando el array importado como valor de ARRANQUE. A partir de acá,
  // la app entera lee de "materias" (el estado) y lo cambia SOLO con
  // setMaterias. El archivo materias.ts queda como la foto inicial.
  const [materias, setMaterias] = useState(materiasIniciales)

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

  // Si llegamos hasta acá es porque sesionIniciada es true:
  // se muestra la app de siempre, con la lista de materias.
  return (
    <div>
      <header className="header">
        <h1>Gestor de Materias</h1>
        <p>Ingeniería en Sistemas — Universidad ORT</p>
      </header>

      <main className="contenido">
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
