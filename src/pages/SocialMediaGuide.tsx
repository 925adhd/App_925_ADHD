import { Link } from 'react-router-dom'
import { Brain, Wallet, Target, Flame, AlertTriangle } from 'lucide-react'
import '../styles/pages/SocialMediaGuide.css'
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

const INCOME_LADDER: [string, string, string, string, string][] = [
  ['500-10K', 'Nano Influencer', '$10-100/post • $100-800/mo', 'Most achievable', 'good'],
  ['10K-100K', 'Micro Influencer', '$100-1K/post • $800-5K/mo', 'Consistent posting needed', 'hard'],
  ['100K-1M', 'Macro Influencer', '$1K-10K/post • $5K-50K/mo', 'High pressure', 'vhard'],
  ['1M+', 'Mega Influencer', '$10K+/post • $50K+/mo', 'Extremely rare', 'vhard'],
]

const platforms: Platform[] = [
  {
    name: 'YouTube',
    pay: '$3-10 RPM ad rev',
    fit: 'best',
    note: 'Weekly posting is sustainable. Algorithm rewards consistency, not daily grind. Best long-term play.',
    href: 'https://www.youtube.com/creators/',
    external: true,
  },
  {
    name: 'LinkedIn',
    pay: '$0-500/post (sponsored)',
    fit: 'best',
    note: 'Text-based, low production barrier. Less addictive algorithm. Pays via brand deals once you have a niche.',
    href: '/gig-detail?gig=linkedin',
  },
  {
    name: 'Instagram',
    pay: '$10-1K/sponsored post',
    fit: 'ok',
    note: 'Comparison culture is brutal. Triggers perfectionism. Can pay if you survive the burnout.',
    href: '/gig-detail?gig=instagram',
  },
  {
    name: 'TikTok',
    pay: '$0.02-0.04/1K views',
    fit: 'ok',
    note: 'Most addictive algorithm. ADHD kryptonite. High risk of doom-scrolling instead of creating.',
    href: '/gig-detail?gig=tiktok',
  },
]

const idealFor = [
  'You can stick with a platform for at least 6 months',
  'You have a niche you could talk about forever',
  'You can post on a schedule (even if it\'s 2x/week)',
]

const whyAdhd = [
  'Creative bursts during hyperfocus turn into content',
  'Authenticity reads well on camera; ADHD brains rarely sound rehearsed',
  'Novelty-seeking helps you catch trends early',
]

export default function SocialMediaGuide() {
  return (
    <div className="social-media-guide">
      <div className="reality-banner">
        <span className="reality-icon"><AlertTriangle /></span>
        <div className="reality-text">
          <h3>The honest truth about influencer income</h3>
          <p>48% of influencers earn under $15,000/year. Only 15% make over $100K. This guide gives realistic expectations, not hype.</p>
        </div>
      </div>

      <div className="hero">
        <div className="hero-icon">📱</div>
        <h1><span>Social Media Income</span></h1>
        <p className="subtitle">The realistic, ADHD-honest take on making money on social platforms.</p>
      </div>

      <div className="income-ladder">
        {INCOME_LADDER.map(([followers, name, range, label, color]) => (
          <div key={name} className="income-tier">
            <span className="tier-followers">{followers}</span>
            <div className="tier-info">
              <div className="tier-name">{name}</div>
              <div className="tier-range">{range}</div>
            </div>
            <span className={`tier-reality ${color}`}>{label}</span>
          </div>
        ))}
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
                  {p.fit === 'best' ? 'Top pick' : p.fit === 'good' ? 'Good' : 'Risky'}
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
          <li><strong>Pick ONE platform.</strong> Splitting effort across 4 = nothing grows.</li>
          <li><strong>Set a posting cap.</strong> 2x/week to start, max. Daily posting kills ADHD brains.</li>
          <li><strong>Install app timers.</strong> The same algorithm that pays you also eats your day.</li>
          <li><strong>Done beats perfect.</strong> ADHD perfectionism is the #1 reason channels die in month 3.</li>
        </ul>
      </div>

      <div className="rhythm-section final-take">
        <div className="section-header">
          <div className="section-icon verdict"><Flame /></div>
          <h2 className="section-title">Start with this one</h2>
        </div>
        <div className="final-take-content">
          <p><strong>YouTube</strong> for video. Weekly cadence is sustainable. The algorithm doesn't punish you for missing a day.</p>
          <p><strong>LinkedIn</strong> for text. Lowest production barrier. Best for monetizing expertise via brand deals.</p>
          <p>Avoid TikTok and Instagram until you have a posting habit elsewhere. Both will eat your attention before they pay you.</p>
        </div>
      </div>

      <div className="cta-section">
        <p className="final-cta-headline">Ready to start?</p>
        <a href="https://www.youtube.com/creators/" target="_blank" rel="noreferrer" className="cta-btn">
          Set up a YouTube creator account →
        </a>
      </div>
    </div>
  )
}
