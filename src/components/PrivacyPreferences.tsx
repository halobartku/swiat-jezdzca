import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Settings } from 'lucide-react'

interface PrivacyPreferencesProps {
  onClose: () => void;
}

export function PrivacyPreferences({ onClose }: PrivacyPreferencesProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    performance: false
  })
  const [showPreferences, setShowPreferences] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('privacyPreferences')
    if (!consent) {
      setIsVisible(true)
    } else {
      setPreferences(JSON.parse(consent))
    }
  }, [])

  const handleAccept = () => {
    const newPreferences = { ...preferences, analytics: true, marketing: true, performance: true }
    localStorage.setItem('privacyPreferences', JSON.stringify(newPreferences))
    setPreferences(newPreferences)
    setIsVisible(false)
    onClose()
  }

  const handleSavePreferences = () => {
    localStorage.setItem('privacyPreferences', JSON.stringify(preferences))
    setIsVisible(false)
    setShowPreferences(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-900/20 backdrop-blur-sm"
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Cookie className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Preferencje prywatności</h3>
                  <p className="text-blue-700 text-sm">
                    Używamy plików cookie, aby poprawić jakość korzystania z naszej strony. Kontynuując wizytę na tej stronie, zgadzasz się na użycie plików cookie.
                    <a href="/privacy" className="text-blue-500 hover:text-blue-600 ml-1">
                      Dowiedz się więcej
                    </a>
                  </p>
                </div>
              </div>

              {showPreferences && (
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900">Niezbędne Pliki Cookie</h4>
                      <p className="text-sm text-blue-700">Wymagane do prawidłowego funkcjonowania strony</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="rounded border-blue-300 text-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900">Performance Cookies</h4>
                      <p className="text-sm text-blue-700">Pomagają nam mierzyć i poprawiać wydajność witryny</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.performance}
                      onChange={(e) => setPreferences(prev => ({ ...prev, performance: e.target.checked }))}
                      className="rounded border-blue-300 text-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900">Analytics Cookies</h4>
                      <p className="text-sm text-blue-700">Pomagają nam ulepszać naszą witrynę</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                      className="rounded border-blue-300 text-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900">Marketing Cookies</h4>
                      <p className="text-sm text-blue-700">Używane do ukierunkowanej reklamy</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                      className="rounded border-blue-300 text-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAccept}
                  className="w-full bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Zaakceptuj wszystko
                </button>
                <button
                  onClick={() => setShowPreferences(!showPreferences)}
                  className="w-full flex items-center justify-center gap-2 text-blue-900 hover:text-blue-700 transition-colors py-2"
                >
                  <Settings className="w-4 h-4" />
                  {showPreferences ? 'Ukryj' : 'Dostosuj'} preferencje
                </button>
                {showPreferences && (
                  <button
                    onClick={handleSavePreferences}
                    className="w-full bg-blue-100 text-blue-900 px-6 py-2.5 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                  >
                    Zapisz preferencje
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
