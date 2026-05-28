# CLAUDE.md — 项目上下文

## 项目简介

**Fanqie Shiyan（番茄实验）** — 一款桌面番茄钟应用，帮助用户专注工作、高效休息。

- **仓库**: https://github.com/Blurredli/fanqie_shiyan
- **当前版本**: v1.2.0
- **作者**: Mayn
- **许可证**: MIT

---

## 技术栈

| 技术 | 用途 |
|------|------|
| Electron 29 | 跨平台桌面框架，无边框窗口 + 系统托盘 |
| Vue 3 (Composition API) | 前端 UI，`<script setup>` 风格 |
| TypeScript | 类型安全 |
| Vite (via electron-vite) | 开发服务器 + 构建 |
| Pinia + pinia-plugin-persistedstate | 状态管理，自动持久化到 localStorage |
| CSS 变量 | 多主题系统，`data-theme` 属性切换 |
| Web Audio API | 程序化生成 5 种提示音，无外部音频文件 |
| electron-builder | Windows 打包（NSIS 安装包 + 便携版） |

---

## 项目结构

```
src/
  main/index.ts            # Electron 主进程：窗口、托盘、IPC
  preload/index.ts         # contextBridge 安全暴露 API
  renderer/src/
    App.vue                # 根组件，Tab 路由，关闭对话框
    main.ts                # Vue 入口，注册 Pinia
    env.d.ts               # window.electronAPI 类型声明
    stores/
      timer.ts             # 计时器状态机（work/break/longBreak 切换）
      history.ts           # 专注历史记录，今日统计
      settings.ts          # 用户设置（时长、音效、主题）
    components/
      TitleBar.vue         # 自定义标题栏（-webkit-app-region: drag）
      TimerCircle.vue      # SVG 圆形进度条 + 倒计时
      TimerControls.vue    # 开始/暂停/重置按钮
      TabBar.vue           # 底部 4 Tab 导航
      HistoryView.vue      # 历史记录列表
      StatsView.vue        # 今日统计卡片
      SettingsView.vue     # 设置页面（滑块、开关、主题卡片）
      CloseDialog.vue      # 关闭确认对话框（退出 vs 最小化）
    composables/
      useTimer.ts          # 计时器副作用（音效触发）
      useSound.ts          # 5 种 Web Audio API 音效生成器
    styles/
      variables.css        # 5 套主题 CSS 变量定义
      global.css           # 全局重置样式
```

---

## 核心功能

- **番茄计时器** — 25 分钟工作 / 5 分钟休息循环，SVG 圆环实时进度
- **自定义时长** — 工作(1-60)、休息(1-30)、长休息(10-30)、长休息间隔(2-8)
- **自动休息** — 可选开启，专注结束自动开始休息
- **5 种提示音** — Web Audio API 程序化生成：清脆铃声、轻柔钢琴、颂钵冥想、森林鸟鸣、经典蜂鸣（3-5 秒）
- **5 种主题** — 深蓝、现代黑(OLED)、深蓝夜空、暖色调、浅色
- **系统托盘** — 关闭时可最小化到托盘，不中断计时
- **关闭对话框** — 计时中默认最小化，停止时可选退出
- **每日统计** — 今日番茄数、总专注时间
- **专注历史** — 按时间倒序的会话记录
- **数据持久化** — Pinia + localStorage，重启不丢失

---

## 架构决策

| 决策 | 选择 | 原因 |
|------|------|------|
| 数据存储 | Pinia + localStorage | 设置和历史无需跨进程，省去 IPC |
| 音效方案 | Web Audio API 程序化 | 无外部文件依赖，跨平台一致 |
| 定时器 | setInterval 1s | 番茄钟精度要求低，实现简单 |
| 主题切换 | CSS 变量 + data-theme | 零 JS 运行时开销，一键切换 |
| 窗口样式 | 无边框 + 自定义标题栏 | 紧凑 360×500 UI，原生拖拽 |
| IPC 通信 | 3 个 channel | window-minimize / window-close / app-quit，最小暴露面 |
| 打包文件 | 白名单配置 | 避免打包 devDependencies，从 1.6GB 降至 ~76MB |

---

## 打包注意事项（Windows 特有）

**文件锁定问题**: Windows 下 `app.asar` 创建后会被 Windows Defender 扫描锁定，导致后续构建失败（EBUSY）。解决方案：每次打包使用新的输出目录名（dist → dist2 → release → output_v2 → output_v3…）。

**electron-builder.yml 白名单配置**:
```yaml
files:
  - out/**/*
  - package.json
  - node_modules/pinia/**/*
  - node_modules/pinia-plugin-persistedstate/**/*
  - node_modules/vue/**/*
  - node_modules/@vue/**/*
```
不要用默认的全量打包，否则会包含历史构建产物（exe 文件），导致体积爆炸。

**SSL 问题**:
- npm: `NODE_TLS_REJECT_UNAUTHORIZED=0` 绕过证书验证
- git: `git config http.sslBackend schannel` 使用 Windows 证书存储

**Electron 镜像**: `ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"` 加速下载

---

## 开发命令

```bash
npm install          # 安装依赖
npm run dev          # 开发模式（热重载）
npm run build        # 仅构建（electron-vite build）
npm run build:win    # 完整打包（构建 + electron-builder）
```

构建产物在 `output_v3/` 目录：
- `fanqie_shiyan-1.2.0-setup.exe` — NSIS 安装包
- `fanqie_shiyan-1.2.0-portable.exe` — 便携版

---

## 版本历史

| 版本 | 日期 | 内容 |
|------|------|------|
| v1.0.0 | 2025-03 | 初始版本：计时器、托盘、基础设置 |
| v1.1.0 | 2025-03 | 声音选择（5种）、主题切换、关闭对话框 |
| v1.2.0 | 2025-05-28 | 项目清理、白名单打包、更新构建配置 |
