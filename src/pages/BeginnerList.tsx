import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, BarChart2, Zap, Gamepad2, Wallet, type LucideIcon } from 'lucide-react'
import '../styles/pages/BeginnerList.css'

const STORAGE_KEY = '925adhd_tried_gigs'

interface GigCard {
  id: string
  href: string
  badge?: string
  featured?: boolean
  img: string
  imgAlt: string
  title: string
  desc: string
  cta?: string
  stats: { label: string; className: string }[]
  trust?: string[]
}

const startHereCards: GigCard[] = [
  {
    id: 'prolific',
    href: 'gig-detail.html?gig=prolific',
    badge: 'Try First',
    featured: true,
    img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/immy0sOGu8FJH0lgD7VN.png',
    imgAlt: 'Prolific',
    title: 'Prolific',
    desc: 'High-paying academic studies — quick onboarding',
    cta: 'Start with Prolific →',
    stats: [{ label: '💰 $8-15/hr', className: 'stat pay' }, { label: '🟢 Easy', className: 'stat effort-easy' }],
    trust: ['🔥 Most popular starter', '✔ Beginner friendly'],
  },
  {
    id: 'paidviewpoint',
    href: 'https://paidviewpoint.com/landing/?r=925adhd',
    badge: 'Try First',
    featured: true,
    img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/X4p6CA7iYfoM0LyEDUxQ.png',
    imgAlt: 'Paid Viewpoint',
    title: 'Paid Viewpoint',
    desc: 'Short surveys, mostly multiple choice',
    cta: 'Try Paid Viewpoint →',
    stats: [{ label: '💰 $1-2/survey', className: 'stat pay' }, { label: '🟢 Easy', className: 'stat effort-easy' }],
    trust: ['✔ Beginner friendly'],
  },
]

