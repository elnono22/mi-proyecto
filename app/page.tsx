'use client'
import { useState } from 'react'
import Menu from './components/Menu'
import Reservas from './components/Reservas'
import Pedidos from './components/Pedidos'
import Galeria from './components/Galeria'
import ChatBot from './components/ChatBot'

export default function Home() {
  const [seccion, setSeccion] = useState('inicio')

  return (
    <main className="min-h-screen text-white" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="min-h-screen" style={{background: 'rgba(0,0,0,0.75)'}}>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full backdrop-blur-md z-50 border-b border-yellow-500/30" style={{background: 'rgba(0,0,0,0.8)'}}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-row justify-between items-center">
          <h1 className="text-2xl font-black text-yellow-400">⚡ SnapBite</h1>
          <div className="flex flex-row gap-8 text-sm font-medium">
            {['inicio','menu','galeria','reservas','pedidos'].map(s => (
              <button key={s} onClick={() => setSeccion(s)}
                className={`capitalize transition-all ${seccion === s ? 'text-yellow-400 border-b border-yellow-400 pb-1' : 'text-gray-300 hover:text-white'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {seccion === 'inicio' && (
        <div>
          {/* HERO */}
          <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&q=80"
                alt="hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/65" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <p className="text-yellow-400 text-sm mb-4 tracking-[0.3em] uppercase">Comida Rápida Premium</p>
              <h2 className="text-7xl font-black mb-6 leading-none">
                El Sabor Que<br/><span className="text-yellow-400">Te Atrapa</span>
              </h2>
              <p className="text-gray-300 text-xl mb-10 max-w-xl mx-auto">
                Ingredientes frescos, sabores únicos y entrega en minutos.
              </p>
              <div className="flex gap-4 justify-center">
                <button onClick={() => setSeccion('pedidos')}
                  className="bg-yellow-400 text-black font-black px-10 py-4 rounded-full hover:bg-yellow-300 transition-all text-lg">
                  Pedir Ahora
                </button>
                <button onClick={() => setSeccion('menu')}
                  className="border-2 border-yellow-400 text-yellow-400 font-black px-10 py-4 rounded-full hover:bg-yellow-400/10 transition-all text-lg">
                  Ver Menú
                </button>
              </div>
            </div>
          </section>

          {/* DESTACADOS */}
          <section className="py-24 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-yellow-400 tracking-widest uppercase text-sm mb-3">Lo más pedido</p>
              <h2 className="text-5xl font-black">Nuestros Favoritos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { titulo: 'SnapBurger Clásica', precio: '$18.000', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', desc: 'Carne 200g, queso cheddar, lechuga, tomate' },
                { titulo: 'Crispy Chicken', precio: '$20.000', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80', desc: 'Pollo crocante con mayonesa especial' },
                { titulo: 'Papas SnapFries', precio: '$9.000', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80', desc: 'Con sal marina y especias secretas' },
              ].map((item, i) => (
                <div key={i} className="group relative overflow-hidden rounded-3xl cursor-pointer" onClick={() => setSeccion('menu')}>
                  <img src={item.img} alt={item.titulo} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-black mb-1">{item.titulo}</h3>
                    <p className="text-gray-300 text-sm mb-2">{item.desc}</p>
                    <span className="text-yellow-400 font-bold text-lg">{item.precio}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BANNER */}
          <section className="relative py-32 px-4 text-center overflow-hidden">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80"
                alt="selva" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative z-10">
              <h2 className="text-6xl font-black mb-6">¿Tienes hambre?</h2>
              <p className="text-gray-300 text-xl mb-8">Haz tu pedido ahora y lo tendrás en 30 minutos</p>
              <button onClick={() => setSeccion('pedidos')}
                className="bg-yellow-400 text-black font-black px-12 py-5 rounded-full text-xl hover:bg-yellow-300 transition-all">
                🛵 Pedir Ahora
              </button>
            </div>
          </section>

          <footer className="bg-black/80 py-8 text-center text-gray-500 text-sm">
            <p>© 2026 SnapBite — Todos los derechos reservados</p>
          </footer>
        </div>
      )}

      {seccion === 'menu' && <Menu />}
      {seccion === 'galeria' && <Galeria />}
      {seccion === 'reservas' && <Reservas />}
      {seccion === 'pedidos' && <Pedidos />}

      <ChatBot />

      </div>
    </main>
  )
}