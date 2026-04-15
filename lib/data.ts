export interface CityRanking {
  rank: number
  city: string
  country: string
  meetings: number
  europeRank: number | null
  highlight?: boolean
  note?: string
}

export interface PortugueseCity {
  city: string
  meetings: number
  worldRank: number
  europeRank: number
  note: string
}

export interface CountryRanking {
  rank: number
  country: string
  meetings: number | null
  highlight?: boolean
}

export interface GlobalStats {
  totalMeetings: number
  economicImpactUSD: number
  midSizedShare: number
  topCityByAvgAttendees: { city: string; avg: number }
  topSectors: string[]
  growthRegions: string[]
}

export interface CityCoords {
  city: string
  lat: number
  lng: number
  isPortuguese?: boolean
}

export const topCities: CityRanking[] = [
  { rank: 1, city: 'Viena', country: 'Áustria', meetings: 154, europeRank: 1 },
  { rank: 2, city: 'Lisboa', country: 'Portugal', meetings: 153, europeRank: 2, highlight: true },
  { rank: 3, city: 'Singapura', country: 'Singapura', meetings: 144, europeRank: null },
  { rank: 4, city: 'Barcelona', country: 'Espanha', meetings: 142, europeRank: 3 },
  { rank: 5, city: 'Praga', country: 'Rep. Checa', meetings: 131, europeRank: 4 },
  { rank: 6, city: 'Paris', country: 'França', meetings: 124, europeRank: 5, note: 'JO 2024' },
  { rank: 6, city: 'Seul', country: 'Coreia do Sul', meetings: 124, europeRank: null },
  { rank: 8, city: 'Banguecoque', country: 'Tailândia', meetings: 115, europeRank: null },
  { rank: 9, city: 'Roma', country: 'Itália', meetings: 114, europeRank: 6 },
  { rank: 10, city: 'Atenas', country: 'Grécia', meetings: 111, europeRank: 7 },
]

export const europeanCities: CityRanking[] = topCities
  .filter((c) => c.europeRank !== null)
  .sort((a, b) => (a.europeRank ?? 99) - (b.europeRank ?? 99))

export const portugueseCities: PortugueseCity[] = [
  {
    city: 'Lisboa',
    meetings: 153,
    worldRank: 2,
    europeRank: 2,
    note: '5.º ano no Top 2 europeu',
  },
  {
    city: 'Porto',
    meetings: 59,
    worldRank: 34,
    europeRank: 22,
    note: 'Acolhe 64.º Congresso ICCA nov. 2025',
  },
]

export const topCountries: CountryRanking[] = [
  { rank: 1, country: 'Estados Unidos', meetings: 709 },
  { rank: 2, country: 'Itália', meetings: 635 },
  { rank: 3, country: 'Espanha', meetings: 536 },
  { rank: 4, country: 'Alemanha', meetings: null },
  { rank: 5, country: 'Reino Unido', meetings: null },
  { rank: 6, country: 'Japão', meetings: null },
  { rank: 7, country: 'Países Baixos', meetings: 295 },
  { rank: 8, country: 'França', meetings: null },
  { rank: 9, country: 'Portugal', meetings: 290, highlight: true },
  { rank: 10, country: 'Canadá', meetings: null },
]

export const globalStats: GlobalStats = {
  totalMeetings: 11099,
  economicImpactUSD: 11.6,
  midSizedShare: 53,
  topCityByAvgAttendees: { city: 'Dubai', avg: 899 },
  topSectors: ['Ciências Médicas', 'Tecnologia', 'Ciências'],
  growthRegions: ['América Latina', 'Médio Oriente'],
}

export const cityCoords: CityCoords[] = [
  { city: 'Viena', lat: 48.2082, lng: 16.3738 },
  { city: 'Lisboa', lat: 38.7169, lng: -9.1399, isPortuguese: true },
  { city: 'Singapura', lat: 1.3521, lng: 103.8198 },
  { city: 'Barcelona', lat: 41.3851, lng: 2.1734 },
  { city: 'Praga', lat: 50.0755, lng: 14.4378 },
  { city: 'Paris', lat: 48.8566, lng: 2.3522 },
  { city: 'Seul', lat: 37.5665, lng: 126.978 },
  { city: 'Banguecoque', lat: 13.7563, lng: 100.5018 },
  { city: 'Roma', lat: 41.9028, lng: 12.4964 },
  { city: 'Atenas', lat: 37.9838, lng: 23.7275 },
  { city: 'Porto', lat: 41.1579, lng: -8.6291, isPortuguese: true },
]

export const sources = [
  { label: 'ICCA World', url: 'https://www.iccaworld.org' },
  { label: 'Turismo de Portugal', url: 'https://www.turismodeportugal.pt' },
  { label: 'FTN News', url: 'https://ftnnews.com' },
  { label: 'Travel Daily News', url: 'https://www.traveldailynews.com' },
  { label: 'C-MW', url: 'https://c-mw.net' },
  { label: 'Meeting Vienna', url: 'https://meeting.vienna.info' },
  { label: 'I Amsterdam', url: 'https://www.iamsterdam.com' },
  { label: 'Meetings Poland', url: 'https://meetings.poland.travel' },
  { label: 'Notícias ao Minuto', url: 'https://www.noticiasaominuto.com' },
  { label: 'Meetings Skift', url: 'https://meetings.skift.com' },
]
