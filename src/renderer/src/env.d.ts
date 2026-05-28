export interface ElectronAPI {
  minimize: () => void
  closeToTray: () => void
  quit: () => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
