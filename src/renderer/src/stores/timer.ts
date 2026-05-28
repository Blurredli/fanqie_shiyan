import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useSettingsStore } from './settings'
import { useHistoryStore } from './history'

export type SessionType = 'work' | 'break' | 'longBreak'

export const useTimerStore = defineStore('timer', () => {
  const settings = useSettingsStore()
  const history = useHistoryStore()

  const sessionType = ref<SessionType>('work')
  const timeRemaining = ref(settings.workDuration * 60)
  const isRunning = ref(false)
  const completedPomodoros = ref(0)

  let intervalId: ReturnType<typeof setInterval> | null = null

  const totalTime = computed(() => {
    switch (sessionType.value) {
      case 'work': return settings.workDuration * 60
      case 'break': return settings.breakDuration * 60
      case 'longBreak': return settings.longBreakDuration * 60
    }
  })

  const progress = computed(() => {
    if (totalTime.value === 0) return 0
    return 1 - (timeRemaining.value / totalTime.value)
  })

  const displayMinutes = computed(() =>
    String(Math.floor(timeRemaining.value / 60)).padStart(2, '0')
  )

  const displaySeconds = computed(() =>
    String(timeRemaining.value % 60).padStart(2, '0')
  )

  const sessionLabel = computed(() => {
    switch (sessionType.value) {
      case 'work': return '专注'
      case 'break': return '休息'
      case 'longBreak': return '长休息'
    }
  })

  const accentColor = computed(() => {
    switch (sessionType.value) {
      case 'work': return 'var(--accent-work)'
      case 'break': return 'var(--accent-break)'
      case 'longBreak': return 'var(--accent-long-break)'
    }
  })

  function start() {
    if (isRunning.value) return
    isRunning.value = true
    intervalId = setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--
      } else {
        completeSession()
      }
    }, 1000)
  }

  function pause() {
    isRunning.value = false
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function reset() {
    pause()
    timeRemaining.value = totalTime.value
  }

  function completeSession() {
    pause()

    history.addSession({
      date: new Date().toISOString(),
      type: sessionType.value,
      duration: totalTime.value,
      completed: true
    })

    if (sessionType.value === 'work') {
      completedPomodoros.value++
      if (completedPomodoros.value % settings.longBreakInterval === 0) {
        switchSession('longBreak')
      } else {
        switchSession('break')
      }
    } else {
      switchSession('work')
    }
  }

  function switchSession(type: SessionType) {
    sessionType.value = type
    switch (type) {
      case 'work': timeRemaining.value = settings.workDuration * 60; break
      case 'break': timeRemaining.value = settings.breakDuration * 60; break
      case 'longBreak': timeRemaining.value = settings.longBreakDuration * 60; break
    }
  }

  return {
    sessionType, timeRemaining, isRunning, completedPomodoros,
    totalTime, progress, displayMinutes, displaySeconds, sessionLabel, accentColor,
    start, pause, reset, completeSession, switchSession
  }
})
