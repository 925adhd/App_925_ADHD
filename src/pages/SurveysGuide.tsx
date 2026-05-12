import { Link } from 'react-router-dom'
import { Brain, Wallet, Target, Flame } from 'lucide-react'
import '../styles/pages/SurveysGuide.css'
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
    name: 'User Interviews',
    pay: '$50-200/session',
    fit: 'best',
    note: 'Video calls about products you use. Highest pay in the category. Real conversations beat clicking.',
    href: 'https://userinterviews.com',
    external: true,
  },
  {
    name: 'Prolific',
    pay: '$8-18/hr',
    fit: 'best',
    note: 'Academic research studies. Topics are interesting; pay is fair. The most ADHD-tolerable steady-work option.',
    href: '/gig-detail?gig=prolific',
  },
  {
    name: 'Respondent',
    pay: '$75-300/study',
    fit: 'best',
    note: 'High-paying research for professionals. Best if you have industry expertise.',
    href: '/gig-detail?gig=respondentio',
  },
  {
    name: 'dscout',
    pay: '$25-100/mission',
    fit: 'good',
    note: 'Mobile diary studies. Record video entries about daily life. Creative format.',
    href: '/gig-detail?gig=dscout',
  },
  {
    name: 'PaidViewpoint',
    pay: '$5-10/week',
    fit: 'good',
    note: 'Ultra-short surveys (2-5 min). No screeners. Every survey pays. Low rejection.',
    href: '/gig-detail?gig=paidviewpoint',
  },
  {
    name: 'Survey Junkie',
    pay: '$3-6/hr',
    fit: 'ok',
    note: 'Mindless background work. Repetitive. Save for low-energy days only.',
    href: '/gig-detail?gig=surveyjunkie',
  },
]

const idealFor = [
  'You like sharing opinions on products you actually use',
  'You can focus for 5-20 minute bursts',
  'You\'re OK with $20-200/month, not life-changing money',
]

const whyAdhd = [
  'Short tasks: completion dopamine without long focus',
  'Topic variety prevents the boredom trap',
  'Work whenever your brain is on; stop when it isn\'t',
]

export default function SurveysGuide() {
  return (
    <div className="surveys-guide">
      <div className="hero">
        <span className="hero-emoji">📊</span>
        <h1>Surveys &amp; Market Research</h1>
        <p className="subtitle">Get paid for your opinions. Most surveys pay $3 to $6/hr. The good ones pay $50 to $300/session.</p>
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
          <li><strong>Complete every profile 100%.</strong> Skipped fields = screened out of better-paying studies.</li>
          <li><strong>Be consistent across platforms.</strong> They cross-check your answers.</li>
          <li><strong>Stack apps for the 8-10 AM window.</strong> Prolific posts most new studies then.</li>
          <li><strong>Set a 1-hour cap.</strong> Surveys are hyperfocus-bait. After an hour the ROI tanks.</li>
        </ul>
      </div>

      <div className="rhythm-section final-take">
        <div className="section-header">
          <div className="section-icon verdict"><Flame /></div>
          <h2 className="section-title">Start with this one</h2>
        </div>
        <div className="final-take-content">
          <p><strong>User Interviews</strong> if you can talk on camera. One session pays more than a week of regular surveys.</p>
          <p><strong>Prolific</strong> if you'd rather do solo studies at your desk. Steadier income, less prep.</p>
          <p>Sign up for both. They don't compete; they fill different time slots in your week.</p>
        </div>
      </div>

      <div className="cta-section">
        <p className="final-cta-headline">Ready to apply?</p>
        <Link to="/gig-detail?gig=prolific" className="cta-btn">
          Open Prolific deep dive →
        </Link>
      </div>
    </div>
  )
}
