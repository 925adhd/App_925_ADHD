import { useState, useEffect, useRef } from 'react'
import { Droplets, Target, Zap, Moon } from 'lucide-react'
import '../styles/pages/Breathwork.css'

type ExerciseType = 'calm' | 'focus' | 'energy' | 'sleep' | null
type Screen = 'select' | 'setup' | 'session' | 'complete'

interface Phase {
  text: string
  duration: number
  action: 'inhale' | 'exhale' | 'hold'
}

interface Exercise {
  title: string
  desc: string
  completionMsg: string
  phases: Phase[]
}

const exercises: Record<string, Exercise> = {
  calm: {
    title: 'Calming Breath',
    desc: 'Extended exhales activate your parasympathetic nervous system for natural relaxation.',
    completionMsg: 'Your nervous system has been gently guided into a more relaxed state.',
    phases: [
      { text: 'Breathe In',  duration: 4, action: 'inhale' },
      { text: 'Hold',        duration: 2, action: 'hold'   },
      { text: 'Breathe Out', duration: 6, action: 'exhale' },
      { text: 'Pause',       duration: 2, action: 'hold'   },
    ],
  },
  focus: {
    title: 'Box Breathing',
    desc: 'Equal 4-count breathing used by Navy SEALs for sharp concentration and mental clarity.',
    completionMsg: 'Your mind is now clear and focused.',
    phases: [
      { text: 'Breathe In',  duration: 4, action: 'inhale' },
      { text: 'Hold',        duration: 4, action: 'hold'   },
      { text: 'Breathe Out', duration: 4, action: 'exhale' },
      { text: 'Hold',        duration: 4, action: 'hold'   },
    ],
  },
  energy: {
    title: 'Energizing Breath',
    desc: 'Dynamic breathing pattern to naturally boost alertness and sharpen mental focus.',
    completionMsg: 'Your energy has been boosted. You should feel more alert and ready.',
    phases: [
      { text: 'Quick In',  duration: 1, action: 'inhale' },
      { text: 'Quick Out', duration: 1, action: 'exhale' },
      { text: 'Quick In',  duration: 1, action: 'inhale' },
      { text: 'Quick Out', duration: 1, action: 'exhale' },
      { text: 'Deep In',   duration: 3, action: 'inhale' },
      { text: 'Slow Out',  duration: 3, action: 'exhale' },
    ],
  },
  sleep: {
    title: '4-7-8 Sleep Breath',
    desc: "Dr. Andrew Weil's technique to calm the nervous system and prepare the body for sleep.",
    completionMsg: 'Your body is now prepared for deep, restful sleep.',
    phases: [
      { text: 'Breathe In',  duration: 4, action: 'inhale' },
      { text: 'Hold',        duration: 7, action: 'hold'   },
      { text: 'Breathe Out', duration: 8, action: 'exhale' },
    ],
  },
}

const exOptions = [
  { type: 'calm'   as ExerciseType, icon: <Droplets size={26} />, label: 'Calm',         pattern: '4-2-6-2',     range: '5–10 min' },
  { type: 'focus'  as ExerciseType, icon: <Target   size={26} />, label: 'Box Breathing', pattern: '4-4-4-4',    range: '5–15 min' },
  { type: 'energy' as ExerciseType, icon: <Zap      size={26} />, label: 'Energize',      pattern: 'Quick burst', range: '3–7 min'  },
  { type: 'sleep'  as ExerciseType, icon: <Moon     size={26} />, label: 'Sleep',         pattern: '4-7-8',       range: '4–8 min'  },
]

// SVG progress ring constants
const RING_R = 108
const RING_C = 2 * Math.PI * RING_R

