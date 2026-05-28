<script setup lang="ts">
import { useSettingsStore, type SoundType } from '../stores/settings'
import { useTimerStore } from '../stores/timer'
import { useSound } from '../composables/useSound'
import { watch } from 'vue'

const settings = useSettingsStore()
const timer = useTimerStore()
const { play } = useSound()

const soundOptions: { key: SoundType; label: string; desc: string }[] = [
  { key: 'chime',  label: '清脆铃声', desc: '三音阶上行和弦' },
  { key: 'piano',  label: '轻柔钢琴', desc: '舒缓钢琴旋律' },
  { key: 'bowl',   label: '颂钵冥想', desc: '深沉共振泛音' },
  { key: 'forest', label: '森林鸟鸣', desc: '自然鸟鸣环境音' },
  { key: 'beep',   label: '经典蜂鸣', desc: '简短提示音' },
]

function previewSound(type: SoundType) {
  play(type)
}

watch(() => [settings.workDuration, settings.breakDuration, settings.longBreakDuration], () => {
  if (!timer.isRunning) {
    timer.reset()
  }
})
</script>

<template>
  <div class="settings-view">
    <h2 class="view-title">设置</h2>

    <div class="setting-group">
      <div class="setting-item">
        <label class="setting-label">专注时长</label>
        <div class="setting-control">
          <input
            type="range"
            v-model.number="settings.workDuration"
            min="1" max="60" step="1"
            class="range-input"
          />
          <span class="setting-value">{{ settings.workDuration }}分钟</span>
        </div>
      </div>

      <div class="setting-item">
        <label class="setting-label">休息时长</label>
        <div class="setting-control">
          <input
            type="range"
            v-model.number="settings.breakDuration"
            min="1" max="30" step="1"
            class="range-input"
          />
          <span class="setting-value">{{ settings.breakDuration }}分钟</span>
        </div>
      </div>

      <div class="setting-item">
        <label class="setting-label">长休息时长</label>
        <div class="setting-control">
          <input
            type="range"
            v-model.number="settings.longBreakDuration"
            min="10" max="30" step="1"
            class="range-input"
          />
          <span class="setting-value">{{ settings.longBreakDuration }}分钟</span>
        </div>
      </div>

      <div class="setting-item">
        <label class="setting-label">长休息间隔</label>
        <div class="setting-control">
          <input
            type="range"
            v-model.number="settings.longBreakInterval"
            min="2" max="8" step="1"
            class="range-input"
          />
          <span class="setting-value">每{{ settings.longBreakInterval }}个番茄</span>
        </div>
      </div>
    </div>

    <div class="setting-group">
      <div class="setting-item toggle-item">
        <label class="setting-label">自动休息</label>
        <button
          class="toggle-btn"
          :class="{ on: settings.autoStartBreak }"
          @click="settings.autoStartBreak = !settings.autoStartBreak"
        >
          <span class="toggle-knob"></span>
        </button>
      </div>

      <div class="setting-item toggle-item">
        <label class="setting-label">声音提醒</label>
        <button
          class="toggle-btn"
          :class="{ on: settings.soundEnabled }"
          @click="settings.soundEnabled = !settings.soundEnabled"
        >
          <span class="toggle-knob"></span>
        </button>
      </div>

      <div v-if="settings.soundEnabled" class="setting-item sound-item">
        <label class="setting-label">提示音</label>
        <div class="sound-list">
          <div
            v-for="opt in soundOptions"
            :key="opt.key"
            class="sound-option"
            :class="{ active: settings.soundType === opt.key }"
            @click="settings.soundType = opt.key"
          >
            <div class="sound-info">
              <span class="sound-name">{{ opt.label }}</span>
              <span class="sound-desc">{{ opt.desc }}</span>
            </div>
            <button class="sound-preview" @click.stop="previewSound(opt.key)" title="试听">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="setting-item toggle-item">
        <label class="setting-label">主题</label>
        <div class="theme-switch">
          <button
            class="theme-btn"
            :class="{ active: settings.theme === 'dark' }"
            @click="settings.setTheme('dark')"
          >深色</button>
          <button
            class="theme-btn"
            :class="{ active: settings.theme === 'light' }"
            @click="settings.setTheme('light')"
          >浅色</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-view {
  width: 100%;
  height: 100%;
}

.view-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--text-primary);
}

.setting-group {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 4px 0;
  margin-bottom: 16px;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}

.setting-item + .setting-item {
  border-top: 1px solid var(--border-color);
}

.setting-label {
  font-size: 14px;
  color: var(--text-primary);
  white-space: nowrap;
  min-width: 80px;
}

.setting-control {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  justify-content: flex-end;
}

.range-input {
  width: 100px;
  accent-color: var(--accent-work);
  cursor: pointer;
}

.setting-value {
  font-size: 13px;
  color: var(--text-secondary);
  min-width: 64px;
  text-align: right;
}

.toggle-btn {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: none;
  background: var(--border-color);
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
  padding: 0;
}

.toggle-btn.on {
  background: var(--accent-work);
}

.toggle-knob {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.2s;
}

.toggle-btn.on .toggle-knob {
  transform: translateX(20px);
}

.theme-switch {
  display: flex;
  background: var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.theme-btn {
  border: none;
  background: transparent;
  padding: 6px 14px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
}

.theme-btn.active {
  background: var(--accent-work);
  color: #fff;
}

/* Sound selector */
.sound-item {
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
}

.sound-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sound-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.15s;
}

.sound-option:hover {
  border-color: var(--accent-work);
}

.sound-option.active {
  border-color: var(--accent-work);
  background: rgba(231, 76, 60, 0.08);
}

.sound-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sound-name {
  font-size: 13px;
  color: var(--text-primary);
  font-weight: 500;
}

.sound-desc {
  font-size: 11px;
  color: var(--text-secondary);
}

.sound-preview {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  padding: 0;
}

.sound-preview:hover {
  border-color: var(--accent-work);
  color: var(--accent-work);
}
</style>
