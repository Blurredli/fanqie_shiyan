<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSettingsStore } from './stores/settings'
import { useTimer } from './composables/useTimer'
import TitleBar from './components/TitleBar.vue'
import TimerCircle from './components/TimerCircle.vue'
import TimerControls from './components/TimerControls.vue'
import TabBar from './components/TabBar.vue'
import HistoryView from './components/HistoryView.vue'
import StatsView from './components/StatsView.vue'
import SettingsView from './components/SettingsView.vue'
import CloseDialog from './components/CloseDialog.vue'

const settings = useSettingsStore()
const activeTab = ref<'timer' | 'history' | 'stats' | 'settings'>('timer')
const showCloseDialog = ref(false)

useTimer()

onMounted(() => {
  settings.applyTheme()
})

function openCloseDialog() {
  showCloseDialog.value = true
}

function handleMinimize() {
  showCloseDialog.value = false
  window.electronAPI.closeToTray()
}

function handleQuit() {
  showCloseDialog.value = false
  window.electronAPI.quit()
}
</script>

<template>
  <div class="app-container">
    <TitleBar @request-close="openCloseDialog" />
    <main class="content">
      <template v-if="activeTab === 'timer'">
        <TimerCircle />
        <TimerControls />
      </template>
      <HistoryView v-else-if="activeTab === 'history'" />
      <StatsView v-else-if="activeTab === 'stats'" />
      <SettingsView v-else-if="activeTab === 'settings'" />
    </main>
    <TabBar v-model:activeTab="activeTab" />
    <CloseDialog
      :visible="showCloseDialog"
      @minimize="handleMinimize"
      @close="handleQuit"
    />
  </div>
</template>
