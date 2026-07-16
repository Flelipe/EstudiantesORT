// useState es un "hook" de React: una función especial que nos deja
// guardar datos que pueden CAMBIAR con el tiempo (estado). Hay que
// importarlo desde 'react' para poder usarlo.
import { useState } from 'react'
// SubmitEvent es el TIPO del evento que dispara un formulario al enviarse.
// Lo importamos con "type" porque es solo un tipo de TypeScript.
import type { SubmitEvent } from 'react'

// Importamos la interface Materia desde types.ts (en la raíz del proyecto).
// "../.." significa: subir de src/ a frontend/, y de frontend/ a la raíz.
// Usamos "import type" porque Materia es solo un tipo (no es código que se
// ejecute), y la config de TypeScript de Vite pide marcarlo explícitamente.
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

  // Materias de ejemplo, hardcodeadas por ahora (después vendrán del
  // backend). ": Materia[]" = array de objetos con la forma de la interface.
  const materias: Materia[] = [
    { nombre: 'Programación 1', codigo: 'P1', semestre: 1, estado: 'aprobado' },
    { nombre: 'Matemática discreta 1', codigo: 'MD1', semestre: 1, estado: 'aprobado' },
    { nombre: 'Programación 2', codigo: 'P2', semestre: 2, estado: 'cursando' },
    { nombre: 'Cálculo 1', codigo: 'C1', semestre: 2, estado: 'cursando' },
    { nombre: 'Álgebra lineal', codigo: 'AL', semestre: 3, estado: 'sin aprobar' },
  ]

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
                  {materia.codigo} · Semestre {materia.semestre}
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
