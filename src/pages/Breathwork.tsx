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
  const [phaseAction,    setPhaseAction]    = useState<'inhale' | 'exhale' | 'hold'>('hold')
  const [breathScale,    setBreathScale]    = useState(0) // 0 = contracted, 1 = expanded
  const [paused,         setPaused]         = useState(false)
  const [roundDisplay,   setRoundDisplay]   = useState(1)
  const [totalRoundsDisp,setTotalRoundsDisp]= useState(0)
  // Ring tracks full-cycle progress (0 → 1 over one complete round)
  const [cycleProgress,  setCycleProgress]  = useState(0)

  // ── Complete screen ─────────────────────────────────────────────
  const [doneRounds, setDoneRounds] = useState(0)
  const [doneTime,   setDoneTime]   = useState('0:00')

  // ── All mutable session state lives in refs (no stale closure) ──
  const activeRef      = useRef(false)
  const pausedRef      = useRef(false)
  const exRef          = useRef('')
  const roundRef       = useRef(0)
  const totalRoundsRef = useRef(0)
  const startTimeRef   = useRef(0)
  const tickRef        = useRef<ReturnType<typeof setInterval> | null>(null)
  const phaseLeftRef   = useRef(0)
  const phaseIdxRef    = useRef(0) // current phase index within the cycle
  const breathTargetRef = useRef(0) // where the breath circle should be (0 or 1)
  const breathDurRef   = useRef(4) // duration of current inhale/exhale for CSS transition

  const runPhaseRef = useRef<(phaseIdx: number) => void>(() => {})

  const stopTick = () => {
    if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null }
  }

  /** Compute how far through the full cycle we are (0 → 1) */
  const getCycleProgress = (ex: Exercise, phaseIdx: number, secsLeftInPhase: number): number => {
    const cycleTotal = ex.phases.reduce((s, p) => s + p.duration, 0)
    let elapsed = 0
    for (let i = 0; i < phaseIdx; i++) elapsed += ex.phases[i].duration
    elapsed += ex.phases[phaseIdx].duration - secsLeftInPhase
    return Math.min(1, elapsed / cycleTotal)
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

  // Re-assign runPhaseRef every render for always-fresh closures
  useEffect(() => {
    runPhaseRef.current = (phaseIdx: number) => {
      if (!activeRef.current) return

      const ex     = exercises[exRef.current]
      const phase  = ex.phases[phaseIdx]

      // --- Update display ---
      setPhaseText(phase.text)
      phaseLeftRef.current = phase.duration
      phaseIdxRef.current  = phaseIdx
      setPhaseCount(phase.duration)
      setPhaseAction(phase.action)

      // --- Drive the breathing circle ---
      // Only change target during inhale/exhale, hold keeps current position
      if (phase.action === 'inhale') {
        breathTargetRef.current = 1
        breathDurRef.current = phase.duration
        setBreathScale(1)
      } else if (phase.action === 'exhale') {
        breathTargetRef.current = 0
        breathDurRef.current = phase.duration
        setBreathScale(0)
      }
      // hold → don't change breathScale or breathDurRef

      // --- Update cycle ring ---
      setCycleProgress(getCycleProgress(ex, phaseIdx, phase.duration))

      stopTick()
      tickRef.current = setInterval(() => {
        if (pausedRef.current) return

        phaseLeftRef.current -= 1
        setPhaseCount(Math.max(0, phaseLeftRef.current))

        // Update ring progress smoothly each second
        setCycleProgress(
          getCycleProgress(ex, phaseIdxRef.current, phaseLeftRef.current)
        )

        if (phaseLeftRef.current <= 0) {
          stopTick()

          const nextPhase = phaseIdx + 1
          if (nextPhase < ex.phases.length) {
            runPhaseRef.current(nextPhase)
          } else {
            // Round complete
            roundRef.current += 1
            setRoundDisplay(roundRef.current + 1)

            if (roundRef.current >= totalRoundsRef.current) {
              finishSession()
            } else {
              runPhaseRef.current(0)
            }
          }
        }
      }, 1000)
    }
  }) // intentionally no dep array

  // ── Start / repeat session ──────────────────────────────────────
  const beginSession = (exType = exercise, mins = duration) => {
    if (!exType) return
    const ex        = exercises[exType]
    const cycleTime = ex.phases.reduce((s, p) => s + p.duration, 0)
    const rounds    = Math.max(1, Math.floor((mins * 60) / cycleTime))

    exRef.current          = exType
    activeRef.current      = true
    pausedRef.current      = false
    roundRef.current       = 0
    totalRoundsRef.current = rounds
    startTimeRef.current   = Date.now()
    breathTargetRef.current = 0
    breathDurRef.current   = ex.phases[0].duration

    setTotalRoundsDisp(rounds)
    setRoundDisplay(1)
    setPaused(false)
    setBreathScale(0)
    setCycleProgress(0)
    setScreen('session')

    setTimeout(() => runPhaseRef.current(0), 350)
  }

  const togglePause = () => {
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

  // ── Ring: tracks full cycle (0 → 1) ────────────────────────────
  const dashOffset = RING_C * (1 - cycleProgress)

  // ── Breathing circle: inline transition only changes on inhale/exhale ──
  // Scale range: 0.7 (contracted) → 1.55 (expanded)
  const circleScale = 0.7 + breathScale * 0.85
  const circleTransitionDur = breathDurRef.current

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
            {/* Progress ring — tracks full cycle, not per-phase */}
            <svg className="bw-progress-svg" viewBox="0 0 220 220" aria-hidden="true">
              <circle className="bw-ring-track" cx="110" cy="110" r={RING_R} />
              <circle
                className="bw-ring-fill"
                cx="110" cy="110" r={RING_R}
                strokeDasharray={RING_C}
                strokeDashoffset={dashOffset}
              />
            </svg>

            {/* Breathing orb — scale driven by breathScale state */}
            <div
              className={`bw-breath-circle bw-action-${phaseAction}`}
              style={{
                transform: `translate(-50%, -50%) scale(${circleScale})`,
                transitionDuration: `${circleTransitionDur}s`,
              }}
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
