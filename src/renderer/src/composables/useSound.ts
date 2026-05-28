import type { SoundType } from '../stores/settings'

export function useSound() {
  let audioCtx: AudioContext | null = null

  function getCtx(): AudioContext {
    if (!audioCtx) {
      audioCtx = new AudioContext()
    }
    return audioCtx
  }

  function play(type: SoundType) {
    switch (type) {
      case 'beep': playBeep(); break
      case 'chime': playChime(); break
      case 'forest': playForest(); break
      case 'bowl': playBowl(); break
      case 'piano': playPiano(); break
    }
  }

  // 经典蜂鸣音 - 0.5s
  function playBeep() {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 800
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.5)
  }

  // 清脆铃声 - 3s，三音阶上行铃声
  function playChime() {
    const ctx = getCtx()
    const freqs = [523.25, 659.25, 783.99] // C5, E5, G5
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = freq
      osc.type = 'sine'
      const start = ctx.currentTime + i * 0.3
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.2, start + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 2.5)
      osc.start(start)
      osc.stop(start + 2.5)
    })
    // 泛音层
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.frequency.value = 1046.5 // C6
    osc2.type = 'sine'
    gain2.gain.setValueAtTime(0, ctx.currentTime + 0.6)
    gain2.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.65)
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3)
    osc2.start(ctx.currentTime + 0.6)
    osc2.stop(ctx.currentTime + 3)
  }

  // 森林鸟鸣 - 4s，轻柔的高频颤音模拟鸟鸣
  function playForest() {
    const ctx = getCtx()
    // 底层环境音 - 低频舒缓
    const pad = ctx.createOscillator()
    const padGain = ctx.createGain()
    pad.connect(padGain)
    padGain.connect(ctx.destination)
    pad.frequency.value = 220
    pad.type = 'sine'
    padGain.gain.setValueAtTime(0, ctx.currentTime)
    padGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.5)
    padGain.gain.setValueAtTime(0.08, ctx.currentTime + 3)
    padGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4)
    pad.start(ctx.currentTime)
    pad.stop(ctx.currentTime + 4)

    // 鸟鸣 - 多段快速频率滑动
    const chirps = [
      { time: 0.3, freq: 1800, end: 2400, dur: 0.15 },
      { time: 0.6, freq: 2000, end: 2600, dur: 0.12 },
      { time: 1.2, freq: 1600, end: 2200, dur: 0.18 },
      { time: 1.5, freq: 2200, end: 2800, dur: 0.1 },
      { time: 2.2, freq: 1900, end: 2500, dur: 0.15 },
      { time: 2.8, freq: 2100, end: 2700, dur: 0.13 },
    ]
    chirps.forEach(c => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      const t = ctx.currentTime + c.time
      osc.frequency.setValueAtTime(c.freq, t)
      osc.frequency.linearRampToValueAtTime(c.end, t + c.dur)
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.12, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, t + c.dur + 0.1)
      osc.start(t)
      osc.stop(t + c.dur + 0.15)
    })
  }

  // 颂钵冥想 - 4s，深沉共振的泛音列
  function playBowl() {
    const ctx = getCtx()
    const fundamentals = [174, 261.63, 349.23] // F3, C4, F4
    fundamentals.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = freq
      osc.type = 'sine'
      const start = ctx.currentTime + i * 0.8
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.15 - i * 0.03, start + 0.3)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 3.5)
      osc.start(start)
      osc.stop(start + 3.5)
      // 轻微的频率抖动模拟真实颂钵
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.connect(lfoGain)
      lfoGain.connect(osc.frequency)
      lfo.frequency.value = 3 + i
      lfoGain.gain.value = freq * 0.002
      lfo.start(start)
      lfo.stop(start + 3.5)
    })
    // 高频泛音
    const harm = ctx.createOscillator()
    const harmGain = ctx.createGain()
    harm.connect(harmGain)
    harmGain.connect(ctx.destination)
    harm.frequency.value = 523.25
    harm.type = 'sine'
    harmGain.gain.setValueAtTime(0, ctx.currentTime + 0.5)
    harmGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.8)
    harmGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4)
    harm.start(ctx.currentTime + 0.5)
    harm.stop(ctx.currentTime + 4)
  }

  // 轻柔钢琴 - 3.5s，多泛音模拟钢琴音色
  function playPiano() {
    const ctx = getCtx()
    const notes = [
      { freq: 261.63, time: 0,    vol: 0.15 },  // C4
      { freq: 329.63, time: 0.4,  vol: 0.12 },  // E4
      { freq: 392.00, time: 0.8,  vol: 0.12 },  // G4
      { freq: 523.25, time: 1.2,  vol: 0.10 },  // C5
    ]
    notes.forEach(n => {
      const t = ctx.currentTime + n.time
      // 基频
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = n.freq
      osc.type = 'triangle'
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(n.vol, t + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5)
      osc.start(t)
      osc.stop(t + 2.5)
      // 泛音 (2倍频)
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.frequency.value = n.freq * 2
      osc2.type = 'sine'
      gain2.gain.setValueAtTime(0, t)
      gain2.gain.linearRampToValueAtTime(n.vol * 0.3, t + 0.01)
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 1.5)
      osc2.start(t)
      osc2.stop(t + 1.5)
      // 泛音 (3倍频)
      const osc3 = ctx.createOscillator()
      const gain3 = ctx.createGain()
      osc3.connect(gain3)
      gain3.connect(ctx.destination)
      osc3.frequency.value = n.freq * 3
      osc3.type = 'sine'
      gain3.gain.setValueAtTime(0, t)
      gain3.gain.linearRampToValueAtTime(n.vol * 0.1, t + 0.01)
      gain3.gain.exponentialRampToValueAtTime(0.001, t + 1)
      osc3.start(t)
      osc3.stop(t + 1)
    })
  }

  return { play }
}
