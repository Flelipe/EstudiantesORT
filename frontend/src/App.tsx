// Importamos la interface Materia desde types.ts (en la raíz del proyecto).
// "../.." significa: subir de src/ a frontend/, y de frontend/ a la raíz.
// Usamos "import type" porque Materia es solo un tipo (no es código que se
// ejecute), y la config de TypeScript de Vite pide marcarlo explícitamente.
import type { Materia } from '../../types'

// Importamos los estilos del componente. Con Vite, importar un .css
// hace que esos estilos se apliquen a la página.
import './App.css'

// Esto es un COMPONENTE de React: una función que devuelve "HTML"
// (en realidad JSX, ver abajo). Todo lo que se ve en pantalla en React
// son componentes. Este es el principal de nuestra app.
function App() {
  // Array con nuestras materias de ejemplo, hardcodeadas por ahora
  // (más adelante van a venir del backend). El ": Materia[]" le dice
  // a TypeScript que es un array de objetos con la forma de la interface,
  // así nos avisa si nos olvidamos un campo o escribimos mal un estado.
  const materias: Materia[] = [
    { nombre: 'Programación 1', codigo: 'P1', semestre: 1, estado: 'aprobado' },
    { nombre: 'Matemática discreta 1', codigo: 'MD1', semestre: 1, estado: 'aprobado' },
    { nombre: 'Programación 2', codigo: 'P2', semestre: 2, estado: 'cursando' },
    { nombre: 'Cálculo 1', codigo: 'C1', semestre: 2, estado: 'cursando' },
    { nombre: 'Álgebra lineal', codigo: 'AL', semestre: 3, estado: 'sin aprobar' },
  ]

  // Lo que el componente "devuelve" es lo que se dibuja en pantalla.
  // Esto que parece HTML dentro de JavaScript se llama JSX: una sintaxis
  // especial de React que mezcla las dos cosas.
  // Ojo: en JSX la clase CSS se escribe "className" (no "class"),
  // porque "class" ya es una palabra reservada de JavaScript.
  return (
    <div>
      <header className="header">
        <h1>Gestor de Materias</h1>
        <p>Ingeniería en Sistemas — Universidad ORT</p>
      </header>

      <main className="contenido">
        <ul className="lista-materias">
          {/* Las LLAVES {} dentro de JSX significan: "acá va JavaScript".
              .map() recorre el array y transforma cada materia en un <li>
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

              {/* El badge de estado. La clase se arma de forma DINÁMICA:
                  usamos template literals (las comillas invertidas ``)
                  para pegar texto + JavaScript en un solo string.
                  .replace(' ', '-') convierte "sin aprobar" en "sin-aprobar",
                  porque los nombres de clase CSS no pueden tener espacios.
                  Resultado: "badge badge-aprobado", "badge badge-cursando"
                  o "badge badge-sin-aprobar" — y cada una tiene su color. */}
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

// Exportamos el componente para que main.tsx pueda importarlo y montarlo
// en la página. "default" significa que es lo principal de este archivo.
export default App
