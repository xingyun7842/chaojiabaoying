interface ArgumentHistory {
  id: string
  userInput: string
  intensity: number
  responses: string[]
  timestamp: number
}

const STORAGE_KEY = 'argument-winner-history'

export const storageService = {
  saveHistory: (userInput: string, intensity: number, responses: string[]): void => {
    if (typeof window === 'undefined') return

    try {
      const existingHistory = storageService.getHistory()
      const newEntry: ArgumentHistory = {
        id: Date.now().toString(),
        userInput,
        intensity,
        responses,
        timestamp: Date.now()
      }

      const updatedHistory = [newEntry, ...existingHistory].slice(0, 50) // 保留最近50条记录

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
    } catch (error) {
      console.error('保存历史记录失败:', error)
    }
  },

  getHistory: (): ArgumentHistory[] => {
    if (typeof window === 'undefined') return []

    try {
      const history = localStorage.getItem(STORAGE_KEY)
      return history ? JSON.parse(history) : []
    } catch (error) {
      console.error('获取历史记录失败:', error)
      return []
    }
  },

  clearHistory: (): void => {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('清除历史记录失败:', error)
    }
  },

  deleteHistoryItem: (id: string): void => {
    if (typeof window === 'undefined') return

    try {
      const existingHistory = storageService.getHistory()
      const updatedHistory = existingHistory.filter(item => item.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
    } catch (error) {
      console.error('删除历史记录失败:', error)
    }
  }
}