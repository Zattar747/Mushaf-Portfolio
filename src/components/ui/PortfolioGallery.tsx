import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PortfolioImage { src: string; alt: string; title: string; type?: 'image' | 'video' }

interface Props { title: string; images: PortfolioImage[] }

const DESC: Record<string, string> = {
  'Art': 'Traditional hand-drawn illustration · Painting · Organic creative perspective',
  'Photography': 'Urban & night photography · Product/venue shoots · Nature & macro',
  'Graphic Design': 'Event branding · Social media graphics · Brand identity systems',
  'Presentations': 'Pitch decks · Annual reports · Keynote design · Brand decks',
}

export function PortfolioGallery({ title, images }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-bg" style={{ paddingBottom: 120 }}>
      {/* Hero title */}
      <div style={{ padding: '72px 80px 56px', borderBottom: '1px solid rgba(242,237,228,0.06)' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,.3,1] }}
          style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C8A86B', marginBottom: 16 }}>
          Gallery
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease: [0.16,1,.3,1] }}
          className="font-cormorant font-light italic text-cream"
          style={{ fontSize: 'clamp(52px,7vw,96px)', lineHeight: 0.92, marginBottom: 24 }}>
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18, ease: [0.16,1,.3,1] }}
          style={{ fontSize: 13, color: '#4A453E', letterSpacing: '0.04em' }}>
          {DESC[title] ?? ''}
        </motion.p>
      </div>

      {/* Divider */}
      <div style={{ padding: '64px 80px 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(242,237,228,0.06)' }} />
          <span style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#4A453E' }}>All Works</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(242,237,228,0.06)' }} />
        </div>
      </div>

      {/* Masonry grid */}
      <div style={{ padding: '0 80px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {images.map((img, i) => (
          <motion.div
            key={`grid-${i}`}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            data-hover
            onClick={() => setLightbox(i)}
            style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', cursor: 'pointer', background: '#0b0a08' }}
            whileHover="hov"
          >
            {img.type === 'video'
              ? <video src={img.src} autoPlay muted loop playsInline style={{ width: '100%', height: 'auto', display: 'block' }} />
              : <motion.img src={img.src} alt={img.alt} style={{ width: '100%', height: 'auto', display: 'block' }} variants={{ hov: { scale: 1.03 } }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} />}
            <motion.div
              variants={{ hov: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,10,8,0.88) 0%, rgba(11,10,8,0.1) 55%)', display: 'flex', alignItems: 'flex-end', padding: '22px 20px' }}
            >
              <div>
                <motion.p
                  variants={{ hov: { y: 0, opacity: 1 } }}
                  initial={{ y: 14, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 20, fontStyle: 'italic', color: '#F2EDE4', marginBottom: 4 }}>
                  {img.title}
                </motion.p>
                <motion.span
                  variants={{ hov: { y: 0, opacity: 1 } }}
                  initial={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8A86B' }}>
                  View →
                </motion.span>
              </div>
            </motion.div>
            {/* Gold corner accent on hover */}
            <motion.div
              variants={{ hov: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ position: 'absolute', top: 14, right: 14, width: 24, height: 24, borderTop: '1.5px solid #C8A86B', borderRight: '1.5px solid #C8A86B', borderRadius: '0 4px 0 0' }}
            />
            <motion.div
              variants={{ hov: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ position: 'absolute', bottom: 14, left: 14, width: 24, height: 24, borderBottom: '1.5px solid #C8A86B', borderLeft: '1.5px solid #C8A86B', borderRadius: '0 0 0 4px' }}
            />
          </motion.div>
        ))}
      </div>

      {/* Mobile scroll strip */}
      <div className="md:hidden overflow-hidden mt-4 px-6">
        <div className="flex gap-4 ml" style={{ width: 'max-content' }}>
          {[...images, ...images].map((img, i) => (
            <div key={i} style={{ width: 200, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: '#0b0a08' }}>
              <img src={img.src} alt={img.alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(11,10,8,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: 900, width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {images[lightbox]?.type === 'video'
                ? <video src={images[lightbox]?.src} autoPlay muted loop playsInline controls style={{ maxWidth: '100%', maxHeight: '76vh', borderRadius: 12, display: 'block' }} />
                : <img src={images[lightbox]?.src} alt={images[lightbox]?.alt} style={{ maxWidth: '100%', maxHeight: '76vh', width: 'auto', height: 'auto', borderRadius: 12, display: 'block' }} />}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 22, fontStyle: 'italic', color: '#F2EDE4' }}>{images[lightbox]?.title}</p>
                <button onClick={() => setLightbox(null)} style={{ background: 'none', border: '1px solid rgba(200,168,107,0.3)', color: '#9A9188', width: 40, height: 40, borderRadius: '50%', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none' }}>✕</button>
              </div>
              {images.length > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 24 }}>
                  <button onClick={() => setLightbox(l => ((l ?? 0) - 1 + images.length) % images.length)}
                    style={{ background: 'none', border: '1px solid rgba(200,168,107,0.25)', color: '#9A9188', width: 44, height: 44, borderRadius: '50%', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none', transition: 'all .3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C8A86B'; (e.currentTarget as HTMLElement).style.color = '#C8A86B' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,107,0.25)'; (e.currentTarget as HTMLElement).style.color = '#9A9188' }}>←</button>
                  <button onClick={() => setLightbox(l => ((l ?? 0) + 1) % images.length)}
                    style={{ background: 'none', border: '1px solid rgba(200,168,107,0.25)', color: '#9A9188', width: 44, height: 44, borderRadius: '50%', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none', transition: 'all .3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C8A86B'; (e.currentTarget as HTMLElement).style.color = '#C8A86B' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,107,0.25)'; (e.currentTarget as HTMLElement).style.color = '#9A9188' }}>→</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
