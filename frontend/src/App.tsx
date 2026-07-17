// useState es un "hook" de React: una función especial que nos deja
// guardar datos que pueden CAMBIAR con el tiempo (estado). Hay que
// importarlo desde 'react' para poder usarlo.
import { useState } from 'react'
// SubmitEvent es el TIPO del evento que dispara un formulario al enviarse.
// Lo importamos con "type" porque es solo un tipo de TypeScript.
import type { SubmitEvent } from 'react'

// Importamos las materias REALES del plan desde el archivo de datos.
// Ojo: este import es distinto al "import type" que teníamos antes:
// acá importamos un VALOR (el array con los datos), no un tipo.
// Ya no necesitamos importar la interface Materia en este archivo,
// porque el array ya viene tipado como Materia[] desde materias.ts.
import { materias } from './data/materias'

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

              {/* Badge de estado: la clase se arma dinámicamente con
                  template literals; .replace(' ', '-') convierte
                  "sin aprobar" en "sin-aprobar" (las clases CSS no
                  admiten espacios). Cada clase tiene su color. */}
              <span className={`badge badge-${materia.estado.replace(' ', '-')}`}>
                {materia.estado}
              </span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

// Exportamos el componente para que main.tsx pueda importarlo y montarlo.
export default App
