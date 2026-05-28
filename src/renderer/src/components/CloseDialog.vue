<script setup lang="ts">
import { useTimerStore } from '../stores/timer'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{
  close: []
  minimize: []
}>()

const timer = useTimerStore()

function handleMinimize() {
  emit('minimize')
}

function handleClose() {
  emit('close')
}

function handleBackdrop() {
  // 计时中默认最小化，否则关闭
  if (timer.isRunning) {
    handleMinimize()
  } else {
    handleClose()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="visible" class="dialog-backdrop" @click.self="handleBackdrop">
        <div class="dialog-box">
          <div class="dialog-header">
            <svg class="dialog-icon" width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="var(--accent-work)" stroke-width="1.5"/>
              <path d="M12 7v6" stroke="var(--accent-work)" stroke-width="2" stroke-linecap="round"/>
              <circle cx="12" cy="16.5" r="1" fill="var(--accent-work)"/>
            </svg>
            <span class="dialog-title">关闭番茄钟</span>
          </div>
          <p v-if="timer.isRunning" class="dialog-hint">计时器正在运行中，最小化到托盘可继续计时</p>
          <p v-else class="dialog-hint">选择如何处理窗口</p>
          <div class="dialog-actions">
            <button class="dialog-btn btn-minimize" @click="handleMinimize">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12h18M3 12l4-4M3 12l4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              最小化到托盘
            </button>
            <button class="dialog-btn btn-quit" @click="handleClose">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>
              </svg>
              退出
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-box {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  padding: 24px;
  width: 280px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.dialog-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.dialog-hint {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 20px;
  line-height: 1.5;
}

.dialog-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dialog-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-minimize {
  background: var(--accent-work);
  color: #fff;
  font-weight: 500;
}

.btn-minimize:hover {
  opacity: 0.9;
}

.btn-quit {
  background: var(--btn-secondary-bg);
  color: var(--text-secondary);
}

.btn-quit:hover {
  color: var(--text-primary);
}

/* Transition */
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-enter-active .dialog-box,
.dialog-leave-active .dialog-box {
  transition: transform 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .dialog-box,
.dialog-leave-to .dialog-box {
  transform: scale(0.95);
}
</style>
