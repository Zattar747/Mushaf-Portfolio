import { useState } from 'react'
import { motion } from 'framer-motion'

const VP = { once: true, margin: '-80px' } as const

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formsubmit.co/ajax/mushaf.fatma2007@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:    data.get('name'),
          email:   data.get('email'),
          service: data.get('service'),
          budget:  data.get('budget'),
          message: data.get('message'),
          _subject: `Portfolio Inquiry — ${data.get('name')}`,
          _template: 'table',
        }),
      })

      if (res.ok) {
        setStatus('sent')
        form.reset()
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const isSent    = status === 'sent'
  const isSending = status === 'sending'
  const isError   = status === 'error'

  return (
    <section id="contact" style={{ background: '#131210', borderTop: '1px solid rgba(242,237,228,0.06)', padding: '148px 64px', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative rings */}
      <div style={{ position: 'absolute', top: '50%', right: -120, transform: 'translateY(-50%)', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(200,168,107,0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', right: -80,  transform: 'translateY(-50%)', width: 340, height: 340, borderRadius: '50%', border: '1px solid rgba(200,168,107,0.06)', pointerEvents: 'none' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: 108, alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>

        {/* Info — slides from left */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={VP}
        >
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }} viewport={VP}
            className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">Get in Touch</motion.p>

          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} viewport={VP}
            className="font-cormorant font-light leading-[0.96] text-cream" style={{ fontSize: 'clamp(48px,6vw,84px)' }}>
            Let's create<br />something<br /><em className="italic text-gold">remarkable</em>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} viewport={VP}
            style={{ fontSize: 15, lineHeight: 1.85, color: '#9A9188', marginTop: 32, maxWidth: 400 }}>
            Ready to collaborate on a design project, social campaign, or creative shoot? I'd love to hear from you.
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 56 }}>
            {[
              ['✉', 'Email',    'mushaf.fatma2007@gmail.com'],
              ['☏', 'Phone',    '+971-50-1862-786'],
              ['◎', 'Location', 'Dubai, UAE — MAHE Dubai Campus'],
            ].map(([icon, label, value], i) => (
              <motion.div key={label} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.28 + i * 0.1, ease: [0.16, 1, 0.3, 1] }} viewport={VP}
                style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(200,168,107,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#9A9188', flexShrink: 0, marginTop: 2 }}>{icon}</div>
                <div>
                  <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8A86B', display: 'block', marginBottom: 5 }}>{label}</span>
                  <span style={{ fontSize: 15, color: '#9A9188' }}>{value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Form — slides from right */}
        <motion.form
          initial={{ opacity: 0, x: 90 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          viewport={VP}
          onSubmit={handleSubmit}
          style={{ background: '#0B0A08', border: '1px solid rgba(242,237,228,0.06)', borderRadius: 4, padding: '56px 52px' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
            <div>
              <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A453E', marginBottom: 12 }}>Full Name</label>
              <input name="name" type="text" placeholder="Your name" required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A453E', marginBottom: 12 }}>Email Address</label>
              <input name="email" type="email" placeholder="your@email.com" required />
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A453E', marginBottom: 12 }}>Service Interest</label>
            <select name="service" defaultValue="">
              <option value="" disabled>Select a service</option>
              {['Graphic Design', 'Photography', 'Social Media & Content', 'Fine Arts & Illustration', 'Interior Design', 'Brand Identity'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A453E', marginBottom: 12 }}>Budget Range</label>
            <input name="budget" type="text" placeholder="e.g. AED 2,000 · flexible · let's discuss" />
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A453E', marginBottom: 12 }}>Your Project</label>
            <textarea name="message" placeholder="Tell me about your project, timeline, and what you need..." required />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
            {isError && (
              <span style={{ fontSize: 11, color: '#9A4A4A', letterSpacing: '0.08em' }}>Something went wrong — try emailing directly.</span>
            )}
            <button type="submit" disabled={isSending || isSent} data-hover
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                padding: '16px 48px',
                background: isSent ? '#C8A86B' : 'transparent',
                border: `1px solid ${isSent ? '#C8A86B' : '#8B6B3A'}`,
                color: isSent ? '#0B0A08' : '#C8A86B',
                fontFamily: '"DM Sans",sans-serif', fontSize: 11,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                borderRadius: 2, transition: 'all .4s',
                opacity: isSending ? 0.6 : 1,
              }}
              onMouseEnter={e => { if (!isSent && !isSending) { const b = e.currentTarget; b.style.background = '#C8A86B'; b.style.color = '#0B0A08'; b.style.borderColor = '#C8A86B' } }}
              onMouseLeave={e => { if (!isSent && !isSending) { const b = e.currentTarget; b.style.background = 'transparent'; b.style.color = '#C8A86B'; b.style.borderColor = '#8B6B3A' } }}>
              {isSent    ? 'Message Sent ✓' :
               isSending ? 'Sending…'       :
               <><span>Send Message</span><span style={{ fontSize: 18 }}>→</span></>}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
