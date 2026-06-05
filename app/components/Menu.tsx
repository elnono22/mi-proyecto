'use client'
import { useState } from 'react'
import { platos } from '../data/platos'

type Categoria = 'todos' | 'burgers' | 'pollo' | 'acompañamientos' | 'bebidas' | 'combos'

const categorias: { key: Categoria; label: string; emoji: string }[] = [
  { key: 'todos',           label: 'Todos',           emoji: '🍽️' },
  { key: 'burgers',         label: 'Burgers',         emoji: '🍔' },
  { key: 'pollo',           label: 'Pollo',           emoji: '🍗' },
  { key: 'acompañamientos', label: 'Acompañamientos', emoji: '🍟' },
  { key: 'bebidas',         label: 'Bebidas',         emoji: '🥤' },
  { key: 'combos',          label: 'Combos',          emoji: '👨‍👩‍👧‍👦' },
]

export default function Menu() {
  const [activa, setActiva] = useState<Categoria>('todos')
  const filtrados = activa === 'todos' ? platos : platos.filter(p => p.categoria === activa)

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-8 animate-fade-in-up">
        <p className="text-yellow-400 tracking-widest uppercase text-xs mb-1">Lo mejor de SnapBite</p>
        <h2 className="text-5xl font-black">Nuestro Menú</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in-up delay-100">
        {categorias.map(c => (
          <button key={c.key} onClick={() => setActiva(c.key)}
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 ${
              activa === c.key ? 'bg-yellow-400 text-black scale-105' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtrados.map((p, i) => (
          <div key={p.id}
            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-yellow-400/60 hover:-translate-y-1 transition-all duration-300 flex flex-col animate-fade-in-up opacity-0-init"
            style={{ animationDelay: `${i * 0.07}s`, animationFillMode: 'forwards' }}>
            <div className="relative overflow-hidden h-44">
              <img src={p.img} alt={p.nombre} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-xs text-yellow-400 font-bold px-2 py-1 rounded-full capitalize">{p.categoria}</span>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-sm mb-1 leading-tight">{p.nombre}</h3>
              <p className="text-gray-400 text-xs mb-3 leading-tight flex-1">{p.desc}</p>
              <p className="text-yellow-400 font-black text-base">${p.precio.toLocaleString('es-CO')}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
