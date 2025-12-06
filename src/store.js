import { configureStore } from "@reduxjs/toolkit";
import navigationReducer, { setCurrentPage } from "./slices/navigationSlice";
import selectionReducer, {
  clearSelectedCancer,
  clearSelectedHeart,
  clearSelectedKidney,
  clearSelectedNerve,
  clearSelectedSMA,
  clearSelectedTreatment,
  setSelectedCancer,
  setSelectedHeart,
  setSelectedKidney,
  setSelectedNerve,
  setSelectedSMA,
  setSelectedTreatment,
} from "./slices/selectionSlice";

const ROUTE_STORAGE_KEY = "app-route-state";

const canUseSessionStorage = () =>
  typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";

const readPersistedRoute = () => {
  if (!canUseSessionStorage()) return null;

  try {
    const raw = sessionStorage.getItem(ROUTE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch (error) {
    console.warn("Failed to parse persisted route state:", error);
    return null;
  }
};

const mapPersistedToState = (persisted) => {
  if (!persisted) return undefined;

  return {
    navigation: {
      currentPage: persisted.page || "home",
    },
    selections: {
      selectedTreatment: persisted.selectedTreatment ?? null,
      selectedCancer: persisted.selectedCancer ?? null,
      selectedKidney: persisted.selectedKidney ?? null,
      selectedHeart: persisted.selectedHeart ?? null,
      selectedNerve: persisted.selectedNerve ?? null,
      selectedSMA: persisted.selectedSMA ?? null,
    },
  };
};

const extractPersistableState = (state) => ({
  page: state.navigation.currentPage,
  selectedTreatment: state.selections.selectedTreatment,
  selectedCancer: state.selections.selectedCancer,
  selectedKidney: state.selections.selectedKidney,
  selectedHeart: state.selections.selectedHeart,
  selectedNerve: state.selections.selectedNerve,
  selectedSMA: state.selections.selectedSMA,
});

const persistRouteState = (state) => {
  if (!canUseSessionStorage()) return;

  try {
    sessionStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Failed to persist route state:", error);
  }
};

const routePersistenceMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  persistRouteState(extractPersistableState(storeAPI.getState()));

  return result;
};

const preloadedState = mapPersistedToState(readPersistedRoute());

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    selections: selectionReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routePersistenceMiddleware),
});

export const navigate =
  (pageKey, options = {}) =>
  (dispatch, getState) => {
    if (!pageKey) return;

    const { selections } = getState();

    if (pageKey === "treatment-detail") {
      if (options?.treatment) {
        dispatch(setSelectedTreatment(options.treatment));
      }
    } else if (selections.selectedTreatment) {
      dispatch(clearSelectedTreatment());
    }

    if (pageKey === "cancer-detail") {
      if (options?.cancerKey) {
        dispatch(
          setSelectedCancer({
            key: options.cancerKey,
            title: options?.title,
          })
        );
      }
    } else if (selections.selectedCancer) {
      dispatch(clearSelectedCancer());
    }

    if (pageKey === "kidney-detail") {
      if (options?.kidneyKey) {
        dispatch(
          setSelectedKidney({
            key: options.kidneyKey,
            title: options?.title,
          })
        );
      }
    } else if (selections.selectedKidney) {
      dispatch(clearSelectedKidney());
    }

    if (pageKey === "heart-detail") {
      if (options?.heartKey) {
        dispatch(
          setSelectedHeart({
            key: options.heartKey,
            title: options?.title,
          })
        );
      }
    } else if (selections.selectedHeart) {
      dispatch(clearSelectedHeart());
    }

    if (pageKey === "nerve-detail") {
      if (options?.nerveKey) {
        dispatch(
          setSelectedNerve({
            key: options.nerveKey,
            title: options?.title,
          })
        );
      }
    } else if (selections.selectedNerve) {
      dispatch(clearSelectedNerve());
    }

    if (pageKey === "sma-detail") {
      if (options?.smaKey) {
        dispatch(
          setSelectedSMA({
            key: options.smaKey,
            title: options?.title,
          })
        );
      }
    } else if (selections.selectedSMA) {
      dispatch(clearSelectedSMA());
    }

    if (getState().navigation.currentPage !== pageKey) {
      dispatch(setCurrentPage(pageKey));
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

export default store;
