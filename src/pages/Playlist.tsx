import { useBrainFMPlayer, type TrackMeta } from '../context/BrainFMPlayerContext'
import '../styles/pages/Playlist.css'

const TRACKS: (TrackMeta & { dur: string })[] = [
  { title: 'Grateful',        artist: 'NEFFEX', dur: '3:02', src: '/audio/Grateful%20(1).mp3',                    artwork: '/audio/artwork/grateful.png' },
  { title: 'Life',            artist: 'NEFFEX', dur: '2:08', src: '/audio/Life.mp3',                              artwork: '/audio/artwork/life.png' },
  { title: 'Make It',         artist: 'NEFFEX', dur: '4:13', src: '/audio/Make%20It.wav',                         artwork: '/audio/artwork/makeit.png' },
  { title: 'Legendary',       artist: 'NEFFEX', dur: '3:13', src: '/audio/NEFFEX%20-%20Legendary%20M1.wav',       artwork: '/audio/artwork/legendary.png' },
  { title: 'Modest',          artist: 'NEFFEX', dur: '2:45', src: '/audio/NEFFEX%20-%20Modest%20M8.3%20(1).wav',  artwork: '/audio/artwork/modest.png' },
  { title: 'Never Back Down', artist: 'NEFFEX', dur: '3:24', src: '/audio/NEFFEX%20-%20Never%20Back%20Down%20M6.2.wav', artwork: '/audio/artwork/neverbackdown.png' },
  { title: 'RARE',            artist: 'NEFFEX', dur: '3:54', src: '/audio/NEFFEX%20-%20RARE%20M7.2.wav',          artwork: '/audio/artwork/rare.png' },
  { title: 'Statement',       artist: 'NEFFEX', dur: '3:06', src: '/audio/Statement%201.wav',                     artwork: '/audio/artwork/statement.png' },
]


export default function Playlist() {
  const { playQueue, toggle, isPlaying, source, queueIndex } = useBrainFMPlayer()
  const isPlaylistActive = source === 'playlist'

  const handleTrack = (index: number) => {
    if (isPlaylistActive && queueIndex === index) {
      toggle()
    } else {
      playQueue(TRACKS, index)
    }
  }

  return (
    <div className="playlist">
      <div className="bg-gradient" />
      <div className="floating-orb orb-1" />
      <div className="floating-orb orb-2" />
      <div className="floating-orb orb-3" />

      <div className="player-container">
        <div className="header">
          <h1>Motivation Playlist</h1>
          <p className="subtitle">Music to fuel your ADHD superpowers</p>
          <p className="playlist-context">⚡ High-energy NEFFEX tracks that help me focus and push through tasks. Hits different with ADHD.</p>
        </div>

        <div className="player-label">🎧 Press play and start moving</div>

        <div className="track-list">
          {TRACKS.map((track, i) => {
            const isThisTrack = isPlaylistActive && queueIndex === i
            return (
              <button
                key={track.src}
                className={`track-row${isThisTrack ? ' active' : ''}`}
                onClick={() => handleTrack(i)}
                aria-label={`Play ${track.title}`}
              >
                <span className="track-num">
                  {isThisTrack && isPlaying ? (
                    <span className="track-equalizer">
                      <span /><span /><span />
                    </span>
                  ) : (
                    <span className="track-index">{i + 1}</span>
                  )}
                </span>
                {track.artwork && (
                  <img src={track.artwork} alt="" className="track-artwork" aria-hidden="true" />
                )}
                <span className="track-info">
                  <span className="track-title">{track.title}</span>
                  <span className="track-artist">{track.artist}</span>
                </span>
                <span className="track-duration">{track.dur}</span>
              </button>
            )
          })}
        </div>

        <p className="playlist-best-for">⚡ Best for: workouts, coding, deep work, cleaning, or getting unstuck.</p>
      </div>
    </div>
  )
}
