import { EntitiesData } from "./models/entities";

const Trivia = [
  "กินข้าวยังจ๊ะ",
  `ตอนนี้เวลา ${new Date().toLocaleTimeString()} แล้วนะรู้ยัง`,
  `This game has ${EntitiesData.length} of entities !`,
  "There are few entities that have both mana and energy power at the same time.",
];

export function getRandomTrivia(): Promise<string> {
  return new Promise((resolve) => {
    const res = parseInt((Math.random() * 10).toFixed(0)) % Trivia.length;
    resolve(Trivia[res]);
  });
}
