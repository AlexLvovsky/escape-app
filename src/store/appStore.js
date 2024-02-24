import { createSlice } from "@reduxjs/toolkit";
import { steps, errorType } from "./enum";
import { errors } from "./variables";
import _ from "lodash";

const findBestMatch = (targetName, namesArray) => {
  let bestMatch = { index: -1, similarity: 0 };

  namesArray.forEach((name, index) => {
    const nameTokens = name.toLowerCase().split(/\s+/);
    const targetTokens = targetName.toLowerCase().split(/\s+/);

    const commonTokens = _.intersection(nameTokens, targetTokens);
    const similarity =
      commonTokens.length / Math.max(nameTokens.length, targetTokens.length);

    if (similarity > bestMatch.similarity) {
      bestMatch = { index, similarity };
    }
  });

  return namesArray[bestMatch.index];
};

const generateNameVariations = () => {
  const nameVariations = [
    "Ekaterina",
    "Катя",
    "Екатерина",
    "Катэ",
    "Katya",
    "Katerina",
    "Catherine",
    "Yekaterina",
    "Katusha",
    "Katyusha",
    "Катюша",
  ];

  const variations = [];
  nameVariations.forEach((variation) => {
    variations.push(variation);
    variations.push(variation.toLowerCase());
    variations.push(variation.toUpperCase());
    variations.push(variation.charAt(0).toUpperCase() + variation.slice(1));
  });

  return variations;
};
const initialState = {
  value: 0,
  segColors: [
    "#39328b",
    "#3b3c8a",
    "#3d4b89",
    "#3f5a88",
    "#417987",
    "#439886",
    "#45a785",
    "#47b684",
    "#49c583",
    "#4bcd82",
  ],

  names: [],
  playersObject: {},
  currentStep: steps.welcome,
  count: "",
  winnerName: null,
  winnerIndex: null,
  loader: false,
  error: false,
  errorType: null,
  errorData: null,
  modal: false,
  spin: false,
  showText: false,
  confetti: false,
  showWheel: true,
  deleteWheel: false,
};

export const appStore = createSlice({
  name: "appStore",
  initialState,
  reducers: {
    setName: (state, action) => {
      const { index, name } = action.payload;
      state.names[index] = name;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    findWinner: (state, action) => {
      const playersObject = state.names.map((item) => ({ option: item }));
      const nameVariations = generateNameVariations();
      let winnerOption = null;
      let winnerIndex = null;
      state.error = false;
      state.errorType = null;
      state.errorData = null;

      state.names.forEach((name, index) => {
        const winner = findBestMatch(name, nameVariations);
        if (winner) {
          winnerOption = name;
          winnerIndex = index;
        }
      });
      state.playersObject = playersObject;
      if (winnerOption != null && winnerIndex != null) {
        state.winnerName = winnerOption;
        state.winnerIndex = winnerIndex;
      } else {
        state.error = true;
        state.errorType = errorType.no_winner;
        state.errorData = errors.find((e) => e.type === errorType.no_winner);
      }
    },
    setLoading: (state, action) => {
      state.loader = action.payload;
    },
    openModal: (state, action) => {
      state.modal = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload.error;
      state.errorType = action.payload.type;
      if (action.payload.error && action.payload.type) {
        state.errorData = errors.find((e) => e.type === action.payload.type);
      } else state.errorData = null;
    },
    setSpin: (state, action) => {
      state.spin = action.payload;
    },
    setShowText: (state, action) => {
      state.showText = action.payload;
    },
    setConfetti: (state, action) => {
      state.confetti = action.payload;
    },
    setShowWheel: (state, action) => {
      state.showWheel = action.payload;
    },
    setDeleteWheel: (state, action) => {
      state.deleteWheel = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setName,
  setCurrentStep,
  setCount,
  findWinner,
  setLoading,
  openModal,
  setError,
  setSpin,
  setConfetti,
  setShowWheel,
  setDeleteWheel,
  setShowText,
} = appStore.actions;

export default appStore.reducer;
