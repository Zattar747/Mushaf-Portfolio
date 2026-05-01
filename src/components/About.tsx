import { motion } from 'framer-motion'

const VP = { once: true, margin: '-80px' } as const

const TAGS = [
  'Graphic Design', 'Photography', 'Visual Design', 'Poster Design',
  'Social Media', 'Adobe Photoshop', 'Canva', 'Hand-drawn Art',
  'Painting', 'Interior Design', 'AutoCAD', '3D Modelling',
  'Storytelling', 'Trend Awareness',
]

export default function About() {
  return (
    <section id="about" style={{ background: '#131210', borderTop: '1px solid rgba(242,237,228,0.06)', padding: '148px 64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 88, alignItems: 'center' }}>

        {/* Image side — flies in from left */}
        <motion.div
          initial={{ opacity: 0, x: -90 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={VP}
          style={{ position: 'relative' }}
        >
          <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: 2, position: 'relative', overflow: 'hidden', background: '#0e0d0b' }}>
            <img src="/assets/designer/photo.png" alt="Mushaf Fatma" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,10,8,0.35) 0%, transparent 50%)' }} />
          </div>
          <div style={{ position: 'absolute', top: 18, left: 18, right: -18, bottom: -18, border: '1px solid rgba(200,168,107,0.18)', borderRadius: 2, zIndex: -1 }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            viewport={VP}
            style={{ position: 'absolute', bottom: -28, right: -28, width: 116, height: 116, borderRadius: '50%', background: '#C8A86B', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <span className="font-cormorant" style={{ fontSize: 26, fontWeight: 500, color: '#0B0A08', lineHeight: 1 }}>MAHE</span>
            <span style={{ fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(11,10,8,0.65)', textAlign: 'center', marginTop: 2, lineHeight: 1.35 }}>Dubai<br />2025–2029</span>
          </motion.div>
        </motion.div>

        {/* Content side — flies in from right */}
        <div style={{ paddingTop: 16 }}>
          <motion.p
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={VP}
            className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5"
          >About</motion.p>

          <motion.h2
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            viewport={VP}
            className="font-cormorant font-light leading-[0.96] text-cream"
            style={{ fontSize: 'clamp(48px,6vw,84px)' }}
          >
            Design is<br /><em className="italic text-gold">intention</em><br />made visible
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={VP}
            style={{ fontSize: 15, lineHeight: 1.9, color: '#9A9188', marginTop: 36, maxWidth: 560 }}
          >
            <p>I'm Mushaf Fatma — a creative and driven Interior Design student at MAHE Dubai with a strong passion for visual storytelling, brand content, and photography. Experienced in producing professional-grade social media graphics and event promotional materials as the Graphic Designer for the AWS Student Builder Group MAHE-Dubai, the first AWS Student Builder Group in the GCC.</p>
            <p style={{ marginTop: 20 }}>I combine an eye for aesthetics with technical design skills and a genuine understanding of current social media trends. Also a hands-on photographer and self-taught artist with skills in hand-drawn illustration and painting.</p>
          </motion.div>

          {/* Skill tags — stagger in one by one */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 44 }}>
            {TAGS.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.75, y: 14 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                viewport={VP}
                data-hover
                style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9188', border: '1px solid rgba(200,168,107,0.18)', padding: '8px 20px', borderRadius: 100, transition: 'border-color .3s,color .3s', cursor: 'default', display: 'inline-block' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C8A86B'; (e.currentTarget as HTMLElement).style.color = '#C8A86B' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,107,0.18)'; (e.currentTarget as HTMLElement).style.color = '#9A9188' }}
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            viewport={VP}
            style={{ marginTop: 40, display: 'flex', gap: 24 }}
          >
            {[['English', 'Fluent'], ['Urdu / Hindi', 'Native'], ['Arabic', 'Basic']].map(([lang, level]) => (
              <div key={lang} style={{ borderLeft: '1px solid rgba(200,168,107,0.3)', paddingLeft: 16 }}>
                <span style={{ display: 'block', fontSize: 13, color: '#F2EDE4', fontWeight: 400 }}>{lang}</span>
                <span style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8A86B' }}>{level}</span>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={VP}
            className="font-cormorant"
            style={{ fontSize: 44, fontStyle: 'italic', color: '#9A9188', marginTop: 52 }}
          >Mushaf Fatma</motion.p>
        </div>
      </div>
    </section>
  )
}
