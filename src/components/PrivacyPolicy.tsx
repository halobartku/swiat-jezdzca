import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-bg via-accent-bg to-secondary-bg cursor-auto">
      <Link 
        to="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 text-primary hover:text-accent-hover transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
        Powrót do Strony Głównej
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4 py-16 pb-32 md:pb-16 pointer-events-auto cursor-auto"
      >
        <h1 className="text-4xl font-bold text-primary-text mb-12">Polityka Prywatności</h1>
        
        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-primary-text mb-4">1. Wprowadzenie</h2>
            <p className="text-secondary-text">
              Świat Jeźdźca ("my", "nasz" lub "nas") szanuje Twoją prywatność i zobowiązuje się do ochrony Twoich danych osobowych. Ta polityka prywatności informuje o tym, jak przetwarzamy Twoje dane osobowe podczas odwiedzin na naszej stronie internetowej oraz o Twoich prawach wynikających z Ogólnego Rozporządzenia o Ochronie Danych (RODO).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-text mb-4">2. Dane Kontaktowe</h2>
            <div className="text-secondary-text space-y-2">
              <p>Świat Jeźdźca</p>
              <p>ul. Mickiewicza 13/4</p>
              <p>82-300 Elblag</p>
              <p>Polska</p>
              <p>Email: <a href="mailto:biuro@swiatjezdzca.pl" className="text-primary hover:text-accent-hover cursor-pointer">biuro@swiatjezdzca.pl</a></p>
              <p>NIP: 5783158871</p>
              <p>REGON: 524058502</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-text mb-4">3. Dane Osobowe, Które Zbieramy</h2>
            <p className="text-secondary-text mb-2">Możemy zbierać i przetwarzać następujące dane:</p>
            <ul className="list-disc pl-6 text-secondary-text">
              <li>Dane identyfikacyjne (imię, nazwisko)</li>
              <li>Dane kontaktowe (adres email, numer telefonu)</li>
              <li>Dane techniczne (adres IP, typ przeglądarki, informacje o urządzeniu)</li>
              <li>Dane o użytkowaniu (informacje o tym, jak korzystasz z naszej strony)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-text mb-4">4. Jak Wykorzystujemy Twoje Dane</h2>
            <p className="text-secondary-text mb-2">Wykorzystujemy Twoje dane osobowe do:</p>
            <ul className="list-disc pl-6 text-secondary-text">
              <li>Świadczenia i zarządzania naszymi usługami</li>
              <li>Komunikacji z Tobą</li>
              <li>Ulepszania naszej strony i usług</li>
              <li>Marketingu (za Twoją zgodą)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-text mb-4">5. Twoje Prawa</h2>
            <p className="text-secondary-text mb-2">Na mocy RODO masz prawo do:</p>
            <ul className="list-disc pl-6 text-secondary-text">
              <li>Dostępu do swoich danych osobowych</li>
              <li>Sprostowania niedokładnych danych osobowych</li>
              <li>Żądania usunięcia swoich danych osobowych</li>
              <li>Sprzeciwu wobec przetwarzania swoich danych osobowych</li>
              <li>Żądania ograniczenia przetwarzania</li>
              <li>Przenoszenia danych</li>
              <li>Wycofania zgody w dowolnym momencie</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-text mb-4">6. Pliki Cookie</h2>
            <p className="text-secondary-text mb-2">
              Nasza strona wykorzystuje pliki cookie w celu poprawy jakości przeglądania. Możesz kontrolować pliki cookie poprzez ustawienia przeglądarki. Używamy następujących typów plików cookie:
            </p>
            <ul className="list-disc pl-6 text-secondary-text">
              <li>Niezbędne pliki cookie: Wymagane do funkcjonowania strony</li>
              <li>Pliki cookie wydajności: Używane przez Vercel Speed Insights do mierzenia i poprawy wydajności strony</li>
              <li>Pliki cookie analityczne: Pomagają nam zrozumieć, jak odwiedzający korzystają z naszej strony</li>
              <li>Pliki cookie marketingowe: Używane do dostarczania odpowiednich reklam</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-text mb-4">7. Bezpieczeństwo Danych</h2>
            <p className="text-secondary-text">
              Wdrożyliśmy odpowiednie środki bezpieczeństwa, aby zapobiec przypadkowej utracie, wykorzystaniu, dostępowi, zmianie lub ujawnieniu Twoich danych osobowych w sposób nieuprawniony.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-text mb-4">8. Aktualizacje Polityki</h2>
            <p className="text-secondary-text">
              Możemy aktualizować tę politykę prywatności od czasu do czasu. O wszelkich istotnych zmianach poinformujemy, publikując nową politykę na tej stronie i aktualizując datę "ostatniej aktualizacji".
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-text mb-4">9. Kontakt</h2>
            <p className="text-secondary-text">
              Jeśli masz pytania dotyczące tej polityki prywatności lub naszych praktyk w zakresie prywatności, skontaktuj się z nami pod adresem{' '}
              <a href="mailto:biuro@swiatjezdzca.pl" className="text-primary hover:text-accent-hover cursor-pointer">
                biuro@swiatjezdzca.pl
              </a>
            </p>
          </section>

          <p className="text-sm text-primary mt-12">Ostatnia aktualizacja: 13.11.2024</p>
        </div>
      </motion.div>
    </div>
  )
}

export default PrivacyPolicy;
