# Hangfunkciók Fejlesztési Roadmap

## Áttekintés

Ez a dokumentum a hangaktivált játék funkciók fejlesztési roadmap-jét tartalmazza. A jelenlegi implementáció a V1 verzió, amely csak hang detektálást végez. A jövőbeli verziókban beszédfelismerés kerül implementálásra.

## VERSION 1 - Fake Voice Interaction (Jelenlegi)

### Leírás
A jelenlegi verzió csak hang detektálást végez. Nem elemezi a beszélt tartalmat, csak azt ellenőrzi, hogy:
- Van-e mikrofon engedély
- Volt-e hang bemenet
- Elég hosszú volt-e a felvétel (minimum időtartam)

### Technikai megvalósítás
- **Platform**: Expo + expo-av
- **Hang detektálás**: Audio.Recording API
- **Ellenőrzés**: Időtartam alapú (minimum 0.5 másodperc)
- **TTS**: Nincs implementálva (placeholder)

### Előnyök
- ✅ Könnyen implementálható
- ✅ Nincs külső függőség
- ✅ Gyors és hatékony
- ✅ Önbizalom építés a gyerekeknek

### Hátrányok
- ❌ Nem ellenőrzi a beszélt tartalmat
- ❌ Nincs TTS (text-to-speech)
- ❌ Nem tudja, hogy helyesen mondták-e ki

### Kockázatok
- **Alacsony**: Egyszerű implementáció, kevés külső függőség

### Kritériumok a következő verzióra lépéshez
- ✅ V1 stabil működés
- ✅ Felhasználói visszajelzések pozitívak
- ✅ Szükség van pontosabb értékelésre

---

## VERSION 2 - Word-Level Recognition (Jövőbeli)

### Leírás
Szó szintű beszédfelismerés teljes szavak felismerésére. A gyereknek egy szót kell kimondania, és az alkalmazás ellenőrzi, hogy helyesen mondta-e ki.

### Technikai megvalósítás
- **Platform**: Android SpeechRecognizer API
- **Nyelv**: Magyar (hu-HU)
- **Felismerés**: Teljes szavak
- **TTS**: expo-speech vagy Android TTS

### Implementáció részletek
```typescript
// Példa implementáció (nem részletes)
import { Speech } from 'expo-speech';

// TTS
await Speech.speak(text, { language: 'hu-HU' });

// Speech Recognition (Android)
// Android SpeechRecognizer API használata
```

### Előnyök
- ✅ Valós beszédfelismerés
- ✅ Pontos értékelés
- ✅ Tanulási hatékonyság növelése
- ✅ Natív Android támogatás

### Hátrányok
- ❌ Csak Android (iOS külön implementáció szükséges)
- ❌ Internet kapcsolat szükséges (ha online API-t használunk)
- ❌ Bonyolultabb hibakezelés

### Kockázatok
- **Közepes**: Külső API függőség, platform specifikus implementáció

### Finom hibakezelés
- Hálózati hiba esetén fallback V1-re
- Nem felismerhető beszéd esetén pozitív visszajelzés
- Időtúllépés kezelése

### Kritériumok a következő verzióra lépéshez
- ✅ V2 stabil működés Android-on
- ✅ Legalább 80% felismerési pontosság
- ✅ Felhasználói visszajelzések pozitívak
- ✅ Szükség van foném szintű felismerésre

---

## VERSION 3 - Advanced Pronunciation (Távoli jövő)

### Leírás
Foném szintű beszédfelismerés egyedi ML modelllel. Pontosan értékeli a kiejtést és javaslatokat ad.

### Technikai megvalósítás
- **ML Modell**: Egyedi TensorFlow Lite modell
- **Felismerés**: Foném szintű
- **Offline**: Teljes offline működés
- **TTS**: Fejlett TTS magyar nyelvre

### Előnyök
- ✅ Legpontosabb értékelés
- ✅ Offline működés
- ✅ Egyedi modell a magyar nyelvre optimalizálva
- ✅ Részletes visszajelzés

### Hátrányok
- ❌ Magas fejlesztési költség
- ❌ ML modell képzése és optimalizálása
- ❌ Nagyobb app méret
- ❌ Hosszú fejlesztési idő

### Kockázatok
- **Magas**: Komplex implementáció, ML expertise szükséges

### Kritériumok
- ✅ V2 teljesen stabil
- ✅ Szükség van foném szintű felismerésre
- ✅ Elegendő erőforrás ML modell fejlesztésére
- ✅ NEM része az MVP-nek

---

## Technikai Döntési Jegyzetek

### V1 választás indoklása
- Gyors MVP fejlesztés
- Könnyen tesztelhető
- Alacsony kockázat
- Önbizalom építés a gyerekeknek

### V2 választás indoklása
- Valós beszédfelismerés szükséges
- Android natív támogatás
- Megfelelő pontosság szó szinten

### V3 késleltetés indoklása
- Túl komplex MVP-hez
- Magas fejlesztési költség
- Később is implementálható

---

## Kockázat Értékelés

| Verzió | Kockázat Szint | Fő Kockázatok | Kezelés |
|--------|----------------|---------------|---------|
| V1 | Alacsony | Nincs | - |
| V2 | Közepes | Platform specifikus, API függőség | Fallback V1-re, hibakezelés |
| V3 | Magas | ML modell fejlesztés, komplexitás | Késleltetés MVP után |

---

## Következő Lépések

1. **V1 stabilizálása** (Jelenlegi)
   - TTS implementáció hozzáadása
   - Felhasználói tesztelés
   - Visszajelzések gyűjtése

2. **V2 előkészítése** (Következő)
   - Android SpeechRecognizer kutatás
   - Prototípus fejlesztése
   - Tesztelés Android eszközön

3. **V3 tervezése** (Távoli jövő)
   - ML modell követelmények
   - TensorFlow Lite integráció
   - Offline működés tervezése

---

## Dátumok és Határidők

- **V1**: ✅ Implementálva (2026. január)
- **V2**: Tervezett (2026. Q2)
- **V3**: Távoli jövő (2026. Q4 vagy később)

---

## Megjegyzések

- Ez a roadmap élő dokumentum, frissíthető a fejlesztés során
- A verziók közötti váltás kritériumok alapján történik
- Felhasználói visszajelzések fontosak a döntésekhez
