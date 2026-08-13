import {
  state,
  saveState,
  loadState,
  clearTrainingState
} from "./state.js";

const app =
  document.getElementById("app");


/* =========================================================
   ROUTER
   ========================================================= */

function render() {

  if (state.screen === "home") {

    renderHome();

    return;
  }


  if (state.screen === "identity") {

    renderIdentity();

    return;
  }


  if (state.screen === "learning") {

    renderLearning();

    return;
  }


  if (state.screen === "result") {

    renderResult();

    return;
  }


  state.screen = "home";

  renderHome();

}


/* =========================================================
   HOME
   ========================================================= */

function renderHome() {

  const slideCount =
    getSlides().length;

  const questionCount =
    getQuestionCount();

  const materialCount =
    getMaterialCount();


  app.innerHTML = layout(`

    <section class="hero">

      <div class="hero-copy">

        <div class="pill">
          ● ONLINE TRAINING
        </div>

        <h1>
          Belajar singkat.
          <br>
          <em>Paham lebih cepat.</em>
        </h1>

        <p>
          Materi, gambar, video, dan evaluasi
          dalam satu pengalaman belajar yang
          sederhana dan interaktif.
        </p>

        <button
          class="primary"
          onclick="goIdentity()"
        >
          Mulai Training
          <span>→</span>
        </button>

      </div>


      <div class="hero-card">

        <div class="card-icon">
          ▣
        </div>

        <div>

          <strong>
            ${TRAINING.title}
          </strong>

          <small>
            ${TRAINING.subtitle}
          </small>

        </div>


        <div class="stats">

          <span>
            <b>${materialCount}</b>
            Materi
          </span>

          <span>
            <b>${questionCount}</b>
            Soal
          </span>

          <span>
            <b>${TRAINING.duration || "-"}</b>
            Durasi
          </span>

        </div>


        <div class="slide-info">
          ${slideCount} slide pembelajaran
        </div>

      </div>

    </section>


    <section class="feature-row">

      <div>

        <span>01</span>

        <b>
          Pelajari materi
        </b>

        <p>
          Materi disajikan secara bertahap
          melalui slide yang interaktif.
        </p>

      </div>


      <div>

        <span>02</span>

        <b>
          Tonton & pahami
        </b>

        <p>
          Materi dapat dilengkapi gambar,
          grafik, dan video.
        </p>

      </div>


      <div>

        <span>03</span>

        <b>
          Kerjakan evaluasi
        </b>

        <p>
          Soal dapat ditempatkan di antara
          materi sesuai alur training.
        </p>

      </div>

    </section>

  `);

}


/* =========================================================
   IDENTITY
   ========================================================= */

function renderIdentity() {

  app.innerHTML = layout(`

    <section class="form-page">

      <div class="section-kicker">
        01 / IDENTITAS PESERTA
      </div>

      <h2>
        Sebelum mulai,
        <br>
        kenalkan diri dulu.
      </h2>

      <p class="muted">
        Data ini digunakan untuk mencatat
        hasil training.
      </p>


      <form
        onsubmit="startTraining(event)"
        class="identity-form"
      >

        <label>

          Nama lengkap

          <input
            id="name"
            required
            placeholder="Contoh: Ahmad Yani"
          >

        </label>


        <label>

          Email

          <span class="optional">
            (opsional)
          </span>

          <input
            id="email"
            type="email"
            placeholder="nama@perusahaan.com"
          >

        </label>


        <button
          class="primary full"
        >
          Mulai Training
          <span>→</span>
        </button>

      </form>

    </section>

  `);

}


/* =========================================================
   START
   ========================================================= */

function goIdentity() {

  state.screen = "identity";

  saveState();

  render();

}


function startTraining(event) {

  event.preventDefault();


  state.participant.name =
    document
      .getElementById("name")
      .value
      .trim();


  state.participant.email =
    document
      .getElementById("email")
      .value
      .trim();


  state.currentSlide = 0;

  state.answers = {};

  state.isSaving = false;

  state.screen = "learning";


  saveState();

  render();

}


/* =========================================================
   LEARNING
   ========================================================= */

