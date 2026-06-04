'use client'

const platos = [
  { id: 1, nombre: 'SnapBurger Clásica', precio: '$18.000', desc: 'Carne 200g, queso cheddar, lechuga, tomate', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
  { id: 2, nombre: 'SnapBurger Doble', precio: '$24.000', desc: 'Doble carne, doble queso, bacon crujiente', img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80' },
  { id: 3, nombre: 'Crispy Chicken', precio: '$20.000', desc: 'Pollo crocante, mayonesa especial, pepinillos', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80' },
  { id: 4, nombre: 'Hot Dog Premium', precio: '$15.000', desc: 'Salchicha artesanal, mostaza, cebolla caramelizada', img: 'https://images.unsplash.com/photo-1612392166886-ee8475b03af2?w=400&q=80' },
  { id: 5, nombre: 'Papas SnapFries', precio: '$9.000', desc: 'Papas fritas con sal marina y especias', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80' },
  { id: 6, nombre: 'Aros de Cebolla', precio: '$10.000', desc: 'Aros crocantes con salsa ranch', img: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=80' },
  { id: 7, nombre: 'Malteada Clásica', precio: '$12.000', desc: 'Chocolate, vainilla o fresa. 400ml', img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&q=80' },
  { id: 8, nombre: 'Combo Familiar', precio: '$65.000', desc: '4 burgers + 4 papas + 4 bebidas', img: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80' },
]

export default function Menu() {
  return (
    <section className="h-screen pt-20 pb-4 px-4 flex flex-col max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-yellow-400 tracking-widest uppercase text-xs mb-1">Lo mejor de SnapBite</p>
        <h2 className="text-4xl font-black">Nuestro Menú</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 overflow-hidden">
        {platos.map(p => (
          <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300 flex flex-col">
            <div className="relative flex-1 overflow-hidden">
              <img src={p.img} alt={p.nombre} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm mb-1">{p.nombre}</h3>
              <p className="text-gray-400 text-xs mb-2 leading-tight">{p.desc}</p>
              <p className="text-yellow-400 font-bold">{p.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}