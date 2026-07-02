/**
 * 2. osztály – olvasás gyakorlat (rövid mondatok)
 */

export interface ReadingTask {
  sentence: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export const READING_TASKS: ReadingTask[] = [
  { sentence: 'A macska az ágyon alszik.', question: 'Hol alszik a macska?', options: ['az ágyon', 'a kertben', 'a vízben'], correctIndex: 0 },
  { sentence: 'Péter iskolába megy reggel.', question: 'Hova megy Péter?', options: ['iskolába', 'boltba', 'erdőbe'], correctIndex: 0 },
  { sentence: 'Az alma piros és édes.', question: 'Milyen az alma?', options: ['piros és édes', 'kék és sós', 'zöld és keserű'], correctIndex: 0 },
  { sentence: 'A kutya a labdával játszik.', question: 'Mivel játszik a kutya?', options: ['labdával', 'könyvvel', 'ceruzával'], correctIndex: 0 },
  { sentence: 'Ma süt a nap az égen.', question: 'Mi süt ma?', options: ['a nap', 'a hold', 'a csillag'], correctIndex: 0 },
  { sentence: 'Anna olvas egy szép mesét.', question: 'Mit olvas Anna?', options: ['mesét', 'levest', 'cipőt'], correctIndex: 0 },
  { sentence: 'A madarak a fán énekelnek.', question: 'Hol énekelnek a madarak?', options: ['a fán', 'a víz alatt', 'a házban'], correctIndex: 0 },
  { sentence: 'Télen havazik és hideg van.', question: 'Milyen az idő télen?', options: ['havazik és hideg', 'meleg és száraz', 'esik és meleg'], correctIndex: 0 },
  { sentence: 'A tanár a táblán ír.', question: 'Hol ír a tanár?', options: ['a táblán', 'a padon', 'az udvaron'], correctIndex: 0 },
  { sentence: 'Esténként mesét olvasunk.', question: 'Mit olvasunk esténként?', options: ['mesét', 'újságot', 'térképet'], correctIndex: 0 },
  { sentence: 'A bicikli két keréken megy.', question: 'Hány keréke van a biciklinek?', options: ['kettő', 'három', 'négy'], correctIndex: 0 },
  { sentence: 'A virágok szépen nyílnak tavasszal.', question: 'Mikor nyílnak a virágok?', options: ['tavasszal', 'télen', 'ősszel este'], correctIndex: 0 },
  { sentence: 'A fiú focizik a barátjaival.', question: 'Mit csinál a fiú?', options: ['focizik', 'alszik', 'főz'], correctIndex: 0 },
  { sentence: 'Anyu süteményt süt a sütőben.', question: 'Mit süt anyu?', options: ['süteményt', 'cipőt', 'papírt'], correctIndex: 0 },
  { sentence: 'A vonat gyorsan halad a síneken.', question: 'Hol halad a vonat?', options: ['a síneken', 'a vízen', 'levegőben'], correctIndex: 0 },
];

export function getRandomReadingTask(): ReadingTask {
  const i = Math.floor(Math.random() * READING_TASKS.length);
  return READING_TASKS[i];
}