function renderLearning() {

  const slides =
    getSlides();

  const totalSlides =
    slides.length;

  const slide =
    slides[state.currentSlide];


  if (!slide) {

    state.screen = "result";

    render();

    return;

  }


  let content = "";


  if (slide.type === "material") {

    content =
      renderMaterialSlide(slide);

  }


  else if (slide.type === "image") {

    content =
      renderImageSlide(slide);

  }


  else if (slide.type === "video") {

    content =
      renderVideoSlide(slide);

  }


  else if (slide.type === "question") {

    content =
      renderQuestionSlide(slide);

  }


  else {

    content = `
      <article class="material-card">

        <div class="material-content">

          <div class="pill soft">
            ERROR
          </div>

          <h2>
            Tipe slide tidak dikenali
          </h2>

          <p>
            Tipe slide
            <code>${slide.type}</code>
            belum didukung.
          </p>

        </div>

      </article>
    `;

  }


  const isFirst =
    state.currentSlide === 0;


  const isLast =
    state.currentSlide ===
    totalSlides - 1;


  const isQuestion =
    slide.type === "question";


  const selectedAnswer =
    isQuestion
      ? state.answers[state.currentSlide]
      : undefined;


  const canNext =
    !isQuestion ||
    selectedAnswer !== undefined;


  app.innerHTML = layout(`

    <section class="learning">

      ${progress(
        state.currentSlide + 1,
        totalSlides
      )}


      <div class="learning-meta">

        <span>

          SLIDE
          ${String(
            state.currentSlide + 1
          ).padStart(2, "0")}

          /

          ${String(
            totalSlides
          ).padStart(2, "0")}

        </span>


        <span>
          ${TRAINING.title}
        </span>

      </div>


      ${content}


      <div class="nav-row">

        <button
          class="secondary"
          onclick="previousSlide()"
          ${isFirst ? "disabled" : ""}
        >
          ← Sebelumnya
        </button>


        <span
          class="muted nav-info"
        >

          ${
            isQuestion

              ? (
                  selectedAnswer === undefined
                    ? "Pilih salah satu jawaban."
                    : "Jawaban sudah dipilih."
                )

              : (
                  isLast
                    ? "Training selesai."
                    : "Lanjut ke slide berikutnya."
                )
          }

        </span>


        <button
          class="primary"
          onclick="nextSlide()"
          ${!canNext ? "disabled" : ""}
        >

          ${
            isLast
              ? "Lihat Hasil"
              : "Berikutnya"
          }

          →

        </button>

      </div>

    </section>

  `);

}


/* =========================================================
   MATERIAL
   ========================================================= */

function renderMaterialSlide(slide) {

  const image = slide.image
    ? `
      <div class="material-image">

        <img
          src="${slide.image}"
          alt="${slide.title || "Materi"}"
        >

      </div>
    `
    : "";


  const points =
    Array.isArray(slide.points)
      ? slide.points
      : [];


  return `

    <article class="material-card">

      <div class="material-number">

        ${String(
          state.currentSlide + 1
        ).padStart(2, "0")}

      </div>


      <div class="material-content">

        <div class="pill soft">
          MATERI PEMBELAJARAN
        </div>


        <h2>
          ${slide.title || ""}
        </h2>


        ${image}


        <p>
          ${slide.text || ""}
        </p>


        ${
          points.length
            ? `
              <div class="points">

                ${points.map(
                  point => `
                    <div>
                      <span>✓</span>
                      ${point}
                    </div>
                  `
                ).join("")}

              </div>
            `
            : ""
        }

      </div>

    </article>

  `;

}


/* =========================================================
   IMAGE
   ========================================================= */

function renderImageSlide(slide) {

  return `

    <article class="material-card single-column">

      <div class="material-content">

        <div class="pill soft">
          VISUAL / GRAFIK
        </div>


        <h2>
          ${slide.title || ""}
        </h2>


        ${
          slide.image
            ? `
              <div class="graphic-image">

                <img
                  src="${slide.image}"
                  alt="${slide.title || "Gambar training"}"
                >

              </div>
            `
            : `
              <div class="image-empty">
                Gambar belum tersedia.
              </div>
            `
        }


        <p>
          ${slide.text || ""}
        </p>

      </div>

    </article>

  `;

}


/* =========================================================
   VIDEO
   ========================================================= */

function renderVideoSlide(slide) {

  return `

    <article class="material-card single-column">

      <div class="material-content">

        <div class="pill soft">
          VIDEO PEMBELAJARAN
        </div>


        <h2>
          ${slide.title || ""}
        </h2>


        <div class="video-container">

          ${getVideoEmbed(slide.video)}

        </div>


        <p>
          ${slide.text || ""}
        </p>

      </div>

    </article>

  `;

}


/* =========================================================
   QUESTION
   ========================================================= */

function renderQuestionSlide(slide) {

  const selected =
    state.answers[state.currentSlide];


  return `

    <article class="quiz-card">

      <div class="pill soft">
        PERTANYAAN
      </div>


      <h2>
        ${slide.q || ""}
      </h2>


      <div class="options">

        ${
          slide.options
            .map(
              (option, index) => `
                <button
                  class="
                    option
                    ${
                      selected === index
                        ? "selected"
                        : ""
                    }
                  "
                  onclick="answerQuestion(${index})"
                >

                  <span>
                    ${String.fromCharCode(65 + index)}
                  </span>

                  <b>
                    ${option}
                  </b>

                </button>
              `
            )
            .join("")
        }

      </div>


      ${
        selected !== undefined
          ? `
            <div class="answer-selected">
              ✓ Jawaban kamu sudah dipilih.
            </div>
          `
          : ""
      }

    </article>

  `;

}


/* =========================================================
   ANSWER
   ========================================================= */

function answerQuestion(index) {

  state.answers[state.currentSlide] =
    index;

  saveState();

  renderLearning();

}


