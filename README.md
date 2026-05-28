# Fanqie Shiyan - 番茄钟桌面应用

一款简洁优雅的桌面番茄钟（Pomodoro Timer）应用，帮助你专注工作、高效休息。

## 功能特性

- **番茄计时器** - 25 分钟专注 / 5 分钟休息循环，SVG 圆形进度条实时显示
- **自定义时长** - 灵活设置工作时长（1-60分钟）、休息时长（1-30分钟）、长休息时长
- **声音提醒** - 会话完成时自动播放提示音，支持开关控制
- **系统托盘** - 关闭窗口后最小化到系统托盘，不中断计时
- **每日统计** - 实时查看今日完成番茄数和总专注时间
- **专注历史** - 记录每次专注和休息会话，按时间倒序查看
- **主题切换** - 深色 / 浅色两种主题，一键切换
- **数据持久化** - 设置和历史记录自动保存，重启不丢失

## 技术栈

| 技术 | 说明 |
|------|------|
| Electron | 跨平台桌面应用框架 |
| Vue 3 | 前端框架，Composition API |
| TypeScript | 类型安全 |
| Vite | 构建工具（通过 electron-vite） |
| Pinia | 状态管理 + pinia-plugin-persistedstate |
| electron-builder | 应用打包 |
| Web Audio API | 程序化生成提示音 |

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 打包 Windows 安装程序

```bash
npm run build:win
```

打包完成后，安装程序位于 `dist/` 目录。

## 项目结构

```
src/
├── main/                    # Electron 主进程
│   └── index.ts             # 窗口管理、系统托盘、IPC
├── preload/                 # 预加载脚本
│   └── index.ts             # contextBridge 安全暴露 API
└── renderer/                # Vue 渲染进程
    ├── index.html
    └── src/
        ├── App.vue          # 根组件
        ├── main.ts          # 应用入口
        ├── env.d.ts         # 类型声明
        ├── stores/          # Pinia 状态管理
        │   ├── timer.ts     # 计时器状态机
        │   ├── history.ts   # 专注历史记录
        │   └── settings.ts  # 用户设置
        ├── components/      # Vue 组件
        │   ├── TitleBar.vue      # 自定义标题栏
        │   ├── TimerCircle.vue   # SVG 圆形进度条
        │   ├── TimerControls.vue # 控制按钮
        │   ├── TabBar.vue        # 底部导航
        │   ├── HistoryView.vue   # 历史记录
        │   ├── StatsView.vue     # 今日统计
        │   └── SettingsView.vue  # 设置页面
        ├── composables/     # 组合式函数
        │   ├── useTimer.ts  # 计时器副作用
        │   └── useSound.ts  # Web Audio 提示音
        └── styles/          # 全局样式
            ├── variables.css # CSS 变量主题
            └── global.css   # 基础样式
```

## 使用说明

1. **开始专注** - 点击「开始」按钮，25 分钟倒计时开始
2. **暂停 / 重置** - 随时暂停或重置当前计时
3. **自动切换** - 专注结束后自动切换到休息模式，反之亦然
4. **长休息** - 每完成 4 个番茄钟（可自定义），自动进入长休息
5. **查看统计** - 切换到「统计」标签查看今日完成情况
6. **自定义设置** - 在「设置」中调整时长、提示音和主题

## 许可证

MIT License
