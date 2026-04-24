import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Artworks from './components/Artworks'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import IntroScreen from './components/IntroScreen'
import { PortfolioGallery } from './components/ui/PortfolioGallery'

export type Category = 'Art' | 'Photography' | 'Graphic Design' | 'Presentations'

const STRIP_ITEMS = ['Graphic Design', 'Photography', 'Social Media', 'Fine Arts', 'Interior Design', 'Brand Identity', 'Visual Storytelling', 'Illustration', 'Canva', 'Adobe PS', 'AutoCAD', '3D Modelling']

function MarqueeStrip() {
  return (
    <div style={{ borderTop: '1px solid rgba(242,237,228,0.06)', borderBottom: '1px solid rgba(242,237,228,0.06)', overflow: 'hidden', padding: '14px 0', background: '#131210' }}>
      <div className="ml-fast" style={{ display: 'flex', gap: 52, width: 'max-content', alignItems: 'center' }}>
        {[...STRIP_ITEMS, ...STRIP_ITEMS, ...STRIP_ITEMS].map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 52, whiteSpace: 'nowrap' }}>
            <span style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 17, fontWeight: 300, color: '#6A6158', fontStyle: 'italic' }}>{item}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#8B6B3A', display: 'inline-block', flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}

export const PORTFOLIO_DATA: Record<Category, { src: string; alt: string; title: string; type?: 'image' | 'video' }[]> = {
  'Art': Array.from({ length: 18 }, (_, i) => ({
    src: `/assets/art/art-${String(i + 1).padStart(2, '0')}.jpeg`,
    alt: `Art ${i + 1}`,
    title: `Art Study ${String(i + 1).padStart(2, '0')}`,
  })),
  'Photography': [
    { src: '/assets/photography/photo-01.jpeg', alt: 'Photo 1', title: 'Atmospheric Venue' },
    { src: '/assets/photography/photo-02.jpeg', alt: 'Photo 2', title: 'Natural Light' },
    { src: '/assets/photography/photo-03.jpeg', alt: 'Photo 3', title: 'Composition Study' },
    { src: '/assets/photography/photo-04.jpeg', alt: 'Photo 4', title: 'Editorial Frame' },
    { src: '/assets/photography/photo-05.jpeg', alt: 'Photo 5', title: 'Golden Hour' },
    { src: '/assets/photography/photo-06.jpeg', alt: 'Photo 6', title: 'Detail Work' },
    { src: '/assets/photography/photo-07.jpeg', alt: 'Photo 7', title: 'Portrait Series' },
    { src: '/assets/photography/photo-08.jpeg', alt: 'Photo 8', title: 'Urban Perspective' },
    { src: '/assets/photography/photo-09.jpeg', alt: 'Photo 9', title: 'Still Life' },
    { src: '/assets/photography/photo-10.jpeg', alt: 'Photo 10', title: 'Architecture' },
    { src: '/assets/photography/photo-11.jpeg', alt: 'Photo 11', title: 'Landscape' },
  ],
  'Graphic Design': [
    { src: '/assets/graphic-design/gd-01.jpeg', alt: 'GD 1', title: 'Brand Identity' },
    { src: '/assets/graphic-design/gd-02.jpeg', alt: 'GD 2', title: 'Event Poster' },
    { src: '/assets/graphic-design/gd-03.jpeg', alt: 'GD 3', title: 'Social Media Graphics' },
    { src: '/assets/graphic-design/gd-04.jpeg', alt: 'GD 4', title: 'Typography System' },
    { src: '/assets/graphic-design/gd-05.jpeg', alt: 'GD 5', title: 'AWS Cloud Club' },
  ],
  'Presentations': [
    { src: '/assets/presentations/vid-01.mp4', alt: 'Presentation 1', title: 'Project Showcase', type: 'video' },
    { src: '/assets/presentations/vid-02.mp4', alt: 'Presentation 2', title: 'Design Pitch', type: 'video' },
    { src: '/assets/presentations/vid-03.mp4', alt: 'Presentation 3', title: 'Brand Deck', type: 'video' },
    { src: '/assets/presentations/vid-04.mp4', alt: 'Presentation 4', title: 'Keynote Design', type: 'video' },
    { src: '/assets/presentations/vid-05.mp4', alt: 'Presentation 5', title: 'Annual Review', type: 'video' },
  ],
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  let rx = 0, ry = 0

  useEffect(() => {
    let mx = 0, my = 0
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (cursorRef.current) { cursorRef.current.style.left = mx + 'px'; cursorRef.current.style.top = my + 'px' }
    }
    const lerp = () => {
      rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11
      if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px' }
      requestAnimationFrame(lerp)
    }
    window.addEventListener('mousemove', move)
    const id = requestAnimationFrame(lerp)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(id) }
  }, [])

  useEffect(() => {
    const hover = () => { cursorRef.current?.classList.add('hov'); ringRef.current?.classList.add('hov') }
    const leave = () => { cursorRef.current?.classList.remove('hov'); ringRef.current?.classList.remove('hov') }
    const els = document.querySelectorAll('a,button,[data-hover]')
    els.forEach(el => { el.addEventListener('mouseenter', hover); el.addEventListener('mouseleave', leave) })
    return () => { els.forEach(el => { el.removeEventListener('mouseenter', hover); el.removeEventListener('mouseleave', leave) }) }
  })

  useEffect(() => {
    if (activeCategory) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [activeCategory])

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />

      <AnimatePresence>
        {showIntro && <IntroScreen key="intro" onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <div className="bg-bg min-h-screen">
        <Nav />
        <main>
          <Hero />
          <MarqueeStrip />
          <About />
          <Services />
          <Portfolio onSelectCategory={(cat) => setActiveCategory(cat as Category)} />
          <Artworks />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>

      <AnimatePresence>
        {activeCategory && (
          <motion.div
            key="cat-overlay"
            initial={{ clipPath: 'circle(0% at 50% 98%)' }}
            animate={{ clipPath: 'circle(150% at 50% 98%)' }}
            exit={{ clipPath: 'circle(0% at 50% 98%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-bg z-[200] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-16 py-7 border-b border-white/[0.06] sticky top-0 bg-bg z-10">
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-3 text-cream-dim hover:text-gold transition-colors text-[11px] tracking-[0.14em] uppercase"
              >
                ← Back to Work
              </button>
              <div className="text-center">
                <p className="text-[9px] tracking-[0.3em] uppercase text-gold mb-1">Category</p>
                <h1 className="font-cormorant text-2xl font-light italic text-cream">{activeCategory}</h1>
              </div>
              <button
                onClick={() => setActiveCategory(null)}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-cream-dim hover:text-gold hover:border-gold transition-all text-sm"
              >
                ✕
              </button>
            </div>
            <PortfolioGallery
              title={activeCategory}
              images={PORTFOLIO_DATA[activeCategory]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
