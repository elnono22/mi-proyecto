'use client'
import { useState } from 'react'
import { supabase } from '../supabase'
import { platos } from '../data/platos'

type ItemCarrito = { id: number; nombre: string; precio: number; emoji: string; cantidad: number }
type Toast = { id: number; msg: string }

export default function Pedidos() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])
  const [form, setForm]       = useState({ nombre: '', email: '', telefono: '', direccion: '' })
  const [loading, setLoading] = useState(false)
  const [ok, setOk]           = useState(false)
  const [toasts, setToasts]   = useState<Toast[]>([])

  const showToast = (msg: string) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, msg }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2500)
  }

  const agregar = (p: typeof platos[0]) => {
    setCarrito(prev => {
      const existe = prev.find(x => x.id === p.id)
      if (existe) return prev.map(x => x.id === p.id ? { ...x, cantidad: x.cantidad + 1 } : x)
      return [...prev, { id: p.id, nombre: p.nombre, precio: p.precio, emoji: p.emoji, cantidad: 1 }]
    })
    showToast(`${p.emoji} ${p.nombre} agregado`)
  }

  const cambiarCantidad = (id: number, delta: number) => {
    setCarrito(prev => prev.flatMap(x => {
      if (x.id !== id) return [x]
      const nueva = x.cantidad + delta
      return nueva <= 0 ? [] : [{ ...x, cantidad: nueva }]
    }))
  }

  const total = carrito.reduce((acc, x) => acc + x.precio * x.cantidad, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (carrito.length === 0) { showToast('⚠️ Agrega algo al carrito'); return }
    setLoading(true)
    const { error } = await supabase.from('pedidos').insert([{ ...form, items: carrito, total }])
    if (!error) setOk(true)
    setLoading(false)
  }

  if (ok) return (
    <section className="h-screen flex items-center justify-center animate-scale-in">
      <div className="text-center">
        <div className="text-8xl mb-6">🛵</div>
        <h2 className="text-4xl font-black mb-4">¡Pedido Recibido!</h2>
        <p className="text-gray-300 text-lg">Tu pedido está en camino. Tiempo estimado: <span className="text-yellow-400 font-bold">30 min</span>.</p>
        <button onClick={() => { setOk(false); setCarrito([]) }}
          className="mt-8 bg-yellow-400 text-black font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-all">
          Nuevo Pedido
        </button>
      </div>
    </section>
  )

  return (
    <section className="min-h-screen pt-24 pb-6 px-4 max-w-6xl mx-auto">
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="animate-toast bg-gray-900 border border-yellow-400/50 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg">{t.msg}</div>
        ))}
      </div>

      <div className="text-center mb-8 animate-fade-in-up">
        <p className="text-yellow-400 tracking-widest uppercase text-xs mb-1">A domicilio</p>
        <h2 className="text-4xl font-black">Pedidos Online</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto pr-1">
          {platos.map((p, i) => (
            <div key={p.id}
              className="rounded-2xl overflow-hidden flex items-center gap-4 border border-yellow-500/20 hover:border-yellow-400/50 transition-all animate-fade-in-up opacity-0-init"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', animationDelay: `${i * 0.05}s`, animationFillMode: 'forwards' }}>
              <img src={p.img} alt={p.nombre} className="w-24 h-24 object-cover flex-shrink-0" />
              <div className="flex-1 py-2">
                <p className="font-black text-base text-white">{p.nombre}</p>
                <p className="text-yellow-400 font-bold">${p.precio.toLocaleString('es-CO')}</p>
              </div>
              <button onClick={() => agregar(p)}
                className="bg-yellow-400 text-black font-black px-4 py-2 m-3 rounded-xl hover:bg-yellow-300 active:scale-95 transition-all text-sm">
                + Agregar
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-4 border border-yellow-500/20 animate-slide-right" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}>
            <h3 className="font-black text-yellow-400 text-lg mb-3">
              🛒 Tu carrito
              {carrito.length > 0 && (
                <span className="ml-2 bg-yellow-400 text-black text-xs font-black px-2 py-0.5 rounded-full">
                  {carrito.reduce((a, x) => a + x.cantidad, 0)}
                </span>
              )}
            </h3>
            {carrito.length === 0 ? (
              <p className="text-gray-400 text-center py-4 text-sm">Agrega productos al carrito</p>
            ) : (
              <>
                {carrito.map(x => (
                  <div key={x.id} className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="font-semibold text-white text-sm">{x.emoji} {x.nombre}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => cambiarCantidad(x.id, -1)} className="w-7 h-7 rounded-full bg-gray-700 hover:bg-gray-600 text-white font-bold text-sm flex items-center justify-center transition-all">−</button>
                      <span className="text-yellow-400 font-bold w-5 text-center">{x.cantidad}</span>
                      <button onClick={() => cambiarCantidad(x.id, 1)} className="w-7 h-7 rounded-full bg-gray-700 hover:bg-gray-600 text-white font-bold text-sm flex items-center justify-center transition-all">+</button>
                      <span className="text-white font-bold text-sm ml-1 w-20 text-right">${(x.precio * x.cantidad).toLocaleString('es-CO')}</span>
                      <button onClick={() => cambiarCantidad(x.id, -x.cantidad)} className="text-red-400 hover:text-red-300 font-bold ml-1">✕</button>
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

          <form onSubmit={handleSubmit} className="rounded-2xl p-4 border border-yellow-500/20 flex flex-col gap-3 animate-slide-right delay-100"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}>
            <h3 className="font-black text-yellow-400 text-lg">📍 Datos de entrega</h3>
            {[
              { placeholder: 'Tu nombre completo', key: 'nombre', type: 'text' },
              { placeholder: 'Tu email',            key: 'email',  type: 'email' },
              { placeholder: 'Tu teléfono',         key: 'telefono', type: 'text' },
              { placeholder: 'Dirección de entrega',key: 'direccion', type: 'text' },
            ].map(f => (
              <input key={f.key} required type={f.type} placeholder={f.placeholder}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                className="rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400 font-medium transition-all"
                style={{ background: 'rgba(255,255,255,0.1)' }} />
            ))}
            <button type="submit" disabled={loading}
              className="bg-yellow-400 text-black font-black py-4 rounded-xl hover:bg-yellow-300 active:scale-95 transition-all text-lg mt-1 disabled:opacity-60">
              {loading ? 'Enviando...' : '🛵 Hacer Pedido'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
