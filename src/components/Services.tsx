import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]
const VP = { once: true, margin: '-60px' } as const

const SERVICES = [
  { n: '01', name: 'Graphic Design', desc: 'Professional-grade posters, event branding, and social media graphics with a strong visual identity — from concept to publish-ready output using Adobe PS and Canva.' },
  { n: '02', name: 'Photography', desc: 'Urban & night photography, product and venue shoots, and nature macro work. Atmospheric, editorial-quality imagery across UAE locations.' },
  { n: '03', name: 'Social Media & Content', desc: 'Brand-consistent content creation for Instagram and social channels. Trend-aware visuals that drive engagement, awareness, and registrations.' },
  { n: '04', name: 'Fine Arts & Illustration', desc: 'Traditional hand-drawn illustration and painting. An organic, tactile creative perspective that elevates digital design work with genuine artistry.' },
  { n: '05', name: 'Interior Design', desc: 'Currently studying at MAHE Dubai (Bachelor of Design, 2025–2029). Spatial design skills in AutoCAD, 3ds Max, Autodesk Maya, and 3D modelling.' },
  { n: '06', name: 'Brand Identity', desc: 'Maintained cohesive branding across all channels for the first AWS Student Builder Group in the GCC.' },
]

export default function Services() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section id="services" style={{ borderTop: '1px solid rgba(242,237,228,0.06)', padding: '148px 64px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 84 }}>
        <div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: E }}
            viewport={VP}
            className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5"
          >My Craft</motion.p>

          {/* Plain div ref → useInView drives animate on clipped children */}
          <div ref={headRef}>
            <h2 className="font-cormorant font-light leading-[0.96] text-cream" style={{ fontSize: 'clamp(48px,6vw,84px)' }}>
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <motion.span style={{ display: 'block' }}
                  initial={{ y: '100%' }}
                  animate={{ y: headInView ? 0 : '100%' }}
                  transition={{ duration: 0.9, delay: 0, ease: E }}
                >Creative</motion.span>
              </span>
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <motion.em className="italic text-gold" style={{ display: 'block' }}
                  initial={{ y: '100%' }}
                  animate={{ y: headInView ? 0 : '100%' }}
                  transition={{ duration: 0.9, delay: 0.15, ease: E }}
                >Disciplines</motion.em>
              </span>
            </h2>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: E }}
          viewport={VP}
          className="text-cream-muted"
          style={{ maxWidth: 320, fontSize: 14, lineHeight: 1.75 }}
        >
          From brand identity to fine art — every creative discipline comes together in service of a singular vision.
        </motion.p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(242,237,228,0.06)', border: '1px solid rgba(242,237,228,0.06)' }}>
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: i * 0.09, ease: E }}
            viewport={VP}
            style={{ background: '#0B0A08' }}
          >
            <div
              data-hover
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#1A1815'
                const arrow = el.querySelector('.svc-arrow') as HTMLElement
                if (arrow) { arrow.style.opacity = '1'; arrow.style.transform = 'translateX(0)' }
              }}
              onMouseMove={e => {
                const el = e.currentTarget as HTMLElement
                const r = el.getBoundingClientRect()
                const cx = (e.clientX - r.left) / r.width - 0.5
                const cy = (e.clientY - r.top) / r.height - 0.5
                // No translateZ — keeps card in-plane so it doesn't expand over adjacent gap borders
                el.style.transform = `perspective(1200px) rotateX(${-cy * 7}deg) rotateY(${cx * 7}deg)`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#0B0A08'
                el.style.transform = ''
                const arrow = el.querySelector('.svc-arrow') as HTMLElement
                if (arrow) { arrow.style.opacity = '0'; arrow.style.transform = 'translateX(-10px)' }
              }}
              style={{ padding: '52px 44px', position: 'relative', height: '100%', transition: 'background .4s, transform .4s cubic-bezier(.23,1,.32,1)', willChange: 'transform' }}
            >
              <div className="font-cormorant" style={{ fontSize: 60, fontWeight: 300, color: 'rgba(242,237,228,0.05)', lineHeight: 1, marginBottom: 24 }}>{s.n}</div>
              <div className="font-cormorant" style={{ fontSize: 26, fontWeight: 400, color: '#F2EDE4', marginBottom: 16, lineHeight: 1.1 }}>{s.name}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.78, color: '#4A453E' }}>{s.desc}</p>
              <span className="svc-arrow" style={{ position: 'absolute', bottom: 44, right: 44, fontSize: 20, color: '#C8A86B', opacity: 0, transform: 'translateX(-10px)', transition: 'opacity .3s,transform .3s' }}>→</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
