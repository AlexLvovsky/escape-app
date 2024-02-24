import { errorType } from "./enum";
export const errors = [
  {
    id: 0,
    type: errorType.general,
    title: "Oy",
    text: "Oshibka",
  },
  {
    id: 1,
    type: errorType.no_winner,
    title: "Минуточку!",
    text: "Вы пропустили нескольких участников... рекомендую обратить внимание на всех вокруг.",
  },
];
