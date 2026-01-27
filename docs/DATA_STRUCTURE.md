# Adatstruktúra Dokumentáció

## Áttekintés

Az alkalmazás adatstruktúrái a `word_assets_summary.txt` fájl alapján lettek létrehozva.

## Fájlok

### 1. `games/letterGame/letterData.ts`
- **LETTERS**: 44 magyar betű (ékezetekkel)
- **letterQuestions**: Betűfelismerő játék kérdések (kompatibilitás a régi kóddal)

### 2. `games/textGames/wordData.ts`
- **WORDS**: ~125 szó, 1. osztályos szavak
- Minden szó tartalmazza: `id`, `word`, `firstLetter`
- Képek és hangok később kerülnek be (opcionális)

### 3. `games/textGames/textGameData.ts`
- **wordPictureQuestions**: Szó-kép párosítás kérdések
- **missingLetterQuestions**: Hiányzó betű kérdések (20 minta)
- **firstLetterQuestions**: Első betű felismerés (WORDS listából generálva)

### 4. `games/voiceGame/voiceGameData.ts`
- **VOICE_LETTERS**: 44 betű hangjátékhoz
- **VOICE_WORDS**: Választott szavak hangjátékhoz

## Assets Mappa Struktúra

```
assets/
├── images/
│   ├── letters/     # Betűk képei (A.png, Á.png, B.png, stb.)
│   └── words/        # Szavak képei (ALMA.png, KUTYA.png, stb.)
└── sounds/
    ├── letters/      # Betűk hangjai (A.mp3, Á.mp3, B.mp3, stb.)
    └── words/        # Szavak hangjai (ALMA.mp3, KUTYA.mp3, stb.)
```

## Fájlnév Szabályok

### Képek
- **Betűk**: Nagybetűvel, ékezetes (pl. `A.png`, `Á.png`, `Ő.png`)
- **Szavak**: Nagybetűvel, ékezetes, a szóval megegyező (pl. `ALMA.png`, `BÉKA.png`, `PILLANGÓ.png`)

### Hangok
- **Betűk**: Nagybetűvel, ékezetes (pl. `A.mp3`, `Á.mp3`, `Ő.mp3`)
- **Szavak**: Nagybetűvel, ékezetes, a szóval megegyező (pl. `ALMA.mp3`, `BÉKA.mp3`, `PILLANGÓ.mp3`)

## Használat

### Betűfelismerő játék
```typescript
import { LETTERS, getRandomLetterQuestion } from './games/letterGame/letterData';
```

### Szó-kép párosítás
```typescript
import { wordPictureQuestions, getRandomWordPictureQuestion } from './games/textGames/textGameData';
```

### Hiányzó betű
```typescript
import { missingLetterQuestions, getRandomMissingLetterQuestion } from './games/textGames/textGameData';
```

### Első betű felismerés
```typescript
import { firstLetterQuestions, getRandomFirstLetterQuestion } from './games/textGames/textGameData';
```

### Hangjáték
```typescript
import { VOICE_LETTERS, VOICE_WORDS, getRandomVoiceItem } from './games/voiceGame/voiceGameData';
```

## Képek és Hangok Hozzáadása

1. Töltsd fel a képeket az `assets/images/words/` mappába
2. Töltsd fel a hangokat az `assets/sounds/words/` mappába
3. Frissítsd a `wordData.ts` fájlt, hogy tartalmazza a `require()` hivatkozásokat:

```typescript
{ 
  id: "alma", 
  word: "ALMA", 
  firstLetter: "A",
  image: require("../../assets/images/words/ALMA.png"),
  sound: require("../../assets/sounds/words/ALMA.mp3")
}
```

## Hiányzó Betű Minták

A `missingLetterQuestions` tartalmazza a következő mintákat:
- B_A (BÉKA)
- C_C_A (CICA)
- A_L_A (ALMA)
- M_C_S_A (MACSKA)
- P_L_L_A (PILLANGÓ)
- K_T_Y_A (KUTYA)
- H_L (HAL)
- H_Z (HÁZ)
- L_B_D_A (LABDA)
- M_D_V_E (MEDVE)
- T_L (TOLL)
- T_NY_R (TÁNYÉR)
- S_Z (SZÓ)
- S_Z_N (SZÍN)
- S_Z_L (SZÉL)
- Z_S (ZÁSZLÓ)
- Z_E_B_R_A (ZEBRA)
- G_Y_R_T_Y_A (GYERTYA)
- F_A_K (FAKÓ)
- F_R_K (FARKAS)

## Jövőbeli Fejlesztések

- [ ] Script generáló a képek alapján automatikus adatgeneráláshoz
- [ ] TTS (Text-to-Speech) implementáció hangjátékhoz
- [ ] További hiányzó betű minták hozzáadása
- [ ] További szavak hozzáadása a WORDS listához