/* =========================================================
   PREVIOUS
   ========================================================= */

function previousSlide() {

  if (state.currentSlide <= 0) {
    return;
  }


  state.currentSlide--;

  saveState();

  renderLearning();

}


/* =========================================================
   NEXT
   ========================================================= */

function nextSlide() {

  const slides =
    getSlides();

  const current =
    slides[state.currentSlide];


  if (
    current &&
    current.type === "question" &&
    state.answers[state.currentSlide] === undefined
  ) {

    return;

  }


  if (
    state.currentSlide <
    slides.length - 1
  ) {

    state.currentSlide++;

    saveState();

    renderLearning();

    return;

  }


  state.screen = "result";

  saveState();

  render();

}


/* =========================================================
   RESULT
   ========================================================= */

function calculateResult() {

  const questions =
    getQuestions();


  let correct = 0;


  questions.forEach(question => {

    const slideIndex =
      TRAINING.slides.indexOf(question);


    const selected =
      state.answers[slideIndex];


    if (
      selected !== undefined &&
      selected === question.answer
    ) {

      correct++;

    }

  });


  const total =
    questions.length;


  const score =
    total > 0
      ? Math.round(
          (correct / total) * 100
        )
      : 0;


  return {

    total,

    correct,

    score,

    passed:
      score >= CONFIG.passingGrade

  };

}


/* =========================================================
   RESULT PAGE
   ========================================================= */

function renderResult() {

  const result =
    calculateResult();


  const passed =
    result.passed;


  app.innerHTML = layout(`

    <section class="result-page">

      <div class="result-icon">
        ${passed ? "✓" : "!"}
      </div>


      <div class="pill">

        ${
          passed
            ? "TRAINING SELESAI"
            : "BELUM LULUS"
        }

      </div>


      <h2>

        ${
          passed
            ? "Selamat, training selesai."
            : "Training sudah selesai."
        }

      </h2>


      <div class="score">

        ${result.score}

        <small>
          /100
        </small>

      </div>


      <div
        class="
          result-status
          ${passed ? "pass" : "fail"}
        "
      >

        ${
          passed
            ? "LULUS"
            : "TIDAK LULUS"
        }

      </div>


      <p class="muted">

        ${state.participant.name},

        kamu menjawab

        <b>
          ${result.correct}
          dari
          ${result.total}
        </b>

        soal dengan benar.

      </p>


      <div class="result-actions">

        <button
          class="primary"
          onclick="saveResult()"
          id="save-result-button"
        >
          Simpan Hasil
        </button>


        <button
          class="secondary"
          onclick="finishTraining()"
        >
          Selesai
        </button>

      </div>


      <div
        id="save-status"
        class="save-status"
      ></div>

    </section>

  `);

}


/* =========================================================
   SAVE RESULT
   ========================================================= */

async function saveResult() {

  if (state.isSaving) {
    return;
  }


  const result =
    calculateResult();


  const payload = {

    timestamp:
      new Date().toISOString(),

    name:
      state.participant.name,

    email:
      state.participant.email,

    training:
      TRAINING.title,

    totalQuestions:
      result.total,

    correct:
      result.correct,

    score:
      result.score,

    status:
      result.passed
        ? "LULUS"
        : "TIDAK LULUS"

  };


  const el =
    document.getElementById(
      "save-status"
    );


  const button =
    document.getElementById(
      "save-result-button"
    );


  state.isSaving = true;


  if (button) {

    button.disabled = true;

    button.textContent =
      "Menyimpan...";

  }


  if (el) {

    el.textContent =
      "Menyimpan hasil ke Google Sheets...";

  }


  try {

    await fetch(
      CONFIG.googleScriptUrl,
      {

        method: "POST",

        mode: "no-cors",

        headers: {

          "Content-Type":
            "text/plain;charset=utf-8"

        },

        body:
          JSON.stringify(payload)

      }
    );


    if (el) {

      el.innerHTML = `
        <span class="save-success">
          ✓ Hasil berhasil dikirim ke Google Sheets.
        </span>
      `;

    }


    if (button) {

      button.textContent =
        "✓ Hasil Tersimpan";

    }

  }

  catch (error) {

    console.error(
      "Gagal menyimpan hasil:",
      error
    );


    if (el) {

      el.innerHTML = `
        <span class="save-error">
          Gagal mengirim hasil.
          Silakan coba lagi.
        </span>
      `;

    }


    if (button) {

      button.disabled = false;

      button.textContent =
        "Coba Lagi";

    }


    state.isSaving = false;

  }

}


/* =========================================================
   FINISH
   ========================================================= */

function finishTraining() {

  clearTrainingState();


  state.screen = "home";

  state.currentSlide = 0;

  state.answers = {};

  state.participant = {

    name: "",

    email: ""

  };

  state.isSaving = false;


  render();

}


/* =========================================================
   START APPLICATION
   ========================================================= */

const restored =
  loadState();


if (restored) {

  render();

}

else {

  state.screen = "home";

  render();

}
