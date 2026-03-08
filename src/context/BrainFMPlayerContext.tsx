import { createContext, useContext, useEffect, useRef, useState } from 'react'

const BRAINFM_SRC = '/audio/Geode%20Grooves%20Focus%20Deep%20Work.wav'

export interface TrackMeta { title: string; artist: string; src: string; artwork?: string }
export type AudioSource = 'brainfm' | 'playlist'

interface BrainFMPlayerContextValue {
  isPlaying: boolean
  isMuted: boolean
  currentTime: number
  duration: number
  progress: number
  hasBeenActivated: boolean
  source: AudioSource
  trackMeta: TrackMeta
  queueIndex: number
  queueLength: number
  audioContext: AudioContext | null
  analyserNode: AnalyserNode | null
  play: () => void
  pause: () => void
  toggle: () => void
  mute: () => void
  seek: (fraction: number) => void
  loadTrack: (src: string, meta: Omit<TrackMeta, 'src'>) => void
  playQueue: (tracks: TrackMeta[], startIndex?: number) => void
  nextTrack: () => void
  prevTrack: () => void
  playBrainFM: () => void
}

const BrainFMPlayerContext = createContext<BrainFMPlayerContextValue>({
  isPlaying: false,
  isMuted: false,
  currentTime: 0,
  duration: 0,
  progress: 0,
  hasBeenActivated: false,
  source: 'brainfm',
  trackMeta: { title: 'Geo Grooves', artist: 'Brain.fm', src: BRAINFM_SRC },
  queueIndex: -1,
  queueLength: 0,
  audioContext: null,
  analyserNode: null,
  play: () => {},
  pause: () => {},
  toggle: () => {},
  mute: () => {},
  seek: () => {},
  loadTrack: () => {},
  playQueue: () => {},
  nextTrack: () => {},
  prevTrack: () => {},
  playBrainFM: () => {},
})

export function BrainFMPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [hasBeenActivated, setHasBeenActivated] = useState(false)
  const [source, setSource] = useState<AudioSource>('brainfm')
  const [trackMeta, setTrackMeta] = useState<TrackMeta>({
    title: 'Geo Grooves', artist: 'Brain.fm', src: BRAINFM_SRC,
  })
  const [queueIndex, setQueueIndex] = useState(-1)

  // Refs so onEnded closure always sees latest values
  const queueRef = useRef<TrackMeta[]>([])
  const queueIndexRef = useRef(-1)

  const setQueueIdx = (idx: number) => {
    queueIndexRef.current = idx
    setQueueIndex(idx)
  }

  const switchSrc = (src: string, meta: Omit<TrackMeta, 'src'>) => {
    const audio = audioRef.current
    if (!audio) return
    initAudioContext()
    if (audioCtxRef.current?.state === 'suspended') audioCtxRef.current.resume()
    audio.pause()
    audio.src = src
    audio.load()
    audio.play().catch(() => {})
    setTrackMeta({ ...meta, src })
    setHasBeenActivated(true)
  }

  useEffect(() => {
    const audio = new Audio(BRAINFM_SRC)
    audio.preload = 'metadata'
    audioRef.current = audio

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      setProgress((audio.currentTime / (audio.duration || 1)) * 100)
    }
    const onMetadata = () => setDuration(audio.duration)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      setCurrentTime(0)
      // Auto-advance queue
      const nextIdx = queueIndexRef.current + 1
      if (nextIdx < queueRef.current.length) {
        const next = queueRef.current[nextIdx]
        queueIndexRef.current = nextIdx
        setQueueIndex(nextIdx)
        const a = audioRef.current
        if (!a) return
        a.src = next.src
        a.load()
        a.play().catch(() => {})
        setTrackMeta(next)
      }
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onMetadata)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onMetadata)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audio.src = ''
    }
  }, [])

  const initAudioContext = () => {
    if (audioCtxRef.current || !audioRef.current) return
    const ctx = new AudioContext()
    const source = ctx.createMediaElementSource(audioRef.current)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 2048
    source.connect(analyser)
    analyser.connect(ctx.destination)
    audioCtxRef.current = ctx
    analyserRef.current = analyser
    setAudioContext(ctx)
    setAnalyserNode(analyser)
  }

  const play = () => {
    initAudioContext()
    if (audioCtxRef.current?.state === 'suspended') audioCtxRef.current.resume()
    audioRef.current?.play().catch(() => {})
    setHasBeenActivated(true)
  }
  const pause = () => audioRef.current?.pause()
  const toggle = () => {
    if (audioRef.current?.paused) play()
    else pause()
  }
  const mute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }
  const seek = (fraction: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = fraction * (audio.duration || 0)
  }

  const playBrainFM = () => {
    queueRef.current = []
    setQueueIdx(-1)
    setSource('brainfm')
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.src = BRAINFM_SRC
    audio.load()
    initAudioContext()
    if (audioCtxRef.current?.state === 'suspended') audioCtxRef.current.resume()
    audio.play().catch(err => console.error('[playBrainFM] play() failed:', err))
    setTrackMeta({ title: 'Geo Grooves', artist: 'Brain.fm', src: BRAINFM_SRC })
    setHasBeenActivated(true)
  }

  const loadTrack = (src: string, meta: Omit<TrackMeta, 'src'>) => {
    queueRef.current = []
    setQueueIdx(-1)
    setSource('playlist')
    switchSrc(src, meta)
  }

  const playQueue = (tracks: TrackMeta[], startIndex = 0) => {
    if (!tracks.length) return
    queueRef.current = tracks
    setQueueIdx(startIndex)
    setSource('playlist')
    switchSrc(tracks[startIndex].src, tracks[startIndex])
  }

  const nextTrack = () => {
    const idx = queueIndexRef.current + 1
    if (idx < queueRef.current.length) {
      const track = queueRef.current[idx]
      setQueueIdx(idx)
      switchSrc(track.src, track)
    }
  }

  const prevTrack = () => {
    const audio = audioRef.current
    // If more than 3s in, restart current track
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }
    const idx = Math.max(0, queueIndexRef.current - 1)
    if (idx !== queueIndexRef.current) {
      const track = queueRef.current[idx]
      setQueueIdx(idx)
      switchSrc(track.src, track)
    }
  }

  return (
    <BrainFMPlayerContext.Provider
      value={{
        isPlaying, isMuted, currentTime, duration, progress, hasBeenActivated,
        source, trackMeta, queueIndex, queueLength: queueRef.current.length,
        audioContext, analyserNode,
        play, pause, toggle, mute, seek, loadTrack, playQueue, nextTrack, prevTrack, playBrainFM,
      }}
    >
      {children}
    </BrainFMPlayerContext.Provider>
  )
}

export function useBrainFMPlayer() {
  return useContext(BrainFMPlayerContext)
}
