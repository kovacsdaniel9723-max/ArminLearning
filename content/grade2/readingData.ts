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
  { sentence: 'A macska az ágyon alszik.', question: 'hol alszik a macska?', options: ['az ágyon', 'a kertben', 'a vízben'], correctIndex: 0 },
  { sentence: 'Péter iskolába megy reggel.', question: 'hova megy Péter?', options: ['iskolába', 'boltba', 'erdőbe'], correctIndex: 0 },
  { sentence: 'Az alma piros és édes.', question: 'milyen az alma?', options: ['piros és édes', 'kék és sós', 'zöld és keserű'], correctIndex: 0 },
  { sentence: 'A kutya a labdával játszik.', question: 'mivel játszik a kutya?', options: ['labdával', 'könyvvel', 'ceruzával'], correctIndex: 0 },
  { sentence: 'Ma süt a nap az égen.', question: 'mi süt ma?', options: ['a nap', 'a hold', 'a csillag'], correctIndex: 0 },
  { sentence: 'Anna olvas egy szép mesét.', question: 'mit olvas Anna?', options: ['mesét', 'levest', 'cipőt'], correctIndex: 0 },
  { sentence: 'A madarak a fán énekelnek.', question: 'hol énekelnek a madarak?', options: ['a fán', 'a víz alatt', 'a házban'], correctIndex: 0 },
  { sentence: 'Télen havazik és hideg van.', question: 'milyen az idő télen?', options: ['havazik és hideg', 'meleg és száraz', 'esik és meleg'], correctIndex: 0 },
  { sentence: 'A tanár a táblán ír.', question: 'hol ír a tanár?', options: ['a táblán', 'a padon', 'az udvaron'], correctIndex: 0 },
  { sentence: 'Esténként mesét olvasunk.', question: 'mit olvasunk esténként?', options: ['mesét', 'újságot', 'térképet'], correctIndex: 0 },
  { sentence: 'A bicikli két keréken megy.', question: 'hány keréke van a biciklinek?', options: ['kettő', 'három', 'négy'], correctIndex: 0 },
  { sentence: 'A virágok szépen nyílnak tavasszal.', question: 'mikor nyílnak a virágok?', options: ['tavasszal', 'télen', 'ősszel'], correctIndex: 0 },
  { sentence: 'A fiú focizik a barátjaival.', question: 'mit csinál a fiú?', options: ['focizik', 'alszik', 'főz'], correctIndex: 0 },
  { sentence: 'Anyu süteményt süt a sütőben.', question: 'mit süt anyu?', options: ['süteményt', 'cipőt', 'papírt'], correctIndex: 0 },
  { sentence: 'A vonat gyorsan halad a síneken.', question: 'hol halad a vonat?', options: ['a síneken', 'a vízen', 'levegőben'], correctIndex: 0 },
];

export function getRandomReadingTask(): ReadingTask {
  const i = Math.floor(Math.random() * READING_TASKS.length);
  return READING_TASKS[i];
}
