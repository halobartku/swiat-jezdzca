import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { questions, riderTypeDetails, type RiderType } from '../data/riderTypes'
import { Button } from './ui/button'

export default function Game() {
  const [currentQuestion, setCurrentQuestion] = useState(-1)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<RiderType | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [scores, setScores] = useState<Record<RiderType, number> | null>(null)

  const calculateResult = () => {
    const points: Record<RiderType, number> = {
      competitive: 0,
      recreational: 0,
      trainer: 0,
      adventurous: 0
    }

    answers.forEach((answerIndex, questionIndex) => {
      const answer = questions[questionIndex].answers[answerIndex]
      Object.entries(answer.points).forEach(([type, score]) => {
        points[type as RiderType] += score
      })
    })

    let maxPoints = -1
    let maxType: RiderType = 'competitive'
    
    Object.entries(points).forEach(([type, score]) => {
      if (score > maxPoints) {
        maxPoints = score
        maxType = type as RiderType
      }
    })

    setScores(points)
    setResult(maxType)
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    setTimeout(() => {
      const newAnswers = [...answers, answerIndex]
      setAnswers(newAnswers)

      if (newAnswers.length === questions.length) {
        calculateResult()
      } else {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer(null)
        setShowExplanation(false)
      }
    }, 2000)
  }

  const startQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
    setScores(null)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const restartQuiz = () => {
    setCurrentQuestion(-1)
    setAnswers([])
    setResult(null)
    setScores(null)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  if (currentQuestion === -1) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex-1 max-w-[600px]">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-text mb-6">
              Jakim typem jeźdźca jesteś?
            </h1>
            <p className="text-xl text-secondary-text mb-8">
              Odkryj swój unikalny styl jeździecki! Ten quiz pomoże Ci zrozumieć Twoje naturalne predyspozycje i wskaże najlepszą ścieżkę rozwoju.
            </p>
            <Button onClick={startQuiz} size="large">
              Rozpocznij Quiz
            </Button>
          </div>
          <div className="lg:flex-1 w-full lg:w-[500px]">
            <div className="bg-secondary-bg rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-primary-text mb-4">
                Co zawiera quiz?
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-secondary-text">
                  <span className="text-primary">•</span>
                  10 szczegółowych pytań
                </li>
                <li className="flex items-center gap-2 text-secondary-text">
                  <span className="text-primary">•</span>
                  Analiza osobowości jeździeckiej
                </li>
                <li className="flex items-center gap-2 text-secondary-text">
                  <span className="text-primary">•</span>
                  Ocena wiedzy o koniach
                </li>
                <li className="flex items-center gap-2 text-secondary-text">
                  <span className="text-primary">•</span>
                  Spersonalizowane rekomendacje
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (result && scores) {
    const typeInfo = riderTypeDetails[result]
    const maxScore = Math.max(...Object.values(scores))
    
    return (
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          className="flex flex-col lg:flex-row gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex-1">
            <div className="text-center mb-8">
              <span className="text-5xl mb-4 block">{typeInfo.icon}</span>
              <h1 className="text-4xl font-bold text-primary-text mb-4">{typeInfo.title}</h1>
              <p className="text-xl text-secondary-text">{typeInfo.description}</p>
            </div>

            <div className="bg-secondary-bg rounded-2xl p-6 mb-6 shadow-lg">
              <h2 className="text-xl font-semibold text-primary-text mb-4">Twój profil jeździecki:</h2>
              <div className="space-y-3">
                {Object.entries(scores).map(([type, score]) => (
                  <div key={type} className="relative">
                    <div className="flex justify-between mb-1 text-secondary-text">
                      <span>{riderTypeDetails[type as RiderType].title}</span>
                      <span>{Math.round((score / maxScore) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(score / maxScore) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full rounded-full ${
                          type === result ? 'bg-primary' : 'bg-primary/40'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary-bg rounded-2xl p-6 mb-6 shadow-lg">
              <h2 className="text-xl font-semibold text-primary-text mb-4">Twoje mocne strony:</h2>
              <ul className="space-y-2">
                {typeInfo.strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-secondary-text"
                  >
                    <span className="text-primary mr-2">✦</span>
                    {strength}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-secondary-bg rounded-2xl p-6 mb-6 shadow-lg">
              <h2 className="text-xl font-semibold text-primary-text mb-4">Preferowane konie:</h2>
              <ul className="space-y-2">
                {typeInfo.horsePreferences.map((pref, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-secondary-text"
                  >
                    <span className="text-primary mr-2">•</span>
                    {pref}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bg-secondary-bg rounded-2xl p-6 mb-6 shadow-lg">
              <h2 className="text-xl font-semibold text-primary-text mb-4">Styl treningowy:</h2>
              <ul className="space-y-2">
                {typeInfo.trainingStyle.map((style, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="flex items-center text-secondary-text"
                  >
                    <span className="text-primary mr-2">→</span>
                    {style}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bg-secondary-bg rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-primary-text mb-4">Rekomendacje rozwoju:</h2>
              <ul className="space-y-2">
                {typeInfo.recommendations.map((rec, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                    className="flex items-center text-secondary-text"
                  >
                    <span className="text-primary mr-2">↳</span>
                    {rec}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="text-center mt-8">
              <Button onClick={restartQuiz} size="large">
                Spróbuj ponownie
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <motion.div
        className="flex flex-col lg:flex-row gap-12"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        key={currentQuestion}
      >
        <div className="flex-1">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-secondary-text">
                Pytanie {currentQuestion + 1} z {questions.length}
              </span>
              <div className="h-2 bg-secondary-bg rounded-full flex-1 mx-4">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-primary-text mb-2">{question.text}</h2>
            {question.subtext && (
              <p className="text-secondary-text italic">{question.subtext}</p>
            )}
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {question.answers.map((answer, index) => (
                <motion.button
                  key={index}
                  onClick={() => !selectedAnswer && handleAnswer(index)}
                  className={`
                    w-full text-left p-4 rounded-lg 
                    ${
                      selectedAnswer === null
                        ? 'bg-secondary-bg hover:bg-accent-bg text-primary-text'
                        : selectedAnswer === index
                        ? 'bg-primary text-primary-bg'
                        : 'bg-secondary-bg/50 text-secondary-text'
                    }
                    transition-all duration-200 shadow-sm
                  `}
                  disabled={selectedAnswer !== null}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  {answer.text}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {showExplanation && selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-secondary-bg rounded-lg text-secondary-text"
              >
                {question.answers[selectedAnswer].explanation}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:w-[300px]">
          <div className="bg-secondary-bg rounded-2xl p-6 shadow-lg sticky top-4">
            <h3 className="text-lg font-semibold text-primary-text mb-4">
              Kategoria pytania:
            </h3>
            <div className="space-y-2">
              <p className="text-secondary-text capitalize">
                {question.category.replace('-', ' ')}
              </p>
              <p className="text-sm text-secondary-text">
                {currentQuestion + 1} z {questions.length} pytań
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
