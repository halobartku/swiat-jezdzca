import { useState, useEffect, useRef } from 'react'
import { Button } from '../../ui/button'
import type { RiderType } from '../../../data/riderTypes'
import { AIResultEnhancer } from '../ai-enhancement'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ResultsChatProps {
  result: RiderType
  aiResult: {
    personalizedAnalysis: string
    detailedRecommendations: string[]
    customizedTrainingPlan: string
    strengthsAndWeaknesses: {
      strengths: string[]
      areasForImprovement: string[]
    }
    longTermVision: string
  }
}

export function ResultsChat({ result, aiResult }: ResultsChatProps) {
  const [aiEnhancer, setAiEnhancer] = useState<AIResultEnhancer | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY
    if (apiKey) {
      setAiEnhancer(new AIResultEnhancer(apiKey))
    }
  }, [])

  const getInitialMessage = () => {
    const strengths = aiResult.strengthsAndWeaknesses.strengths
      .slice(0, 2)
      .map(s => s.toLowerCase())
      .join(' i ')

    const recommendations = aiResult.detailedRecommendations
      .slice(0, 2)
      .map(r => r.toLowerCase())

    return `Cześć! 👋 Widzę, że Twoimi mocnymi stronami są ${strengths}. To świetne predyspozycje do rozwoju w jeździectwie!

Na podstawie Twoich odpowiedzi, szczególnie polecałbym Ci skupić się na: ${recommendations[0]}. Chętnie pomogę Ci zaplanować kolejne kroki rozwoju! 😊

Może zacznijmy od tego, co najbardziej Cię interesuje? Na przykład możemy porozmawiać o:
• ${recommendations[0]}
• ${recommendations[1]}
• ${aiResult.customizedTrainingPlan.split('\n')[0].toLowerCase()}
• lub czymkolwiek innym, co Cię ciekawi!`
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: getInitialMessage()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    if (!aiEnhancer) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Przepraszam, nie mogę teraz odpowiedzieć. Spróbuj odświeżyć stronę.'
      }])
      setIsLoading(false)
      return
    }

    try {
      const response = await aiEnhancer.generateChatResponse(
        `Użytkownik pyta: "${userMessage}"

Kontekst rozmowy:
- Profil jeźdźca: ${result}
- Mocne strony: ${aiResult.strengthsAndWeaknesses.strengths.join(', ')}
- Obszary do rozwoju: ${aiResult.strengthsAndWeaknesses.areasForImprovement.join(', ')}
- Rekomendacje: ${aiResult.detailedRecommendations.join(', ')}
- Plan treningowy: ${aiResult.customizedTrainingPlan}
- Wizja długoterminowa: ${aiResult.longTermVision}

Odpowiedz w naturalny, konwersacyjny sposób, jakbyś był doświadczonym, przyjaznym trenerem rozmawiającym z młodszym kolegą. 

Wskazówki:
1. Zacznij od krótkiej, empatycznej reakcji na pytanie
2. Zadaj 1-2 pytania pomocnicze, aby lepiej zrozumieć sytuację
3. Podziel się swoją wiedzą w kontekście profilu i wyników użytkownika
4. Zakończ zachęcającym pytaniem, które poprowadzi rozmowę dalej

Pamiętaj:
- Używaj naturalnego, swobodnego języka
- Dodawaj emotikony dla lepszego wyrazu emocji 😊
- Dziel dłuższe wypowiedzi na krótsze akapity
- Nawiązuj do konkretnych wyników i rekomendacji z testu
- Bądź wspierający i zachęcający do dialogu`,
        {
          riderType: result,
          analysis: aiResult.personalizedAnalysis,
          recommendations: aiResult.detailedRecommendations,
          trainingPlan: aiResult.customizedTrainingPlan,
          strengths: aiResult.strengthsAndWeaknesses.strengths,
          improvements: aiResult.strengthsAndWeaknesses.areasForImprovement,
          vision: aiResult.longTermVision
        }
      )
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Przepraszam, wystąpił błąd. Spróbuj ponownie za chwilę.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[450px] w-full bg-white/50 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-white/50 rounded-t-lg p-2 border-b border-primary/10">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-lg">👨‍🏫</span>
          <h3 className="text-sm font-semibold text-primary-text">Trener</h3>
        </div>
        <p className="text-xs text-secondary-text/80">
          Twój wirtualny trener pomoże Ci w rozwoju jeździeckim na podstawie wyników testu
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-2.5 space-y-2.5 bg-[radial-gradient(#f8f9fa_1px,transparent_1px)] [background-size:16px_16px] bg-white/30">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-lg shadow-sm ${
                message.role === 'user'
                  ? 'bg-primary text-white ml-auto'
                  : 'bg-white/95 text-gray-800'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/95 text-gray-800 p-2.5 rounded-lg shadow-sm animate-pulse">
              <p className="text-sm flex items-center gap-2">
                <span>Trener pisze</span>
                <span className="inline-flex space-x-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex-shrink-0 p-2 bg-white/50 rounded-b-lg border-t border-primary/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Zadaj pytanie swojemu trenerowi..."
            className="flex-grow p-2 rounded-lg border border-gray-200 bg-white/95 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Wyślij
          </Button>
        </div>
      </form>
    </div>
  )
}
