import { motion } from 'framer-motion'

export function LoadingScreen() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-32 h-32 mx-auto mb-8"
        >
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <motion.div
            className="absolute inset-4 rounded-full border-4 border-primary/40 border-t-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          ></motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary-text mb-4">
            Analizujemy Twój profil jeździecki...
          </h2>
          <p className="text-lg text-secondary-text">
            Przygotowujemy spersonalizowane rekomendacje
          </p>
        </motion.div>
      </div>
    </div>
  )
}
