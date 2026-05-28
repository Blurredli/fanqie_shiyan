<script setup lang="ts">
import { useTimerStore } from '../stores/timer'

const timer = useTimerStore()
</script>

<template>
  <div class="timer-controls">
    <button v-if="!timer.isRunning" @click="timer.start" class="btn btn-primary">
      <svg width="18" height="18" viewBox="0 0 18 18">
        <polygon points="3,1 15,9 3,17" fill="currentColor"/>
      </svg>
      开始
    </button>
    <button v-else @click="timer.pause" class="btn btn-secondary">
      <svg width="18" height="18" viewBox="0 0 18 18">
        <rect x="2" y="1" width="5" height="16" rx="1" fill="currentColor"/>
        <rect x="11" y="1" width="5" height="16" rx="1" fill="currentColor"/>
      </svg>
      暂停
    </button>
    <button @click="timer.reset" class="btn btn-ghost">
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path d="M9 2a7 7 0 1 1-5 2.24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <polygon points="2,2 6,2 4,6" fill="currentColor"/>
      </svg>
      重置
    </button>
  </div>
</template>

<style scoped>
.timer-controls {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.1s;
}

.btn:active {
  transform: scale(0.97);
}

.btn-primary {
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.btn-secondary {
  background: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
}

.btn-ghost {
  background: var(--btn-ghost-bg);
  color: var(--btn-ghost-text);
}

.btn:hover {
  opacity: 0.85;
}
</style>
