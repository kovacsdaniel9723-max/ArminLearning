# Armin Learning App

Gyerekbarát tanuló mobilalkalmazás 6-7 éves gyerekeknek React Native + Expo technológiával.

## Funkciók

- **Betűfelismerő játék**: Nagybetűk felismerése szavakkal
- **Számfelismerő játék**: Számok felismerése mennyiségekkel (1-20)
- **Szövegalapú játékok**:
  - Szó-Kép párosítás
  - Hiányzó betű
  - Első betű felismerés
- **Hangaktivált játék**: "Mondd ki hangosan!" (V1 - hang detektálás)
- **Szülői kontroll**: Játékidő limit, statisztikák

## Technológiai Stack

- React Native + Expo
- TypeScript
- React Navigation
- expo-av (hang kezelés)
- AsyncStorage (helyi adattárolás)

## Telepítés

```bash
npm install
```

## Futtatás

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## Projekt Struktúra

```
Armin/
├── components/      # Újrafelhasználható UI komponensek
├── screens/         # Képernyő komponensek
├── games/          # Játék logika
├── utils/          # Segédfunkciók
├── theme/          # Téma és stílus
├── types/          # TypeScript típusok
└── assets/         # Erőforrások
```

## Fejlesztési Fázisok

1. ✅ Projekt Setup és Alap Architektúra
2. ✅ UI/UX Komponensek
3. ✅ Betűfelismerő Játék
4. ✅ Számfelismerő Játék
5. ✅ Szövegalapú Játékok
6. ✅ Hangaktivált Játék (V1)
7. ✅ Szülői Kontroll
8. ✅ Hangfunkciók Roadmap

## Licenc

Privát projekt
