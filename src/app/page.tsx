'use client'

import { useState } from 'react'
import { generateArgumentResponses } from '@/services/api'
import { storageService } from '@/services/storage'
import History from '@/components/History'

export default function Home() {
  const [message, setMessage] = useState('')
  const [intensity, setIntensity] = useState(5)
  const [responses, setResponses] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleStartArgument = async () => {
    if (!message.trim()) return

    setIsLoading(true)
    try {
      const apiResponses = await generateArgumentResponses(message, intensity)
      setResponses(apiResponses)

      // 保存到历史记录
      storageService.saveHistory(message, intensity, apiResponses)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-600 to-red-400 relative overflow-hidden">
      {/* 彩带容器 */}
      <div className="confetti-container">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: ['#FFD700', '#FFE55C', '#FFA500', '#FF6B6B', '#4ECDC4'][Math.floor(Math.random() * 5)]
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">吵架包赢</h1>
          <p className="text-sm sm:text-base text-white/90 px-2 drop-shadow">让你在任何争吵中都能获胜的神奇助手</p>
        </div>

        {/* 主要输入区域 */}
        <div className="wechat-card mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-wechat-text mb-2">
            对方的话
          </label>
          <textarea
            className="wechat-input w-full resize-none h-24 sm:h-32 text-sm sm:text-base"
            placeholder="输入对方说的话..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* 语气强烈程度滑块 */}
        <div className="wechat-card mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-wechat-text mb-3 sm:mb-4">
            语气强烈程度: <span className="text-wechat-green font-bold">{intensity}</span>
          </label>
          <div className="relative">
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-wechat-border rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${(intensity - 1) * 11.11}%, #E5E5E5 ${(intensity - 1) * 11.11}%, #E5E5E5 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-wechat-text-secondary mt-2">
              <span>温和</span>
              <span>中等</span>
              <span>激烈</span>
            </div>
          </div>
        </div>

        {/* 开始吵架按钮 */}
        <button
          onClick={handleStartArgument}
          disabled={!message.trim() || isLoading}
          className="wechat-button w-full text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed mb-6 sm:mb-8"
        >
          {isLoading ? '正在生成...' : '开始吵架'}
        </button>

        {/* 回复显示区域 */}
        {responses.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-wechat-text mb-3 sm:mb-4">神级回复：</h2>
            {responses.map((response, index) => (
              <div key={index} className="wechat-card animate-fade-in p-3 sm:p-4">
                <p className="text-sm sm:text-base text-wechat-text leading-relaxed">{response}</p>
              </div>
            ))}
          </div>
        )}

        {/* 历史记录组件 */}
        <History />
      </div>

      <style jsx>{`
        .confetti-container {
          position: fixed;
          top: -10px;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 20px;
          opacity: 0.8;
          animation: confetti-fall 4s linear infinite;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #FFD700;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          touch-action: manipulation;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #FFD700;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          border: none;
          touch-action: manipulation;
        }

        @media (min-width: 640px) {
          .slider::-webkit-slider-thumb {
            width: 24px;
            height: 24px;
          }

          .slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </main>
  )
}