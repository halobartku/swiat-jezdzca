import { motion } from 'framer-motion'
import { Button } from '../../ui/button'

interface ErrorScreenProps {
  error: string;
  onRetry: () => void;
}

export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-8"
        >
          <span className="text-4xl mb-4 block">⚠️</span>
          <h2 className="text-2xl font-semibold text-red-500 mb-4">Wystąpił błąd</h2>
          <p className="text-secondary-text mb-6">{error}</p>
          <Button onClick={onRetry} size="large" className="bg-red-500 hover:bg-red-600">
            Spróbuj ponownie
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
