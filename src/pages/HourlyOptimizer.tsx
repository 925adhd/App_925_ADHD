import { useState, useEffect, useRef } from 'react'
import '../styles/pages/HourlyOptimizer.css'

interface ScheduleBlock {
  time: string
  title: string
  desc: string
  earnings: string
  category: string
  platforms: { name: string; url: string }[]
  boost: string
}

const schedule: ScheduleBlock[] = [
  { time: '7:00 AM - 8:00 AM', title: '🌅 Morning Quick Wins', desc: 'Start with easy tasks for immediate dopamine. Set up passive apps, complete 2-3 quick surveys.', earnings: '$8-15', category: 'medium-value', platforms: [{ name: 'Swagbucks', url: 'https://swagbucks.com' }, { name: 'InboxDollars', url: 'https://inboxdollars.com' }], boost: 'Complete 3 micro-tasks first for instant reward feeling' },
  { time: '8:00 AM - 10:00 AM', title: '💎 Peak Focus Time', desc: 'Your best hours! Apply to high-value studies and tackle demanding tasks.', earnings: '$15-30', category: 'high-value', platforms: [{ name: 'Prolific', url: 'https://prolific.co' }, { name: 'UserTesting', url: 'https://usertesting.com' }, { name: 'Respondent', url: 'https://respondent.io' }], boost: 'Apply to 5+ studies, expect 1-2 acceptances' },
  { time: '10:00 AM - 10:30 AM', title: '🔄 Energy Reset', desc: 'Essential break! Move your body, hydrate, reset focus.', earnings: 'Recharge', category: 'break-time', platforms: [], boost: '5-minute walk or jumping jacks to reset dopamine' },
  { time: '10:30 AM - 12:30 PM', title: '💼 Freelance Block', desc: 'Use remaining morning focus for skill-based work.', earnings: '$15-30', category: 'high-value', platforms: [{ name: 'Fiverr', url: 'https://fiverr.com' }, { name: 'Upwork', url: 'https://upwork.com' }], boost: 'Start with lower rates to build reviews quickly' },
  { time: '12:30 PM - 1:30 PM', title: '🍽️ Lunch Break', desc: 'Proper nutrition for afternoon energy. Include protein!', earnings: 'Fuel Up', category: 'break-time', platforms: [], boost: 'Protein + complex carbs = steady afternoon energy' },
  { time: '1:30 PM - 3:00 PM', title: '📱 Mobile & Passive', desc: 'Post-lunch dip is perfect for easier mobile tasks.', earnings: '$8-15', category: 'medium-value', platforms: [{ name: 'Mistplay', url: 'https://mistplay.com' }, { name: 'Streetbees', url: 'https://streetbees.com' }], boost: 'Passive apps earn $1-3/day - focus on active tasks' },
  { time: '3:00 PM - 3:30 PM', title: '⚡ Power Break', desc: 'Mid-afternoon reset. Review earnings, plan remaining tasks.', earnings: 'Strategy', category: 'break-time', platforms: [], boost: 'Make a quick wins list for when motivation drops' },
  { time: '3:30 PM - 5:30 PM', title: '🛒 Research & Deals', desc: 'Afternoon energy for research-heavy tasks. Hunt for opportunities.', earnings: '$10-25', category: 'medium-value', platforms: [{ name: 'Amazon Panel', url: 'https://panel.amazon.com' }, { name: 'BrickSeek', url: 'https://brickseek.com' }], boost: "Success varies - don't expect consistent high earnings" },
  { time: '5:30 PM - 7:00 PM', title: '🎯 Local Tasks', desc: 'Evening energy for location-based tasks and mystery shopping.', earnings: '$10-25', category: 'medium-value', platforms: [{ name: 'Field Agent', url: 'https://fieldagent.net' }, { name: 'Premise', url: 'https://premise.com' }], boost: 'Task availability varies by location' },
  { time: '7:00 PM - 8:00 PM', title: '🍽️ Dinner & Recharge', desc: 'Transition time. Eat well, connect with family, prepare for evening.', earnings: 'Balance', category: 'break-time', platforms: [], boost: '15 minutes of focused family/rest time' },
  { time: '8:00 PM - 9:30 PM', title: '🔬 Evening Focus', desc: 'Second wind! Perfect for detailed surveys and research studies.', earnings: '$12-25', category: 'high-value', platforms: [{ name: 'YouGov', url: 'https://yougov.com' }, { name: 'Surveytime', url: 'https://surveytime.app' }], boost: 'Expect some disqualifications - plan for $8-15/hr realistic' },
  { time: '9:30 PM - 10:30 PM', title: '🌙 Wind-Down Tasks', desc: 'Low-effort tasks perfect for tired brains before bed.', earnings: '$8-15', category: 'low-value', platforms: [{ name: 'AttaPoll', url: 'https://attapoll.app' }, { name: 'Qmee', url: 'https://qmee.com' }], boost: 'Use blue light filters for better sleep' },
]

