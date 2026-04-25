import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Eyes from './ui/Eyes'
import CornerFrameScrambleText from './ui/corner-frame-scramble-text'

const PARTICLES = [
  { x: '8%',  y: '18%', s: 2.5, d: 0,   dur: 3.8 },
  { x: '83%', y: '12%', s: 1.8, d: 1.1, dur: 4.3 },
  { x: '70%', y: '73%', s: 3.2, d: 0.6, dur: 3.5 },
  { x: '14%', y: '78%', s: 2,   d: 1.9, dur: 4.7 },
  { x: '92%', y: '40%', s: 2.8, d: 0.3, dur: 3.2 },
  { x: '56%', y: '7%',  s: 2,   d: 2.8, dur: 3.6 },
]

const textStyle = {
  fontFamily: '"Cormorant Garamond", serif',
  fontSize: '16px',
  color: '#F2EDE4',
  letterSpacing: '0.04em',
}

interface Props { onComplete: () => void }

export default function IntroScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)
  const [showTopText, setShowTopText] = useState(false)
  const [showBottomText, setShowBottomText] = useState(false)
  const progressRef = useRef(0)
  const doneRef = useRef(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowTopText(true), 900)
    const t2 = setTimeout(() => setShowBottomText(true), 1900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (doneRef.current) return
      e.preventDefault()
      const next = Math.min(Math.max(progressRef.current + e.deltaY * 0.0014, 0), 1)
      progressRef.current = next
      setProgress(next)
      if (next >= 1) { doneRef.current = true; onComplete() }
    }
    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY }
    const onTouchMove = (e: TouchEvent) => {
      if (doneRef.current) return
      e.preventDefault()
      const dy = touchStartY - e.touches[0].clientY
      touchStartY = e.touches[0].clientY
      const next = Math.min(Math.max(progressRef.current + dy * 0.006, 0), 1)
      progressRef.current = next
      setProgress(next)
      if (next >= 1) { doneRef.current = true; onComplete() }
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [onComplete])

  const textOpacity = Math.max(0, 1 - progress * 3)

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9800,
        background: 'linear-gradient(145deg,#121820 0%,#0d0c0a 45%,#130d0a 100%)',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Radial ambient glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(200,168,107,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

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

      {/* Central layout: text + eyes + text */}
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, gap: 20, y: progress * -80 }}
      >
        {/* Top right: connector line + text */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <AnimatePresence>
            {showTopText && (
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ opacity: textOpacity, marginRight: 14 }}
              >
                <CornerFrameScrambleText value="hi, my name is mushaf" textClassName="" style={textStyle} />
              </motion.div>
            )}
          </AnimatePresence>
          <div style={{ width: 1, height: 72, background: 'linear-gradient(to bottom, transparent, rgba(200,168,107,0.55))', flexShrink: 0 }} />
        </div>

        {/* Eyes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyes size={72} />
        </motion.div>

        {/* Bottom left: connector line + text */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <div style={{ width: 1, height: 72, background: 'linear-gradient(to bottom, rgba(200,168,107,0.55), transparent)', flexShrink: 0 }} />
          <AnimatePresence>
            {showBottomText && (
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ opacity: textOpacity, marginLeft: 14 }}
              >
                <CornerFrameScrambleText value="scroll down to find out more about me" textClassName="" style={textStyle} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: textOpacity }}>
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: Math.max(4, 56 * (1 - progress)), background: 'linear-gradient(to bottom,#C8A86B,transparent)' }}
        />
        <span style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#4A453E' }}>Scroll</span>
      </div>
    </motion.div>
  )
}
