# Świat Jeźdźca | Profesjonalny Sprzęt Jeździecki
(Premium Showjumping Equipment)

Nowoczesna, interaktywna strona internetowa dla firmy Świat Jeźdźca, prezentująca nasze doświadczenie w produkcji wysokiej jakości sprzętu jeździeckiego. Zbudowana przy użyciu React, TypeScript i Tailwind CSS.

## Funkcje (Features)

- 🏇 Prezentacja profesjonalnego sprzętu jeździeckiego
- 📱 W pełni responsywny design dla wszystkich urządzeń
- 🎥 Galeria realizacji z filmami i interaktywnym podglądem
- 🔍 Szczegółowy katalog produktów z kategoriami
- 🎮 Interaktywna gra z kolekcjonowaniem podków
- 🎁 System nagród i zniżek dla użytkowników
- 🔒 Zgodność z RODO (GDPR)
- 🌍 Prezentacja instalacji w całej Polsce
- ⌨️ Wsparcie nawigacji klawiaturowej
- 🎨 Animacje i efekty interaktywne
- 📝 Formularze zapytań ofertowych

## Stack Technologiczny (Tech Stack)

- **Framework Frontend**: React 18 z TypeScript
- **Routing**: React Router v6 (z flagami v7)
- **Style**: Tailwind CSS z PostCSS
- **Animacje**: Framer Motion
- **Ikony**: Lucide React (HomeIcon, Goal, Handshake, HelpCircle, Trophy, Mail)
- **Narzędzie Build**: Vite
- **Deployment**: Vercel
- **Monitoring Wydajności**: Vercel Speed Insights
- **Kontrola Typów**: TypeScript w trybie strict
- **Linting**: ESLint z niestandardową konfiguracją

## Rozpoczęcie Pracy (Getting Started)

### Wymagania (Prerequisites)

- Node.js (zalecana wersja LTS)
- npm lub pnpm

### Instalacja (Installation)

1. Klonowanie repozytorium:
   ```bash
   git clone https://github.com/yourusername/swiat-jezdzca.git
   cd swiat-jezdzca
   ```

2. Instalacja zależności:
   ```bash
   npm install
   # lub
   pnpm install
   ```

3. Struktura zasobów:
   - Katalog produktów w `/public/images/Products/`:
     - Akcesoria/
     - Sponsorskie/
     - Treningowe/
     - Turniejowe/
   - Logo i multimedia:
     - /public/images/logo dark.png
     - /public/videos/świat jeźdźca przeszkody konne aluminiowe (1).mp4

4. Uruchomienie serwera deweloperskiego:
   ```bash
   npm run dev
   # lub
   pnpm dev
   ```

5. Otwórz [http://localhost:3001](http://localhost:3001) w przeglądarce

### Dostępne Skrypty (Available Scripts)

- `npm run dev` - Uruchom serwer deweloperski
- `npm run build` - Zbuduj wersję produkcyjną
- `npm run preview` - Podgląd wersji produkcyjnej
- `npm run lint` - Uruchom ESLint

## Struktura Projektu (Project Structure)

```
swiat-jezdzca/
├── docs/              # Dokumentacja projektu
│   ├── COMPONENTS.md  # Dokumentacja komponentów
│   ├── DEPLOYMENT.md  # Przewodnik wdrożenia
│   ├── DEVELOPMENT.md # Wytyczne rozwoju
│   └── TESTING.md     # Dokumentacja testów
├── src/
│   ├── components/    # Komponenty React
│   ├── context/       # Providery kontekstu React
│   ├── data/         # Dane statyczne i ciekawostki
│   ├── hooks/        # Własne hooki React
│   ├── lib/          # Funkcje narzędziowe
│   ├── types/        # Definicje typów TypeScript
│   └── utils/        # Funkcje pomocnicze
├── public/           # Zasoby statyczne
│   ├── images/       # Obrazy produktów i logo
│   └── videos/       # Materiały wideo
└── dist/            # Output buildu produkcyjnego
```

## Główne Komponenty (Key Components)

### Komponenty Podstawowe
- `App.tsx` - Główny komponent aplikacji z routingiem i layoutem
- `Navigation.tsx` - Responsywny pasek nawigacji z ikonami sekcji
- `Footer.tsx` - Stopka strony
- `SEO.tsx` - Komponent optymalizacji dla wyszukiwarek
- `ErrorBoundary.tsx` - Obsługa błędów

### Komponenty Produktowe i Współpraca
- `Products.tsx` - Katalog produktów z kategoriami
- `Home.tsx` - Strona główna z filmem prezentacyjnym
- `Cooperation.tsx` - Proces współpracy i opinie klientów
- `RequestOffer.tsx` - Formularz zapytania ofertowego

### Funkcje Interaktywne
- `BackgroundAnimations.tsx` - Efekty tła
- `MouseAnimations.tsx` - Animacje myszy
- `KeyboardInstructions.tsx` - Instrukcje nawigacji klawiaturowej
- `HorseshoeCollector.tsx` - System kolekcjonowania podków i nagród
- `HorseshoeSpawner.tsx` - Generator podków do zbierania

### Prywatność i UX
- `PrivacyPreferences.tsx` - Preferencje zgodne z RODO
- `PrivacyPolicy.tsx` - Polityka prywatności
- `LoadingSpinner.tsx` - Wskaźnik ładowania
- `SkipLink.tsx` - Nawigacja dostępności

## Dokumentacja (Documentation)

Szczegółowa dokumentacja dostępna w katalogu `docs/`:
- `COMPONENTS.md` - Dokumentacja komponentów
- `DEPLOYMENT.md` - Procedury wdrożenia
- `DEVELOPMENT.md` - Wytyczne rozwoju
- `TESTING.md` - Strategie testowania

## System Nagród (Reward System)

Strona zawiera interaktywny system nagród:
- Kolekcjonowanie podków podczas przeglądania strony
- Odblokowywanie ciekawostek jeździeckich co 10 podków
- Specjalny kod rabatowy 5% przy zebraniu 10 podków
- Rangi i poziomy doświadczenia dla użytkowników

## Wdrożenie (Deployment)

Projekt jest skonfigurowany do wdrożenia na Vercel. Plik `vercel.json` zawiera konfigurację routingu i ustawienia buildu.

## Prywatność i Ciasteczka (Privacy and Cookies)

Strona zawiera:
- Zarządzanie preferencjami prywatności
- Stronę polityki prywatności
- Monitoring wydajności przez Vercel Speed Insights
- Przyjazną implementację dla adblockerów

## Licencja (License)

Ten projekt jest licencjonowany na podstawie licencji MIT - szczegóły w pliku [LICENSE](LICENSE).

## Kontakt (Contact)

Świat Jeźdźca
- Email: kontakt@swiat-jezdzca.pl
- Adres: Polska
