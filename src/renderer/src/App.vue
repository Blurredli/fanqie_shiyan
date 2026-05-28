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

const settings = useSettingsStore()
const activeTab = ref<'timer' | 'history' | 'stats' | 'settings'>('timer')

useTimer()

onMounted(() => {
  settings.applyTheme()
})
</script>

<template>
  <div class="app-container">
    <TitleBar />
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
  </div>
</template>
