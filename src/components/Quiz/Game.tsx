import { useState } from 'react'
import { riderTypeDetails, type RiderType } from '../../data/riderTypes'
import { AIResultEnhancer } from './ai-enhancement'
import type { Question, Answer } from './Questions/quiz-base-types'
import { personalityQuestions } from './Questions/personality-questions'
import { managementQuestions } from './Questions/management-questions'
import { relationshipQuestions } from './Questions/relationship-questions'
import { goalsQuestions } from './Questions/goals-questions'
import { technicalQuestions } from './Questions/technical-questions'
import { QuizStart } from './components/QuizStart'
import { QuizQuestion } from './components/QuizQuestion'
import { QuizResults } from './components/QuizResults'
import { LoadingScreen } from './components/LoadingScreen'
import { ErrorScreen } from './components/ErrorScreen'

// Combine all questions and shuffle them to mix categories
const allQuestions = [
  ...personalityQuestions,
  ...managementQuestions,
  ...relationshipQuestions,
  ...goalsQuestions,
  ...technicalQuestions
]

// Shuffle questions
const questions = [...allQuestions].sort(() => Math.random() - 0.5)

const aiEnhancer = new AIResultEnhancer(import.meta.env.VITE_GOOGLE_AI_API_KEY);

export default function Game() {
  const [currentQuestion, setCurrentQuestion] = useState(-1)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [result, setResult] = useState<RiderType | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [scores, setScores] = useState<Record<RiderType, number> | null>(null)
  type AIResult = {
    personalizedAnalysis: string;
    detailedRecommendations: string[];
    customizedTrainingPlan: string;
    strengthsAndWeaknesses: {
      strengths: string[];
      areasForImprovement: string[];
    };
    longTermVision: string;
  };

  const [aiResult, setAiResult] = useState<AIResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculateResult = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const points: Record<RiderType, number> = {
        competitive: 0,
        recreational: 0,
        trainer: 0,
        adventurous: 0
      }

      const selectedAnswers = answers.map((answer, index) => {
        const enhancedAnswer: Answer & { question: Question } = {
          ...answer,
          secondaryTraits: answer.secondaryTraits || {},
          question: questions[index]
        }
        return enhancedAnswer
      })

      selectedAnswers.forEach((answer) => {
        Object.entries(answer.points).forEach(([type, score]) => {
          points[type as RiderType] += score
        })
      })

      // Calculate total points
      const totalPoints = Object.values(points).reduce((sum, score) => sum + score, 0)

      // Calculate exact percentages first (not rounded)
      const exactPercentages = Object.entries(points).map(([type, score]) => ({
        type: type as RiderType,
        percentage: (score / totalPoints) * 100
      }));

      // Sort by percentage descending
      exactPercentages.sort((a, b) => b.percentage - a.percentage);

      // Round down all percentages initially
      const normalizedScores: Record<RiderType, number> = {} as Record<RiderType, number>;
      let remainingPercent = 100;
      let maxType: RiderType = exactPercentages[0].type;
      let secondMaxType: RiderType = exactPercentages[1].type;

      // Calculate decimal parts for distributing remaining percentage points
      const decimalParts = exactPercentages.map(({ type, percentage }) => ({
        type,
        decimal: percentage - Math.floor(percentage),
        floor: Math.floor(percentage)
      }));

      // First, assign floor values
      decimalParts.forEach(({ type, floor }) => {
        normalizedScores[type] = floor;
        remainingPercent -= floor;
      });

      // Sort by decimal part descending
      decimalParts.sort((a, b) => b.decimal - a.decimal);

      // Distribute remaining percentage points
      for (let i = 0; i < Math.round(remainingPercent); i++) {
        normalizedScores[decimalParts[i % decimalParts.length].type]++;
      }

      setScores(normalizedScores)
      setResult(maxType)

      // Calculate consistency and traits
      const consistency = calculateConsistency(selectedAnswers)
      const traits = calculateTraits(selectedAnswers)

      // Get AI-enhanced results
      const aiEnhancedResult = await aiEnhancer.enhanceResults(
        {
          primaryType: maxType,
          secondaryType: secondMaxType,
          consistency,
          traits
        },
        selectedAnswers,
        questions
      )

      console.log('AI Enhanced Result:', aiEnhancedResult);
      setAiResult(aiEnhancedResult)
    } catch (err) {
      let errorMessage = 'Przepraszamy, wystąpił błąd podczas analizy wyników. Prosimy spróbować ponownie za chwilę.';
      
      // Check for specific API key error
      if (err instanceof Error && err.message.includes('API key not valid')) {
        errorMessage = 'Przepraszamy, usługa analizy jest obecnie niedostępna. Prosimy spróbować ponownie później lub skontaktować się z administratorem.';
      }
      
      setError(errorMessage)
      console.error('Error calculating result:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateConsistency = (selectedAnswers: (Answer & { question: Question })[]): number => {
    let consistentAnswers = 0
    selectedAnswers.forEach(answer => {
      const primaryTypeScore = answer.points[result as RiderType]
      const maxScore = Math.max(...Object.values(answer.points))
      if (primaryTypeScore === maxScore) consistentAnswers++
    })
    return (consistentAnswers / selectedAnswers.length) * 100
  }

  const calculateTraits = (selectedAnswers: (Answer & { question: Question })[]): Record<string, number> => {
    const traits: Record<string, number> = {
      leadership: 0,
      patience: 0,
      analytical: 0,
      emotional: 0,
      risk_tolerance: 0
    }

    selectedAnswers.forEach(answer => {
      if (answer.secondaryTraits) {
        Object.entries(answer.secondaryTraits).forEach(([trait, value]) => {
          traits[trait] = (traits[trait] || 0) + value
        })
      }
    })

    const maxPossibleTraitScore = selectedAnswers.length * 4
    Object.keys(traits).forEach(trait => {
      traits[trait] = (traits[trait] / maxPossibleTraitScore) * 100
    })

    return traits
  }

  const handleAnswer = (answerIndex: number) => {
    const baseAnswer = questions[currentQuestion].answers[answerIndex]
    const enhancedAnswer = {
      ...baseAnswer,
      secondaryTraits: {
        leadership: 0,
        patience: 0,
        analytical: 0,
        emotional: 0,
        risk_tolerance: 0
      }
    }
    const newAnswers = [...answers, enhancedAnswer]
    setAnswers(newAnswers)

    if (newAnswers.length === questions.length) {
      calculateResult()
    } else {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const startQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
    setScores(null)
    setSelectedAnswer(null)
  }

  const restartQuiz = () => {
    setCurrentQuestion(-1)
    setAnswers([])
    setResult(null)
    setScores(null)
    setSelectedAnswer(null)
  }

  if (currentQuestion === -1) {
    return <QuizStart onStart={startQuiz} questionCount={questions.length} />
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={restartQuiz} />
  }

  if (result && scores && aiResult) {
    return (
      <QuizResults
        result={result}
        scores={scores}
        riderTypeDetails={riderTypeDetails}
        aiResult={aiResult}
        onRestart={restartQuiz}
      />
    )
  }

  return (
    <QuizQuestion
      question={questions[currentQuestion]}
      currentQuestion={currentQuestion}
      totalQuestions={questions.length}
      selectedAnswer={selectedAnswer}
      onAnswerSelect={handleAnswer}
    />
  )
}
