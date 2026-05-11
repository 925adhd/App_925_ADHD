import { useState, useEffect, useRef } from 'react'
import '../styles/pages/DailyFlow.css'

type Energy = 'low' | 'medium' | 'high'

interface Platform {
  name: string
  url: string
  fave?: boolean
}

interface TimeBlock {
  time: string
  title: string
  desc: string
  earnings: string
  category: 'high' | 'medium' | 'low' | 'break'
  platforms: Platform[]
  tip: string
}

const schedule: TimeBlock[] = [
  {
    time: '7:00 AM - 8:00 AM',
    title: '🌅 Warm-Up Wins',
    desc: 'Easy way in. Set up passive apps for the day, scan yesterday\'s receipts, knock out a quick survey.',
    earnings: '$2-8',
    category: 'low',
    platforms: [
      { name: 'Honeygain', url: 'https://honeygain.com/', fave: true },
      { name: 'Fetch Rewards', url: 'https://fetchrewards.com/', fave: true },
      { name: 'Paid Viewpoint', url: 'https://paidviewpoint.com/', fave: true },
    ],
    tip: 'Honeygain runs in the background once it\'s installed. Set it once, leave it.',
  },
  {
    time: '8:00 AM - 10:00 AM',
    title: '💎 Prolific Window',
    desc: 'Prolific posts most new studies between 8-10 AM US time (European researchers launching their afternoon). This is the best 2-hour window for guaranteed-pay studies. Check often.',
    earnings: '$15-30',
    category: 'high',
    platforms: [
      { name: 'Prolific', url: 'https://www.prolific.com/participants', fave: true },
      { name: 'CloudResearch Connect', url: 'https://www.cloudresearch.com/products/connect-for-participants/', fave: true },
      { name: 'UserTesting', url: 'https://www.usertesting.com/get-paid-to-test' },
      { name: 'Respondent', url: 'https://www.respondent.io/signup' },
    ],
    tip: 'Stack the apps: Prolific in one tab, CloudResearch in another. New studies fill fast.',
  },
  {
    time: '10:00 AM - 10:30 AM',
    title: '🔄 Quick Reset',
    desc: 'Stand up. Water. 5 minutes off-screen.',
    earnings: 'Break',
    category: 'break',
    platforms: [],
    tip: 'A real break, not a doom-scroll. Window, fridge, anything that\'s not the same chair.',
  },
  {
    time: '10:30 AM - 12:30 PM',
    title: '🛒 Local Tasks',
    desc: 'Daylight + business hours = the only window in-person gigs work. Mystery shops, store audits, price checks. Stack them with errands you were doing anyway.',
    earnings: '$10-40',
    category: 'medium',
    platforms: [
      { name: 'Field Agent', url: 'https://app.fieldagent.net/', fave: true },
      { name: 'Gigspot', url: 'https://www.gigspot.com/', fave: true },
      { name: 'Presto Shopper', url: 'https://insta.prestomobilesurveys.com/site', fave: true },
    ],
    tip: 'Open all 3 apps and filter by zip. Stack one shop with a grocery run.',
  },
  {
    time: '12:30 PM - 1:30 PM',
    title: '🍽️ Lunch',
    desc: 'Eat. Don\'t work.',
    earnings: 'Break',
    category: 'break',
    platforms: [],
    tip: 'Protein + carbs. Skipping lunch = afternoon crash that kills the next 3 hours.',
  },
  {
    time: '1:30 PM - 3:00 PM',
    title: '📱 Easy & Mobile',
    desc: 'Lower-focus window. Run mobile games for rewards, let passive apps work, knock out a few microtasks.',
    earnings: '$3-10',
    category: 'low',
    platforms: [
      { name: 'Mistplay', url: 'https://www.mistplay.com/', fave: true },
      { name: 'JustPlay', url: 'https://justplay.com/', fave: true },
      { name: 'Mode Earn', url: 'https://play.google.com/store/apps/details?id=us.current.android', fave: true },
      { name: 'Amazon MTurk', url: 'https://www.mturk.com/worker' },
    ],
    tip: 'JustPlay pays big the first week then drops. Mistplay is steadier long-term.',
  },
  {
    time: '3:00 PM - 3:30 PM',
    title: '⚡ Power Break',
    desc: 'Walk if you can. Quick review of what you\'ve done and what\'s left.',
    earnings: 'Break',
    category: 'break',
    platforms: [],
    tip: 'Write down 2 things you\'ll finish before dinner. Not 5. Two.',
  },
  {
    time: '3:30 PM - 5:30 PM',
    title: '💼 Freelance & Skills',
    desc: 'Afternoon block for skill work. Reply to client messages, deliver Fiverr orders, work an Outlier or Rev shift.',
    earnings: '$20-60',
    category: 'high',
    platforms: [
      { name: 'Fiverr', url: 'https://fiverr.com/' },
      { name: 'Outlier', url: 'https://outlier.ai' },
      { name: 'Rev', url: 'https://www.rev.com/freelancers' },
      { name: 'Freelancer', url: 'https://freelancer.com/' },
    ],
    tip: 'Clients reply faster in afternoon than morning. Use this block for comms, not deep work.',
  },
  {
    time: '5:30 PM - 6:30 PM',
    title: '🍽️ Family & Dinner',
    desc: 'Off the clock. The work will be there tomorrow.',
    earnings: 'Break',
    category: 'break',
    platforms: [],
    tip: 'Put the phone in another room if you have to. The dopamine you\'re chasing is right here.',
  },
  {
    time: '6:30 PM - 8:00 PM',
    title: '🔬 Evening Catch-up',
    desc: 'Re-check Prolific. US evening sometimes catches a second wave of European-morning studies. Follow up on freelance leads, apply to anything you bookmarked.',
    earnings: '$5-20',
    category: 'medium',
    platforms: [
      { name: 'Prolific', url: 'https://www.prolific.com/participants', fave: true },
      { name: 'CloudResearch Connect', url: 'https://www.cloudresearch.com/products/connect-for-participants/', fave: true },
      { name: 'Toluna', url: 'https://www.toluna.com/home' },
    ],
    tip: 'If nothing\'s live, close the laptop. Forcing it past empty wells = next day burnout.',
  },
  {
    time: '8:00 PM - 9:30 PM',
    title: '🌙 Wind-Down',
    desc: 'Tired-brain-friendly. Quick surveys, game taps, half-watching-TV stuff. Paid Viewpoint pays you even when you don\'t qualify.',
    earnings: '$2-8',
    category: 'low',
    platforms: [
      { name: 'Paid Viewpoint', url: 'https://paidviewpoint.com/', fave: true },
      { name: 'Fetch Rewards', url: 'https://fetchrewards.com/', fave: true },
      { name: 'JustPlay', url: 'https://justplay.com/', fave: true },
    ],
    tip: 'Scan today\'s receipts into Fetch before bed. Stop by 9:30 PM. Screen-time past then hurts tomorrow\'s focus.',
  },
]

