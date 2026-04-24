import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface GalleryItem {
  id: string
  label: string
  count: string
  gradient: string
}

interface Props {
  items: GalleryItem[]
  onSelect: (item: GalleryItem) => void
  scrollDuration?: number
  radius?: number
  mobileRadius?: number
}

const AMBIENT_PARTICLES = [
  { x: '12%', y: '22%', s: 2, d: 0.2, dur: 4.1 },
  { x: '85%', y: '18%', s: 1.5, d: 1.3, dur: 3.7 },
  { x: '72%', y: '68%', s: 2.5, d: 0.7, dur: 4.8 },
  { x: '8%', y: '58%', s: 1.8, d: 2.1, dur: 3.5 },
  { x: '91%', y: '45%', s: 2.2, d: 0.5, dur: 4.3 },
  { x: '35%', y: '12%', s: 1.4, d: 1.8, dur: 5.0 },
  { x: '60%', y: '82%', s: 1.9, d: 0.9, dur: 3.9 },
  { x: '22%', y: '78%', s: 1.6, d: 2.6, dur: 4.5 },
]

export function CircularGallery({ items, onSelect, scrollDuration = 3200, radius = 420, mobileRadius = 200 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wheelRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIdx, setActiveIdx] = useState(0)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  useGSAP(() => {
    if (!containerRef.current || !wheelRef.current) return
    const isMobile = window.innerWidth < 768
    const r = isMobile ? mobileRadius : radius
    const n = items.length

    itemRefs.current.forEach((el, i) => {
      if (!el) return
      const angle = -Math.PI / 2 + (i / n) * Math.PI * 2
      gsap.set(el, { x: Math.cos(angle) * r, y: Math.sin(angle) * r, xPercent: -50, yPercent: -50 })
    })

    gsap.to(wheelRef.current, {
      rotation: 360,
      ease: 'none',
      onUpdate() {
        const wheel = wheelRef.current
        if (!wheel) return
        const rot = gsap.getProperty(wheel, 'rotation') as number
        itemRefs.current.forEach(el => {
          const inner = el?.querySelector<HTMLElement>('[data-inner]')
          if (inner) gsap.set(inner, { rotation: -rot })
        })
        const step = 360 / n
        const normalized = ((-rot % 360) + 360) % 360
        setActiveIdx(Math.round(normalized / step) % n)
      },
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: `+=${scrollDuration}`,
      },
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} id="portfolio" className="relative h-screen overflow-hidden flex flex-col items-center"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(200,168,107,0.09) 0%, rgba(200,168,107,0.02) 45%, transparent 75%), #0B0A08' }}>

      {/* Floating ambient particles */}
      {AMBIENT_PARTICLES.map((p, i) => (
        <motion.div key={i}
          style={{ position: 'absolute', left: p.x, top: p.y, width: p.s, height: p.s, borderRadius: '50%', background: '#C8A86B', boxShadow: `0 0 ${p.s * 6}px rgba(200,168,107,0.6)`, pointerEvents: 'none', zIndex: 1 }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Decorative horizontal rules */}
      <div style={{ position: 'absolute', top: '38%', left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(200,168,107,0.06) 20%, rgba(200,168,107,0.06) 80%, transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '62%', left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(200,168,107,0.04) 20%, rgba(200,168,107,0.04) 80%, transparent)', pointerEvents: 'none' }} />
      {/* Decorative vertical lines */}
      <div style={{ position: 'absolute', left: '18%', top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(200,168,107,0.04) 30%, rgba(200,168,107,0.04) 70%, transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: '18%', top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(200,168,107,0.04) 30%, rgba(200,168,107,0.04) 70%, transparent)', pointerEvents: 'none' }} />

      {/* Corner accents */}
      <div style={{ position: 'absolute', top: 24, left: 24, width: 32, height: 32, borderTop: '1px solid rgba(200,168,107,0.2)', borderLeft: '1px solid rgba(200,168,107,0.2)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 24, right: 24, width: 32, height: 32, borderTop: '1px solid rgba(200,168,107,0.2)', borderRight: '1px solid rgba(200,168,107,0.2)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 24, left: 24, width: 32, height: 32, borderBottom: '1px solid rgba(200,168,107,0.2)', borderLeft: '1px solid rgba(200,168,107,0.2)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 24, right: 24, width: 32, height: 32, borderBottom: '1px solid rgba(200,168,107,0.2)', borderRight: '1px solid rgba(200,168,107,0.2)', pointerEvents: 'none' }} />

      {/* Header */}
      <motion.div
        className="pt-28 text-center z-10 relative"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">Selected Work</p>
        <h2 className="font-cormorant text-[clamp(44px,6vw,80px)] font-light leading-[0.96] text-cream">
          Explore My <em className="italic text-gold">Work</em>
        </h2>
        <motion.p
          className="text-cream-muted text-[12px] tracking-widest mt-5"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          Scroll to browse · Click to explore
        </motion.p>
      </motion.div>

      {/* Active category — large ghost label in center */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{ top: '40%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1 }}
        key={activeIdx}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-cormorant text-[clamp(60px,8vw,110px)] font-light italic text-cream" style={{ opacity: 0.04, whiteSpace: 'nowrap' }}>
          {items[activeIdx]?.label}
        </p>
      </motion.div>

      {/* Category counter — side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{ position: 'absolute', left: 40, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
      >
        <p style={{ fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#4A453E', marginBottom: 8 }}>Category</p>
        <p className="font-cormorant" style={{ fontSize: 28, color: '#C8A86B', fontWeight: 300 }}>
          {String(activeIdx + 1).padStart(2, '0')}
          <span style={{ fontSize: 14, color: '#4A453E', marginLeft: 4 }}>/ {String(items.length).padStart(2, '0')}</span>
        </p>
      </motion.div>

      {/* The rotating wheel */}
      <div
        className="absolute"
        style={{ bottom: 0, left: '50%', transform: `translateX(-50%) translateY(${(radius * 0.62).toFixed(0)}px)` }}
      >
        <div ref={wheelRef} style={{ position: 'relative', width: 0, height: 0 }}>
          {items.map((item, i) => (
            <div key={item.id} ref={el => { itemRefs.current[i] = el }} style={{ position: 'absolute' }}>
              <div
                data-inner=""
                data-hover
                onClick={() => onSelect(item)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  width: 240,
                  height: 158,
                  borderRadius: 16,
                  background: item.gradient,
                  border: `1px solid ${activeIdx === i ? '#C8A86B' : hoveredIdx === i ? 'rgba(200,168,107,0.45)' : 'rgba(200,168,107,0.15)'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  transform: `scale(${activeIdx === i ? 1.14 : hoveredIdx === i ? 1.06 : 1})`,
                  opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.32 : 1,
                  boxShadow: activeIdx === i
                    ? '0 0 60px rgba(200,168,107,0.28), 0 0 0 1px rgba(200,168,107,0.35), 0 24px 48px rgba(0,0,0,0.6)'
                    : hoveredIdx === i
                    ? '0 0 32px rgba(200,168,107,0.14), 0 16px 40px rgba(0,0,0,0.5)'
                    : '0 8px 32px rgba(0,0,0,0.4)',
                  transition: 'transform 0.4s cubic-bezier(.16,1,.3,1), opacity 0.3s, border-color 0.35s, box-shadow 0.4s',
                  userSelect: 'none',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 30, fontWeight: 300, color: '#F2EDE4', letterSpacing: '-0.01em' }}>
                  {item.label}
                </span>
                <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: activeIdx === i ? '#C8A86B' : '#6A6158' }}>
                  {item.count}
                </span>
                {activeIdx === i && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(200,168,107,0.6)' }}
                  >
                    click to open →
                  </motion.span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
