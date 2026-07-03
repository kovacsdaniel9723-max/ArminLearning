/**
 * Űr-küldetés téma – vagány, játékos, de rendezett (ADHD/autizmus-barát)
 * Magas kontraszt, fix elrendezés, nincs villogás
 */

export const colors = {
  // Neon / játék akcentusok
  primary: '#00D4FF',
  primaryLight: '#67E8FF',
  primaryDark: '#0099CC',

  secondary: '#7CFF6B',
  secondaryLight: '#A8FF9A',
  secondaryDark: '#4AE038',

  accent: '#FF6B2C',
  accentLight: '#FF9A5C',
  accentDark: '#E85D04',
  accentMuted: '#3D2818',

  // Űr háttér
  background: '#0B1020',
  backgroundLight: '#151B2E',
  backgroundDark: '#060910',

  // Világos panelek – válaszgombok (jó kontraszt a sötét űrön)
  panelLight: '#EEF4FF',
  panelLightWarm: '#FFF6E8',
  textOnLight: '#0F1A33',
  textOnLightMuted: '#3D4F6F',

  // Szöveg – világos a sötét háttéren
  text: '#F0F4FF',
  textLight: '#9BA8C4',
  textDark: '#FFFFFF',

  success: '#7CFF6B',
  successLight: '#1A3D28',

  white: '#FFFFFF',
  black: '#000000',
  gray: '#6B7A99',
  grayLight: '#3A4560',
  grayDark: '#4A5675',

  // Kártyák – „küldetés panel”
  cardBackground: '#1A2238',
  cardShadow: '#000000',
  cardBorder: '#2E3A5C',
  cardBorderGlow: '#00D4FF33',

  buttonHover: '#4AE038',

  // Tantárgy színek (2. osztály szekciók)
  subjectMagyar: '#FF6B9D',
  subjectMatek: '#00D4FF',
  subjectKornyezet: '#7CFF6B',
  subjectRajz: '#FFB347',
  subjectZene: '#B388FF',
  subjectTestnev: '#FF6B2C',
  subjectDigitalis: '#67E8FF',
};

export const subjectAccent: Record<string, string> = {
  magyar: colors.subjectMagyar,
  matematika: colors.subjectMatek,
  kornyezet: colors.subjectKornyezet,
  rajz: colors.subjectRajz,
  zene: colors.subjectZene,
  testnev: colors.subjectTestnev,
  digitalis: colors.subjectDigitalis,
};
