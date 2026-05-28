<script setup lang="ts">
import { useTimerStore } from '../stores/timer'

const timer = useTimerStore()
const RADIUS = 90
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
</script>

<template>
  <div class="timer-circle-wrapper">
    <svg viewBox="0 0 200 200" class="timer-svg">
      <circle
        cx="100" cy="100" :r="RADIUS"
        fill="none"
        :stroke="'var(--border-color)'"
        stroke-width="8"
        class="progress-track"
      />
      <circle
        cx="100" cy="100" :r="RADIUS"
        fill="none"
        :stroke="timer.accentColor"
        stroke-width="8"
        stroke-linecap="round"
        :stroke-dasharray="CIRCUMFERENCE"
        :stroke-dashoffset="CIRCUMFERENCE * (1 - timer.progress)"
        class="progress-fill"
        transform="rotate(-90 100 100)"
      />
    </svg>
    <div class="timer-text">
      <div class="timer-digits">
        {{ timer.displayMinutes }}:{{ timer.displaySeconds }}
      </div>
      <div class="timer-label" :style="{ color: timer.accentColor }">
        {{ timer.sessionLabel }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.timer-circle-wrapper {
  position: relative;
  width: 220px;
  height: 220px;
  margin: 20px auto 10px;
}

.timer-svg {
  width: 100%;
  height: 100%;
}

.progress-track {
  opacity: 0.3;
}

.progress-fill {
  transition: stroke-dashoffset 0.5s ease;
}

.timer-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.timer-digits {
  font-size: 48px;
  font-weight: 300;
  font-variant-numeric: tabular-nums;
  color: var(--text-primary);
  line-height: 1;
}

.timer-label {
  font-size: 16px;
  margin-top: 8px;
  font-weight: 500;
}
</style>
