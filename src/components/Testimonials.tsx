import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const E: [number, number, number, number] = [0.16, 1, 0.3, 1]
const VP = { once: true, margin: '-80px' } as const

const QUOTES = [
  {
    text: "Mushaf has an eye that's hard to come by. Her work feels authentic — every element seems bold and intentional, and you can tell it's her work by the subtle hint of perfectionism without seeing her name on it. Things have gone much smoother ever since she joined the team. She's highly receptive to feedback, easy to work with and committed to the final product she delivers. Highly recommend her work.",
    by: 'Aamir Ashik',
    role: 'Director, AWS Student Builder Group · MAHE Dubai',
    initial: 'A',
  },
]

function TestimonialCard({ q }: { q: typeof QUOTES[0] }) {
  return (
    <div style={{
      width: 540, flexShrink: 0, background: '#0d0c0a',
      border: '1px solid rgba(200,168,107,0.15)', borderRadius: 14,
      padding: '44px 48px', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', minHeight: 300,
    }}>
      <span style={{ display: 'block', fontFamily: '"Cormorant Garamond",serif', fontSize: 56, color: 'rgba(200,168,107,0.18)', lineHeight: 1, marginBottom: -8 }}>"</span>
      <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(15px,1.4vw,18px)', fontStyle: 'italic', fontWeight: 300, color: '#C8C0B4', lineHeight: 1.72, flex: 1 }}>{q.text}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 36, paddingTop: 28, borderTop: '1px solid rgba(200,168,107,0.1)' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#8B6B3A,#4A453E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Cormorant Garamond",serif', fontSize: 20, color: '#C8A86B', flexShrink: 0 }}>{q.initial}</div>
        <div>
          <strong style={{ display: 'block', fontSize: 13, color: '#F2EDE4', fontWeight: 500, marginBottom: 5 }}>{q.by}</strong>
          <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4A453E' }}>{q.role}</span>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section id="testimonials" style={{ borderTop: '1px solid rgba(242,237,228,0.06)', padding: '148px 0', overflow: 'hidden' }}>
      <div style={{ padding: '0 64px', marginBottom: 72 }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: E }} viewport={VP}
          className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5"
        >Testimonials</motion.p>

        <div ref={headRef}>
          <h2 className="font-cormorant font-light leading-[0.96] text-cream" style={{ fontSize: 'clamp(48px,6vw,84px)' }}>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span style={{ display: 'block' }}
                initial={{ y: '100%' }}
                animate={{ y: headInView ? 0 : '100%' }}
                transition={{ duration: 0.9, delay: 0, ease: E }}
              >What they</motion.span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <motion.em className="italic text-gold" style={{ display: 'block' }}
                initial={{ y: '100%' }}
                animate={{ y: headInView ? 0 : '100%' }}
                transition={{ duration: 0.9, delay: 0.15, ease: E }}
              >say</motion.em>
            </span>
          </h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.12, ease: E }}
        viewport={VP}
        style={{ display: 'flex', justifyContent: 'center', padding: '0 64px' }}
      >
        <TestimonialCard q={QUOTES[0]} />
      </motion.div>
    </section>
  )
}
