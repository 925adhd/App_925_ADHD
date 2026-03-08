import { useState, useEffect } from 'react'
import '../styles/pages/SleepCalc.css'

function formatTime(date: Date) {
  let h = date.getHours(), m = date.getMinutes()
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return `${h}:${m.toString().padStart(2, '0')} ${ampm}`
}

function calcTimes(baseTime: string, fallAsleep: number, direction: 'bed'|'wake') {
  const [h, m] = baseTime.split(':').map(Number)
  const base = new Date(); base.setHours(h, m, 0, 0)
  return [4,5,6,7,8].map(cycles => {
    const total = cycles * 90 + fallAsleep
    const dt = new Date(base.getTime() + (direction === 'wake' ? 1 : -1) * total * 60000)
    return { time: formatTime(dt), cycles, hours: (total/60).toFixed(1), best: cycles===5||cycles===6 }
  })
}

export default function SleepCalc() {
  const [mode, setMode] = useState<'sleep'|'wake'>('sleep')
  const [wakeTime, setWakeTime] = useState('07:00')
  const [sleepTime, setSleepTime] = useState('23:00')
  const [fallAsleep, setFallAsleep] = useState(14)
  const [results, setResults] = useState<any[]>([])
  const [toast, setToast] = useState('')
  const [bestTime, setBestTime] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2000) }

  const calc = () => {
    const r = mode==='sleep' ? calcTimes(wakeTime, fallAsleep, 'bed') : calcTimes(sleepTime, fallAsleep, 'wake')
    setResults(r); setBestTime(r.find(x=>x.best)?.time||'')
  }

  useEffect(() => { calc() }, [])

  const setCurrentTime = () => {
    const now = new Date()
    const t = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`
    mode==='sleep' ? setWakeTime(t) : setSleepTime(t)
  }

  return (
    <div className="sleep-calc">
      {toast && <div className="toast show">{toast}</div>}
      <header className="page-header"><span className="emoji">😴</span><h1>Sleep Calculator</h1><p>Wake up refreshed by timing your sleep cycles</p></header>

      <div className="mode-toggle">
        <button className={`mode-btn${mode==='sleep'?' active':''}`} onClick={() => { setMode('sleep'); setResults([]) }}>😴 I need to wake at...</button>
        <button className={`mode-btn${mode==='wake'?' active':''}`} onClick={() => { setMode('wake'); setResults([]) }}>🛏️ Going to bed now</button>
      </div>

      <div className="input-card">
        <label className="input-label">{mode==='sleep' ? 'What time do you need to wake up?' : 'What time are you going to bed?'}</label>
        <input type="time" className="time-input" value={mode==='sleep'?wakeTime:sleepTime} onChange={e => mode==='sleep'?setWakeTime(e.target.value):setSleepTime(e.target.value)} />
      </div>
      <button className="calc-btn" onClick={calc}>Calculate {mode==='sleep'?'Sleep':'Wake'} Times ✨</button>

      {results.length > 0 && (
        <div className="results show">
          <div className="results-title">{mode==='sleep' ? '🌙 You should go to bed at:' : '☀️ You should wake up at:'}</div>
          <div className="results-subtitle">Based on 90-min sleep cycles + time to fall asleep</div>
          <div className="time-options">
            {results.map(r => (
              <div key={r.time} className={`time-option${r.best?' best':''}`} onClick={() => { setBestTime(r.time); showToast(`Selected: ${r.time}`) }}>
                <div className="time-info">
                  <div><span className="time-value">{r.time}</span>{r.best&&<span className="badge">Best</span>}</div>
                  <span className="time-cycles">{r.cycles} sleep cycles</span>
                </div>
                <span className="time-hours">{r.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="quick-actions">
        <button className="quick-btn" onClick={setCurrentTime}>🕐 Use Current Time</button>
        <button className="quick-btn" onClick={() => { if (!bestTime) { showToast('Calculate times first!'); return } navigator.clipboard.writeText(bestTime).then(() => showToast(`Copied: ${bestTime} ✅`)).catch(() => showToast('Copy failed')) }}>📋 Copy Best Time</button>
      </div>

      <div className="settings-card">
        <div className="setting-row">
          <span className="setting-label">Time to fall asleep (minutes):</span>
          <input type="number" className="setting-input" value={fallAsleep} min="0" max="60" onChange={e => setFallAsleep(parseInt(e.target.value)||14)} />
        </div>
      </div>

      <div className="info-box">
        <div className="info-title">💡 Sleep Cycle Info</div>
        <div className="info-text">Sleep happens in 90-minute cycles. Waking up at the end of a cycle helps you feel more refreshed. Most adults need 5-6 cycles (7.5-9 hours) per night.</div>
      </div>
    </div>
  )
}
