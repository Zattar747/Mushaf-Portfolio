import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const VP = { once: true, margin: '-80px' } as const
const SQRT_5000 = Math.sqrt(5000)

const QUOTES = [
  {
    text: "Mushaf has an eye that's hard to come by. Her work feels authentic — every element seems bold and intentional, and you can tell it's her work by the subtle hint of perfectionism without seeing her name on it. Things have gone much smoother ever since she joined the team. She's highly receptive to feedback, easy to work with and committed to the final product she delivers. Highly recommend her work.",
    by: 'Aamir Ashik',
    role: 'Director, AWS Cloud Club · MAHE Dubai',
    initial: 'A',
  },
  {
    text: "From a marketing perspective, Mushaf is the kind of creative collaborator you rarely come across. She doesn't just execute a brief — she elevates it. Every campaign visual she produced had a clarity and intentionality that resonated with our audience immediately. Her instinct for what works visually, combined with a deep understanding of our brand voice, made every project feel effortless and effective. An invaluable asset to the team.",
    by: 'Pinan',
    role: 'Marketing Head, AWS Cloud Club · MAHE Dubai',
    initial: 'P',
  },
  {
    text: "Leading the AWS Cloud Club, I've had the privilege of working alongside many talented individuals — but Mushaf operates at a different level entirely. Her design work doesn't just look polished; it communicates with purpose. She brings discipline, creative courage, and a relentless attention to detail that sets a standard for everyone around her. The visual identity of our club has been significantly shaped by her contributions, and the results speak for themselves.",
    by: 'Fida',
    role: 'Captain, AWS Cloud Club · MAHE Dubai',
    initial: 'F',
  },
]

const cardSize = { desktop: 360, mobile: 290 }

interface CardProps {
  position: number
  quote: typeof QUOTES[0]
  handleMove: (steps: number) => void
  size: number
}

function TestimonialCard({ position, quote, handleMove, size }: CardProps) {
  const isCenter = position === 0
  return (
    <div
      onClick={() => handleMove(position)}
      style={{
        position: 'absolute', left: '50%', top: '46%',
        width: size, height: size + 30,
        cursor: 'pointer',
        border: `1.5px solid ${isCenter ? '#C8A86B' : 'rgba(200,168,107,0.18)'}`,
        background: isCenter ? '#C8A86B' : '#0B0A08',
        clipPath: 'polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)',
        transform: `translate(-50%, -50%) translateX(${(size / 1.5) * position}px) translateY(${isCenter ? -50 : position % 2 ? 12 : -12}px) rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)`,
        boxShadow: isCenter ? '0px 8px 0px 4px rgba(200,168,107,0.15)' : 'none',
        transition: 'all 0.5s cubic-bezier(.16,1,.3,1)',
        padding: '40px 36px', zIndex: isCenter ? 10 : 0,
        display: 'flex', flexDirection: 'column',
      }}
    >
      <span style={{
        position: 'absolute', display: 'block',
        transformOrigin: 'top right', transform: 'rotate(45deg)',
        background: isCenter ? 'rgba(11,10,8,0.2)' : 'rgba(200,168,107,0.18)',
        right: -1.5, top: 38, width: SQRT_5000, height: 1.5,
      }} />
      <div style={{
        width: 44, height: 38, flexShrink: 0, marginBottom: 20,
        background: isCenter ? 'rgba(11,10,8,0.18)' : 'linear-gradient(135deg,#8B6B3A,#4A453E)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Cormorant Garamond",serif', fontSize: 20,
        color: isCenter ? '#0B0A08' : '#C8A86B',
        boxShadow: `3px 3px 0px ${isCenter ? 'rgba(11,10,8,0.15)' : '#0B0A08'}`,
      }}>{quote.initial}</div>
      <p style={{
        fontFamily: '"Cormorant Garamond",serif',
        fontSize: 'clamp(13px,1.3vw,16px)',
        fontStyle: 'italic', fontWeight: 300, lineHeight: 1.65, flex: 1,
        color: isCenter ? '#0B0A08' : '#F2EDE4',
        overflow: 'hidden',
      }}>"{quote.text}"</p>
      <div style={{ position: 'absolute', bottom: 28, left: 36, right: 36 }}>
        <strong style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: isCenter ? '#0B0A08' : '#C8A86B' }}>
          {quote.by}
        </strong>
        <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: isCenter ? 'rgba(11,10,8,0.55)' : '#4A453E' }}>
          {quote.role}
        </span>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [size, setSize] = useState(cardSize.desktop)
  const [list, setList] = useState(QUOTES)

  const handleMove = (steps: number) => {
    const next = [...list]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) { const item = next.shift(); if (item) next.push({ ...item }) }
    } else {
      for (let i = steps; i < 0; i++) { const item = next.pop(); if (item) next.unshift({ ...item }) }
    }
    setList(next)
  }

  useEffect(() => {
    const upd = () => setSize(window.innerWidth >= 640 ? cardSize.desktop : cardSize.mobile)
    upd()
    window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [])

  return (
    <section id="testimonials" style={{ borderTop: '1px solid rgba(242,237,228,0.06)', padding: '148px 64px', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: 80 }}>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} viewport={VP}
          className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">Testimonials</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} viewport={VP}
          className="font-cormorant font-light leading-[0.96] text-cream" style={{ fontSize: 'clamp(48px,6vw,84px)' }}>
          What they<br /><em className="italic text-gold">say</em>
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        viewport={VP}
        style={{ position: 'relative', width: '100%', height: size + 200, overflow: 'hidden' }}
      >
        {list.map((quote, index) => {
          const position = list.length % 2 ? index - (list.length + 1) / 2 : index - list.length / 2
          return (
            <TestimonialCard
              key={`${quote.by}-${index}`}
              quote={quote}
              handleMove={handleMove}
              position={position}
              size={size}
            />
          )
        })}
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
          {([-1, 1] as const).map((step) => (
            <button key={step} onClick={() => handleMove(step)} data-hover
              style={{ width: 48, height: 48, border: '1px solid rgba(200,168,107,0.25)', background: '#0B0A08', color: '#9A9188', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .3s' }}
              onMouseEnter={e => { const b = e.currentTarget; b.style.background = '#C8A86B'; b.style.color = '#0B0A08'; b.style.borderColor = '#C8A86B' }}
              onMouseLeave={e => { const b = e.currentTarget; b.style.background = '#0B0A08'; b.style.color = '#9A9188'; b.style.borderColor = 'rgba(200,168,107,0.25)' }}>
              {step === -1 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
