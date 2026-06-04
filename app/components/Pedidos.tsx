'use client'
import { useState } from 'react'
import { supabase } from '../supabase'

const platos = [
  { id: 1, nombre: 'SnapBurger Clásica', precio: 18000, emoji: '🍔', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
  { id: 2, nombre: 'SnapBurger Doble', precio: 24000, emoji: '🍔', img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80' },
  { id: 3, nombre: 'Crispy Chicken', precio: 20000, emoji: '🍗', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80' },
  { id: 4, nombre: 'Hot Dog Premium', precio: 15000, emoji: '🌭', img: 'https://images.unsplash.com/photo-1612392166886-ee8475b03af2?w=400&q=80' },
  { id: 5, nombre: 'Papas SnapFries', precio: 9000, emoji: '🍟', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80' },
  { id: 6, nombre: 'Aros de Cebolla', precio: 10000, emoji: '🧅', img: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=80' },
  { id: 7, nombre: 'Malteada Clásica', precio: 12000, emoji: '🥤', img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&q=80' },
  { id: 8, nombre: 'Combo Familiar', precio: 65000, emoji: '👨‍👩‍👧‍👦', img: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80' },
]

export default function Pedidos() {
  const [carrito, setCarrito] = useState<{id:number,nombre:string,precio:number,emoji:string,cantidad:number}[]>([])
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', direccion: '' })
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)

  const agregar = (p: typeof platos[0]) => {
    setCarrito(prev => {
      const existe = prev.find(x => x.id === p.id)
      if (existe) return prev.map(x => x.id === p.id ? {...x, cantidad: x.cantidad + 1} : x)
      return [...prev, {...p, cantidad: 1}]
    })
  }

  const quitar = (id: number) => setCarrito(prev => prev.filter(x => x.id !== id))
  const total = carrito.reduce((acc, x) => acc + x.precio * x.cantidad, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (carrito.length === 0) return alert('Agrega algo al carrito')
    setLoading(true)
    const { error } = await supabase.from('pedidos').insert([{ ...form, items: carrito, total }])
    if (!error) setOk(true)
    setLoading(false)
  }

  if (ok) return (
    <section className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-6">🛵</div>
        <h2 className="text-4xl font-black mb-4">¡Pedido Recibido!</h2>
        <p className="text-gray-300 text-lg">Tu pedido está en camino. Tiempo estimado: 30 min.</p>
        <button onClick={() => { setOk(false); setCarrito([]) }}
          className="mt-8 bg-yellow-400 text-black font-bold px-8 py-3 rounded-full">
          Nuevo Pedido
        </button>
      </div>
    </section>
  )

  return (
    <section className="min-h-screen pt-24 pb-6 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-yellow-400 tracking-widest uppercase text-xs mb-1">A domicilio</p>
        <h2 className="text-4xl font-black">Pedidos Online</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LISTA */}
        <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto pr-1">
          {platos.map(p => (
            <div key={p.id} className="rounded-2xl overflow-hidden flex items-center gap-4 border border-yellow-500/20"
              style={{background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)'}}>
              <img src={p.img} alt={p.nombre} className="w-24 h-24 object-cover flex-shrink-0" />
              <div className="flex-1 py-2">
                <p className="font-black text-lg text-white">{p.nombre}</p>
                <p className="text-yellow-400 font-bold text-base">${p.precio.toLocaleString('es-CO')}</p>
              </div>
              <button onClick={() => agregar(p)}
                className="bg-yellow-400 text-black font-black px-4 py-2 m-3 rounded-xl hover:bg-yellow-300 transition-all text-sm">
                + Agregar
              </button>
            </div>
          ))}
        </div>

        {/* CARRITO + FORM */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-4 border border-yellow-500/20" style={{background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)'}}>
            <h3 className="font-black text-yellow-400 text-lg mb-3">🛒 Tu carrito</h3>
            {carrito.length === 0 ? (
              <p className="text-gray-400 text-center py-3">Agrega productos al carrito</p>
            ) : (
              <>
                {carrito.map(x => (
                  <div key={x.id} className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="font-semibold text-white">{x.emoji} {x.nombre} x{x.cantidad}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-400 font-bold">${(x.precio * x.cantidad).toLocaleString('es-CO')}</span>
                      <button onClick={() => quitar(x.id)} className="text-red-400 hover:text-red-300 font-bold">✕</button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between font-black text-xl pt-3">
                  <span>Total</span>
                  <span className="text-yellow-400">${total.toLocaleString('es-CO')}</span>
                </div>
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl p-4 border border-yellow-500/20 flex flex-col gap-3"
            style={{background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)'}}>
            <h3 className="font-black text-yellow-400 text-lg">📍 Datos de entrega</h3>
            {[
              { placeholder: 'Tu nombre completo', key: 'nombre', type: 'text' },
              { placeholder: 'Tu email', key: 'email', type: 'email' },
              { placeholder: 'Tu teléfono', key: 'telefono', type: 'text' },
              { placeholder: 'Dirección de entrega', key: 'direccion', type: 'text' },
            ].map(f => (
              <input key={f.key} required type={f.type} placeholder={f.placeholder}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm({...form, [f.key]: e.target.value})}
                className="rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400 font-medium"
                style={{background: 'rgba(255,255,255,0.1)'}} />
            ))}
            <button type="submit" disabled={loading}
              className="bg-yellow-400 text-black font-black py-4 rounded-xl hover:bg-yellow-300 transition-all text-lg mt-1">
              {loading ? 'Enviando...' : '🛵 Hacer Pedido'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}