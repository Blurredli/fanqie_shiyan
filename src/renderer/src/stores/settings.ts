import { defineStore } from 'pinia'
import { ref } from 'vue'

export type SoundType = 'beep' | 'chime' | 'forest' | 'bowl' | 'piano'
export type ThemeType = 'dark' | 'pure-black' | 'midnight' | 'warm' | 'light'

export const useSettingsStore = defineStore('settings', () => {
  const workDuration = ref(25)
  const breakDuration = ref(5)
  const longBreakDuration = ref(15)
  const longBreakInterval = ref(4)
  const soundEnabled = ref(true)
  const soundType = ref<SoundType>('chime')
  const autoStartBreak = ref(false)
  const theme = ref<ThemeType>('dark')

  function setTheme(newTheme: ThemeType) {
    theme.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  return {
    workDuration, breakDuration, longBreakDuration,
    longBreakInterval, soundEnabled, soundType, autoStartBreak, theme,
    setTheme, applyTheme
  }
}, {
  persist: {
    pick: ['workDuration', 'breakDuration', 'longBreakDuration',
           'longBreakInterval', 'soundEnabled', 'soundType', 'autoStartBreak', 'theme']
  }
})
