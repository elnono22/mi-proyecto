export type Servicio = {
  id: number
  nombre: string
  desc: string
  precio: number
  duracion: string
  icono: string
}

export const servicios: Servicio[] = [
  { id: 1, nombre: 'Corte Clásico',       desc: 'Corte tradicional con tijera y máquina. Incluye lavado.',          precio: 25000, duracion: '30 min', icono: '✂️' },
  { id: 2, nombre: 'Corte + Barba',        desc: 'Corte completo más perfilado y arreglo de barba.',                 precio: 40000, duracion: '50 min', icono: '🪒' },
  { id: 3, nombre: 'Diseño de Barba',      desc: 'Perfilado, relleno y arreglo profesional de barba.',               precio: 20000, duracion: '25 min', icono: '🧔' },
  { id: 4, nombre: 'Afeitado Clásico',     desc: 'Afeitado con navaja, toalla caliente y productos premium.',        precio: 30000, duracion: '35 min', icono: '💈' },
  { id: 5, nombre: 'Corte Infantil',       desc: 'Corte para niños hasta 12 años. Rápido y cuidadoso.',              precio: 18000, duracion: '20 min', icono: '👦' },
  { id: 6, nombre: 'Tratamiento Capilar',  desc: 'Hidratación profunda, masaje y productos de alta gama.',           precio: 35000, duracion: '40 min', icono: '💆' },
]
