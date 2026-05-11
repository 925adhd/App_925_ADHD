import { Link } from 'react-router-dom'
import { ArrowDown, BarChart2, Zap, Gamepad2, Wallet, type LucideIcon } from 'lucide-react'
import '../styles/pages/BeginnerList.css'

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
    id: 'paidviewpoint',
    href: '/gig-detail?gig=paidviewpoint',
    badge: 'Try First',
    featured: true,
    img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/X4p6CA7iYfoM0LyEDUxQ.png',
    imgAlt: 'Paid Viewpoint',
    title: 'Paid Viewpoint',
    desc: 'Short surveys, mostly multiple choice. Pays you even if you don\'t qualify.',
    cta: 'Try Paid Viewpoint',
    stats: [{ label: '$1-2/survey', className: 'stat pay' }, { label: 'Easy', className: 'stat effort-easy' }],
    trust: ['Beginner friendly'],
  },
]

const surveysCards: GigCard[] = [
  { id: 'prolific', href: '/gig-detail?gig=prolific', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/immy0sOGu8FJH0lgD7VN.png', imgAlt: 'Prolific', title: 'Prolific', desc: 'Paid college studies. Guaranteed pay and fast PayPal.', cta: 'Try Prolific', stats: [{ label: '$8-18/hr', className: 'stat pay' }, { label: 'Easy', className: 'stat effort-easy' }], trust: ['Top-rated by ADHD users'] },
  { id: 'cloudresearchconnect', href: '/gig-detail?gig=cloudresearchconnect', img: 'images/cloudresearch.webp', imgAlt: 'CloudResearch Connect', title: 'CloudResearch Connect', desc: 'Research surveys from universities and companies. Fair pay.', cta: 'Try CloudResearch', stats: [{ label: '$6-15/hr', className: 'stat pay' }, { label: 'Easy', className: 'stat effort-easy' }] },
]

const localCards: GigCard[] = [
  { id: 'fieldagent', href: '/gig-detail?gig=fieldagent', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/bJvEwgxE41M5YKf5NNUc.png', imgAlt: 'Field Agent', title: 'Field Agent', desc: 'Quick store tasks while you\'re out. Get paid fast.', cta: 'Find Tasks Near Me', stats: [{ label: '$3-15/task', className: 'stat pay' }, { label: 'Easy', className: 'stat effort-easy' }] },
  { id: 'gigspot', href: '/gig-detail?gig=gigspot', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/PkdyJvLxQhLJzuLbbnAu.jpg', imgAlt: 'Gigspot', title: 'Gigspot', desc: 'One app to find mystery shopping gigs from many companies.', cta: 'Browse Gigs', stats: [{ label: '$5-20/assignment', className: 'stat pay' }, { label: 'Easy', className: 'stat effort-easy' }] },
  { id: 'prestoshopper', href: '/gig-detail?gig=prestoshopper', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/DvyAgPosZi8eWjHhb77J.jpg', imgAlt: 'Presto Shopper', title: 'Presto Shopper', desc: 'Mystery shopping near you. Get paid the same day.', cta: 'Try Presto Shopper', stats: [{ label: '$8-25/task', className: 'stat pay' }, { label: 'Medium', className: 'stat effort-medium' }] },
]

const playCards: GigCard[] = [
  { id: 'mistplay', href: '/gig-detail?gig=mistplay', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/rCXLcdy5K4EBVE2fQPdW.jpg', imgAlt: 'Mistplay', title: 'Mistplay', desc: 'Play mobile games and earn gift cards. Works on iOS and Android.', cta: 'Start Playing', stats: [{ label: 'Easy', className: 'stat effort-easy' }] },
  { id: 'justplay', href: '/gig-detail?gig=justplay', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/HGRph2COAlLKrmVczKxH.jpg', imgAlt: 'JustPlay', title: 'JustPlay', desc: 'Instant PayPal payouts. Big first week, then drops fast.', cta: 'Start Earning', stats: [{ label: 'Easy', className: 'stat effort-easy' }] },
]

const cashbackCards: GigCard[] = [
  { id: 'modeearn', href: '/gig-detail?gig=modeearn', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/x2dOwyvRkTLnqbXD6fee.jpg', imgAlt: 'Mode Earn', title: 'Mode Earn', desc: 'Earns in the background while you charge or scroll. Android only.', cta: 'Earn While Listening', stats: [{ label: 'Passive', className: 'stat passive' }] },
  { id: 'fetch', href: '/gig-detail?gig=fetch', img: 'https://play-lh.googleusercontent.com/E0T0M0dd9w6v7X9_CFaaxlaFjyrGxSLGKxks9NWuAkcQoVckHsGnA_F50SzRSSoMlzs=w240-h480-rw', imgAlt: 'Fetch Rewards', title: 'Fetch', desc: 'Scan any receipt for points. Easiest one to start with.', cta: 'Start Saving', stats: [{ label: 'Passive', className: 'stat passive' }] },
  { id: 'ibotta', href: '/gig-detail?gig=ibotta', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/bY1HhCITQgsYsrOOgCGz.png', imgAlt: 'Ibotta', title: 'Ibotta', desc: 'Cash back on groceries you already buy.', cta: 'Get Cashback', stats: [{ label: 'Passive', className: 'stat passive' }] },
  { id: 'honeygain', href: '/gig-detail?gig=honeygain', img: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/XFzVcPA2ZQRwdAl1iyVM.png', imgAlt: 'Honeygain', title: 'Honeygain', desc: 'Earn pennies for sharing your unused internet. $20 min payout.', cta: 'Start Passively', stats: [{ label: 'Passive', className: 'stat passive' }] },
]


function CardComponent({ card }: { card: GigCard }) {
  const isInternal = card.href.startsWith('/')
  const payStat = card.stats.find(s => s.className.includes('pay'))
  const rate = payStat?.label.replace(/^[^\w$]+/, '').trim()
  const className = `card${card.featured ? ' featured' : ''}`
  const inner = (
    <>
      {card.badge && <span className="card-badge">{card.badge}</span>}
      <div className="card-content">
        <div className="card-header">
          <div className="logo-container">
            <img className="card-img" src={card.img} alt={card.imgAlt} loading="lazy" />
          </div>
          <div className="title-group">
            <h4>{card.title}</h4>
            {rate && <div className="card-rate">{rate}</div>}
            <p>{card.desc}</p>
          </div>
        </div>
      </div>
    </>
  )
  return isInternal ? (
    <Link
      className={className}
      to={card.href}
      state={{ backTo: '/beginner-list', backLabel: 'Beginner List' }}
      data-gig={card.id}
    >
      {inner}
    </Link>
  ) : (
    <a
      className={className}
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      data-gig={card.id}
    >
      {inner}
    </a>
  )
}

interface Section {
  Icon: LucideIcon
  title: string
  cards: GigCard[]
}

export default function BeginnerList() {
  const sections: Section[] = [
    { Icon: ArrowDown,  title: 'Start Here',          cards: startHereCards },
    { Icon: BarChart2,  title: 'Easy Surveys',         cards: surveysCards },
    { Icon: Zap,        title: 'Flexible Microtasks',  cards: localCards },
    { Icon: Gamepad2,   title: 'Play & Earn',          cards: playCards },
    { Icon: Wallet,     title: 'Cashback & Passive',   cards: cashbackCards },
  ]

  return (
    <div className="beginner-list">
      <div className="main-content">

      <header className="page-header">
        <h1>Your <span>Easy Start</span> List</h1>
      </header>

      {sections.map(({ Icon, title, cards }) => (
        <section key={title} className="category">
          <div className="category-header">
            <Icon size={15} className="category-icon" />
            <h2>{title}</h2>
          </div>
          <div className="cards">
            {cards.map(card => (
              <CardComponent key={card.id} card={card} />
            ))}
          </div>
        </section>
      ))}

      </div>
    </div>
  )
}
