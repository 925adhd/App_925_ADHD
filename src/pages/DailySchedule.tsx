import { useState } from 'react'
import '../styles/pages/DailySchedule.css'

type Mode = 'freeflow' | 'structured'
type Energy = 'high' | 'medium' | 'low'
type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

interface FreeflowTask {
  text: string
  earnings: string
  energy: 'high' | 'low'
  duration: string
}

interface DayTask {
  text: string
  earnings: string
  duration: string
}

interface DayPlan {
  title: string
  subtitle: string
  target: string
  tip: string
  tasks: DayTask[]
}

const freeflowTasks: FreeflowTask[] = [
  { text: 'Apply to 3+ <a href="https://respondent.io" target="_blank">Respondent</a> studies', earnings: '$50-200 each', energy: 'high', duration: '15 min' },
  { text: 'Complete a <a href="https://dscout.com/participate-in-research-studies" target="_blank">dscout</a> mission', earnings: '$25-100', energy: 'high', duration: '30 min' },
  { text: 'Work on <a href="https://outlier.ai" target="_blank">Outlier AI</a> tasks', earnings: '$15-50/hr', energy: 'high', duration: '60 min' },
  { text: '1 hour of <a href="https://www.rev.com/freelancers/transcription" target="_blank">Rev</a> transcription', earnings: '$8-15', energy: 'low', duration: '60 min' },
  { text: 'Check <a href="https://www.usertesting.com/get-paid-to-test" target="_blank">UserTesting</a> for tests', earnings: '$10/test', energy: 'low', duration: '5 min' },
  { text: 'Do <a href="https://www.prolific.com/participants" target="_blank">Prolific</a> studies', earnings: '$8-15/hr', energy: 'low', duration: '20 min' },
  { text: 'Set up passive income apps', earnings: '$1-5/day', energy: 'low', duration: '10 min' },
  { text: 'Do a mystery shopping task', earnings: '$10-50', energy: 'low', duration: '45 min' },
]

