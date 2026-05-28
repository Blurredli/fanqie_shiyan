import { watch } from 'vue'
import { useTimerStore } from '../stores/timer'
import { useSettingsStore } from '../stores/settings'
import { useSound } from './useSound'

export function useTimer() {
  const timer = useTimerStore()
  const settings = useSettingsStore()
  const { play } = useSound()

  let prevRemaining = timer.timeRemaining

  watch(() => timer.timeRemaining, (remaining) => {
    if (remaining === 0 && prevRemaining > 0 && settings.soundEnabled) {
      play(settings.soundType)
    }
    prevRemaining = remaining
  })

  return { timer }
}
