import { useEffect, useRef, useState } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'
import { useBrainFMPlayer } from '../context/BrainFMPlayerContext'
import '../styles/Visualizer.css'

interface Props {
  active: boolean
  width: number
  height: number
}

export default function Visualizer({ active, width, height }: Props) {
  const { isPlaying, audioContext, analyserNode } = useBrainFMPlayer()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const vizRef = useRef<any>(null)
  const rafRef = useRef<number>(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (!active || !audioContext || !analyserNode || !canvasRef.current) return

    let cancelled = false

    async function init() {
      try {
        const bcMod = await import('butterchurn')
        const butterchurn: any = (bcMod as any).default ?? bcMod

        const bcPresets = await import('butterchurn-presets')
        const butterchurnPresets: any = (bcPresets as any).default ?? bcPresets

        if (cancelled || !canvasRef.current) return

        const viz = butterchurn.createVisualizer(audioContext, canvasRef.current, { width, height })
        viz.connectAudio(analyserNode)

        const presets = butterchurnPresets.getPresets()
        const names = Object.keys(presets)
        viz.loadPreset(presets[names[Math.floor(Math.random() * names.length)]], 0.0)

        vizRef.current = viz

        const loop = () => {
          if (cancelled) return
          vizRef.current?.render()
          rafRef.current = requestAnimationFrame(loop)
        }
        loop()
      } catch (err) {
        console.error('[Visualizer] init failed:', err)
      }
    }

    init()

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      vizRef.current = null
    }
  }, [active, audioContext, analyserNode, width, height])

  // Handle fullscreen resize
  useEffect(() => {
    const onFsChange = () => {
      const fs = !!document.fullscreenElement
      setIsFullscreen(fs)
      if (vizRef.current) {
        vizRef.current.setRendererSize(
          fs ? window.innerWidth : width,
          fs ? window.innerHeight : height
        )
      }
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [width, height])

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!document.fullscreenElement) {
      wrapRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const cyclePreset = async () => {
    if (!vizRef.current) return
    try {
      const bcPresets = await import('butterchurn-presets')
      const butterchurnPresets: any = (bcPresets as any).default ?? bcPresets
      const presets = butterchurnPresets.getPresets()
      const names = Object.keys(presets)
      vizRef.current.loadPreset(presets[names[Math.floor(Math.random() * names.length)]], 1.5)
    } catch (err) {
      console.error('[Visualizer] cyclePreset failed:', err)
    }
  }

  if (!active) return null

  return (
    <div ref={wrapRef} className={`viz-wrap${isFullscreen ? ' viz-fullscreen' : ''}`}>
      <canvas
        ref={canvasRef}
        className={`viz-canvas${isPlaying ? '' : ' viz-paused'}`}
        width={isFullscreen ? window.innerWidth : width}
        height={isFullscreen ? window.innerHeight : height}
        onDoubleClick={cyclePreset}
      />
      <button
        className="viz-fullscreen-btn"
        onClick={toggleFullscreen}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
      >
        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
      </button>
      {!isFullscreen && (
        <div className="viz-hint">double-click to change preset</div>
      )}
    </div>
  )
}
