<script setup lang="ts">
import { useHistoryStore } from '../stores/history'

const history = useHistoryStore()
</script>

<template>
  <div class="stats-view">
    <h2 class="view-title">今日统计</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">{{ history.todayCompletedPomodoros }}</div>
        <div class="stat-label">完成番茄</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ history.todayFocusMinutes }}<span class="stat-unit">分钟</span></div>
        <div class="stat-label">专注时间</div>
      </div>
    </div>
    <div v-if="history.todayCompletedPomodoros === 0" class="stats-empty">
      <p>今天还没有完成的番茄钟</p>
    </div>
  </div>
</template>

<style scoped>
.stats-view {
  width: 100%;
  height: 100%;
}

.view-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--text-primary);
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.stat-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px 16px;
  text-align: center;
}

.stat-number {
  font-size: 36px;
  font-weight: 300;
  color: var(--accent-work);
  line-height: 1.2;
}

.stat-unit {
  font-size: 14px;
  margin-left: 2px;
  opacity: 0.7;
}

.stat-label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 6px;
}

.stats-empty {
  text-align: center;
  padding: 20px;
  color: var(--text-secondary);
  font-size: 14px;
}
</style>
