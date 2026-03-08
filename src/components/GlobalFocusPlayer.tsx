import { useState, useEffect, useRef } from 'react'
import { Play, Pause, ChevronDown, Music2, SkipBack, SkipForward, BarChart2 } from 'lucide-react'
import { useBrainFMPlayer } from '../context/BrainFMPlayerContext'
import Visualizer from './Visualizer'
import '../styles/GlobalFocusPlayer.css'

const fmt = (s: number) => {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function GlobalFocusPlayer() {
  const { isPlaying, currentTime, duration, progress, hasBeenActivated, source, trackMeta, queueIndex, queueLength, audioContext, toggle, seek, nextTrack, prevTrack } =
    useBrainFMPlayer()
  const [minimized, setMinimized] = useState(false)
  const [vizOn, setVizOn] = useState(false)
  const [toast, setToast] = useState(false)
  const toastFired = useRef(false)

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

  if (minimized) {
    return (
      <div className="gfp-pill" onClick={() => setMinimized(false)} role="button" aria-label="Expand player">
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
