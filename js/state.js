const STORAGE_KEY = "TMS_TRAINING_STATE";

const state = {

  screen: "home",

  participant: {
    name: "",
    email: ""
  },

  currentSlide: 0,

  answers: {},

  isSaving: false
};


function saveState() {

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


function loadState() {

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

    // Proteksi slide
    const totalSlides =
      TRAINING.slides.length;

    if (totalSlides === 0) {

      state.currentSlide = 0;

    } else if (state.currentSlide < 0) {

      state.currentSlide = 0;

    } else if (
      state.currentSlide >= totalSlides
    ) {

      state.currentSlide =
        totalSlides - 1;

    }

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


function clearTrainingState() {

  localStorage.removeItem(
    STORAGE_KEY
  );

}