const surveysCards: GigCard[] = [
  { id: 'clickworker', href: 'gig-detail.html?gig=clickworker', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/C1vyAjM6bkaR4bcNeCeA.png', imgAlt: 'Clickworker', title: 'Clickworker', desc: 'Microtasks for flexible earnings', cta: 'Start Microtasks →', stats: [{ label: '💰 $5-12/hr', className: 'stat pay' }, { label: '🟢 Easy', className: 'stat effort-easy' }], trust: ['⭐ Trusted platform'] },
  { id: 'surveyjunkie', href: 'gig-detail.html?gig=surveyjunkie', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/4sv9XSwPHs8dV9zETDsd.jpg', imgAlt: 'Survey Junkie', title: 'Survey Junkie', desc: 'Easy surveys you can do on mobile', cta: 'Try Survey Junkie →', stats: [{ label: '💰 $1-3/survey', className: 'stat pay' }, { label: '🟢 Easy', className: 'stat effort-easy' }] },
]

const localCards: GigCard[] = [
  { id: 'fieldagent', href: 'app-detail.html?app=fieldagent', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/bJvEwgxE41M5YKf5NNUc.png', imgAlt: 'Field Agent', title: 'Field Agent', desc: 'Quick store tasks nearby. Get paid fast.', cta: 'Find Tasks Near Me →', stats: [{ label: '💰 $3-15/task', className: 'stat pay' }, { label: '🟢 Easy', className: 'stat effort-easy' }] },
  { id: 'marketforce', href: 'gig-detail.html?gig=marketforce', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/SxHLTnmhZ2kYE3ShRn4Y.png', imgAlt: 'Market Force', title: 'Market Force', desc: 'Real-world shopper tasks—easy on mobile', cta: 'Start Shopping Tasks →', stats: [{ label: '💰 $5-20/task', className: 'stat pay' }, { label: '🟢 Easy', className: 'stat effort-easy' }] },
  { id: 'prestoshopper', href: 'gig-detail.html?gig=prestoshopper', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/DvyAgPosZi8eWjHhb77J.jpg', imgAlt: 'Presto Shopper', title: 'Presto Shopper', desc: 'Customer service assessments & restaurant reviews', cta: 'Try Restaurant Reviews →', stats: [{ label: '💰 $8-25/task', className: 'stat pay' }, { label: '🟡 Medium', className: 'stat effort-medium' }] },
]

const playCards: GigCard[] = [
  { id: 'mistplay', href: 'app-detail.html?app=mistplay', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/rCXLcdy5K4EBVE2fQPdW.jpg', imgAlt: 'MistPlay', title: 'MistPlay', desc: 'Play mobile games, earn gift cards (Android)', cta: 'Start Playing →', stats: [{ label: '🟢 Easy', className: 'stat effort-easy' }] },
  { id: 'justplay', href: 'app-detail.html?app=justplay', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/HGRph2COAlLKrmVczKxH.jpg', imgAlt: 'JustPlay', title: 'JustPlay', desc: 'Cash out every 3 hours', cta: 'Start Earning →', stats: [{ label: '🟢 Easy', className: 'stat effort-easy' }] },
  { id: 'benjamin', href: 'app-detail.html?app=benjamin', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/0hWbGOHwB4EZpe2zuThK.jpg', imgAlt: 'Benjamin', title: 'Benjamin', desc: 'Earn rewards for games, shopping, surveys', cta: 'Explore Benjamin →', stats: [{ label: '🟢 Easy', className: 'stat effort-easy' }] },
]

const cashbackCards: GigCard[] = [
  { id: 'modeearn', href: 'app-detail.html?app=modeearn', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/x2dOwyvRkTLnqbXD6fee.jpg', imgAlt: 'Mode Earn', title: 'Mode Earn', desc: 'Listen to music, play games, charge your phone', cta: 'Earn While Listening →', stats: [{ label: '🟣 Passive', className: 'stat passive' }] },
  { id: 'fetch', href: 'app-detail.html?app=fetch', img: 'https://play-lh.googleusercontent.com/E0T0M0dd9w6v7X9_CFaaxlaFjyrGxSLGKxks9NWuAkcQoVckHsGnA_F50SzRSSoMlzs=w240-h480-rw', imgAlt: 'Fetch Rewards', title: 'Fetch', desc: 'Rewards on any receipt', cta: 'Start Saving →', stats: [{ label: '🟣 Passive', className: 'stat passive' }] },
  { id: 'ibotta', href: 'app-detail.html?app=ibotta', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/bY1HhCITQgsYsrOOgCGz.png', imgAlt: 'Ibotta', title: 'iBotta', desc: 'Cashback on purchases, very popular', cta: 'Get Cashback →', stats: [{ label: '🟣 Passive', className: 'stat passive' }] },
  { id: 'honeygain', href: 'app-detail.html?app=honeygain', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/XFzVcPA2ZQRwdAl1iyVM.png', imgAlt: 'Honeygain', title: 'Honeygain', desc: 'Share unused bandwidth. $20 min payout.', cta: 'Start Passively →', stats: [{ label: '🟣 Passive', className: 'stat passive' }] },
]

const TOTAL = 15

function CardComponent({ card, tried, onCardClick }: { card: GigCard; tried: string[]; onCardClick: (id: string) => void }) {
  const isDone = tried.includes(card.id)
  return (
    <a
      className={`card${card.featured ? ' featured' : ''}${isDone ? ' done' : ''}`}
      href={card.href}
      data-gig={card.id}
      onClick={() => onCardClick(card.id)}
    >
      {card.badge && <span className="card-badge">{card.badge}</span>}
      <div className="card-content">
        <div className="card-header">
          <div className="logo-container">
            <img className="card-img" src={card.img} alt={card.imgAlt} loading="lazy" />
          </div>
          <div className="title-group">
            <h4>{card.title}</h4>
            <p>{card.desc}</p>
          </div>
        </div>
        {card.trust && card.trust.length > 0 && (
          <div className="card-trust">
            {card.trust.map((t, i) => <span key={i} className="card-trust-badge">{t}</span>)}
          </div>
        )}
        <div className="card-stats">
          {card.stats.map((s, i) => (
            <span key={i} className={s.className}>{s.label}</span>
          ))}
        </div>
        <span className="card-visit-btn">{card.cta ?? 'Visit Site →'}</span>
      </div>
    </a>
  )
}

interface Section {
  step: number
  Icon: LucideIcon
  title: string
  count: string
  cards: GigCard[]
}

export default function BeginnerList() {
  const [tried, setTried] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
  })
  const [toast, setToast] = useState<string | null>(null)

  const handleCardClick = (id: string) => {
    if (!tried.includes(id)) {
      const next = [...tried, id]
      setTried(next)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setToast(`🎉 Nice! ${next.length} / ${TOTAL} opportunities explored.`)
      setTimeout(() => setToast(null), 3000)
    }
  }

  const count = tried.length
  const percent = (count / TOTAL) * 100

  const sections: Section[] = [
    { step: 1, Icon: ArrowDown,  title: 'Start Here',          count: '2 apps', cards: startHereCards },
    { step: 2, Icon: BarChart2,  title: 'Easy Surveys',         count: '2 apps', cards: surveysCards },
    { step: 3, Icon: Zap,        title: 'Flexible Microtasks',  count: '3 apps', cards: localCards },
    { step: 4, Icon: Gamepad2,   title: 'Play & Earn',          count: '3 apps', cards: playCards },
    { step: 5, Icon: Wallet,     title: 'Cashback & Passive',   count: '4 apps', cards: cashbackCards },
  ]

  return (
    <div className="beginner-list">
      <div className="main-content">

      {toast && <div className="beginner-toast">{toast}</div>}

      <header className="page-header">
        <h1>Your <span>Easy Start</span> List</h1>
      </header>

      <section className="intro">
        <span className="key-icon">🔑</span>
        <span>Start with the easiest wins. Try a few opportunities, follow the dopamine, and see what sticks. <strong>No pressure.</strong></span>
      </section>

      <div className="progress-tracker">
        <span className="icon">🎯</span>
        <div className="progress-info">
          <div className="label">Your progress — <strong>{count} / {TOTAL}</strong> opportunities explored</div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
          </div>
          <div className="progress-helper">Try a few opportunities to unlock better-paying options.</div>
        </div>
      </div>

      {sections.map(({ step, Icon, title, count: sectionCount, cards }) => (
        <section key={title} className="category">
          <div className="category-header">
            <span className="step-badge">STEP {step}</span>
            <Icon size={15} className="category-icon" />
            <h2>{title}</h2>
            <span className="count">{sectionCount}</span>
          </div>
          <div className="cards">
            {cards.map(card => (
              <CardComponent key={card.id} card={card} tried={tried} onCardClick={handleCardClick} />
            ))}
          </div>
        </section>
      ))}

      <section className="cta-section">
        <p>Found something that clicks? Explore more options 👇</p>
        <Link to="/earn" state={{ scrollTo: 'resultsText' }} className="cta-btn">Browse All Opportunities →</Link>
      </section>
      </div>
    </div>
  )
}
