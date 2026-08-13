// =========================================================
// TMS - STATE MANAGEMENT
// =========================================================

export const STORAGE_KEY = "TMS_TRAINING_STATE";

export const state = {

  screen: "home",

  participant: {
    name: "",
    email: ""
  },

  currentSlide: 0,

  answers: {},

  isSaving: false

};


// =========================================================
// SAVE STATE
// =========================================================

export function saveState() {

  try {

    const data = {

      screen: state.screen,

      participant: {
        name: state.participant.name,
        email: state.participant.email
      },

      currentSlide: state.currentSlide,

      answers: state.answers

    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );

  } catch (error) {

    console.error(
      "Gagal menyimpan state:",
      error
    );

  }

}


// =========================================================
// LOAD STATE
// =========================================================

export function loadState() {

  try {

    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return false;
    }

    const data =
      JSON.parse(saved);

    if (!data) {
      return false;
    }


    state.screen =
      data.screen || "home";


    state.participant =
      data.participant || {
        name: "",
        email: ""
      };


    state.currentSlide =
      Number.isInteger(data.currentSlide)
        ? data.currentSlide
        : 0;


    state.answers =
      data.answers || {};


    return true;

  } catch (error) {

    console.error(
      "Gagal membaca state:",
      error
    );

    localStorage.removeItem(
      STORAGE_KEY
    );

    return false;

  }

}


// =========================================================
// CLEAR STATE
// =========================================================

export function clearTrainingState() {

  localStorage.removeItem(
    STORAGE_KEY
  );

}
