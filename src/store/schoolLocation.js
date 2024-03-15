export const schoolLoccation = {
  puzzleAboutLoccation: {
    id: 1,
    puzzleText: `Вопрос капитану команды: в адрес какого учреждения 
    Вы говорили такие слова? Вспоминайте!”`,
    puzzleVideoFilePath: `/locationSchool/part-1.mp4`,
    video: '',
    description_text: ``,
    description_filePath: ``,
    answer: '',
    rightAnswer: [
      'языковая школа',
      'школа ',
      'LSNZ',
      'школа английского ',
      'школа английского языка',
    ],
    done: false,
    last_description_text: `Ответ верный. Капитан, ведите свою команду к этой локации`,
    last_description_filePath: `/locationSchool/part-2.mp3`,
    clues: [
      {
        id: '1',
        used: false,

        text: 'Серьезно? подсказка!',
        filePath: '',
      },
      {
        id: '2',
        used: false,

        text: 'Какой позор!',
        filePath: '',
      },
      {
        id: '3',
        used: false,

        text: 'Похоже, пришло время отправляться на экскурсию в ближайший дом престарелых, раз ваша память начинает играть в прятки без предупреждения.',
        filePath: '',
      },
    ],
  },
  qRCode: {
    filePath: `/locationSchool/47.png`,
  },
  puzzlePrevMain: {
    id: 1,
    puzzleText: `Посчитайте квадратные ячейки слева от входа в школу (если стоять лицом ко входу)`,
    puzzleFilePath: ``,
    video: '',
    description_text: ``,
    description_filePath: ``,
    answer: '',
    rightAnswer: ['33'],
    done: false,
    last_description_text: `Изучение английского языка в школьных классах открывает дверь в мир философии, предоставляя ключ к пониманию широкого спектра философских идей и теорий, изложенных на английском языке, тем самым обогащая наше восприятие и понимание мира.`,
    last_description_filePath: `/locationSchool/part-6.mp3`,
    clues: [
      {
        id: '1',
        used: false,

        text: 'Начните, не стесняйтесь, каждый по очереди!',
        filePath: '',
      },
      {
        id: '2',
        used: false,

        text: 'один, два, три....',
        filePath: '',
      },
    ],
  },
  puzzleMain: {
    id: 1,

    puzzleText: ``,
    puzzleFilePath: `/locationSchool/48.png`,
    video: '',

    description_text: ``,
    description_filePath: ``,
    answer: '',
    rightAnswer: ['Жить вечно'],
    done: false,
    last_description_text: `“Жить вечно” - в этом, по мнению «Google Artificial Intelligence Bot» 
    заключается смысл жизни.`,
    last_description_filePath: `/locationSchool/part-5.mp3`,
    clues: [
      {
        id: '1',
        used: false,

        text: '/locationSchool/49.png',
        filePath: '',
      },
      {
        id: '2',
        used: false,

        text: '',
        filePath: '/locationSchool/50.png',
      },
      {
        id: '3',
        used: false,

        text: '',
        filePath: '/locationSchool/51.png',
      },
    ],
  },
};
