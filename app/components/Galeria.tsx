'use client'
import { useState } from 'react'

const fotos = [
  { id: 1, titulo: 'Nuestras Burgers',  desc: 'Hechas con amor cada día',               img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80' },
  { id: 2, titulo: 'Papas Perfectas',   desc: 'Crocantes por fuera, suaves por dentro', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80' },
  { id: 3, titulo: 'Pollo Crocante',    desc: 'Receta secreta de la casa',               img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80' },
  { id: 4, titulo: 'Malteadas',         desc: 'El final perfecto para tu comida',        img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&q=80' },
  { id: 5, titulo: 'Ambiente',          desc: 'Un lugar para disfrutar en familia',      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80' },
  { id: 6, titulo: 'Combos',            desc: 'La mejor relación calidad-precio',        img: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&q=80' },
]

export default function Galeria() {
  const [sel, setSel] = useState<typeof fotos[0] | null>(null)

  return (
    <section className="min-h-screen pt-28 pb-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12 animate-fade-in-up">
        <p className="text-yellow-400 tracking-widest uppercase text-sm mb-2">Nuestra esencia</p>
        <h2 className="text-5xl font-black">Galería</h2>
        <p className="text-gray-400 mt-3 text-sm">Haz click en una foto para verla en grande</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fotos.map((f, i) => (
          <div key={f.id} onClick={() => setSel(f)}
            className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer animate-fade-in-up opacity-0-init"
            style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}>
            <img src={f.img} alt={f.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-yellow-400 text-black font-black px-4 py-2 rounded-full text-sm">Ver foto</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-black mb-1">{f.titulo}</h3>
              <p className="text-gray-300 text-sm">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {sel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in p-4" onClick={() => setSel(null)}>
          <div className="relative max-w-4xl w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <img src={sel.img} alt={sel.titulo} className="w-full rounded-2xl object-cover max-h-[80vh]" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
              <h3 className="text-2xl font-black">{sel.titulo}</h3>
              <p className="text-gray-300">{sel.desc}</p>
            </div>
            <button onClick={() => setSel(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full font-bold text-xl flex items-center justify-center transition-all">✕</button>
          </div>
        </div>
      )}
    </section>
  )
}