function parseTime(timeStr: string): number {
  const [time, period] = timeStr.trim().split(' ')
  let [hours, minutes] = time.split(':').map(Number)
  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0
  return hours * 60 + minutes
}

export default function HourlyOptimizer() {
  const [currentTime, setCurrentTime] = useState('')
  const [currentMinutes, setCurrentMinutes] = useState(0)
  const [showOffHours, setShowOffHours] = useState(false)
  const currentBlockRef = useRef<HTMLDivElement | null>(null)

  const updateTime = () => {
    const now = new Date()
    const mins = now.getHours() * 60 + now.getMinutes()
    setCurrentMinutes(mins)
    setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
    const scheduleStart = parseTime('7:00 AM')
    const scheduleEnd = parseTime('10:30 PM')
    setShowOffHours(mins < scheduleStart || mins > scheduleEnd)
  }

  useEffect(() => {
    updateTime()
    const clockInterval = setInterval(updateTime, 60000)
    return () => clearInterval(clockInterval)
  }, [])

  useEffect(() => {
    if (currentBlockRef.current) {
      setTimeout(() => {
        currentBlockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 300)
    }
  }, [currentMinutes])

  const getStatus = (block: ScheduleBlock) => {
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

  return (
    <div className="hourly-optimizer">
      <header className="page-header">
        <h1>Hourly Optimizer</h1>
        <div className="current-time">{currentTime || '--:--'}</div>
        <p>Maximize earnings based on time of day</p>
      </header>

      <div className="legend">
        <div className="legend-item"><span className="legend-dot high" /> High Value</div>
        <div className="legend-item"><span className="legend-dot medium" /> Medium</div>
        <div className="legend-item"><span className="legend-dot low" /> Easy</div>
        <div className="legend-item"><span className="legend-dot break" /> Break</div>
      </div>

      {showOffHours && (
        <div className="off-hours-card">
          <span className="emoji">🌙</span>
          <h2>Anytime Tasks Available!</h2>
          <p>Outside peak hours? Perfect for these flexible earners:</p>
          <div className="anytime-tasks">
            <div className="anytime-task">
              <h4>🎮 Mobile Gaming <span className="earnings">$2-5/day</span></h4>
              <p>Play while watching TV or relaxing</p>
              <div className="links">
                <a href="https://mistplay.com" target="_blank" rel="noreferrer">Mistplay</a>
                <a href="https://play.google.com/store/apps/details?id=com.justplay.app" target="_blank" rel="noreferrer">JustPlay</a>
              </div>
            </div>
            <div className="anytime-task">
              <h4>📱 Quick Surveys <span className="earnings">$3-8/hr</span></h4>
              <p>Short surveys perfect for odd hours</p>
              <div className="links">
                <a href="https://qmee.com" target="_blank" rel="noreferrer">Qmee</a>
                <a href="https://attapoll.app" target="_blank" rel="noreferrer">AttaPoll</a>
              </div>
            </div>
            <div className="anytime-task">
              <h4>💸 Cashback <span className="earnings">$1-10/purchase</span></h4>
              <p>Earn while doing regular shopping</p>
              <div className="links">
                <a href="https://rakuten.com" target="_blank" rel="noreferrer">Rakuten</a>
                <a href="https://ibotta.com" target="_blank" rel="noreferrer">Ibotta</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="schedule">
        {schedule.map((block, i) => {
          const status = getStatus(block)
          return (
            <div
              key={i}
              className={`time-block ${block.category} ${status}`}
              ref={status === 'current' ? currentBlockRef : null}
            >
              <div className="block-header">
                <div>
                  <span className="block-time">{block.time}</span>
                  {status === 'current' && <span className="current-badge">Now</span>}
                </div>
                <span className="block-earnings">💰 {block.earnings}</span>
              </div>
              <div className="block-title">{block.title}</div>
              <p className="block-desc">{block.desc}</p>
              {block.platforms.length > 0 && (
                <div className="platforms">
                  {block.platforms.map((p, pi) => (
                    <a key={pi} href={p.url} target="_blank" rel="noreferrer" className="platform-link">{p.name}</a>
                  ))}
                </div>
              )}
              <div className="boost-tip"><strong>💡 Tip:</strong> {block.boost}</div>
            </div>
          )
        })}
      </div>

      <button className="scroll-btn visible" onClick={scrollToCurrent} title="Jump to current">📍</button>
    </div>
  )
}
