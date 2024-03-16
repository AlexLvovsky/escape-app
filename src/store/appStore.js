import { createSlice } from "@reduxjs/toolkit";
import { steps, errorType, subSteps } from "./enum";
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

export const checkRightAnswer = (rightAnswers, answer) => {
  if (answer) {
    const value = answer?.trim().toLowerCase();
    const lowercasedRightAnswers = rightAnswers.map((answer) =>
      answer.toLowerCase().trim()
    );
    if (lowercasedRightAnswers.includes(value)) {
      return true;
    }
  }
  return false;
};

const initialState = {
  value: 0,
  segColors: [
    "#000080",
    "#4169E1",
    "#010c80a3",
    "#0047AB",
    "#3F00FF",
    "#00008B",
    "#0F52BA",
  ],
  teemName: null,
  names: [],
  playersObject: {},
  currentStep: steps.welcome,
  subStep: subSteps.about_location,
  count: "",
  winnerName: null,
  winnerIndex: null,
  loader: false,
  error: false,
  errorType: null,
  errorData: null,
  modal: false,
  nestedModal: false,
  spin: false,
  showText: false,
  confetti: false,
  showWheel: true,
  deleteWheel: false,
  shouldUpdateStep: false,
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
    setTeemName: (state, action) => {
      state.teemName = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload.currentStep;
      state.subStep = action.payload.subStep || subSteps.undefined;
    },
    setSubStep: (state, action) => {
      state.subStep = action.payload;
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
        state.winnerName = null;
        state.winnerIndex = null;
      }
    },
    setLoading: (state, action) => {
      state.loader = action.payload;
    },
    openModal: (state, action) => {
      state.modal = action.payload;
    },
    openNestedModal: (state, action) => {
      state.nestedModal = action.payload;
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
    setShouldUpdateStep: (state, action) => {
      state.shouldUpdateStep = action.payload;
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
  setShouldUpdateStep,
  setTeemName,
  openNestedModal,
  setSubStep,
} = appStore.actions;

export default appStore.reducer;
