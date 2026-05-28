<script setup lang="ts">
const activeTab = defineModel<'timer' | 'history' | 'stats' | 'settings'>('activeTab', { default: 'timer' })

const tabs = [
  {
    key: 'timer' as const,
    label: '计时',
    icon: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.3-4.5-2.7V7z'
  },
  {
    key: 'history' as const,
    label: '历史',
    icon: 'M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z'
  },
  {
    key: 'stats' as const,
    label: '统计',
    icon: 'M5 20h14v-2H5v2zm0-4h3v-6H5v6zm5 0h3V4h-3v12zm5 0h3v-8h-3v8z'
  },
  {
    key: 'settings' as const,
    label: '设置',
    icon: 'M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96a7.05 7.05 0 00-1.62-.94l-.36-2.54a.48.48 0 00-.48-.41h-3.84a.48.48 0 00-.48.41l-.36 2.54c-.59.22-1.13.54-1.62.94l-2.39-.96a.49.49 0 00-.59.22L2.74 8.87a.48.48 0 00.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.26.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1115.6 12 3.61 3.61 0 0112 15.6z'
  }
] as const
</script>

<template>
  <div class="tabbar">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      class="tab-item"
      :class="{ active: activeTab === tab.key }"
      @click="activeTab = tab.key"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" :fill="activeTab === tab.key ? 'var(--tab-active)' : 'var(--tab-inactive)'">
        <path :d="tab.icon" />
      </svg>
      <span class="tab-label">{{ tab.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.tabbar {
  display: flex;
  height: 52px;
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--tab-inactive);
  transition: color 0.15s;
}

.tab-item.active {
  color: var(--tab-active);
}

.tab-label {
  font-size: 11px;
  font-weight: 500;
}
</style>