export default function Breathwork() {
  // ── Screen / setup ─────────────────────────────────────────────
  const [screen,   setScreen]   = useState<Screen>('select')
  const [exercise, setExercise] = useState<ExerciseType>(null)
  const [duration, setDuration] = useState(3)

  // ── Live session display ────────────────────────────────────────
  const [phaseText,      setPhaseText]      = useState('')
  const [phaseCount,     setPhaseCount]     = useState(0)
  const [phaseDur,       setPhaseDur]       = useState(4)
  const [circleExpanded, setCircleExpanded] = useState(false)
  const [paused,         setPaused]         = useState(false)
  const [roundDisplay,   setRoundDisplay]   = useState(1)
  const [totalRoundsDisp,setTotalRoundsDisp]= useState(0)

  // ── Complete screen ─────────────────────────────────────────────
  const [doneRounds, setDoneRounds] = useState(0)
  const [doneTime,   setDoneTime]   = useState('0:00')

  // ── All mutable session state lives in refs (no stale closure) ──
  const activeRef      = useRef(false)
  const pausedRef      = useRef(false)
  const exRef          = useRef('')
  const roundRef       = useRef(0)
  const totalRoundsRef = useRef(0)     // ref — NOT state — so inner callbacks are always fresh
  const startTimeRef   = useRef(0)
  const tickRef        = useRef<ReturnType<typeof setInterval> | null>(null)
  const phaseLeftRef   = useRef(0)     // seconds remaining in the current phase

  // runPhase is kept in a ref that re-assigns every render so it never captures
  // stale values from state or other refs.
  const runPhaseRef = useRef<(phaseIdx: number) => void>(() => {})

  const stopTick = () => {
    if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null }
  }

  const finishSession = () => {
    activeRef.current = false
    stopTick()
    const elapsed = Date.now() - startTimeRef.current
    const m = Math.floor(elapsed / 60000)
    const s = Math.floor((elapsed % 60000) / 1000)
    setDoneRounds(roundRef.current)
    setDoneTime(`${m}:${s.toString().padStart(2, '0')}`)
    setScreen('complete')
  }

  // Re-assign runPhaseRef every render — this is the standard React pattern for
  // recursive timer callbacks that need always-fresh closure data.
  useEffect(() => {
    runPhaseRef.current = (phaseIdx: number) => {
      if (!activeRef.current) return

      const ex     = exercises[exRef.current]
      const phase  = ex.phases[phaseIdx]

      // --- Update display ---
      setPhaseText(phase.text)
      setPhaseDur(phase.duration)
      phaseLeftRef.current = phase.duration
      setPhaseCount(phase.duration)

      // --- Drive the circle ---
      // inhale → expand, exhale → contract, hold → leave as-is
      if (phase.action === 'inhale') setCircleExpanded(true)
      else if (phase.action === 'exhale') setCircleExpanded(false)

      stopTick()
      tickRef.current = setInterval(() => {
        // Pause: interval keeps running but simply skips decrement.
        // phaseLeftRef is not touched during pause, so countdown resumes
        // exactly where it left off — no phase restart on resume.
        if (pausedRef.current) return

        phaseLeftRef.current -= 1
        setPhaseCount(Math.max(0, phaseLeftRef.current))

        if (phaseLeftRef.current <= 0) {
          stopTick()

          const nextPhase = phaseIdx + 1
          if (nextPhase < ex.phases.length) {
            // Advance to next phase in this round
            runPhaseRef.current(nextPhase)
          } else {
            // Round complete
            roundRef.current += 1
            setRoundDisplay(roundRef.current + 1) // 1-indexed

            if (roundRef.current >= totalRoundsRef.current) {
              finishSession()
            } else {
              runPhaseRef.current(0) // start next round
            }
          }
        }
      }, 1000)
    }
  }) // intentionally no dep array — always fresh

  // ── Start / repeat session ──────────────────────────────────────
  const beginSession = (exType = exercise, mins = duration) => {
    if (!exType) return
    const ex        = exercises[exType]
    const cycleTime = ex.phases.reduce((s, p) => s + p.duration, 0)
    const rounds    = Math.max(1, Math.floor((mins * 60) / cycleTime))

    // Reset all refs
    exRef.current          = exType
    activeRef.current      = true
    pausedRef.current      = false
    roundRef.current       = 0
    totalRoundsRef.current = rounds
    startTimeRef.current   = Date.now()

    // Reset display
    setTotalRoundsDisp(rounds)
    setRoundDisplay(1)
    setPaused(false)
    setCircleExpanded(false)
    setScreen('session')

    // Small delay lets the session screen mount before the first phase triggers
    setTimeout(() => runPhaseRef.current(0), 350)
  }

  const togglePause = () => {
    // Flip the ref; the interval will see it on the next tick.
    // No need to restart anything — countdown resumes from phaseLeftRef.current.
    pausedRef.current = !pausedRef.current
    setPaused(pausedRef.current)
  }

  const endSession = () => {
    activeRef.current = false
    stopTick()
    finishSession()
  }

  // Cleanup on unmount
  useEffect(() => () => stopTick(), [])

  // ── Progress ring offset (1 = full, 0 = empty) ──────────────────
  const ringProgress = phaseDur > 0 ? phaseCount / phaseDur : 0
  const dashOffset   = RING_C * (1 - ringProgress)

  // For short phases (≤2s) use a quick snap, otherwise match phase duration
  const circleDur = phaseDur <= 2 ? 0.6 : phaseDur

  return (
    <div className="breathwork">

      {/* ── Select ── */}
      {screen === 'select' && (
        <div className="bw-screen">
          <div className="bw-container">
            <div className="bw-header">
              <h1 className="bw-title">Breathwork</h1>
              <p className="bw-subtitle">Choose what you need right now</p>
            </div>
            <div className="bw-exercise-grid">
              {exOptions.map(opt => (
                <button
                  key={opt.type}
                  className={`bw-exercise-card bw-ex-${opt.type}`}
                  onClick={() => { setExercise(opt.type); setDuration(3); setScreen('setup') }}
                >
                  <span className="bw-ex-icon">{opt.icon}</span>
                  <span className="bw-ex-label">{opt.label}</span>
                  <span className="bw-ex-pattern">{opt.pattern}</span>
                  <span className="bw-ex-range">{opt.range}</span>
                </button>
              ))}
            </div>
            <p className="bw-note">Even 3 minutes can lower stress hormones and reset your focus.</p>
          </div>
        </div>
      )}

      {/* ── Setup ── */}
      {screen === 'setup' && exercise && (
        <div className="bw-screen">
          <div className="bw-container">
            <div className="bw-setup-header">
              <h2>{exercises[exercise].title}</h2>
              <p>{exercises[exercise].desc}</p>
            </div>
            <div className="bw-duration-group">
              <label className="bw-duration-label">Duration</label>
              <div className="bw-duration-btns">
                {[3, 5, 10, 15].map(d => (
                  <button
                    key={d}
                    className={`bw-dur-btn${duration === d ? ' selected' : ''}`}
                    onClick={() => setDuration(d)}
                  >{d} min</button>
                ))}
              </div>
            </div>
            <button className="bw-btn bw-btn-primary" onClick={() => beginSession()}>Begin Session</button>
            <button className="bw-btn bw-btn-secondary" onClick={() => setScreen('select')}>Back</button>
          </div>
        </div>
      )}

      {/* ── Session ── */}
      {screen === 'session' && (
        <div className="bw-screen bw-session-screen">
          <div className="bw-session-meta">
            <span className="bw-session-name">{exercise ? exercises[exercise].title : ''}</span>
            <span className="bw-session-rounds">
              Round {Math.min(roundDisplay, totalRoundsDisp)} of {totalRoundsDisp}
            </span>
          </div>

          <div className="bw-circle-wrap">
            {/* Depleting progress ring */}
            <svg className="bw-progress-svg" viewBox="0 0 220 220" aria-hidden="true">
              <circle className="bw-ring-track" cx="110" cy="110" r={RING_R} />
              <circle
                className="bw-ring-fill"
                cx="110" cy="110" r={RING_R}
                strokeDasharray={RING_C}
                strokeDashoffset={dashOffset}
              />
            </svg>

            {/* Breathing orb — expands on inhale, contracts on exhale */}
            <div
              className={`bw-breath-circle${circleExpanded ? ' expanded' : ''}`}
              style={{ transitionDuration: `${circleDur}s` }}
            >
              <span className="bw-phase-text">{phaseText}</span>
              <span className="bw-phase-count">{phaseCount}</span>
            </div>

            {/* Static decorative rings */}
            <div className="bw-deco-ring bw-deco-1" />
            <div className="bw-deco-ring bw-deco-2" />
          </div>

          {paused && <p className="bw-paused-label">Paused</p>}

          <div className="bw-session-controls">
            <button
              className={`bw-control-btn${paused ? ' resuming' : ''}`}
              onClick={togglePause}
            >
              {paused ? 'Resume' : 'Pause'}
            </button>
            <button className="bw-control-btn bw-end-btn" onClick={endSession}>End</button>
          </div>
        </div>
      )}

      {/* ── Complete ── */}
      {screen === 'complete' && exercise && (
        <div className="bw-screen">
          <div className="bw-container bw-complete">
            <div className="bw-complete-glow" />
            <h2 className="bw-complete-title">Well done</h2>
            <p className="bw-complete-msg">{exercises[exercise].completionMsg}</p>
            <div className="bw-stats">
              <div className="bw-stat">
                <span className="bw-stat-val">{doneRounds}</span>
                <span className="bw-stat-lbl">Rounds</span>
              </div>
              <div className="bw-stat-divider" />
              <div className="bw-stat">
                <span className="bw-stat-val">{doneTime}</span>
                <span className="bw-stat-lbl">Time</span>
              </div>
            </div>
            <button className="bw-btn bw-btn-primary"    onClick={() => beginSession()}>Repeat Session</button>
            <button className="bw-btn bw-btn-secondary"  onClick={() => setScreen('select')}>New Session</button>
          </div>
        </div>
      )}
    </div>
  )
}
