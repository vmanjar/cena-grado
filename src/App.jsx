import { Utensils } from 'lucide-react'

function App() {
  return (
    <main className="min-h-screen max-w-md mx-auto px-5 py-8 flex flex-col justify-between">
      <header className="flex items-center gap-3">
        <Utensils className="w-6 h-6 text-[#1C1917]" strokeWidth={1.75} />
        <span className="text-xs uppercase tracking-widest opacity-70">
          Verificación de Sistema
        </span>
      </header>

      <section className="my-auto text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#1C1917]/15">
          <Utensils className="w-6 h-6 text-[#1C1917]" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-serif font-medium tracking-tight">
          Cena de Grado — Prueba de Entorno
        </h1>
      </section>

      <footer className="text-center text-xs opacity-60">
        Tailwind CSS v4 · Lucide React · GitHub Pages Ready
      </footer>
    </main>
  )
}

export default App