const weeklyPlan: Record<DayKey, DayPlan> = {
  monday: {
    title: 'MONDAY', subtitle: 'High-Value Focus Day', target: '$80-120',
    tip: 'Start strong with high-paying applications. Monday energy is perfect for concentration-heavy tasks!',
    tasks: [
      { text: 'Apply to 5+ studies on <a href="https://respondent.io" target="_blank">Respondent</a>', earnings: '$50-200 each', duration: '20 min' },
      { text: 'Complete 1-2 hours of <a href="https://www.rev.com/freelancers/transcription" target="_blank">Rev rush jobs</a>', earnings: '$25-40', duration: '90 min' },
      { text: 'Check <a href="https://www.usertesting.com/get-paid-to-test" target="_blank">UserTesting</a> for premium tests', earnings: '$30-60', duration: '10 min' },
      { text: 'Apply to <a href="https://userinterviews.com" target="_blank">User Interviews</a> studies', earnings: '$40-150', duration: '15 min' },
    ],
  },
  tuesday: {
    title: 'TUESDAY', subtitle: 'Research & Live Studies', target: '$70-100',
    tip: 'Combine screen work with getting out. Perfect for mystery shopping between research studies!',
    tasks: [
      { text: 'Complete a <a href="https://dscout.com/participate-in-research-studies" target="_blank">dscout mission</a>', earnings: '$25-100', duration: '30 min' },
      { text: 'Check <a href="https://www.prolific.com/participants" target="_blank">Prolific</a> every 2 hours', earnings: '$12-25/hr', duration: '20 min' },
      { text: 'Do mystery shopping with BestMark', earnings: '$10-50', duration: '60 min' },
      { text: 'Work on <a href="https://outlier.ai" target="_blank">Outlier AI</a> tasks', earnings: '$15-50/hr', duration: '60 min' },
    ],
  },
  wednesday: {
    title: 'WEDNESDAY', subtitle: 'Transcription & AI Focus', target: '$60-90',
    tip: 'Use remaining focus for steady transcription work. These platforms offer consistent income!',
    tasks: [
      { text: '2-3 hours on <a href="https://www.rev.com/freelancers/transcription" target="_blank">Rev transcription</a>', earnings: '$15-30/hr', duration: '120 min' },
      { text: 'Complete <a href="https://outlier.ai" target="_blank">Outlier AI</a> tasks', earnings: '$15-50/hr', duration: '60 min' },
      { text: 'Set up passive income apps', earnings: '$1-5/day', duration: '10 min' },
      { text: 'Work on <a href="https://www.clickworker.com/clickworker" target="_blank">Clickworker</a> HITs', earnings: '$8-15/hr', duration: '45 min' },
    ],
  },
  thursday: {
    title: 'THURSDAY', subtitle: 'Mixed High-Value Day', target: '$60-90',
    tip: 'Mix testing with applications for next week. Passive income should be generating $1-5 daily!',
    tasks: [
      { text: 'Priority check on <a href="https://www.usertesting.com/get-paid-to-test" target="_blank">UserTesting</a>', earnings: '$10-60/test', duration: '10 min' },
      { text: 'Complete qualification tasks', earnings: '$10-18/hr', duration: '45 min' },
      { text: 'Apply to weekend research studies', earnings: 'Future $$', duration: '20 min' },
      { text: 'Check passive income earnings', earnings: '$1-5', duration: '5 min' },
    ],
  },
  friday: {
    title: 'FRIDAY', subtitle: 'Strong Finish Day', target: '$70-100',
    tip: 'Use end-of-week motivation for one final push. Review your weekly total and celebrate!',
    tasks: [
      { text: 'Focus session on highest-paying platform', earnings: '$20-50', duration: '60 min' },
      { text: 'Complete pending high-value applications', earnings: 'Future $$', duration: '20 min' },
      { text: 'Final transcription push', earnings: '$10-25/hr', duration: '60 min' },
      { text: "Plan next week's opportunities", earnings: 'Strategy', duration: '15 min' },
    ],
  },
  saturday: {
    title: 'SATURDAY', subtitle: 'Flexible Weekend Day', target: '$30-60',
    tip: 'Keep it light but profitable. Combine gigs with regular weekend activities!',
    tasks: [
      { text: 'Weekend mystery shopping while running errands', earnings: '$15-40', duration: '60 min' },
      { text: 'Check for weekend bonus tasks', earnings: '$3-12 each', duration: '10 min' },
      { text: 'Quick surveys during downtime', earnings: '$8-15/hr', duration: '20 min' },
      { text: 'Check passive income apps are running', earnings: '$1-3', duration: '5 min' },
    ],
  },
  sunday: {
    title: 'SUNDAY', subtitle: 'Planning & Light Work', target: '$20-40',
    tip: 'The secret to a $200-400+ week is preparation! Sunday applications become Monday opportunities.',
    tasks: [
      { text: 'Apply to 10+ studies for next week', earnings: 'Future $$', duration: '30 min' },
      { text: 'Update all platform profiles', earnings: 'Better matches', duration: '20 min' },
      { text: 'Light surveys or quick gigs', earnings: '$5-15', duration: '30 min' },
      { text: 'Calculate weekly earnings & plan ahead', earnings: 'Strategy', duration: '15 min' },
    ],
  },
}

