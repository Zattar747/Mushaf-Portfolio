import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function Eye({ eyeX, eyeY, cursorX, cursorY, size = 64 }: {
  eyeX: number; eyeY: number; cursorX: number; cursorY: number; size?: number
}) {
  const dx = cursorX - eyeX
  const dy = cursorY - eyeY
  const angle = Math.atan2(dy, dx)
  const dist = Math.min(size * 0.22, Math.sqrt(dx * dx + dy * dy) * 0.1)
  const px = Math.cos(angle) * dist
  const py = Math.sin(angle) * dist

  return (
    <div style={{
      width: size * 1.85, height: size, borderRadius: size,
      background: 'rgba(242,237,228,0.97)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 0 60px rgba(200,168,107,0.22), 0 16px 48px rgba(0,0,0,0.65)',
    }}>
      <motion.div
        animate={{ x: px, y: py }}
        transition={{ type: 'spring', stiffness: 155, damping: 18, mass: 0.65 }}
        style={{
          width: size * 0.56, height: size * 0.56, borderRadius: '50%',
          background: 'radial-gradient(circle at 38% 35%, #2a1f12, #070605)',
          position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <div style={{ width: size * 0.27, height: size * 0.27, borderRadius: '50%', background: '#020101' }} />
        <div style={{ width: size * 0.11, height: size * 0.11, borderRadius: '50%', background: 'rgba(255,255,255,0.95)', position: 'absolute', top: '13%', right: '15%' }} />
        <div style={{ width: size * 0.055, height: size * 0.055, borderRadius: '50%', background: 'rgba(200,168,107,0.7)', position: 'absolute', bottom: '17%', left: '21%' }} />
      </motion.div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '16%', background: 'rgba(0,0,0,0.06)', borderRadius: `${size}px ${size}px 0 0` }} />
    </div>
  )
}

export default function Eyes({ size = 64 }: { size?: number }) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ lx: 0, ly: 0, rx: 0, ry: 0 })
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const m = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', m)
    return () => window.removeEventListener('mousemove', m)
  }, [])

  useEffect(() => {
    const upd = () => {
      if (leftRef.current && rightRef.current) {
        const l = leftRef.current.getBoundingClientRect()
        const r = rightRef.current.getBoundingClientRect()
        setPos({ lx: l.left + l.width / 2, ly: l.top + l.height / 2, rx: r.left + r.width / 2, ry: r.top + r.height / 2 })
      }
    }
    upd()
    window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const blinkCycle = () => {
      const delay = 2600 + Math.random() * 3800
      timeout = setTimeout(() => {
        setBlink(true)
        timeout = setTimeout(() => { setBlink(false); blinkCycle() }, 105)
      }, delay)
    }
    blinkCycle()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
      <motion.div ref={leftRef} animate={{ scaleY: blink ? 0.04 : 1 }} transition={{ duration: 0.07 }}>
        <Eye eyeX={pos.lx} eyeY={pos.ly} cursorX={cursor.x} cursorY={cursor.y} size={size} />
      </motion.div>
      <motion.div ref={rightRef} animate={{ scaleY: blink ? 0.04 : 1 }} transition={{ duration: 0.07, delay: 0.04 }}>
        <Eye eyeX={pos.rx} eyeY={pos.ry} cursorX={cursor.x} cursorY={cursor.y} size={size} />
      </motion.div>
    </div>
  )
}
