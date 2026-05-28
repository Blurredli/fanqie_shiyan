import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface SessionRecord {
  id: string
  date: string
  type: 'work' | 'break' | 'longBreak'
  duration: number
  completed: boolean
}

export const useHistoryStore = defineStore('history', () => {
  const sessions = ref<SessionRecord[]>([])

  const todaySessions = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return sessions.value.filter(s => s.date.startsWith(today))
  })

  const todayCompletedPomodoros = computed(() =>
    todaySessions.value.filter(s => s.type === 'work' && s.completed).length
  )

  const todayFocusMinutes = computed(() => {
    const workSessions = todaySessions.value.filter(s => s.type === 'work' && s.completed)
    return workSessions.reduce((sum, s) => sum + Math.floor(s.duration / 60), 0)
  })

  function addSession(session: Omit<SessionRecord, 'id'>) {
    sessions.value.push({
      ...session,
      id: crypto.randomUUID()
    })
  }

  function clearHistory() {
    sessions.value = []
  }

  return {
    sessions, todaySessions, todayCompletedPomodoros, todayFocusMinutes,
    addSession, clearHistory
  }
}, {
  persist: {
    pick: ['sessions']
  }
})
