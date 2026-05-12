import { Link } from 'react-router-dom'
import { Brain, Wallet, Target, Flame, AlertTriangle } from 'lucide-react'
import '../styles/pages/TranscriptionGuide.css'
import '../styles/pages/_guides-compact.css'
import '../styles/pages/_detail-rhythm.css'

type Fit = 'best' | 'good' | 'ok'

interface Platform {
  name: string
  pay: string
  fit: Fit
  note: string
  href: string
  external?: boolean
}

const platforms: Platform[] = [
  {
    name: 'TranscribeMe',
    pay: '$15-22/audio hour',
    fit: 'best',
    note: 'Short files (2-4 min). Clean interface. Best fit for ADHD attention spans.',
    href: '/gig-detail?gig=transcribeme',
  },
  {
    name: 'GoTranscript',
    pay: '$0.60/audio min',
    fit: 'good',
    note: 'Most accessible when open. Regular work available. Longer files than TranscribeMe.',
    href: '/gig-detail?gig=gotranscript',
  },
  {
    name: 'Rev',
    pay: '$0.30-0.75/audio min',
    fit: 'ok',
    note: 'Big name, but competitive. 72,000+ freelancers. Pay is low and waitlisted.',
    href: '/gig-detail?gig=rev',
  },
  {
    name: 'Scribie',
    pay: '$5-25/audio hour',
    fit: 'ok',
    note: 'Short files (great for ADHD), but hiring is paused.',
    href: '/gig-detail?gig=scribie',
  },
]

const idealFor = [
  'Your typing speed is 60+ WPM (or you can practice up)',
  'You can follow unclear audio without losing the thread',
  'You can sit with a 25-30 minute focused stretch',
]

const whyAdhd = [
  'Short files: a full task in under 10 minutes',
  'Pick interesting topics over boring meetings',
  'Skip work when tired; mistakes can get you banned',
]

export default function TranscriptionGuide() {
  return (
    <div className="transcription-guide">
      <div className="warning-banner">
        <span className="warning-icon"><AlertTriangle /></span>
        <div className="warning-text">
          <h3>Real talk: AI changed this industry</h3>
          <p>AI now does 80% of the work. Humans mainly edit AI output or handle complex audio. Expect $150 to $400/month, not thousands.</p>
        </div>
      </div>

      <div className="hero">
        <div className="hero-icon">🎧</div>
        <h1><span>Transcription</span></h1>
        <p className="subtitle">Type what you hear. Work in short bursts. Most platforms have waitlists.</p>
      </div>

      <div className="filter-row">
        <div className="best-for-block">
          <div className="best-for-title">Best for you if…</div>
          {idealFor.map((item, i) => (
            <div key={i} className="best-for-row">{item}</div>
          ))}
        </div>

        <div className="rhythm-section section-alt">
          <div className="section-header">
            <div className="section-icon adhd"><Brain /></div>
            <h2 className="section-title">Why it's ADHD-friendly</h2>
          </div>
          <ul className="why-adhd-list">
            {whyAdhd.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rhythm-section">
        <div className="section-header">
          <div className="section-icon payout"><Wallet /></div>
          <h2 className="section-title">Pick your platform</h2>
        </div>
        <div className="platform-compare">
          {platforms.map(p => {
            const inner = (
              <>
                <div className="compare-row-head">
                  <span className="compare-name">{p.name}</span>
                  <span className="compare-pay">{p.pay}</span>
                </div>
                <span className={`compare-fit ${p.fit}`}>
                  {p.fit === 'best' ? 'Top pick' : p.fit === 'good' ? 'Good' : 'OK'}
                </span>
                <div className="compare-note">{p.note}</div>
              </>
            )
            return p.external ? (
              <a key={p.name} href={p.href} target="_blank" rel="noreferrer" className="compare-row">{inner}</a>
            ) : (
              <Link key={p.name} to={p.href} className="compare-row">{inner}</Link>
            )
          })}
        </div>
      </div>

      <div className="rhythm-section section-alt">
        <div className="section-header">
          <div className="section-icon tasks"><Target /></div>
          <h2 className="section-title">How to win the category</h2>
        </div>
        <ul className="why-adhd-list">
          <li><strong>Get your typing to 60+ WPM first.</strong> keybr.com, 15 minutes a day.</li>
          <li><strong>Apply to all platforms even with waitlists.</strong> A "paused" platform may open in a week.</li>
          <li><strong>Session structure:</strong> 25-30 min transcribing, 5 min proofreading, 5 min break. Max 3 cycles.</li>
          <li><strong>Never work tired.</strong> One bad batch tanks your rating and shuts off jobs.</li>
        </ul>
      </div>

      <div className="rhythm-section final-take">
        <div className="section-header">
          <div className="section-icon verdict"><Flame /></div>
          <h2 className="section-title">Start with this one</h2>
        </div>
        <div className="final-take-content">
          <p><strong>TranscribeMe</strong> has short files and is usually open. Best entry point for ADHD focus.</p>
          <p>Apply to GoTranscript too as a backup. If TranscribeMe is full, GoTranscript fills the gap.</p>
          <p>Don't expect more than $150 to $400/month. AI took the rest. Treat it as supplemental, not primary.</p>
        </div>
      </div>

      <div className="cta-section">
        <p className="final-cta-headline">Ready to apply?</p>
        <Link to="/gig-detail?gig=transcribeme" className="cta-btn">
          Open TranscribeMe deep dive →
        </Link>
      </div>
    </div>
  )
}
