import { motion } from 'framer-motion'

const VP = { once: true, margin: '-80px' } as const

const DIGITAL = Array.from({ length: 11 }, (_, i) => ({
  src: `/assets/digital-art/da-${String(i + 1).padStart(2, '0')}.jpeg`,
  label: `Digital ${String(i + 1).padStart(2, '0')}`,
}))

const TRAD = Array.from({ length: 18 }, (_, i) => ({
  src: `/assets/art/art-${String(i + 1).padStart(2, '0')}.jpeg`,
  label: `Traditional ${String(i + 1).padStart(2, '0')}`,
}))

function ArtCard({ src, label }: { src: string; label: string }) {
  return (
    <div
      data-hover
      style={{
        width: 280, height: 200, borderRadius: 10, flexShrink: 0,
        position: 'relative', overflow: 'hidden',
        border: '1px solid rgba(200,168,107,0.1)',
        cursor: 'default',
        transition: 'border-color .3s, transform .4s cubic-bezier(.16,1,.3,1)',
      }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(200,168,107,0.45)'; el.style.transform = 'scale(1.03)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(200,168,107,0.1)'; el.style.transform = '' }}
    >
      <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,10,8,0.7) 0%, transparent 55%)' }} />
      <span style={{ position: 'absolute', bottom: 14, left: 16, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9A9188' }}>
        {label}
      </span>
    </div>
  )
}

export default function Artworks() {
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
            {[...DIGITAL, ...DIGITAL].map((d, i) => <ArtCard key={i} src={d.src} label={d.label} />)}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} viewport={VP} style={{ marginTop: 16 }}>
        <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8A86B', padding: '0 64px', marginBottom: 16 }}>Traditional Art</p>
        <div style={{ overflow: 'hidden' }}>
          <div className="mr" style={{ display: 'flex', gap: 16, width: 'max-content' }}>
            {[...TRAD, ...TRAD].map((d, i) => <ArtCard key={i} src={d.src} label={d.label} />)}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
