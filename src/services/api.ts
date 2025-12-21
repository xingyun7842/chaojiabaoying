interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatCompletionRequest {
  model: string
  messages: ChatMessage[]
  temperature: number
}

interface ChatCompletionResponse {
  choices: Array<{
    message: ChatMessage
  }>
}

export const generateArgumentResponses = async (
  userMessage: string,
  intensity: number
): Promise<string[]> => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || 'sk-IvD0fdxjJUKqxYWSW71u3SCbuZkPBjDdAacMU9u3nOSSgDhG'

  const intensityDescription = intensity <= 3 ? '温和但有理有据地' :
                             intensity <= 6 ? '坚定有力地' :
                             intensity <= 8 ? '强硬且具有压迫感地' : '极具攻击性地'

  const systemPrompt = `你是一个吵架高手，擅长用${intensityDescription}方式反驳对方。你需要根据对方的话，生成3条不同的、强有力的反驳回复。

要求：
1. 每条回复都要针对对方的观点进行有力反驳
2. 使用${intensity}级的语气强度（1-10级）
3. 回复要符合中国的语言习惯和文化背景
4. 每条回复控制在50字以内
5. 语气${intensity <= 5 ? '相对理性但依然有力' : intensity <= 8 ? '强硬具有压迫感' : '极具攻击性和震慑力'}

请直接返回3条回复，每条一行，不要使用编号或任何前缀。`

  const requestBody: ChatCompletionRequest = {
    model: 'deepseek-chat',
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: `对方说：${userMessage}`
      }
    ],
    temperature: 0.7
  }

  try {
    const response = await fetch('https://yunwu.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data: ChatCompletionResponse = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('No content received from API')
    }

    // 按行分割内容，清理空白行
    const responses = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 3) // 确保只取3条

    return responses.length === 3 ? responses : generateMockResponses(intensity, userMessage)
  } catch (error) {
    console.error('API调用失败:', error)
    // 如果API调用失败，返回模拟数据
    return generateMockResponses(intensity, userMessage)
  }
}

const generateMockResponses = (intensity: number, userMessage?: string): string[] => {
  // 根据用户输入的关键词生成更个性化的回复
  const message = userMessage?.toLowerCase() || ''

  const mockData = {
    low: [
      '我觉得这个观点有待商榷，我们可以从另一个角度看看这个问题。',
      '你提到的这个情况确实存在，但可能还有其他因素需要考虑。',
      '让我们先冷静下来，理性地分析一下事实的真相。'
    ],
    medium: [
      '你这样说就没有道理了！难道你没有考虑到实际情况吗？',
      '我看你是完全搞错了方向，事实根本不是你说的那样！',
      '不要这么主观臆断，先搞清楚状况再说！'
    ],
    high: [
      '你简直是不可理喻！这种话都说得出口？',
      '别再自以为是了！你连基本的事实都没搞清楚！',
      '你的逻辑完全混乱！这种观点根本站不住脚！'
    ]
  }

  // 根据用户输入生成更智能的回复
  if (message.includes('错了') || message.includes('不对')) {
    return intensity <= 4 ? [
      '到底谁错了还不一定呢，我们让事实说话。',
      '你说别人错之前，不如先反思一下自己。',
      '每个人都有自己的立场，对错不是那么绝对的。'
    ] : intensity <= 7 ? [
      '你有什么资格说别人错了？先看看你自己吧！',
      '动不动就说别人错，你是不是觉得自己永远正确？',
      '搞清楚状况再下结论，不要总是主观臆断！'
    ] : [
      '就你最对？全世界就你一个人是正确的？',
      '每次都指责别人，你能不能先照照镜子？',
      '别在这里瞎指挥，你有这个本事吗？'
    ]
  }

  if (message.includes('钱') || message.includes('贵')) {
    return intensity <= 4 ? [
      '价格确实需要考虑，但质量也同样重要。',
      '我们可以寻找性价比更高的解决方案。',
      '投资的价值要看长期回报，不能只看眼前成本。'
    ] : intensity <= 7 ? [
      '你总是只看钱！难道质量就不重要吗？',
      '便宜没好货，这个道理都不懂？',
      '一分钱一分货，别总想着占便宜！'
    ] : [
      '就你抠门！穷得连基本品质都不要了？',
      '天天钱钱钱，你是不是掉进钱眼里了？',
      '买不起就直说，别在这里酸言酸语！'
    ]
  }

  if (message.includes('不知道') || message.includes('不清楚')) {
    return intensity <= 4 ? [
      '不知道的话我们可以一起了解和学习。',
      '没关系，我们可以先搜集更多信息再做判断。',
      '不了解的情况可以先听听别人的意见。'
    ] : intensity <= 7 ? [
      '什么都不知道，那你来这里干什么？',
      '连基本情况都不了解就发表意见？',
      '不知道就说不知道，不要瞎猜测！'
    ] : [
      '不知道还敢说话？你脸皮真厚！',
      '什么都不懂还在这里装专家？',
      '不知道就闭嘴，没人把你当哑巴！'
    ]
  }

  // 默认回复
  const responses = intensity <= 4 ? mockData.low :
                   intensity <= 7 ? mockData.medium :
                   mockData.high

  return responses
}