import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VP = { once: true, margin: '-80px' } as const

const DIGITAL = Array.from({ length: 12 }, (_, i) => ({
  src: `/assets/digital-art/da-${String(i + 1).padStart(2, '0')}.jpeg`,
  label: `Digital ${String(i + 1).padStart(2, '0')}`,
}))

const TRAD = Array.from({ length: 18 }, (_, i) => ({
  src: `/assets/art/art-${String(i + 1).padStart(2, '0')}.jpeg`,
  label: `Traditional ${String(i + 1).padStart(2, '0')}`,
}))

function ArtCard({ src, label, onClick }: { src: string; label: string; onClick: () => void }) {
  return (
    <div
      data-hover
      onClick={onClick}
      style={{
        width: 280, height: 200, borderRadius: 10, flexShrink: 0,
        position: 'relative', overflow: 'hidden',
        border: '1px solid rgba(200,168,107,0.1)',
        cursor: 'pointer',
        transition: 'border-color .3s, transform .4s cubic-bezier(.16,1,.3,1)',
      }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(200,168,107,0.45)'; el.style.transform = 'scale(1.03)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(200,168,107,0.1)'; el.style.transform = '' }}
    >
      <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#0b0a08' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,10,8,0.7) 0%, transparent 55%)' }} />
      <span style={{ position: 'absolute', bottom: 14, left: 16, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9A9188' }}>
        {label}
      </span>
      {/* expand hint on hover */}
      <div style={{ position: 'absolute', top: 12, right: 12, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(200,168,107,0.6)', opacity: 0, transition: 'opacity .3s' }}
        className="card-expand-hint">View</div>
    </div>
  )
}

export default function Artworks() {
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null)

  return (
    <section id="artworks" style={{ borderTop: '1px solid rgba(242,237,228,0.06)', padding: '148px 0', background: '#131210', overflow: 'hidden' }}>

      <div style={{ padding: '0 64px', marginBottom: 72 }}>
        <motion.p initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} viewport={VP}
          className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">Artworks</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.88, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} viewport={VP}
          className="font-cormorant font-light leading-[0.96] text-cream" style={{ fontSize: 'clamp(48px,6vw,84px)' }}>
          Creative <em className="italic text-gold">Expressions</em>
        </motion.h2>
      </div>

      <motion.div initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} viewport={VP} style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8A86B', padding: '0 64px', marginBottom: 16 }}>Digital Art</p>
        <div style={{ overflow: 'hidden' }}>
          <div className="ml" style={{ display: 'flex', gap: 16, width: 'max-content' }}>
            {[...DIGITAL, ...DIGITAL].map((d, i) => (
              <ArtCard key={i} src={d.src} label={d.label} onClick={() => setLightbox(d)} />
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} viewport={VP} style={{ marginTop: 16 }}>
        <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8A86B', padding: '0 64px', marginBottom: 16 }}>Traditional Art</p>
        <div style={{ overflow: 'hidden' }}>
          <div className="mr-slow" style={{ display: 'flex', gap: 16, width: 'max-content' }}>
            {[...TRAD, ...TRAD].map((d, i) => (
              <ArtCard key={i} src={d.src} label={d.label} onClick={() => setLightbox(d)} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(11,10,8,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: 860, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <img
                src={lightbox.src}
                alt={lightbox.label}
                style={{ maxWidth: '100%', maxHeight: '76vh', width: 'auto', height: 'auto', borderRadius: 12, display: 'block' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, width: '100%' }}>
                <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 22, fontStyle: 'italic', color: '#F2EDE4' }}>{lightbox.label}</p>
                <button
                  onClick={() => setLightbox(null)}
                  style={{ background: 'none', border: '1px solid rgba(200,168,107,0.3)', color: '#9A9188', width: 40, height: 40, borderRadius: '50%', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none' }}
                >✕</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
