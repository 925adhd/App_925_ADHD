import { useState, useEffect } from 'react'
import '../styles/pages/DailyFlow.css'

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
      { name: 'Honeygain', url: 'https://join.honeygain.com/KGIBS7A0B7', fave: true },
      { name: 'Fetch Rewards', url: 'https://referral.fetch.com/vvv3/referralqr?code=4CVA47', fave: true },
      { name: 'Paid Viewpoint', url: 'https://paidviewpoint.com/landing/?r=925adhd', fave: true },
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
      { name: 'Field Agent', url: 'https://usapp.fieldagent.net/applinks/invite/?code=j65bwhd', fave: true },
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
      { name: 'Mistplay', url: 'https://mistplay.onelink.me/ZGRQ/8wftysuq', fave: true },
      { name: 'JustPlay', url: 'https://justplay.com/', fave: true },
      { name: 'Mode Earn', url: 'https://crrnt.me/YhtvwsOw64b', fave: true },
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
      { name: 'Paid Viewpoint', url: 'https://paidviewpoint.com/landing/?r=925adhd', fave: true },
      { name: 'Fetch Rewards', url: 'https://referral.fetch.com/vvv3/referralqr?code=4CVA47', fave: true },
      { name: 'JustPlay', url: 'https://justplay.com/', fave: true },
    ],
    tip: 'Scan today\'s receipts into Fetch before bed. Stop by 9:30 PM. Screen-time past then hurts tomorrow\'s focus.',
  },
]

const anytime = {
  title: 'Anytime / Off-hours',
  tasks: [
    {
      name: 'Cashback',
      desc: 'Background earnings on shopping you\'re already doing.',
      platforms: [
        { name: 'Ibotta', url: 'https://home.ibotta.com/', fave: true },
        { name: 'Fetch Rewards', url: 'https://referral.fetch.com/vvv3/referralqr?code=4CVA47', fave: true },
        { name: 'Rakuten', url: 'https://www.rakuten.com/' },
      ],
    },
    {
      name: 'Mobile games',
      desc: 'Play while watching TV. Won\'t pay much but won\'t cost focus.',
      platforms: [
        { name: 'Mistplay', url: 'https://mistplay.onelink.me/ZGRQ/8wftysuq', fave: true },
        { name: 'JustPlay', url: 'https://justplay.com/', fave: true },
      ],
    },
    {
      name: 'Passive',
      desc: 'Install once, earns while you do other things.',
      platforms: [
        { name: 'Honeygain', url: 'https://join.honeygain.com/KGIBS7A0B7', fave: true },
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

function getCurrentBlockIndex(minutes: number): number {
  return schedule.findIndex(block => {
    const [start, end] = block.time.split(' - ')
    return minutes >= parseTime(start) && minutes < parseTime(end)
  })
}

function PlatformLinks({ platforms }: { platforms: Platform[] }) {
  if (!platforms.length) return null
  return (
    <div className="platforms">
      {platforms.map((p, i) => (
        <a key={i} href={p.url} target="_blank" rel="noreferrer" className={`platform-link${p.fave ? ' fave' : ''}`}>
          {p.fave && <span className="fave-mark">★</span>}{p.name}
        </a>
      ))}
    </div>
  )
}

function BlockCard({ block, badge }: { block: TimeBlock; badge?: string }) {
  return (
    <div className={`flow-block cat-${block.category}`}>
      <div className="flow-block-header">
        <span className="flow-block-time">{block.time}</span>
        {badge && <span className="flow-block-badge">{badge}</span>}
        <span className="flow-block-earnings">{block.earnings}</span>
      </div>
      <div className="flow-block-title">{block.title}</div>
      <p className="flow-block-desc">{block.desc}</p>
      <PlatformLinks platforms={block.platforms} />
      <div className="flow-block-tip">{block.tip}</div>
    </div>
  )
}

export default function DailyFlow() {
  const [currentTime, setCurrentTime] = useState('')
  const [currentMinutes, setCurrentMinutes] = useState(0)
  const [showFullDay, setShowFullDay] = useState(false)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setCurrentMinutes(now.getHours() * 60 + now.getMinutes())
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
    }
    update()
    const id = setInterval(update, 60000)
    return () => clearInterval(id)
  }, [])

  const flowStart = parseTime('7:00 AM')
  const flowEnd = parseTime('9:30 PM')
  const outsideFlowWindow = currentMinutes < flowStart || currentMinutes > flowEnd

  const currentBlockIdx = getCurrentBlockIndex(currentMinutes)
  const currentBlock = currentBlockIdx >= 0 ? schedule[currentBlockIdx] : null

  return (
    <div className="daily-flow">
      <header className="page-header">
        <h1>Daily Flow</h1>
        <div className="current-time">{currentTime || '--:--'}</div>
        <p>The plan for right now, based on the time of day.</p>
      </header>

      {outsideFlowWindow ? (
        <div className="off-hours-card">
          <h2>Outside the flow window</h2>
          <p>The day-blocks run 7 AM to 9:30 PM. These work anytime:</p>
          <div className="anytime-tasks">
            {anytime.tasks.map((task, i) => (
              <div key={i} className="anytime-task">
                <h4>{task.name}</h4>
                <p>{task.desc}</p>
                <PlatformLinks platforms={task.platforms} />
              </div>
            ))}
          </div>
        </div>
      ) : currentBlock && (
        <div className="right-now-section">
          <div className="right-now-label">Right now</div>
          <BlockCard block={currentBlock} badge="Now" />
        </div>
      )}

      <button
        className="full-day-toggle"
        onClick={() => setShowFullDay(v => !v)}
        aria-expanded={showFullDay}
      >
        {showFullDay ? '↑ Hide full day' : '↓ See the full day'}
      </button>

      {showFullDay && (
        <div className="full-day-schedule">
          {schedule.map((block, i) => (
            <BlockCard
              key={i}
              block={block}
              badge={i === currentBlockIdx ? 'Now' : undefined}
            />
          ))}
        </div>
      )}

      <div className="rules-section">
        <h3 className="snap-label">The Rules</h3>
        <ul className="rules-list">
          <li><strong>Skip what doesn't fit.</strong> No streak, no guilt.</li>
          <li><strong>Match the task to your energy.</strong> Don't burn focus on $0.50 surveys.</li>
          <li><strong>Low energy still earns.</strong> Passive apps and quick surveys don't need focus.</li>
          <li><strong>Rotate platforms.</strong> One algorithm hiccup shouldn't tank your week.</li>
        </ul>
      </div>
    </div>
  )
}
