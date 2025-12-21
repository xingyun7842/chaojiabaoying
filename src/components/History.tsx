'use client'

import { useState, useEffect } from 'react'
import { storageService } from '@/services/storage'

interface ArgumentHistory {
  id: string
  userInput: string
  intensity: number
  responses: string[]
  timestamp: number
}

export default function History() {
  const [history, setHistory] = useState<ArgumentHistory[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setHistory(storageService.getHistory())
  }, [])

  const handleDelete = (id: string) => {
    storageService.deleteHistoryItem(id)
    setHistory(storageService.getHistory())
  }

  const handleClearAll = () => {
    if (confirm('确定要清除所有历史记录吗？')) {
      storageService.clearHistory()
      setHistory([])
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes}分钟前`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}小时前`
    } else {
      return date.toLocaleDateString('zh-CN')
    }
  }

  if (history.length === 0) {
    return null
  }

  return (
    <div className="mt-6 sm:mt-8">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-wechat-text font-medium"
        >
          <span className="text-sm">历史记录</span>
          <svg
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && (
          <button
            onClick={handleClearAll}
            className="text-xs text-wechat-text-secondary hover:text-red-500 transition-colors"
          >
            清除全部
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-2 sm:space-y-3">
          {history.map((item) => (
            <div key={item.id} className="wechat-card relative group p-3 sm:p-4">
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mb-2">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs text-wechat-text-secondary">
                    {formatDate(item.timestamp)}
                  </span>
                  <span className="text-xs px-2 py-1 bg-wechat-green/10 text-wechat-green rounded-full">
                    强度 {item.intensity}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-wechat-text-secondary font-medium break-words">
                  对方：{item.userInput}
                </p>
              </div>

              <div className="space-y-1">
                {item.responses.map((response, index) => (
                  <p key={index} className="text-xs sm:text-sm text-wechat-text pl-3 border-l-2 border-wechat-border break-words">
                    {response}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}