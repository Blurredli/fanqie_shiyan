<script setup lang="ts">
import { useHistoryStore } from '../stores/history'

const history = useHistoryStore()

function formatTime(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  return `${m}分钟`
}

function getTypeLabel(type: string): string {
  switch (type) {
    case 'work': return '专注'
    case 'break': return '休息'
    case 'longBreak': return '长休息'
    default: return type
  }
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'work': return 'var(--accent-work)'
    case 'break': return 'var(--accent-break)'
    case 'longBreak': return 'var(--accent-long-break)'
    default: return 'var(--text-secondary)'
  }
}
</script>

<template>
  <div class="history-view">
    <h2 class="view-title">专注历史</h2>
    <div v-if="history.sessions.length === 0" class="empty-state">
      <p>暂无记录</p>
      <p class="empty-hint">完成一个番茄钟后将在这里显示</p>
    </div>
    <div v-else class="session-list">
      <div
        v-for="session in [...history.sessions].reverse()"
        :key="session.id"
        class="session-item"
      >
        <div class="session-type" :style="{ color: getTypeColor(session.type) }">
          {{ getTypeLabel(session.type) }}
        </div>
        <div class="session-info">
          <span class="session-time">{{ formatTime(session.date) }}</span>
          <span class="session-duration">{{ formatDuration(session.duration) }}</span>
        </div>
        <div class="session-status" :class="{ completed: session.completed }">
          {{ session.completed ? '✓' : '✗' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-view {
  width: 100%;
  height: 100%;
}

.view-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.empty-state {
  text-align: center;
  padding: 40px 0;
  color: var(--text-secondary);
}

.empty-hint {
  font-size: 13px;
  margin-top: 8px;
  opacity: 0.7;
}

.session-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 320px;
  overflow-y: auto;
}

.session-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.session-type {
  font-size: 14px;
  font-weight: 600;
  min-width: 48px;
}

.session-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.session-time {
  font-size: 13px;
  color: var(--text-secondary);
}

.session-duration {
  font-size: 12px;
  color: var(--text-secondary);
  opacity: 0.7;
}

.session-status {
  font-size: 16px;
  color: var(--accent-work);
}

.session-status.completed {
  color: var(--accent-break);
}
</style>
