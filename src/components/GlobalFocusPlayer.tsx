import { useState, useEffect, useRef } from 'react'
import { Play, Pause, ChevronDown, Music2, SkipBack, SkipForward, BarChart2, X } from 'lucide-react'
import { useBrainFMPlayer } from '../context/BrainFMPlayerContext'
import Visualizer from './Visualizer'
import '../styles/GlobalFocusPlayer.css'

const fmt = (s: number) => {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

const DISMISS_THRESHOLD = 60

export default function GlobalFocusPlayer() {
  const { isPlaying, currentTime, duration, progress, hasBeenActivated, source, trackMeta, queueIndex, queueLength, audioContext, toggle, seek, nextTrack, prevTrack, close } =
    useBrainFMPlayer()
  const [minimized, setMinimized] = useState(false)
  const [vizOn, setVizOn] = useState(false)
  const [toast, setToast] = useState(false)
  const [dragY, setDragY] = useState(0)
  const toastFired = useRef(false)
  const dragStartY = useRef(0)
  const movedRef = useRef(false)

  useEffect(() => {
    if (!toastFired.current && source === 'brainfm' && currentTime >= 300) {
      toastFired.current = true
      setToast(true)
      setTimeout(() => setToast(false), 4000)
    }
  }, [currentTime, source])

  // Reset toast gate when source changes
  useEffect(() => {
    toastFired.current = false
    setToast(false)
  }, [source])

  if (!hasBeenActivated) return null

  const pillLabel = source === 'brainfm'
    ? `Brain.fm • ${fmt(currentTime)}`
    : `${trackMeta.artist} • ${fmt(currentTime)}`

  const panelTitle = source === 'brainfm' ? 'Geo Grooves' : trackMeta.title

  const onPillTouchStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY
    movedRef.current = false
  }
  const onPillTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - dragStartY.current
    if (delta > 5) movedRef.current = true
    if (delta > 0) setDragY(delta)
  }
  const onPillTouchEnd = () => {
    if (dragY > DISMISS_THRESHOLD) {
      close()
    }
    setDragY(0)
  }
  const onPillClick = () => {
    if (movedRef.current) return
    setMinimized(false)
  }

  const willDismiss = dragY > DISMISS_THRESHOLD

  if (minimized) {
    return (
      <>
        {dragY > 0 && (
          <div className={`gfp-dismiss-hint${willDismiss ? ' active' : ''}`}>
            {willDismiss ? 'Release to close' : 'Pull down to close'}
          </div>
        )}
        <div
          className="gfp-pill"
          onClick={onPillClick}
          onTouchStart={onPillTouchStart}
          onTouchMove={onPillTouchMove}
          onTouchEnd={onPillTouchEnd}
          role="button"
          aria-label="Expand player"
          style={{
            transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
            opacity: dragY > 0 ? Math.max(0.4, 1 - dragY / 200) : undefined,
            transition: dragY === 0 ? 'transform 220ms cubic-bezier(.2,.8,.2,1), opacity 220ms ease' : 'none',
            touchAction: 'none',
          }}
        >
          <Music2 size={13} className="gfp-pill-icon" />
          <span className="gfp-pill-label">{pillLabel}</span>
          <button
            className="gfp-pill-btn"
            onClick={(e) => { e.stopPropagation(); toggle() }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
        </div>
      </>
    )
  }

  return (
    <>
    {toast && (
      <div className="gfp-toast">
        <span className="gfp-toast-icon">🧠</span>
        <div>
          <div className="gfp-toast-title">Focus mode engaged</div>
          <div className="gfp-toast-sub">Your brain should now be locked in.</div>
        </div>
      </div>
    )}
    <div className="gfp-panel" role="region" aria-label="Audio player">
      <div className="gfp-header">
        {source === 'playlist' && trackMeta.artwork
          ? <img src={trackMeta.artwork} alt="" className="gfp-artwork" aria-hidden="true" />
          : null
        }
        <div className="gfp-title-group">
          <div className="gfp-title">
            {source !== 'playlist' && <Music2 size={14} />}
            <span>{panelTitle}</span>
          </div>
          {source === 'playlist' && (
            <div className="gfp-subtitle">{trackMeta.artist}</div>
          )}
        </div>
        <div className="gfp-header-actions">
          <button
            className={`gfp-icon-btn${vizOn ? ' gfp-icon-btn--active' : ''}`}
            onClick={() => setVizOn(v => !v)}
            aria-label="Toggle visualizer"
            title="Visualizer"
          >
            <BarChart2 size={14} />
          </button>
          <button className="gfp-icon-btn" onClick={() => setMinimized(true)} aria-label="Minimize">
            <ChevronDown size={15} />
          </button>
          <button className="gfp-icon-btn gfp-close-btn" onClick={close} aria-label="Close player" title="Close">
            <X size={15} />
          </button>
        </div>
      </div>

      <div
        className="gfp-track"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          seek((e.clientX - rect.left) / rect.width)
        }}
        role="slider"
        aria-label="Seek"
      >
        <div className="gfp-track-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="gfp-controls">
        <span className="gfp-time">{fmt(currentTime)}</span>
        {source === 'playlist' && queueLength > 1 && (
          <button className="gfp-icon-btn" onClick={prevTrack} aria-label="Previous track">
            <SkipBack size={14} />
          </button>
        )}
        <button className="gfp-play-btn" onClick={toggle} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        {source === 'playlist' && queueLength > 1 && (
          <button className="gfp-icon-btn" onClick={nextTrack} aria-label="Next track" disabled={queueIndex >= queueLength - 1}>
            <SkipForward size={14} />
          </button>
        )}
        <span className="gfp-time gfp-dur">{fmt(duration)}</span>
      </div>
    </div>
    <Visualizer key={audioContext ? 'ready' : 'pending'} active={vizOn} width={252} height={160} />
    </>
  )
}
