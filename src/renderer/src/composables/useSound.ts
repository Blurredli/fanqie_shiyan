export function useSound() {
  let audioCtx: AudioContext | null = null

  function getAudioContext(): AudioContext {
    if (!audioCtx) {
      audioCtx = new AudioContext()
    }
    return audioCtx
  }

  function playBeep() {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.5)
  }

  return { playBeep }
}
