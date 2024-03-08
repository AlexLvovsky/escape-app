export const poetryPuzzleData = [
  {
    id: 1,
    text: `Сияет ладья в рассвете <br />
            Сквозь дымку водного простора синего! <br />
            Какова цель её в недостижимом крае?<br />
            Каково покинутое ей в месте урождения?..`,
    fileName: "location1/location1.jpeg",
    answer: "",
    rightAnswer: ["Белеет парус одинокий", "Лермонтов"],
    done: false,
    clues: [
      {
        id: "1",
        used: false,
        text: "",
        fileName: "location1/location1_clue3.jpeg",
      },
      { id: "2", used: false, text: "bla bla bla", fileName: "" },
      {
        id: "3",
        used: false,
        text: "bla bla bla bla",
        fileName: "",
      },
    ],
  },
  {
    id: 2,
    text: `Заморозки и светила; эра волшебства! <br />
            Ты ещё в объятии грёз, сокровище нежное — <br />
            На часах момент, богиня, открой глаза: <br />
            Раздвинь веки, скованные сладостным покоем <br />
            Напротив утра морозного, <br />
            Как алмаз арктический, засияй!`,
    fileName: "",
    answer: "",
    rightAnswer: ["мороз и солнце", "Пушкин"],
    done: false,
    clues: [
      { id: "1", used: false, text: "Пушкин", fileName: "" },
      { id: "2", used: false, text: "Пушкин Пушкин", fileName: "" },
      {
        id: "3",
        used: false,
        text: "Пушкин Пушкин Пушкин",
        fileName: "",
      },
    ],
  },
  {
    id: 3,
    text: `Мелодий, чьи слова ещё не сочинены, сколько?<br />
            Отзовись, пересмешница, возвести <br />
            В урбанистической суете мне быть или за чертой? <br />
            Подобно камню покоиться, или как светило мерцать? Светилом? <br />
            Небесное тело мое, посмотри на меня <br />
            Моя рука скрепилась в тиски <br />
            И если есть искра, зажги пламя! <br />
            Таков мой призыв!`,
    fileName: "",
    answer: "",
    rightAnswer: ["Кукушка", "Цой"],
    done: false,
    clues: [
      { id: "1", used: false, text: "Цой", fileName: "" },
      { id: "2", used: false, text: "Цой Цой", fileName: "" },
      { id: "3", used: false, text: "Цой Цой Цой", fileName: "" },
    ],
  },
];

export const location1 = {
  id: 1,
  text: ``,
  fileName: "location1/location1.jpeg",
  answer: "",
  rightAnswer: ["Кукушка", "Цой"],
  done: false,
  clues: [
    {
      id: "1",
      used: false,
      text: "",
      fileName: "location1/location1_clue1.jpeg",
    },
    {
      id: "2",
      used: false,
      text: "",
      fileName: "location1/location1_clue2.jpeg",
    },
    {
      id: "3",
      used: false,
      text: "",
      fileName: "location1/location1_clue3.jpeg",
    },
  ],
};
