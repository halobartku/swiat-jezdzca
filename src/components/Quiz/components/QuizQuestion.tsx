import { motion, AnimatePresence } from 'framer-motion'
import type { Question, Answer } from '../Questions/quiz-base-types'

interface QuizQuestionProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
}

export function QuizQuestion({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect
}: QuizQuestionProps) {
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
                Pytanie {currentQuestion + 1} z {totalQuestions}
              </span>
              <div className="h-2 bg-secondary-bg rounded-full flex-1 mx-4">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
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
              {question.answers.map((answer: Answer, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => !selectedAnswer && onAnswerSelect(index)}
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
                {currentQuestion + 1} z {totalQuestions} pytań
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
