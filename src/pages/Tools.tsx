import { Link } from 'react-router-dom'
import '../styles/pages/Tools.css'

const BASE = 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/'

const FOCUS_TOOLS = [
  { to: '/daily-flow',       img: `${BASE}wBhoYHSa5Q04KK4FKtXE.png`, title: 'Daily Flow',           desc: 'Time + energy. Your routine, your call.' },
]

const MONEY_TOOLS = [
  { to: '/gig-tracker',     img: `${BASE}BdMduJSDImXq22qq3v3m.png`, title: 'Earnings Tracker',     desc: 'Monitor income & progress' },
  { to: '/freelance-calc',  img: `${BASE}doTXb9E6rkYYbYQZbgkq.png`, title: 'Freelance Calculator', desc: 'Estimate rates & plan goals' },
  { to: '/receipt-stacker', img: `${BASE}uakfmOX6h8gm1CT9YMpc.png`, title: 'Receipt Stacking',     desc: 'Multiply cashback rewards' },
  { to: '/essentials',      img: `${BASE}5Xaz4x2wv7VWpHIGXX9Q.png`, title: 'Gig Essentials',       desc: 'Core tools for freelancing' },
]

const RESET_TOOLS = [
  { to: '/breathwork', img: `${BASE}LEknNOXuweNmn1ki5uUj.png`, title: 'Breathwork Studio', desc: 'Guided breathing exercises' },
  { to: '/mindshift',  img: `${BASE}qww1P1UZ8Fd2VXf9iCmm.png`, title: 'Mindshift',         desc: 'Reframe negative thoughts' },
  { to: '/sleep-calc', img: 'images/sleepicon.png',             title: 'Sleep Calculator',  desc: 'Time your sleep cycles', iconClass: 'sleep-icon-lg' },
]

export default function Tools() {
  return (
    <div className="tools-page">
      <div className="main-content">

        {/* ── Focus Tools ── */}
        <section className="tools-section">
          <div className="tools-section-label">Focus Tools</div>

          <div className="tools-grid">
            {FOCUS_TOOLS.map(({ to, img, title, desc }) => (
              <Link key={to} to={to} className="tool-card">
                <div className="tool-icon">
                  <img src={img} alt={title} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Money Tools ── */}
        <section className="tools-section">
          <div className="tools-section-label">Money Tools</div>
          <div className="tools-grid">
            {MONEY_TOOLS.map(({ to, img, title, desc }) => (
              <Link key={to} to={to} className="tool-card">
                <div className="tool-icon">
                  <img src={img} alt={title} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Reset Tools ── */}
        <section className="tools-section">
          <div className="tools-section-label">Reset Tools</div>
          <p className="tools-section-hint">Take care of yourself first. Reset, reframe, and refocus when your brain needs a break.</p>
          <div className="tools-grid">
            {RESET_TOOLS.map(({ to, img, title, desc, iconClass }) => (
              <Link key={to} to={to} className="tool-card">
                <div className={`tool-icon${iconClass ? ` ${iconClass}` : ''}`}>
                  <img src={img} alt={title} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