const days: DayKey[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

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

export default function DailySchedule() {
  const [mode, setMode] = useState<Mode>('freeflow')
  const [energy, setEnergy] = useState<Energy | null>(null)
  const [rulesOpen, setRulesOpen] = useState(false)
  const [platformsOpen, setPlatformsOpen] = useState(false)
  const [freeflowState, setFreeflowState] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem('925_freeflow') || '{}') } catch { return {} }
  })
  const [structuredState, setStructuredState] = useState<Record<string, Record<number, boolean>>>(() => {
    try { return JSON.parse(localStorage.getItem('925_structured') || '{}') } catch { return {} }
  })
  const [currentDay] = useState<DayKey>(() => {
    const d = new Date().getDay()
    return (['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as DayKey[])[d]
  })
  const [selectedDay, setSelectedDay] = useState<DayKey>(currentDay)
  const [streak, setStreak] = useState(getStreak)
  const [justCompleted, setJustCompleted] = useState<string | null>(null)

  const filteredTasks =
    energy === 'high' ? freeflowTasks.filter(t => t.energy === 'high') :
    energy === 'low'  ? freeflowTasks.filter(t => t.energy === 'low') :
    freeflowTasks

  const freeflowCompleted = Object.values(freeflowState).filter(Boolean).length
  const freeflowPercent = (freeflowCompleted / freeflowTasks.length) * 100
  const todayStructuredCompleted = Object.values(structuredState[currentDay] || {}).filter(Boolean).length
  const totalToday = freeflowCompleted + todayStructuredCompleted

  const nextBestTask: { text: string; earnings: string; duration: string; freeflowIdx?: number; structuredIdx?: number } | null = (() => {
    if (!energy) return null
    if (mode === 'freeflow') {
      const task = filteredTasks.find(t => !freeflowState[`freeflow_${freeflowTasks.indexOf(t)}`])
      if (!task) return null
      return { text: task.text, earnings: task.earnings, duration: task.duration, freeflowIdx: freeflowTasks.indexOf(task) }
    } else {
      const ds = structuredState[selectedDay] || {}
      const idx = weeklyPlan[selectedDay].tasks.findIndex((_, i) => !ds[i])
      if (idx < 0) return null
      const task = weeklyPlan[selectedDay].tasks[idx]
      return { text: task.text, earnings: task.earnings, duration: task.duration, structuredIdx: idx }
    }
  })()

  const doFreeflow = (index: number) => {
    const key = `freeflow_${index}`
    const completing = !freeflowState[key]
    const next = { ...freeflowState, [key]: completing }
    setFreeflowState(next)
    localStorage.setItem('925_freeflow', JSON.stringify(next))
    if (completing) {
      setStreak(markActiveToday())
      setJustCompleted(key)
      setTimeout(() => setJustCompleted(null), 1000)
    }
  }

  const resetFreeflow = () => {
    setFreeflowState({})
    localStorage.setItem('925_freeflow', '{}')
  }

  const doStructured = (day: DayKey, index: number) => {
    const dState = structuredState[day] || {}
    const completing = !dState[index]
    const next = { ...structuredState, [day]: { ...dState, [index]: completing } }
    setStructuredState(next)
    localStorage.setItem('925_structured', JSON.stringify(next))
    if (completing) {
      setStreak(markActiveToday())
      const key = `structured_${day}_${index}`
      setJustCompleted(key)
      setTimeout(() => setJustCompleted(null), 1000)
    }
  }

  const resetDay = (day: DayKey) => {
    const next = { ...structuredState, [day]: {} }
    setStructuredState(next)
    localStorage.setItem('925_structured', JSON.stringify(next))
  }

  return (
    <div className="daily-schedule">
      <header className="page-header">
        <h1>Daily Schedule</h1>
        <p>ADHD-friendly gigwork plan</p>
        <span className="target-badge">🎯 Target: $200-400/week</span>
      </header>

      {/* ── Momentum ── */}
      <div className="momentum-bar">
        <span className="momentum-count">
          <strong className="momentum-num">{totalToday}</strong> task{totalToday !== 1 ? 's' : ''} done today
        </span>
        {streak > 1 && <span className="streak-badge">🔥 {streak}-day streak</span>}
      </div>

      {/* ── Energy Check ── */}
      <div className="energy-check">
        <div className="energy-check-label">How's your energy right now?</div>
        <div className="energy-options">
          {([
            ['high',   '⚡',  'High Energy'],
            ['medium', '🌤️', 'Medium Energy'],
            ['low',    '🌿', 'Low Energy'],
          ] as [Energy, string, string][]).map(([level, icon, label]) => (
            <button
              key={level}
              className={`energy-option energy-${level}${energy === level ? ' active' : ''}`}
              onClick={() => setEnergy(energy === level ? null : level)}
            >
              <span className="energy-option-icon">{icon}</span>
              <span className="energy-option-label">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Next Best Task ── */}
      {energy && nextBestTask && (
        <div className="next-best-task">
          <div className="nbt-header">
            <span className="nbt-label">Next Best Task</span>
            <span className="nbt-duration">⏱ {nextBestTask.duration}</span>
          </div>
          <div className="nbt-text" dangerouslySetInnerHTML={{ __html: nextBestTask.text }} />
          <div className="nbt-footer">
            <span className="nbt-earnings">💰 {nextBestTask.earnings}</span>
            <button
              className="nbt-start-btn"
              onClick={() => {
                if (nextBestTask.freeflowIdx !== undefined) doFreeflow(nextBestTask.freeflowIdx)
                else if (nextBestTask.structuredIdx !== undefined) doStructured(selectedDay, nextBestTask.structuredIdx)
              }}
            >
              Start Task
            </button>
          </div>
        </div>
      )}

      {energy && !nextBestTask && (
        <div className="all-done-banner">🎉 All tasks done for this energy level!</div>
      )}

      {/* ── Mode Toggle (compact) ── */}
      <div className="mode-row">
        <span className="mode-row-label">Mode</span>
        <div className="mode-toggle-compact">
          <button className={`mode-btn-compact${mode === 'freeflow' ? ' active' : ''}`} onClick={() => setMode('freeflow')}>Flow</button>
          <button className={`mode-btn-compact${mode === 'structured' ? ' active' : ''}`} onClick={() => setMode('structured')}>Structure</button>
        </div>
      </div>

      {/* ── Rules ── */}
      <div className={`rules-card${rulesOpen ? ' open' : ''}`}>
        <div className="rules-header" onClick={() => setRulesOpen(!rulesOpen)}>
          <span>✨ The Rules</span>
          <span className="arrow">▼</span>
        </div>
        <ul className="rules-list">
          <li><strong>No guilt if skipped.</strong> Just keep going.</li>
          <li><strong>High-value first.</strong> Start with $20+/hr tasks when energy is high.</li>
          <li><strong>Stack easy wins.</strong> Build momentum with quick tasks.</li>
          <li><strong>Rotate platforms.</strong> Keep things fresh.</li>
          <li><strong>Celebrate every win.</strong> Even small earnings add up!</li>
        </ul>
      </div>

      {/* ── Platforms ── */}
      <div className={`platforms-ref${platformsOpen ? ' open' : ''}`}>
        <div className="platforms-header" onClick={() => setPlatformsOpen(!platformsOpen)}>
          <span>🔗 Platform Quick Links</span>
          <span className="arrow">▼</span>
        </div>
        <div className="platforms-content">
          <div className="platform-category">
            <h5>Premium Research <span className="tag high">$25-75/hr</span></h5>
            <div className="platform-links">
              <a href="https://respondent.io" target="_blank" rel="noreferrer" className="platform-link">Respondent <span className="pay">$50-200</span></a>
              <a href="https://userinterviews.com" target="_blank" rel="noreferrer" className="platform-link">User Interviews <span className="pay">$40-150</span></a>
              <a href="https://dscout.com/participate-in-research-studies" target="_blank" rel="noreferrer" className="platform-link">dscout <span className="pay">$25-100</span></a>
            </div>
          </div>
          <div className="platform-category">
            <h5>Testing &amp; AI <span className="tag med">$15-30/hr</span></h5>
            <div className="platform-links">
              <a href="https://www.usertesting.com/get-paid-to-test" target="_blank" rel="noreferrer" className="platform-link">UserTesting <span className="pay">$10/test</span></a>
              <a href="https://outlier.ai" target="_blank" rel="noreferrer" className="platform-link">Outlier AI <span className="pay">$15-50/hr</span></a>
              <a href="https://www.prolific.com/participants" target="_blank" rel="noreferrer" className="platform-link">Prolific <span className="pay">$8-15/hr</span></a>
            </div>
          </div>
          <div className="platform-category">
            <h5>Quick Wins <span className="tag easy">$5-25/task</span></h5>
            <div className="platform-links">
              <a href="https://www.rev.com/freelancers/transcription" target="_blank" rel="noreferrer" className="platform-link">Rev <span className="pay">$8-15/hr</span></a>
              <a href="https://www.clickworker.com/clickworker" target="_blank" rel="noreferrer" className="platform-link">Clickworker <span className="pay">$8-15/hr</span></a>
              <a href="https://fieldagent.net" target="_blank" rel="noreferrer" className="platform-link">Field Agent <span className="pay">$3-15</span></a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Free Flow ── */}
      {mode === 'freeflow' && (
        <div className="section active">
          <div className="progress-bar">
            <span className="icon">🎯</span>
            <div className="progress-info">
              <div className="label">Tasks completed</div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${freeflowPercent}%` }} />
              </div>
            </div>
            <span className="progress-count"><span>{freeflowCompleted}</span> / <span>{freeflowTasks.length}</span></span>
          </div>

          {freeflowCompleted >= 3 && (
            <div className="celebration visible">🎉 Great progress! Keep it up!</div>
          )}

          <div className="day-card" style={{ borderLeftColor: 'var(--brand)' }}>
            <div className="day-header">
              <div className="day-title">Flow Mode</div>
              <div className="day-subtitle">Work at your own pace, no schedule pressure</div>
            </div>
            <div className="task-list">
              {filteredTasks.map((task, i) => {
                const globalIdx = freeflowTasks.indexOf(task)
                const key = `freeflow_${globalIdx}`
                const completed = freeflowState[key] || false
                const isJustDone = justCompleted === key
                return (
                  <div key={i} className={`task-item${completed ? ' completed' : ''}${isJustDone ? ' just-done' : ''}`}>
                    <div className="task-content">
                      <div className="task-text" dangerouslySetInnerHTML={{ __html: task.text }} />
                      <div className="task-meta">
                        <span className="task-earnings">💰 {task.earnings}</span>
                        <span className="task-duration">⏱ {task.duration}</span>
                      </div>
                    </div>
                    <button
                      className={`task-action-btn${completed ? ' done' : ''}`}
                      onClick={() => doFreeflow(globalIdx)}
                    >
                      {completed ? '✓' : 'Start →'}
                    </button>
                  </div>
                )
              })}
            </div>
            <div className="day-tip">
              <strong>Strategy:</strong> Work through these based on energy and time. No pressure - just consistent progress!
            </div>
            <div className="day-actions">
              <button className="action-btn reset" onClick={resetFreeflow}>Reset All</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Structured ── */}
      {mode === 'structured' && (
        <div className="section active">
          <div className="day-nav">
            {days.map((day, i) => (
              <button
                key={day}
                className={`day-btn${day === selectedDay ? ' active' : ''}${day === currentDay ? ' today' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                {dayNames[i]}
              </button>
            ))}
          </div>

          {days.map(day => {
            const data = weeklyPlan[day]
            const ds = structuredState[day] || {}
            const allCompleted = data.tasks.every((_, i) => ds[i])

            if (day !== selectedDay) return null

            return (
              <div key={day} className="day-card" id={`${day}Card`}>
                <div className="day-header">
                  <div className="day-title">{data.title}</div>
                  <div className="day-subtitle">{data.subtitle}</div>
                  <span className="day-target">🎯 {data.target}</span>
                </div>
                {allCompleted && (
                  <div className="celebration visible">🎉 {data.title} complete! Great work!</div>
                )}
                <div className="task-list">
                  <h4>Priority Tasks</h4>
                  {data.tasks.map((task, i) => {
                    const completed = ds[i] || false
                    const key = `structured_${day}_${i}`
                    const isJustDone = justCompleted === key
                    return (
                      <div key={i} className={`task-item${completed ? ' completed' : ''}${isJustDone ? ' just-done' : ''}`}>
                        <div className="task-content">
                          <div className="task-text" dangerouslySetInnerHTML={{ __html: task.text }} />
                          <div className="task-meta">
                            <span className="task-earnings">💰 {task.earnings}</span>
                            <span className="task-duration">⏱ {task.duration}</span>
                          </div>
                        </div>
                        <button
                          className={`task-action-btn${completed ? ' done' : ''}`}
                          onClick={() => doStructured(day, i)}
                        >
                          {completed ? '✓' : 'Start →'}
                        </button>
                      </div>
                    )
                  })}
                </div>
                <div className="day-tip">
                  <strong>Strategy:</strong> {data.tip}
                </div>
                <div className="day-actions">
                  <button className="action-btn reset" onClick={() => resetDay(day)}>Reset Day</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
