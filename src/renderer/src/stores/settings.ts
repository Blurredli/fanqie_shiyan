import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const workDuration = ref(25)
  const breakDuration = ref(5)
  const longBreakDuration = ref(15)
  const longBreakInterval = ref(4)
  const soundEnabled = ref(true)
  const theme = ref<'light' | 'dark'>('dark')

  function setTheme(newTheme: 'light' | 'dark') {
    theme.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  return {
    workDuration, breakDuration, longBreakDuration,
    longBreakInterval, soundEnabled, theme,
    setTheme, applyTheme
  }
}, {
  persist: {
    pick: ['workDuration', 'breakDuration', 'longBreakDuration',
           'longBreakInterval', 'soundEnabled', 'theme']
  }
})
