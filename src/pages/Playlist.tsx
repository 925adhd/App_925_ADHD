import { useBrainFMPlayer } from '../context/BrainFMPlayerContext'
import '../styles/pages/Playlist.css'

export default function Playlist() {
  const { isPlaying, source, playBrainFM, toggle } = useBrainFMPlayer()
  const isBrainFMActive = source === 'brainfm'

  const handleTrack = () => {
    if (isBrainFMActive) toggle()
    else playBrainFM()
  }

  return (
    <div className="playlist">
      <div className="bg-gradient" />
      <div className="floating-orb orb-1" />
      <div className="floating-orb orb-2" />
      <div className="floating-orb orb-3" />

      <div className="player-container">
        <div className="header">
          <h1>Focus Music</h1>
          <p className="subtitle">Brain.fm audio for ADHD lock-in</p>
          <p className="playlist-context">🧠 Functional music engineered to help your brain focus. Press play, let it run in the background, get into the zone.</p>
        </div>

        <div className="player-label">🎧 Press play and lock in</div>

        <div className="track-list">
          <button
            className={`track-row${isBrainFMActive ? ' active' : ''}`}
            onClick={handleTrack}
            aria-label={isBrainFMActive && isPlaying ? 'Pause focus audio' : 'Play focus audio'}
          >
            <span className="track-num">
              {isBrainFMActive && isPlaying ? (
                <span className="track-equalizer">
                  <span /><span /><span />
                </span>
              ) : (
                <span className="track-index">▶</span>
              )}
            </span>
            <img src="/images/brainfm.jpg" alt="" className="track-artwork" aria-hidden="true" />
            <span className="track-info">
              <span className="track-title">Geo Grooves</span>
              <span className="track-artist">Brain.fm</span>
            </span>
            <span className="track-duration">30:00</span>
          </button>
        </div>

        <p className="playlist-best-for">⚡ Best for: deep work, coding, writing, anything that needs lock-in.</p>

        <a
          href="https://www.brain.fm/925adhd"
          target="_blank"
          rel="noopener noreferrer"
          className="brainfm-affiliate"
        >
          <span className="brainfm-affiliate-headline">
            Get 1 month free on Brain.fm
            <span className="brainfm-affiliate-arrow">→</span>
          </span>
          <span className="brainfm-affiliate-sub">Hundreds more focus tracks. Cancel anytime.</span>
        </a>
      </div>
    </div>
  )
}
