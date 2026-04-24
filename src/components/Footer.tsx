function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 20, height: 20 }}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 20, height: 20 }}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function SocialBtn({ href, children, title }: { href: string; children: React.ReactNode; title: string }) {
  return (
    <a href={href} title={title} target="_blank" rel="noopener noreferrer" data-hover
      style={{ width: 48, height: 48, borderRadius: 12, background: '#131210', border: '1px solid rgba(200,168,107,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9A9188', textDecoration: 'none', transition: 'all .3s' }}
      onMouseEnter={e => { const a = e.currentTarget; a.style.background = '#C8A86B'; a.style.color = '#0B0A08'; a.style.borderColor = '#C8A86B'; a.style.transform = 'translateY(-3px)'; a.style.boxShadow = '0 8px 24px rgba(200,168,107,0.3)' }}
      onMouseLeave={e => { const a = e.currentTarget; a.style.background = '#131210'; a.style.color = '#9A9188'; a.style.borderColor = 'rgba(200,168,107,0.18)'; a.style.transform = 'translateY(0)'; a.style.boxShadow = 'none' }}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(242,237,228,0.06)', padding: '52px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
      <div>
        <div className="font-cormorant" style={{ fontSize: 20, fontWeight: 500, color: '#9A9188' }}>
          Mushaf<em className="not-italic text-gold">.</em>
        </div>
        <p style={{ fontSize: 11, color: '#4A453E', marginTop: 4 }}>Social Media & Content · Graphic Design · Photography</p>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <SocialBtn href="mailto:mushaf.fatma2007@gmail.com" title="Email"><MailIcon /></SocialBtn>
        <SocialBtn href="https://instagram.com/mushh07_" title="Instagram @mushh07_"><InstagramIcon /></SocialBtn>
        <SocialBtn href="https://www.linkedin.com/in/mushaf-fatma-565b693aa/" title="LinkedIn"><LinkedInIcon /></SocialBtn>
      </div>

      <p style={{ fontSize: 12, color: '#4A453E' }}>© 2026 Mushaf Fatma. All rights reserved.</p>

      <a href="#" data-hover style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9188', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, transition: 'color .3s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C8A86B' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9A9188' }}>
        ↑ Back to top
      </a>
    </footer>
  )
}
