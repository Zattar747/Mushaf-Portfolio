import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import VaporizeTextCycle, { Tag } from './vapour-text-effect'
import Eyes from './ui/Eyes'

const PARTICLES = [
  { x: '8%', y: '18%', s: 2.5, d: 0, dur: 3.8 },
  { x: '83%', y: '12%', s: 1.8, d: 1.1, dur: 4.3 },
  { x: '70%', y: '73%', s: 3.2, d: 0.6, dur: 3.5 },
  { x: '14%', y: '78%', s: 2, d: 1.9, dur: 4.7 },
  { x: '92%', y: '40%', s: 2.8, d: 0.3, dur: 3.2 },
  { x: '38%', y: '20%', s: 1.6, d: 2.3, dur: 5.1 },
  { x: '79%', y: '88%', s: 2.4, d: 0.9, dur: 3.9 },
  { x: '4%', y: '52%', s: 1.5, d: 1.5, dur: 4.5 },
  { x: '56%', y: '7%', s: 2, d: 2.8, dur: 3.6 },
  { x: '24%', y: '36%', s: 1.4, d: 3.2, dur: 4.1 },
]

const E = [0.16, 1, 0.3, 1] as [number, number, number, number]
const FADE = {
  hidden: { opacity: 0, y: 38 },
  show: (d: number) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.9, ease: E } }),
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const eyesScrollY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section ref={sectionRef} id="hero" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden', position: 'relative' }}>
      {/* Left text panel */}
      <motion.div
        className="flex flex-col justify-end pb-20 px-16 z-10 relative"
        style={{ paddingTop: 120, y: textY, opacity: textOpacity }}
      >
        <motion.p variants={FADE} initial="hidden" animate="show" custom={0.3}
          className="text-[10px] tracking-[0.28em] uppercase text-gold mb-7">
          Social Media &amp; Content Creator · Graphic Designer · Photographer
        </motion.p>

        <motion.h1 variants={FADE} initial="hidden" animate="show" custom={0.5}
          className="font-cormorant font-light leading-[0.9] tracking-[-0.025em] text-cream"
          style={{ fontSize: 'clamp(64px,8vw,118px)' }}>
          Mushaf<br /><em className="italic text-gold">Fatma</em>
        </motion.h1>

        <motion.div variants={FADE} initial="hidden" animate="show" custom={0.67}
          style={{ height: 52, width: '100%', maxWidth: 420, marginTop: 22 }}>
          <VaporizeTextCycle
            texts={['Graphic Designer', 'Photographer', 'Content Creator']}
            font={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '26px', fontWeight: 300 }}
            color="rgb(200, 168, 107)"
            spread={4}
            density={5}
            animation={{ vaporizeDuration: 2.5, fadeInDuration: 1.2, waitDuration: 1.5 }}
            direction="left-to-right"
            alignment="left"
            tag={Tag.P}
          />
        </motion.div>

        <motion.p variants={FADE} initial="hidden" animate="show" custom={0.8}
          className="text-[14px] text-cream-dim leading-[1.8] mt-5 max-w-[400px]">
          Creative and driven Interior Design student at MAHE Dubai — passionate about visual storytelling, brand content, and photography.
        </motion.p>

        <motion.div variants={FADE} initial="hidden" animate="show" custom={1.0}
          className="flex gap-6 items-center mt-12">
          <a href="#portfolio"
            className="px-10 py-4 bg-gold text-bg text-[11px] tracking-[0.16em] uppercase font-medium rounded-sm transition-all"
            style={{ boxShadow: '0 0 0 rgba(200,168,107,0)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(200,168,107,0.45)'; (e.currentTarget as HTMLElement).style.background = '#D4B87A' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 rgba(200,168,107,0)'; (e.currentTarget as HTMLElement).style.background = '#C8A86B' }}>
            View Work
          </a>
          <a href="#contact" className="flex items-center gap-2.5 text-cream-dim text-[11px] tracking-[0.12em] uppercase hover:text-cream transition-colors group">
            Get In Touch <span className="group-hover:translate-x-1.5 transition-transform inline-block">→</span>
          </a>
        </motion.div>

        <motion.div variants={FADE} initial="hidden" animate="show" custom={1.2} className="flex gap-12 mt-16">
          {[['1+', 'Year Experience'], ['15+', 'Projects Done'], ['3', 'Languages']].map(([n, l]) => (
            <div key={n}>
              <span className="font-cormorant text-[38px] font-light text-cream block leading-none">{n}</span>
              <span className="text-[10px] tracking-[0.14em] uppercase text-cream-muted mt-2 block">{l}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right panel — eyes */}
      <div className="relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg,#121820 0%,#0d0c0a 45%,#130d0a 100%)' }}>

        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(200,168,107,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Spinning rings */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1.4 }}
          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{ position: 'relative', width: 500, height: 500 }}>
            <div className="spin-fwd" style={{ position: 'absolute', width: 500, height: 500, top: '50%', left: '50%', borderRadius: '50%', border: '1px solid rgba(200,168,107,0.07)' }} />
            <div className="spin-rev" style={{ position: 'absolute', width: 360, height: 360, top: '50%', left: '50%', borderRadius: '50%', border: '1px solid rgba(200,168,107,0.05)' }} />
            <div style={{ position: 'absolute', width: 210, height: 210, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', borderRadius: '50%', border: '1px solid rgba(200,168,107,0.1)' }} />
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(200,168,107,0.06)', transform: 'translateY(-50%)' }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(200,168,107,0.06)', transform: 'translateX(-50%)' }} />
          </div>
        </motion.div>

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <motion.div key={i}
            style={{ position: 'absolute', left: p.x, top: p.y, width: p.s, height: p.s, borderRadius: '50%', background: '#C8A86B', boxShadow: `0 0 ${p.s * 5}px rgba(200,168,107,0.65)`, pointerEvents: 'none' }}
            animate={{ y: [0, -22, 0], opacity: [0.3, 0.85, 0.3], scale: [1, 1.35, 1] }}
            transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Eyes */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 10 }}>
          <motion.div style={{ y: eyesScrollY }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Eyes size={64} />
            </motion.div>
          </motion.div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
          style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%) rotate(90deg)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4A453E', whiteSpace: 'nowrap', zIndex: 5 }}>
          MAHE Dubai · Available for Commissions — 2026
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', paddingBottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 20 }}>
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 56, background: 'linear-gradient(to bottom,#C8A86B,transparent)' }}
        />
        <span style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#4A453E' }}>Scroll</span>
      </div>
    </section>
  )
}
