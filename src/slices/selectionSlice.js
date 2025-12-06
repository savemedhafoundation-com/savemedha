import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTreatment: null,
  selectedCancer: null,
  selectedKidney: null,
  selectedHeart: null,
  selectedNerve: null,
  selectedSMA: null,
};

const selectionSlice = createSlice({
  name: "selections",
  initialState,
  reducers: {
    setSelectedTreatment: (state, action) => {
      state.selectedTreatment = action.payload ?? null;
    },
    clearSelectedTreatment: (state) => {
      state.selectedTreatment = null;
    },
    setSelectedCancer: (state, action) => {
      state.selectedCancer = action.payload ?? null;
    },
    clearSelectedCancer: (state) => {
      state.selectedCancer = null;
    },
    setSelectedKidney: (state, action) => {
      state.selectedKidney = action.payload ?? null;
    },
    clearSelectedKidney: (state) => {
      state.selectedKidney = null;
    },
    setSelectedHeart: (state, action) => {
      state.selectedHeart = action.payload ?? null;
    },
    clearSelectedHeart: (state) => {
      state.selectedHeart = null;
    },
    setSelectedNerve: (state, action) => {
      state.selectedNerve = action.payload ?? null;
    },
    clearSelectedNerve: (state) => {
      state.selectedNerve = null;
    },
    setSelectedSMA: (state, action) => {
      state.selectedSMA = action.payload ?? null;
    },
    clearSelectedSMA: (state) => {
      state.selectedSMA = null;
    },
  },
});

export const {
  setSelectedTreatment,
  clearSelectedTreatment,
  setSelectedCancer,
  clearSelectedCancer,
  setSelectedKidney,
  clearSelectedKidney,
  setSelectedHeart,
  clearSelectedHeart,
  setSelectedNerve,
  clearSelectedNerve,
  setSelectedSMA,
  clearSelectedSMA,
} = selectionSlice.actions;

export default selectionSlice.reducer;
