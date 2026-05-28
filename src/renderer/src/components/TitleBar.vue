<script setup lang="ts">
function minimize() { window.electronAPI.minimize() }
function close() { window.electronAPI.closeToTray() }
</script>

<template>
  <div class="titlebar">
    <div class="titlebar-drag">
      <span class="titlebar-title">Pomodoro</span>
    </div>
    <div class="titlebar-buttons">
      <button class="titlebar-btn" @click="minimize" title="最小化">
        <svg width="12" height="2" viewBox="0 0 12 2"><rect width="12" height="2" fill="currentColor"/></svg>
      </button>
      <button class="titlebar-btn titlebar-btn-close" @click="close" title="关闭到托盘">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  background: var(--titlebar-bg);
  -webkit-app-region: drag;
}

.titlebar-drag {
  display: flex;
  align-items: center;
  padding-left: 12px;
}

.titlebar-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
}

.titlebar-buttons {
  display: flex;
  -webkit-app-region: no-drag;
}

.titlebar-btn {
  width: 40px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.titlebar-btn:hover {
  background: rgba(255, 255, 255, 0.08);
}

.titlebar-btn-close:hover {
  background: #e74c3c;
  color: #fff;
}
</style>
