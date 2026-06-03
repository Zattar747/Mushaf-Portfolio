import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  strength?: number
  style?: React.CSSProperties
  className?: string
}

export function MagneticButton({ children, strength = 0.38, style, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = e.clientX - (rect.left + rect.width / 2)
    const cy = e.clientY - (rect.top + rect.height / 2)
    setPos({ x: cx * strength, y: cy * strength })
  }

  const onLeave = () => setPos({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 280, damping: 18, mass: 0.5 }}
      style={{ display: 'inline-block', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
