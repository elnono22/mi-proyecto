'use client'
import { useState } from 'react'
import Menu     from './components/Menu'
import Reservas from './components/Reservas'
import Pedidos  from './components/Pedidos'
import Galeria  from './components/Galeria'
import ChatBot  from './components/ChatBot'

type Seccion = 'inicio' | 'menu' | 'galeria' | 'reservas' | 'pedidos'

const navItems: { key: Seccion; label: string }[] = [
  { key: 'inicio',   label: 'Inicio' },
  { key: 'menu',     label: 'Menú' },
  { key: 'galeria',  label: 'Galería' },
  { key: 'reservas', label: 'Reservas' },
  { key: 'pedidos',  label: 'Pedidos' },
]

const stats = [
  { valor: '5+',   label: 'Años de experiencia' },
  { valor: '50K+', label: 'Pedidos entregados' },
  { valor: '4.9★', label: 'Valoración media' },
  { valor: '30min',label: 'Tiempo de entrega' },
]

const destacados = [
  { titulo: 'SnapBurger Clásica', precio: '$18.000', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', desc: 'Carne 200g, queso cheddar, lechuga, tomate' },
  { titulo: 'Crispy Chicken',     precio: '$20.000', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80', desc: 'Pollo crocante con mayonesa especial' },
  { titulo: 'Papas SnapFries',    precio: '$9.000',  img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80', desc: 'Con sal marina y especias secretas' },
]

export default function Home() {
  const [seccion, setSeccion]       = useState<Seccion>('inicio')
  const [mobileMenu, setMobileMenu] = useState(false)

  const ir = (s: Seccion) => { setSeccion(s); setMobileMenu(false); window.scrollTo(0,0) }

  return (
    <main className="min-h-screen text-white" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80)',
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
    }}>
      <div className="min-h-screen" style={{ background: 'rgba(0,0,0,0.78)' }}>

        {/* NAVBAR */}
        <nav className="fixed top-0 w-full backdrop-blur-md z-50 border-b border-yellow-500/20" style={{ background: 'rgba(0,0,0,0.85)' }}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <button onClick={() => ir('inicio')} className="text-2xl font-black text-yellow-400 hover:text-yellow-300 transition-colors">
              ⚡ SnapBite
            </button>
            <div className="hidden md:flex gap-8 text-sm font-medium">
              {navItems.map(item => (
                <button key={item.key} onClick={() => ir(item.key)}
                  className={`transition-all pb-1 ${seccion === item.key ? 'text-yellow-400 border-b border-yellow-400' : 'text-gray-300 hover:text-white'}`}>
                  {item.label}
                </button>
              ))}
            </div>
            <button className="md:hidden text-white text-2xl" onClick={() => setMobileMenu(v => !v)}>
              {mobileMenu ? '✕' : '☰'}
            </button>
          </div>
          {mobileMenu && (
            <div className="md:hidden border-t border-yellow-500/20 animate-fade-in" style={{ background: 'rgba(0,0,0,0.95)' }}>
              {navItems.map(item => (
                <button key={item.key} onClick={() => ir(item.key)}
                  className={`block w-full text-left px-6 py-4 text-sm font-medium border-b border-gray-800 transition-colors ${seccion === item.key ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}`}>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </nav>

        {seccion === 'inicio' && (
          <div>
            {/* HERO */}
            <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&q=80" alt="hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/65" />
              </div>
              <div className="relative z-10 max-w-3xl mx-auto">
                <p className="text-yellow-400 text-sm mb-4 tracking-[0.3em] uppercase animate-fade-in-up">Comida Rápida Premium</p>
                <h2 className="text-6xl md:text-7xl font-black mb-6 leading-none animate-fade-in-up delay-100">
                  El Sabor Que<br /><span className="text-yellow-400">Te Atrapa</span>
                </h2>
                <p className="text-gray-300 text-xl mb-10 max-w-xl mx-auto animate-fade-in-up delay-200">
                  Ingredientes frescos, sabores únicos y entrega en minutos.
                </p>
                <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up delay-300">
                  <button onClick={() => ir('pedidos')} className="bg-yellow-400 text-black font-black px-10 py-4 rounded-full hover:bg-yellow-300 active:scale-95 transition-all text-lg">Pedir Ahora</button>
                  <button onClick={() => ir('menu')} className="border-2 border-yellow-400 text-yellow-400 font-black px-10 py-4 rounded-full hover:bg-yellow-400/10 active:scale-95 transition-all text-lg">Ver Menú</button>
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-400 text-xs flex flex-col items-center gap-1">
                <span>Descubre más</span><span className="text-lg">↓</span>
              </div>
            </section>

            {/* STATS */}
            <section className="py-16 px-4 border-y border-yellow-500/10" style={{ background: 'rgba(0,0,0,0.6)' }}>
              <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {stats.map((s, i) => (
                  <div key={i} className="animate-fade-in-up opacity-0-init" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}>
                    <p className="text-4xl font-black text-yellow-400">{s.valor}</p>
                    <p className="text-gray-400 text-sm mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* DESTACADOS */}
            <section className="py-24 px-4 max-w-6xl mx-auto">
              <div className="text-center mb-16 animate-fade-in-up">
                <p className="text-yellow-400 tracking-widest uppercase text-sm mb-3">Lo más pedido</p>
                <h2 className="text-5xl font-black">Nuestros Favoritos</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {destacados.map((item, i) => (
                  <div key={i} onClick={() => ir('menu')}
                    className="group relative overflow-hidden rounded-3xl cursor-pointer animate-fade-in-up opacity-0-init hover:-translate-y-2 transition-all duration-300"
                    style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'forwards' }}>
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

            {/* NOSOTROS */}
            <section className="py-24 px-4 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in-up">
                  <p className="text-yellow-400 tracking-widest uppercase text-sm mb-3">Nuestra historia</p>
                  <h2 className="text-5xl font-black mb-6">Sobre SnapBite</h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Nacimos con una obsesión: hacer la mejor comida rápida de la ciudad. Usamos ingredientes frescos todos los días, recetas propias y cocinamos cada pedido al momento.
                  </p>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    Nada congelado, nada de atajos. Cada burger, cada porción de papas y cada malteada es preparada con el mismo cuidado que el primero que hicimos.
                  </p>
                  <div className="flex gap-4">
                    <button onClick={() => ir('reservas')} className="bg-yellow-400 text-black font-black px-8 py-3 rounded-full hover:bg-yellow-300 transition-all">Reservar Mesa</button>
                    <button onClick={() => ir('galeria')} className="border border-gray-600 text-gray-300 font-bold px-8 py-3 rounded-full hover:border-gray-400 hover:text-white transition-all">Ver Galería</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 animate-slide-right">
                  <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" alt="Local" className="rounded-2xl h-48 w-full object-cover" />
                  <img src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80" alt="Comida" className="rounded-2xl h-48 w-full object-cover mt-8" />
                </div>
              </div>
            </section>

            {/* BANNER CTA */}
            <section className="relative py-32 px-4 text-center overflow-hidden">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80" alt="banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/65" />
              </div>
              <div className="relative z-10 animate-fade-in-up">
                <h2 className="text-5xl md:text-6xl font-black mb-6">¿Tienes hambre?</h2>
                <p className="text-gray-300 text-xl mb-8">Haz tu pedido ahora y lo tendrás en 30 minutos</p>
                <button onClick={() => ir('pedidos')} className="bg-yellow-400 text-black font-black px-12 py-5 rounded-full text-xl hover:bg-yellow-300 active:scale-95 transition-all">
                  🛵 Pedir Ahora
                </button>
              </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-gray-800 py-10 px-4" style={{ background: 'rgba(0,0,0,0.9)' }}>
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="text-2xl font-black text-yellow-400">⚡ SnapBite</span>
                <div className="flex gap-6 text-sm text-gray-400">
                  {navItems.map(item => (
                    <button key={item.key} onClick={() => ir(item.key)} className="hover:text-white transition-colors">{item.label}</button>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">© 2026 SnapBite</p>
              </div>
            </footer>
          </div>
        )}

        {seccion === 'menu'     && <Menu />}
        {seccion === 'galeria'  && <Galeria />}
        {seccion === 'reservas' && <Reservas />}
        {seccion === 'pedidos'  && <Pedidos />}

        <ChatBot />
      </div>
    </main>
  )
}
