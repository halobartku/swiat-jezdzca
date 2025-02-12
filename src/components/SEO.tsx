import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

export function SEO({
  title = 'Świat Jeźdźca | Profesjonalny Sprzęt Jeździecki',
  description = 'Producent profesjonalnego sprzętu jeździeckiego. Tworzymy wysokiej jakości przeszkody dla ośrodków jeździeckich na całym świecie. Przeszkody treningowe, turniejowe i sponsorskie.',
keywords = 'przeszkody jeździeckie, przeszkody dla koni, tanie przeszkody jeździeckie, sprzęt jeździecki, przeszkody konne, przeszkody treningowe, przeszkody turniejowe, przeszkody sponsorskie, akcesoria jeździeckie, producent przeszkód, wyposażenie ośrodków jeździeckich, sprzedaż przeszkód jeździeckich, sklep z przeszkodami dla koni, польские препятствия для конного спорта, оборудование для конного спорта, konkurы, выездка, тренировочные препятствия, турнирные препятствия, спонсорские препятствия, Warszawa, Kraków, Łódź, Wrocław, Poznań, Gdańsk, Szczecin, Bydgoszcz, Lublin, Katowice, Białystok, Gdynia, Częstochowa, Radom, Sosnowiec, Toruń, Kielce, Gliwice, Zabrze, Bytom, Rzeszów, Olsztyn, Bielsko-Biała, Ruda Śląska, Rybnik, Tychy, Opole, Gorzów Wielkopolski, Elbląg, Płock, Dąbrowa Górnicza, Wałbrzych, Włocławek, Zielona Góra, Tarnów, Chorzów, Koszalin, Kalisz, Legnica, Grudziądz, Jaworzno, Słupsk, Jastrzębie-Zdrój, Nowy Sącz, Jelenia Góra, Siedlce, Mysłowice, Konin, Piła, Piotrków Trybunalski',
  image = '/images/logo dark.png',
  url = 'https://swiatjezdzca.pl'
}: SEOProps) {
  const formattedTitle = title === 'Świat Jeźdźca - Home' ? 'Świat Jeźdźca | Profesjonalny Sprzęt Jeździecki' : title

  return (
    <Helmet>
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Świat Jeźdźca" />
      <meta property="og:locale" content="pl_PL" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />

      {/* Mobile Web App */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#FF3B3B" />
      <meta name="application-name" content="Świat Jeźdźca" />

      {/* iOS */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Świat Jeźdźca" />

      {/* Additional Meta Tags */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Świat Jeźdźca" />
      <meta name="geo.region" content="PL" />
      
      {/* Links */}
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
