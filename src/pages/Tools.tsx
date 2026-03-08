import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useBrainFMPlayer } from '../context/BrainFMPlayerContext'
import '../styles/pages/Tools.css'

const BASE = 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/'

const FOCUS_TOOLS = [
  { to: '/daily-schedule',   img: `${BASE}7HwiSh3EDujCj29qgiUm.png`, title: 'Daily Schedule',       desc: 'Structure tasks, boost daily flow' },
  { to: '/hourly-optimizer', img: `${BASE}wBhoYHSa5Q04KK4FKtXE.png`, title: 'Hourly Optimizer',     desc: 'Maximize focus every hour' },
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
  { to: '/sleep-calc', img: 'images/sleepicon.webp',             title: 'Sleep Calculator',  desc: 'Time your sleep cycles' },
]

const fmt = (s: number) => {
  if (isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function Tools() {
  const { isPlaying, isMuted, currentTime, duration, progress, source, pause, mute, seek, playBrainFM } =
    useBrainFMPlayer()
  const bfmPlaying = source === 'brainfm' && isPlaying
  const progressRef = useRef<HTMLDivElement>(null)
  const [logoPulsing, setLogoPulsing] = useState(false)
  const wasPlaying = useRef(false)

  useEffect(() => {
    if (bfmPlaying && !wasPlaying.current) {
      setLogoPulsing(true)
      setTimeout(() => setLogoPulsing(false), 2000)
    }
    wasPlaying.current = bfmPlaying
  }, [bfmPlaying])

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current
    if (!bar) return
    const rect = bar.getBoundingClientRect()
    seek((e.clientX - rect.left) / rect.width)
  }

  return (
    <div className="tools-page">
      <div className="main-content">

        {/* ── Start Here ── */}
        <section className="tools-section">
          <div className="tools-section-label start-here-label">Start Here</div>

          {/* Passion Finder Quiz — featured */}
          <Link to="/passion-finder" className="quiz-card">
            <span className="quiz-featured-badge">Featured Tool</span>
            <div className="quiz-icon">
              <img
                src={`${BASE}V9fFmHmj0sNrFWEZxvre.png`}
                alt="Passion Finder"
                onError={e => { (e.target as HTMLImageElement).parentElement!.innerHTML = '🧠' }}
              />
            </div>
            <h2 className="quiz-title">Passion Finder Quiz</h2>
            <p className="quiz-subtitle">Discover what actually excites you</p>
            <p className="quiz-desc">Find ADHD-friendly work that fits your brain</p>
            <span className="quiz-cta-btn">Take the Quiz →</span>
          </Link>

        </section>

        {/* ── Focus Tools ── */}
        <section className="tools-section">
          <div className="tools-section-label">Focus Tools</div>

          <div className="tools-grid">
            {/* Brain.fm — spans full width within the grid */}
            <div className="brainfm-tool-card">
              <div className="brainfm-tool-header">
                <img
                  src={`${BASE}gGKdFr4xAr4dXt6XV3rg/Logo%20(multicolored%20backround).png`}
                  alt="Brain.fm"
                  className={`brainfm-tool-logo${logoPulsing ? ' brainfm-logo-pulse' : ''}`}
                />
                <div className="brainfm-tool-info">
                  <h3>
                    <a
                      href="https://www.brain.fm/925adhd"
                      className="brainfm-title-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Brain.fm <svg className="brainfm-ext-icon" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </h3>
                  <p>ADHD focus music backed by science</p>
                </div>
                <button className="audio-volume-btn" onClick={mute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
                  {isMuted ? (
                    <svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                  )}
                </button>
              </div>

              <div className="custom-audio-player">
                <button
                  className="audio-play-btn"
                  onClick={() => bfmPlaying ? pause() : playBrainFM()}
                  aria-label={bfmPlaying ? 'Pause' : 'Play'}
                >
                  {bfmPlaying ? (
                    <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  )}
                </button>
                <div className="audio-progress-container" ref={progressRef} onClick={handleProgressClick}>
                  <div className="audio-progress-bar" style={{ width: `${progress}%` }} />
                </div>
                <span className="audio-time">{fmt(currentTime)} / {fmt(duration)}</span>
              </div>
            </div>

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
            {RESET_TOOLS.map(({ to, img, title, desc }) => (
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

        {/* ── Fun Break ── */}
        <section className="tools-section">
          <div className="tools-section-label">Fun Break</div>
          <p className="tools-section-hint">Sometimes you need a quick dopamine hit. Take a break, then get back to it!</p>
          <Link to="/gir" className="game-card">
            <div className="game-card-content">
              <h3>ADHD Space Adventure</h3>
            </div>
            <span className="game-card-arrow">›</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
