export type Plato = {
  id: number
  nombre: string
  precio: number
  desc: string
  emoji: string
  categoria: 'burgers' | 'pollo' | 'acompañamientos' | 'bebidas' | 'combos'
  img: string
}

export const platos: Plato[] = [
  { id: 1, nombre: 'SnapBurger Clásica', precio: 18000, desc: 'Carne 200g, queso cheddar, lechuga, tomate', emoji: '🍔', categoria: 'burgers', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80' },
  { id: 2, nombre: 'SnapBurger Doble', precio: 24000, desc: 'Doble carne, doble queso, bacon crujiente', emoji: '🍔', categoria: 'burgers', img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80' },
  { id: 3, nombre: 'Crispy Chicken', precio: 20000, desc: 'Pollo crocante, mayonesa especial, pepinillos', emoji: '🍗', categoria: 'pollo', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80' },
  { id: 4, nombre: 'Hot Dog Premium', precio: 15000, desc: 'Salchicha artesanal, mostaza, cebolla caramelizada', emoji: '🌭', categoria: 'burgers', img: 'https://images.unsplash.com/photo-1612392166886-ee8475b03af2?w=600&q=80' },
  { id: 5, nombre: 'Papas SnapFries', precio: 9000, desc: 'Papas fritas con sal marina y especias secretas', emoji: '🍟', categoria: 'acompañamientos', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80' },
  { id: 6, nombre: 'Aros de Cebolla', precio: 10000, desc: 'Aros crocantes con salsa ranch', emoji: '🧅', categoria: 'acompañamientos', img: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=80' },
  { id: 7, nombre: 'Malteada Clásica', precio: 12000, desc: 'Chocolate, vainilla o fresa. 400ml', emoji: '🥤', categoria: 'bebidas', img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&q=80' },
  { id: 8, nombre: 'Combo Familiar', precio: 65000, desc: '4 burgers + 4 papas + 4 bebidas', emoji: '👨‍👩‍👧‍👦', categoria: 'combos', img: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80' },
]
