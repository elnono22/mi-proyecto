'use client'
import { servicios } from '../data/servicios'

export default function Servicios() {
  return (
    <section className="min-h-screen pt-24 pb-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-14 animate-fade-in-up">
        <p className="text-xs tracking-[0.5em] uppercase text-gray-500 mb-3">
          <span className="line-accent" />Lo que hacemos
        </p>
        <h2 className="text-5xl font-black">Servicios</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {servicios.map((s, i) => (
          <div
            key={s.id}
            className="border border-white/10 rounded-2xl p-6 hover:border-white/40 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up opacity-0-init"
            style={{ background: 'rgba(255,255,255,0.03)', animationDelay: `${i * 0.08}s`, animationFillMode: 'forwards' }}
          >
            <div className="text-4xl mb-4">{s.icono}</div>
            <h3 className="text-xl font-black mb-2">{s.nombre}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{s.desc}</p>
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-white font-black text-xl">${s.precio.toLocaleString('es-CO')}</span>
              <span className="text-gray-500 text-xs bg-white/5 px-3 py-1 rounded-full">{s.duracion}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Banner inferior */}
      <div
        className="mt-16 rounded-2xl p-10 text-center border border-white/10 animate-fade-in-up"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      >
        <p className="text-gray-400 text-sm mb-2 tracking-widest uppercase">¿Primera vez?</p>
        <h3 className="text-3xl font-black mb-4">10% de descuento en tu primera visita</h3>
        <p className="text-gray-500 text-sm">Menciona este sitio web al llegar a la barbería.</p>
      </div>
    </section>
  )
}