const anytime: { title: string; tasks: { name: string; desc: string; platforms: Platform[] }[] } = {
  title: 'Anytime / Off-hours',
  tasks: [
    {
      name: 'Cashback',
      desc: 'Background earnings on shopping you\'re already doing.',
      platforms: [
        { name: 'Ibotta', url: 'https://home.ibotta.com/', fave: true },
        { name: 'Fetch Rewards', url: 'https://fetchrewards.com/', fave: true },
        { name: 'Rakuten', url: 'https://www.rakuten.com/' },
      ],
    },
    {
      name: 'Mobile games',
      desc: 'Play while watching TV. Won\'t pay much but won\'t cost focus.',
      platforms: [
        { name: 'Mistplay', url: 'https://www.mistplay.com/', fave: true },
        { name: 'JustPlay', url: 'https://justplay.com/', fave: true },
        { name: 'Mode Earn', url: 'https://play.google.com/store/apps/details?id=us.current.android', fave: true },
      ],
    },
    {
      name: 'Passive',
      desc: 'Install once, earns while you do other things.',
      platforms: [
        { name: 'Honeygain', url: 'https://honeygain.com/', fave: true },
        { name: 'Mode Earn', url: 'https://play.google.com/store/apps/details?id=us.current.android', fave: true },
      ],
    },
  ],
}

