'use client'
import { useState } from 'react'
import { supabase } from '../supabase'

export default function Reservas() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', fecha: '', hora: '', personas: '2' })
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('reservas').insert([{ ...form, personas: parseInt(form.personas) }])
    if (!error) setOk(true)
    setLoading(false)
  }

  if (ok) return (
    <section className="min-h-screen pt-28 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-6">🎉</div>
        <h2 className="text-4xl font-black mb-4">¡Reserva Confirmada!</h2>
        <p className="text-gray-400 text-lg">Te esperamos. Recibirás un correo de confirmación.</p>
        <button onClick={() => setOk(false)} className="mt-8 bg-yellow-400 text-black font-bold px-8 py-3 rounded-full">
          Nueva Reserva
        </button>
      </div>
    </section>
  )

  return (
    <section className="min-h-screen pt-28 pb-16 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-yellow-400 tracking-widest uppercase text-sm mb-2">Reserva tu mesa</p>
        <h2 className="text-5xl font-black">Reservas</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col gap-4">
        <input required placeholder="Nombre completo" value={form.nombre}
          onChange={e => setForm({...form, nombre: e.target.value})}
          className="bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-400" />
        <input required type="email" placeholder="Email" value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          className="bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-400" />
        <input required placeholder="Teléfono" value={form.telefono}
          onChange={e => setForm({...form, telefono: e.target.value})}
          className="bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-400" />
        <input required type="date" value={form.fecha}
          onChange={e => setForm({...form, fecha: e.target.value})}
          className="bg-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-400" />
        <input required type="time" value={form.hora}
          onChange={e => setForm({...form, hora: e.target.value})}
          className="bg-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-400" />
        <select value={form.personas} onChange={e => setForm({...form, personas: e.target.value})}
          className="bg-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-400">
          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} personas</option>)}
        </select>
        <button type="submit" disabled={loading}
          className="bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-300 transition-all text-lg mt-2">
          {loading ? 'Reservando...' : 'Confirmar Reserva'}
        </button>
      </form>
    </section>
  )
}