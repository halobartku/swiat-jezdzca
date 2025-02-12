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


    return `Witam w systemie konsultacji technicznej. Na podstawie analizy Twojego profilu mogę doradzić w zakresie:

Dyscypliny olimpijskie:
• Skoki przez przeszkody
• Ujeżdżenie
• WKKW

Dyscypliny nieolimpijskie:
• Working Equitation
• Rajdy długodystansowe
• Reining
• Woltyżerka

Obszary konsultacji:
• Technika jeździecka
• Planowanie treningów
• Przygotowanie do zawodów
• Rozwój w wybranej dyscyplinie

W czym mogę pomóc?`
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
        content: 'System niedostępny. Proszę odświeżyć stronę.'
      }])
      setIsLoading(false)
      return
    }

    try {
      // Get previous messages excluding the latest user message
      const previousMessages = messages.map(msg => 
        `${msg.role === 'user' ? 'Użytkownik' : 'System'}: ${msg.content}`
      ).join('\n\n');

      const response = await aiEnhancer.generateChatResponse(
        `Zapytanie: "${userMessage}"

HISTORIA KONWERSACJI:
${previousMessages}

ZASADY KONTEKSTU:
1. Zawsze odnosić się do poprzednich odpowiedzi gdy użytkownik o nie pyta
2. Zachować spójność z wcześniej podanymi informacjami
3. Wyjaśniać wszelkie niejasności dotyczące poprzednich odpowiedzi
4. Nie powtarzać tych samych informacji bez potrzeby
5. Przy pytaniach o wyjaśnienie kontekstu, odnieść się do konkretnej części poprzedniej odpowiedzi

OBSŁUGA DYSCYPLIN:

1. Dyscypliny olimpijskie:
   A. Skoki przez przeszkody:
      • Parametry techniczne: wysokość, szerokość, dystanse
      • Technika: najazd, odbicie, lądowanie
      • Praca na dystansach i liniach
      • Rozgrzewka ukierunkowana na skoki

   B. Ujeżdżenie:
      • Precyzja ruchów i przejść
      • Praca nad zebraniem i przepuszczalnością
      • Rozwój piruetów i pasaży
      • Doskonalenie programów technicznych

   C. WKKW:
      • Kompleksowe przygotowanie kondycyjne
      • Praca w terenie i na przeszkodach stałych
      • Technika skoków polowych
      • Balans między dyscyplinami

2. Dyscypliny nieolimpijskie:
   A. Working Equitation:
      • Elementy pracy z bydłem
      • Zwinność i precyzja
      • Techniki specjalistyczne
      • Rozgrzewka ukierunkowana

   B. Rajdy długodystansowe:
      • Kondycja i wytrzymałość
      • Praca w terenie
      • Zarządzanie tempem
      • Specyfika rozgrzewki

   C. Reining:
      • Techniki zatrzymań i slidingu
      • Praca nad spinem
      • Precyzja ruchów
      • Specjalistyczna rozgrzewka

   D. Woltyżerka:
      • Elementy gimnastyczne
      • Koordynacja ruchowa
      • Praca nad równowagą
      • Specyficzne ćwiczenia

3. Zasady ogólne dla wszystkich dyscyplin:
   • Dostosować parametry do poziomu zaawansowania
   • Uwzględnić specjalistyczny sprzęt
   • Zachować bezpieczeństwo wykonania
   • Progresja trudności ćwiczeń

KONTEKST TECHNICZNY:
- Poziom: ${result}
- Analiza techniczna: ${aiResult.personalizedAnalysis}
- Rekomendowane obszary: ${aiResult.detailedRecommendations.join('; ')}
- Plan treningowy: ${aiResult.customizedTrainingPlan}
- Mocne strony: ${aiResult.strengthsAndWeaknesses.strengths.join('; ')}
- Obszary do rozwoju: ${aiResult.strengthsAndWeaknesses.areasForImprovement.join('; ')}
- Plan długoterminowy: ${aiResult.longTermVision}

Odpowiedź powinna:
1. Uwzględniać powyższy kontekst techniczny
2. Zachować format odpowiedni do typu zapytania
3. Zawierać konkretne parametry i wymiary
4. Być spójna z planem treningowym
5. Uwzględniać poziom zaawansowania

WAŻNE: Dla pytań o żywienie koni:
- Poinformować o braku kompetencji w tym zakresie
- Przekierować do ekspertów: https://horseandpony.eu/
- Podać kontakt: sklep@horseandpony.eu`,
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
        content: 'Błąd systemu. Proszę spróbować ponownie.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[450px] w-full bg-background/95 rounded-lg border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-muted/50 p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-semibold text-foreground">Konsultacja Techniczna</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Analiza techniczna na podstawie profilu jeździeckiego
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-[radial-gradient(var(--background)_1px,transparent_1px)] [background-size:16px_16px]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-xl border ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground border-primary/30 ml-auto'
                  : 'bg-card text-card-foreground border-border'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card text-card-foreground p-3 rounded-xl border border-border animate-pulse">
              <p className="text-sm flex items-center gap-2">
                <span>Generowanie odpowiedzi</span>
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
      <form onSubmit={handleSubmit} className="flex-shrink-0 p-4 bg-muted/50 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Wprowadź zapytanie techniczne..."
            className="flex-grow p-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors text-sm"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors text-sm shadow-sm"
          >
            Wyślij
          </Button>
        </div>
      </form>
    </div>
  )
}
