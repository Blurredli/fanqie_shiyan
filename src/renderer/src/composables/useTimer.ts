import { watch } from 'vue'
import { useTimerStore } from '../stores/timer'
import { useSettingsStore } from '../stores/settings'
import { useSound } from './useSound'

export function useTimer() {
  const timer = useTimerStore()
  const settings = useSettingsStore()
  const { playBeep } = useSound()

  let wasRunning = false

  watch(() => timer.timeRemaining, (remaining) => {
    if (remaining === 0 && wasRunning && settings.soundEnabled) {
      playBeep()
    }
    wasRunning = remaining > 0 && timer.isRunning
  })

  watch(() => timer.isRunning, (running) => {
    if (running) wasRunning = true
  })

  return { timer }
}
