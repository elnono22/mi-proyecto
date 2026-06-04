'use client'

export default function ChatBot() {
  return (
    <a
      href="https://wa.me/573218994993?text=Hola%20SnapBite,%20quiero%20hacer%20un%20pedido"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '65px',
        height: '65px',
        borderRadius: '50%',
        background: '#25D366',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        fontSize: '32px',
        zIndex: 99999,
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}
      title="Contactar por WhatsApp"
    >
      💬
    </a>
  )
}