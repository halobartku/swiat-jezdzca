# Świat Jeźdźca | Profesjonalny Sprzęt Jeździecki
(Premium Showjumping Equipment)

Nowoczesna, interaktywna strona internetowa dla firmy Świat Jeźdźca, prezentująca nasze doświadczenie w produkcji wysokiej jakości sprzętu jeździeckiego. Zbudowana przy użyciu React, TypeScript i Tailwind CSS.

## Funkcje (Features)

- 🏇 Prezentacja profesjonalnego sprzętu jeździeckiego
- 📱 W pełni responsywny design dla wszystkich urządzeń
- 🎥 Galeria realizacji z filmami
- 🔍 Szczegółowy katalog produktów
- 📊 Mapa realizacji i instalacji
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
- **Ikony**: Lucide React
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

3. Dodanie wymaganych obrazów:
   - Utwórz obrazy zastępcze w `/public/images/products/` dla:
     - competition-jump.jpg
   - Utwórz obrazy zastępcze w `/public/images/installations/` dla:
     - warsaw-arena.jpg
     - poznan-facility.jpg
     - krakow-center.jpg
     - wroclaw-academy.jpg
     - gdansk-venue.jpg
     - lodz-center.jpg
   - Dodaj obraz główny:
     - /public/images/hero-jump.jpg

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
│   ├── data/         # Dane statyczne i instalacje
│   ├── hooks/        # Własne hooki React
│   ├── lib/          # Funkcje narzędziowe
│   ├── types/        # Definicje typów TypeScript
│   └── utils/        # Funkcje pomocnicze
├── public/           # Zasoby statyczne
│   └── images/       # Obrazy produktów i instalacji
└── dist/            # Output buildu produkcyjnego
```

## Główne Komponenty (Key Components)

### Komponenty Podstawowe
- `App.tsx` - Główny komponent aplikacji z routingiem i layoutem
- `Navigation.tsx` - Responsywny pasek nawigacji
- `Footer.tsx` - Stopka strony
- `SEO.tsx` - Komponent optymalizacji dla wyszukiwarek
- `ErrorBoundary.tsx` - Obsługa błędów

### Komponenty Produktowe
- `Products.tsx` - Katalog produktów
- `Gallery.tsx` - Galeria instalacji
- `CompetitionMap.tsx` - Mapa realizacji
- `RequestOffer.tsx` - Formularz zapytania ofertowego

### Funkcje Interaktywne
- `BackgroundAnimations.tsx` - Efekty tła
- `MouseAnimations.tsx` - Animacje myszy
- `KeyboardInstructions.tsx` - Instrukcje nawigacji klawiaturowej
- `HorseshoeCollector.tsx` - Interaktywny element kolekcjonowania podków

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
