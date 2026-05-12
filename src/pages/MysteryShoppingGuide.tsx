import { Link } from 'react-router-dom'
import { Brain, Wallet, Target, Flame } from 'lucide-react'
import '../styles/pages/MysteryShoppingGuide.css'
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
    name: 'iSecretShop (Presto)',
    pay: '$8-50/shop',
    fit: 'best',
    note: 'Best mobile app experience. Wide variety. Fast payments. Easy to start.',
    href: '/gig-detail?gig=prestoshopper',
  },
  {
    name: 'Market Force',
    pay: '$10-40/shop',
    fit: 'best',
    note: 'Large established company. Restaurants, retail, banking, movies. Reliable assignments.',
    href: '/gig-detail?gig=marketforce',
  },
  {
    name: 'BestMark',
    pay: '$15-100/shop',
    fit: 'good',
    note: 'One of the oldest in the business. Higher-pay assignments but slower onboarding.',
    href: '/gig-detail?gig=bestmark',
  },
  {
    name: 'Gigspot',
    pay: '$8-30/shop',
    fit: 'good',
    note: 'Aggregator that pulls jobs from multiple mystery-shop companies. Good for finding nearby work.',
    href: '/gig-detail?gig=gigspot',
  },
]

const idealFor = [
  'You have reliable transportation',
  'You notice details others miss',
  'You can write a 200-word report the same day',
]

const whyAdhd = [
  'Every shop is different; novelty keeps it from getting stale',
  'Real-world tasks tied to a place and a time',
  'Detail-radar is rewarded, not punished',
]

export default function MysteryShoppingGuide() {
  return (
    <div className="mystery-shopping-guide">
      <div className="hero">
        <div className="hero-icon">🕵️</div>
        <h1><span>Mystery Shopping</span></h1>
        <p className="subtitle">Get paid to evaluate real businesses on real visits. Restaurants, retail, banks, car dealers. $8 to $100 per shop, $200 to $800/month part-time.</p>
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
          <li><strong>Sign up for 3-4 platforms.</strong> Aggregators don't always show every shop near you.</li>
          <li><strong>Stack shops with errands.</strong> Grocery run + retail audit = one trip, two payouts.</li>
          <li><strong>Voice-record observations in the car.</strong> Report writing is faster from notes than memory.</li>
          <li><strong>Submit the report same day.</strong> Memory fades; late reports get rejected.</li>
          <li><strong>Never pay to become a mystery shopper.</strong> Legitimate companies are always free.</li>
        </ul>
      </div>

      <div className="rhythm-section final-take">
        <div className="section-header">
          <div className="section-icon verdict"><Flame /></div>
          <h2 className="section-title">Start with this one</h2>
        </div>
        <div className="final-take-content">
          <p><strong>iSecretShop (Presto)</strong> has the cleanest mobile app and the fastest payouts. Easiest first shop.</p>
          <p>Add Market Force as your backup. Different companies have different stores in your area; you'll pick up shops one wouldn't have shown you.</p>
          <p>Real income is $200 to $800/month. Reimbursements take 30 to 45 days; don't shop with money you need next week.</p>
        </div>
      </div>

      <div className="cta-section">
        <p className="final-cta-headline">Ready to start?</p>
        <Link to="/gig-detail?gig=prestoshopper" className="cta-btn">
          Open Presto Shopper deep dive →
        </Link>
      </div>
    </div>
  )
}
