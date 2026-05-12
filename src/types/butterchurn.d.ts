declare module 'butterchurn' {
  interface Visualizer {
    connectAudio(analyserNode: AnalyserNode): void
    loadPreset(preset: object, blendTime: number): void
    render(): void
    setRendererSize(width: number, height: number): void
  }
  const butterchurn: {
    createVisualizer(
      audioContext: AudioContext,
      canvas: HTMLCanvasElement,
      opts: { width: number; height: number }
    ): Visualizer
  }
  export default butterchurn
}

declare module 'butterchurn-presets' {
  const butterchurnPresets: {
    getPresets(): Record<string, object>
  }
  export default butterchurnPresets
}

declare module 'butterchurn-presets/lib/butterchurnPresetsMinimal.min.js' {
  const butterchurnPresetsMinimal: {
    getPresets(): Record<string, object>
  }
  export default butterchurnPresetsMinimal
}
