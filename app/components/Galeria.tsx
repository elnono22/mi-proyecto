'use client'

const fotos = [
  { id: 1, titulo: 'Nuestras Burgers', desc: 'Hechas con amor cada día', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80' },
  { id: 2, titulo: 'Papas Perfectas', desc: 'Crocantes por fuera, suaves por dentro', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80' },
  { id: 3, titulo: 'Pollo Crocante', desc: 'Receta secreta de la casa', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80' },
  { id: 4, titulo: 'Malteadas', desc: 'El final perfecto para tu comida', img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&q=80' },
  { id: 5, titulo: 'Ambiente', desc: 'Un lugar para disfrutar en familia', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80' },
  { id: 6, titulo: 'Combos', desc: 'La mejor relación calidad-precio', img: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80' },
]

export default function Galeria() {
  return (
    <section className="min-h-screen pt-28 pb-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-yellow-400 tracking-widest uppercase text-sm mb-2">Nuestra esencia</p>
        <h2 className="text-5xl font-black">Galería</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fotos.map(f => (
          <div key={f.id} className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer">
            <img src={f.img} alt={f.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-black mb-1">{f.titulo}</h3>
              <p className="text-gray-300 text-sm">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}