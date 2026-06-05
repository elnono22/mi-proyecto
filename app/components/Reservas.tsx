'use client'
import { useState } from 'react'
import { supabase } from '../supabase'

export default function Reservas() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', fecha: '', hora: '', personas: '2' })
  const [loading, setLoading] = useState(false)
  const [ok, setOk]           = useState(false)
  const [error, setError]     = useState('')

  const validar = () => {
    if (form.nombre.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres.'
    if (!/^\+?[\d\s\-]{7,15}$/.test(form.telefono)) return 'Teléfono inválido.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Email inválido.'
    if (!form.fecha) return 'Selecciona una fecha.'
    if (new Date(form.fecha) < new Date(new Date().toDateString())) return 'La fecha no puede ser en el pasado.'
    if (!form.hora) return 'Selecciona una hora.'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validErr = validar()
    if (validErr) { setError(validErr); return }
    setLoading(true); setError('')
    const { error: err } = await supabase.from('reservas').insert([{ ...form, personas: parseInt(form.personas) }])
    if (err) setError('Hubo un error. Por favor intenta de nuevo.')
    else setOk(true)
    setLoading(false)
  }

  if (ok) return (
    <section className="min-h-screen pt-28 flex items-center justify-center animate-scale-in">
      <div className="text-center">
        <div className="text-8xl mb-6">🎉</div>
        <h2 className="text-4xl font-black mb-4">¡Reserva Confirmada!</h2>
        <p className="text-gray-400 text-lg">Te esperamos, <span className="text-white font-bold">{form.nombre}</span>.</p>
        <p className="text-gray-400 mt-2">
          Mesa para <span className="text-yellow-400 font-bold">{form.personas} personas</span> el{' '}
          <span className="text-yellow-400 font-bold">{form.fecha}</span> a las{' '}
          <span className="text-yellow-400 font-bold">{form.hora}</span>.
        </p>
        <button onClick={() => { setOk(false); setForm({ nombre: '', email: '', telefono: '', fecha: '', hora: '', personas: '2' }) }}
          className="mt-8 bg-yellow-400 text-black font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-all">
          Nueva Reserva
        </button>
      </div>
    </section>
  )

  return (
    <section className="min-h-screen pt-28 pb-16 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-12 animate-fade-in-up">
        <p className="text-yellow-400 tracking-widest uppercase text-sm mb-2">Reserva tu mesa</p>
        <h2 className="text-5xl font-black">Reservas</h2>
        <p className="text-gray-400 mt-3">Asegura tu lugar y te esperamos con todo listo</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 flex flex-col gap-4 animate-fade-in-up delay-100">
        {error && <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input required placeholder="Nombre completo" value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
            className="bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-400 transition-all" />
          <input required placeholder="Teléfono" value={form.telefono}
            onChange={e => setForm({ ...form, telefono: e.target.value })}
            className="bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-400 transition-all" />
        </div>

        <input required type="email" placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-400 transition-all" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Fecha</label>
            <input required type="date" value={form.fecha}
              onChange={e => setForm({ ...form, fecha: e.target.value })}
              className="w-full bg-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-400 transition-all" />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Hora</label>
            <input required type="time" value={form.hora}
              onChange={e => setForm({ ...form, hora: e.target.value })}
              className="w-full bg-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-400 transition-all" />
          </div>
        </div>

        <div>
          <label className="text-gray-400 text-xs mb-1 block">Número de personas</label>
          <select value={form.personas} onChange={e => setForm({ ...form, personas: e.target.value })}
            className="w-full bg-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-400 transition-all">
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>)}
          </select>
        </div>

        <button type="submit" disabled={loading}
          className="bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-300 active:scale-95 transition-all text-lg mt-2 disabled:opacity-60">
          {loading ? 'Reservando...' : '✅ Confirmar Reserva'}
        </button>
      </form>
    </section>
  )
}
