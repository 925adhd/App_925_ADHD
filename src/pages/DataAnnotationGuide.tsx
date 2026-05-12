import { Link } from 'react-router-dom'
import '../styles/pages/DataAnnotationGuide.css'
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
    name: 'Outlier',
    pay: '$15-35/hr',
    fit: 'best',
    note: 'Expert-level AI training. Higher pay if you have a specialty (coding, writing, science).',
    href: '/gig-detail?gig=outlier',
  },
  {
    name: 'DataAnnotation.tech',
    pay: '$15-40/hr',
    fit: 'best',
    note: 'Coding and writing tasks. Best-paying in the category but the onboarding test is the gatekeeper.',
    href: 'https://app.dataannotation.tech/users/sign_up',
    external: true,
  },
  {
    name: 'Appen',
    pay: '$3-14/hr',
    fit: 'ok',
    note: 'Big company, beginner-friendly tasks. Pay is low but work is more consistent.',
    href: '/gig-detail?gig=appen',
  },
  {
    name: 'Clickworker',
    pay: '$5-12/hr',
    fit: 'ok',
    note: 'Easy starter tasks: short writing, labeling. Useful while you wait on better platforms.',
    href: '/gig-detail?gig=clickworker',
  },
  {
    name: 'Lionbridge',
    pay: '$3-20/hr',
    fit: 'ok',
    note: 'Language + AI tasks. Good if you speak a second language.',
    href: '/gig-detail?gig=lionbridge',
  },
]

const idealFor = [
  'You like pattern-recognition or spot-the-difference work',
  'You have an expertise (coding, writing, science, languages)',
  'You can sit with a 30 to 60 minute focus block',
]

const whyAdhd = [
  'Variety: different task types prevent survey-style boredom',
  'Hyperfocus is rewarded; top platforms pay $15 to $40/hr',
  'Flexible: log on when your brain is on, log off when it isn\'t',
]

export default function DataAnnotationGuide() {
  return (
    <div className="data-annotation-guide">
      <div className="hero">
        <div className="hero-icon">🤖</div>
        <h1><span>Data Annotation</span></h1>
        <p className="subtitle">Train AI by labeling, rating, and correcting outputs. The best-paid entry-level remote work right now.</p>
      </div>

      {/* Filter row: persona + ADHD reasons */}
      <div className="filter-row">
        <div className="best-for-block">
          <div className="best-for-title">Best for you if…</div>
          {idealFor.map((item, i) => (
            <div key={i} className="best-for-row">{item}</div>
          ))}
        </div>

        <div className="rhythm-section section-alt">
          <div className="section-header">
            <div className="section-icon adhd">🧠</div>
            <h2 className="section-title">Why it's ADHD-friendly</h2>
          </div>
          <ul className="why-adhd-list">
            {whyAdhd.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Platform compare: the unique funnel */}
      <div className="rhythm-section">
        <div className="section-header">
          <div className="section-icon payout">💸</div>
          <h2 className="section-title">Pick your platform</h2>
        </div>
        <div className="platform-compare">
          {platforms.map(p => {
            const isInternal = !p.external
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
            return isInternal ? (
              <Link key={p.name} to={p.href} className="compare-row">{inner}</Link>
            ) : (
              <a key={p.name} href={p.href} target="_blank" rel="noreferrer" className="compare-row">{inner}</a>
            )
          })}
        </div>
      </div>

      {/* Category-specific strategy */}
      <div className="rhythm-section section-alt">
        <div className="section-header">
          <div className="section-icon tasks">🎯</div>
          <h2 className="section-title">How to win the category</h2>
        </div>
        <ul className="why-adhd-list">
          <li><strong>Sign up for 2-3 platforms</strong> so one slow week doesn't kill your income.</li>
          <li><strong>Treat the onboarding test like the real job.</strong> Most people quit here; passing it puts you ahead.</li>
          <li><strong>Never work in zombie mode.</strong> One bad batch can ban you. Skip the task instead.</li>
        </ul>
      </div>

      {/* Final Take = a pick, not a recap */}
      <div className="rhythm-section final-take">
        <div className="section-header">
          <div className="section-icon verdict">🔥</div>
          <h2 className="section-title">Start with this one</h2>
        </div>
        <div className="final-take-content">
          <p><strong>Outlier</strong> if you have any tech, science, or writing expertise. Highest pay-per-hour for people with a specialty.</p>
          <p><strong>DataAnnotation.tech</strong> if you don't have a clear specialty but you can write and reason well. Top rates, but the onboarding test is hard.</p>
          <p>Both pay weekly via PayPal. Apply to both. Whichever onboards you first is where you start.</p>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="cta-section">
        <p className="final-cta-headline">Ready to apply?</p>
        <Link to="/gig-detail?gig=outlier" className="cta-btn">
          Open Outlier deep dive →
        </Link>
      </div>
    </div>
  )
}