function parseTime(timeStr: string): number {
  const [time, period] = timeStr.trim().split(' ')
  const [hStr, mStr] = time.split(':')
  let hours = parseInt(hStr, 10)
  const minutes = parseInt(mStr, 10)
  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0
  return hours * 60 + minutes
}

function getStreak(): number {
  try { return parseInt(localStorage.getItem('925_streak') || '0', 10) } catch { return 0 }
}

function markActiveToday(): number {
  try {
    const today = new Date().toISOString().slice(0, 10)
    const last = localStorage.getItem('925_streak_date') || ''
    if (last === today) return getStreak()
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const newStreak = last === yesterday ? getStreak() + 1 : 1
    localStorage.setItem('925_streak', String(newStreak))
    localStorage.setItem('925_streak_date', today)
    return newStreak
  } catch { return 0 }
}

export default function DailyFlow() {
  const [currentTime, setCurrentTime] = useState('')
  const [currentMinutes, setCurrentMinutes] = useState(0)
  const [showOffHours, setShowOffHours] = useState(false)
  const [energy, setEnergy] = useState<Energy | null>(null)
  const [blockState, setBlockState] = useState<Record<number, boolean>>(() => {
    try {
      const raw = localStorage.getItem('925_dailyflow_blocks')
      const stored = raw ? JSON.parse(raw) : { date: '', blocks: {} }
      const today = new Date().toISOString().slice(0, 10)
      return stored.date === today ? stored.blocks : {}
    } catch { return {} }
  })
  const [streak, setStreak] = useState(getStreak)
  const currentBlockRef = useRef<HTMLDivElement | null>(null)

  const updateTime = () => {
    const now = new Date()
    const mins = now.getHours() * 60 + now.getMinutes()
    setCurrentMinutes(mins)
    setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
    const start = parseTime('7:00 AM')
    const end = parseTime('9:30 PM')
    setShowOffHours(mins < start || mins > end)
  }

  useEffect(() => {
    updateTime()
    const id = setInterval(updateTime, 60000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (currentBlockRef.current) {
      setTimeout(() => {
        currentBlockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 300)
    }
  }, [currentMinutes])

  const getStatus = (block: TimeBlock) => {
    const [start, end] = block.time.split(' - ')
    const startMin = parseTime(start)
    const endMin = parseTime(end)
    if (currentMinutes >= startMin && currentMinutes < endMin) return 'current'
    if (currentMinutes < startMin) return 'future'
    return 'past'
  }

  const scrollToCurrent = () => {
    currentBlockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const toggleBlock = (index: number) => {
    const completing = !blockState[index]
    const next = { ...blockState, [index]: completing }
    setBlockState(next)
    const today = new Date().toISOString().slice(0, 10)
    localStorage.setItem('925_dailyflow_blocks', JSON.stringify({ date: today, blocks: next }))
    if (completing) setStreak(markActiveToday())
  }

  const completedToday = Object.values(blockState).filter(Boolean).length

  // Energy → category hint
  const energyHint: Record<Energy, { label: string; matches: TimeBlock['category'][] }> = {
    low: { label: 'low', matches: ['low', 'break'] },
    medium: { label: 'medium', matches: ['medium', 'low'] },
    high: { label: 'high', matches: ['high', 'medium'] },
  }

  return (
    <div className="daily-flow">
      <header className="page-header">
        <h1>Daily Flow</h1>
        <div className="current-time">{currentTime || '--:--'}</div>
        <p>Time + energy. Your routine, your call.</p>
      </header>

      <div className="momentum-bar">
        <span className="momentum-count">
          <strong className="momentum-num">{completedToday}</strong> block{completedToday !== 1 ? 's' : ''} touched today
        </span>
        {streak > 1 && <span className="streak-badge">{streak}-day streak</span>}
      </div>

      <div className="energy-check">
        <div className="energy-check-label">Energy right now (optional)</div>
        <div className="energy-options">
          {(['low', 'medium', 'high'] as Energy[]).map((level) => (
            <button
              key={level}
              className={`energy-option energy-${level}${energy === level ? ' active' : ''}`}
              onClick={() => setEnergy(energy === level ? null : level)}
            >
              {level[0].toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {showOffHours && (
        <div className="off-hours-card">
          <h2>Outside the flow window</h2>
          <p>The day-blocks below run 7 AM to 9:30 PM. These work anytime:</p>
          <div className="anytime-tasks">
            {anytime.tasks.map((task, i) => (
              <div key={i} className="anytime-task">
                <h4>{task.name}</h4>
                <p>{task.desc}</p>
                <div className="platforms">
                  {task.platforms.map((p, pi) => (
                    <a key={pi} href={p.url} target="_blank" rel="noreferrer" className={`platform-link${p.fave ? ' fave' : ''}`}>
                      {p.fave && <span className="fave-mark">★</span>}{p.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="legend">
        <div className="legend-item"><span className="legend-dot high" /> Higher pay / focus</div>
        <div className="legend-item"><span className="legend-dot medium" /> Medium</div>
        <div className="legend-item"><span className="legend-dot low" /> Easy</div>
        <div className="legend-item"><span className="legend-dot break" /> Break</div>
        <div className="legend-item"><span className="fave-mark legend-fave">★</span> Staff pick</div>
      </div>

      <div className="schedule">
        {schedule.map((block, i) => {
          const status = getStatus(block)
          const touched = blockState[i] || false
          const energyMatch = energy ? energyHint[energy].matches.includes(block.category) : true
          return (
            <div
              key={i}
              className={`time-block cat-${block.category} ${status}${touched ? ' touched' : ''}${energy && !energyMatch ? ' energy-mismatch' : ''}`}
              ref={status === 'current' ? currentBlockRef : null}
            >
              <div className="block-header">
                <div className="block-header-left">
                  <span className="block-time">{block.time}</span>
                  {status === 'current' && <span className="current-badge">Now</span>}
                </div>
                <span className="block-earnings">{block.earnings}</span>
              </div>
              <div className="block-title">{block.title}</div>
              <p className="block-desc">{block.desc}</p>
              {block.platforms.length > 0 && (
                <div className="platforms">
                  {block.platforms.map((p, pi) => (
                    <a key={pi} href={p.url} target="_blank" rel="noreferrer" className={`platform-link${p.fave ? ' fave' : ''}`}>
                      {p.fave && <span className="fave-mark">★</span>}{p.name}
                    </a>
                  ))}
                </div>
              )}
              <div className="block-tip">{block.tip}</div>
              {block.category !== 'break' && (
                <button
                  className={`block-mark-btn${touched ? ' touched' : ''}`}
                  onClick={() => toggleBlock(i)}
                >
                  {touched ? '✓ Worked on this' : 'Mark as worked on'}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="rules-section">
        <h3 className="snap-label">The Rules</h3>
        <ul className="rules-list">
          <li><strong>Skip a block, no guilt.</strong> Streaks are a tally, not a job.</li>
          <li><strong>Match the task to your energy.</strong> Don't burn a focused hour on $0.50 surveys.</li>
          <li><strong>Low energy still earns.</strong> Passive apps and quick surveys don't need focus.</li>
          <li><strong>Rotate platforms.</strong> One algorithm hiccup shouldn't tank your week.</li>
        </ul>
      </div>

      <button className="scroll-btn" onClick={scrollToCurrent} title="Jump to current">↓ Now</button>
    </div>
  )
}
