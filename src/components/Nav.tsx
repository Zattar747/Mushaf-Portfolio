import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = ['About', 'Services', 'Work', 'Artworks', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-500"
        style={{
          padding: scrolled ? '18px 64px' : '30px 64px',
          background: scrolled ? 'rgba(11,10,8,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(22px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(242,237,228,0.06)' : 'none',
        }}
      >
        <a href="#" className="font-cormorant text-[22px] font-medium text-cream no-underline">
          Mushaf<em className="not-italic text-gold">.</em>
        </a>

        <ul className="hidden md:flex gap-11 list-none items-center m-0 p-0">
          {LINKS.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}
                className="text-[11px] tracking-[0.16em] uppercase text-cream-dim hover:text-gold transition-colors no-underline">
                {l}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact"
              className="text-[11px] tracking-[0.12em] uppercase text-gold border border-gold-dim px-6 py-2.5 rounded-sm hover:bg-gold hover:text-bg transition-all no-underline">
              Let's Talk
            </a>
          </li>
        </ul>

        <button className="md:hidden flex flex-col gap-[5px] bg-transparent border-0 p-1" onClick={() => setOpen(true)}>
          {[0,1,2].map(i => <span key={i} className="block w-6 h-px bg-cream" />)}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg z-[60] flex flex-col items-center justify-center gap-10">
            <button className="absolute top-7 right-8 text-cream-dim text-2xl bg-transparent border-0" onClick={() => setOpen(false)}>✕</button>
            {LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="font-cormorant text-5xl font-light text-cream hover:text-gold transition-colors no-underline"
                onClick={() => setOpen(false)}>{l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
