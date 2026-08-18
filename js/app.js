/* =========================================================
   TMS - APPLICATION
   File: js/app.js

   Dependency:
   - config.js
   - training-data.js
   - state.js
   - functions.js

   IMPORTANT:
   Semua file menggunakan JavaScript biasa.
   Tidak menggunakan import / export.
========================================================= */

const app = document.getElementById("app");


/* =========================================================
   LAYOUT
========================================================= */

function layout(content, eyebrow = "") {

  return `
    <div class="shell">

      <header class="topbar">

        <div class="brand">
        <span class="brand-mark">
         <img src="./assets/images/maaf.png"
         alt="MAP"
         class="brand-logo">
        </span>
   </div>

        <span class="mini-label">Learn For Free.Forever </span>

      </header>

      ${content}

      <footer>
        Learning n Development - MAP 2026
      </footer>

    </div>
  `;
}


/* =========================================================
   RENDER ROUTER
========================================================= */

function render() {

  if (!app) {
    console.error("TMS: Element #app tidak ditemukan.");
    return;
  }

  switch (state.screen) {

    case "home":
      renderHome();
      break;

    case "identity":
      renderIdentity();
      break;

    case "learning":
      renderLearning();
      break;

    case "result":
      renderResult();
      break;

    default:
      state.screen = "home";
      renderHome();
      break;

  }
}


/* =========================================================
   HOME
========================================================= */

function renderHome() {

  const slides = getSlides();
  const materialCount = getMaterialCount();
  const questionCount = getQuestionCount();

  app.innerHTML = layout(`

    <section class="hero">

      <div class="hero-copy">

        <h1>
          Learning and Development Program
          <br>
          <em></em>
        </h1>

        <p>Basic Knowledge</p>

        <button
          class="primary"
          type="button"
          onclick="goIdentity()"
        >Get Started<span>→</span>
        </button>

      </div>


      <div class="hero-card">

        <div class="card-icon">
          
        </div>

        <div>

          <strong>
            ${escapeHtml(TRAINING.title)}
          </strong>

          <small>
            ${escapeHtml(TRAINING.subtitle)}
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
            <b>${escapeHtml(TRAINING.duration || "-")}</b>
            Durasi
          </span>

        </div>
  `);
}


/* =========================================================
   IDENTITY
========================================================= */
function renderIdentity() {

  app.innerHTML = layout(`

    <section class="form-page">

      <div class="section-kicker">
        01 / LENGKAPI DATA YUK!
      </div>

      <form
        class="identity-form"
        onsubmit="startTraining(event)"
      >

        <label>

          Nama lengkap

          <input
            id="name"
            name="name"
            required
            autocomplete="name"
            placeholder=""
          >

        </label>


        <label>

          Email
 
          <span class="optional">
          </span>

          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            placeholder=""
          >

        </label>


        <label>

          Department

          <select
            id="department"
            name="department"
            required
          >

            <option value="" selected disabled>
              Pilih Department
            </option>

            <option value="FINANCE ACCOUNTING">
              FINANCE ACCOUNTING
            </option>

            <option value="HRDGA">
              HRDGA
            </option>

            <option value="ITDS">
              ITDS
            </option>

            <option value="PRODUCT">
              PRODUCT
            </option>

            <option value="SAS">
              SAS
            </option>

            <option value="SALES">
              SALES
            </option>

            <option value="WAREHOUSE">
              WAREHOUSE
            </option>

          </select>

        </label>


        <button
          class="primary full"
          type="submit"
        >Start<span>→</span>
        </button>

      </form>

    </section>

  `);
}/* =========================================================
   START TRAINING
========================================================= */

function goIdentity() {

  state.screen = "identity";

  state.currentSlide = 0;

  saveState();

  render();

}

async function startTraining(e) {

  e.preventDefault();

  const name =
    document.getElementById("name").value.trim();

  const email =
    document.getElementById("email").value.trim();


  /* ==========================================
     VALIDASI NAMA
  ========================================== */

  if (!name) {

    alert("Nama lengkap wajib diisi.");

    return;
  }


  /* ==========================================
     VALIDASI EMAIL
  ========================================== */

  if (!email) {

    alert(
      "Email wajib diisi untuk mengikuti training."
    );

    return;
  }


  /* ==========================================
     CEK CONFIG
  ========================================== */

  if (!CONFIG.googleScriptUrl) {

    alert(
      "Google Sheets belum terhubung."
    );

    return;
  }


  const form =
    document.querySelector(".identity-form");

  const button =
    form?.querySelector(
      "button[type='submit']"
    );


  /* ==========================================
     DISABLE BUTTON
  ========================================== */

  if (button) {

    button.disabled = true;

    button.textContent =
      "Memeriksa email...";
  }


  try {

    /* ==========================================
       CEK EMAIL KE GOOGLE SHEETS
    ========================================== */

    const alreadyExists =
      await checkEmailExists(email);


    /* ==========================================
       EMAIL SUDAH TERDAFTAR
    ========================================== */

    if (alreadyExists) {

      alert(
        "Email ini sudah pernah mengikuti training.\n\n" +
        "Training tidak dapat diulang menggunakan email yang sama."
      );


      if (button) {

        button.disabled = false;

        button.textContent =
          "Mulai →";
      }


      return;
    }


    /* ==========================================
       EMAIL BELUM TERDAFTAR
       BOLEH MENGIKUTI TRAINING
    ========================================== */

    state.participant = {

      name: name,

      email: email

    };


    state.currentSlide = 0;

    state.answers = {};

    state.isSaving = false;

    state.screen = "learning";


    saveState();

    render();


  } catch (error) {

    console.error(
      "Error pengecekan email:",
      error
    );


    alert(
      "Tidak dapat terhubung ke Google Sheets.\n\n" +
      "Silakan coba beberapa saat lagi."
    );


    if (button) {

      button.disabled = false;

      button.textContent =
        "Mulai →";
    }

  }

}

/* =========================================================
   LEARNING ENGINE
========================================================= */

function renderLearning() {

  const slides = getSlides();

  const totalSlides =
    slides.length;

  const slide =
    slides[state.currentSlide];


  /* -------------------------------------------------------
     Jika slide tidak ditemukan
  ------------------------------------------------------- */

  if (!slide) {

    state.screen = "result";

    saveState();

    render();

    return;
  }


  let content = "";


  /* -------------------------------------------------------
     Tentukan tipe slide
  ------------------------------------------------------- */

  switch (slide.type) {

    case "material":

      content =
        renderMaterialSlide(slide);

      break;


    case "image":

      content =
        renderImageSlide(slide);

      break;


    case "video":

      content =
        renderVideoSlide(slide);

      break;


    case "question":

      content =
        renderQuestionSlide(slide);

      break;


    default:

      content = `

        <article class="material-card single">

          <div class="material-content">

            <div class="pill soft">
              ERROR
            </div>

            <h2>
              Tipe slide tidak dikenali
            </h2>

            <p>
              Tipe slide
              <code>
                ${escapeHtml(slide.type)}
              </code>
              belum didukung.
            </p>

          </div>

        </article>

      `;

      break;

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


  /* -------------------------------------------------------
     Render halaman learning
  ------------------------------------------------------- */

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

          ${escapeHtml(
            TRAINING.title
          )}

        </span>

      </div>


      ${content}


      <div class="nav-row">


        <button
          class="secondary"
          type="button"
          onclick="previousSlide()"
          ${isFirst ? "disabled" : ""}
        >

          ← Sebelumnya

        </button>


        <span class="nav-hint muted">

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
          type="button"
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
   MATERIAL SLIDE
========================================================= */

function renderMaterialSlide(slide) {

  const points =
    Array.isArray(slide.points)
      ? slide.points
      : [];


  const imageHtml =

    slide.image

      ? `

        <div class="material-image">

          <img
            src="${escapeHtml(slide.image)}"
            alt="${escapeHtml(
              slide.title || "Materi"
            )}"
            onerror="
              this.parentElement.classList.add('image-error');
              this.style.display='none';
            "
          >

          <div class="image-error-text">
            Gambar tidak dapat dimuat.
          </div>

        </div>

      `

      : "";


  const pointsHtml =

    points.length

      ? `

        <div class="points">

          ${points.map(point => `

            <div>

              <span>
                ✓
              </span>

              ${escapeHtml(point)}

            </div>

          `).join("")}

        </div>

      `

      : "";


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

          ${escapeHtml(
            slide.title || ""
          )}

        </h2>


        ${imageHtml}


        <p>

          ${escapeHtml(
            slide.text || ""
          )}

        </p>


        ${pointsHtml}


      </div>


    </article>

  `;
}


/* =========================================================
   IMAGE / GRAPHIC SLIDE
========================================================= */

function renderImageSlide(slide) {

  const imageHtml =

    slide.image

      ? `

        <div class="graphic-image">

          <img
            src="${escapeHtml(slide.image)}"
            alt="${escapeHtml(
              slide.title ||
              "Gambar training"
            )}"
            onerror="
              this.parentElement.classList.add('image-error');
              this.style.display='none';
            "
          >

          <div class="image-error-text">
            Gambar tidak dapat dimuat.
          </div>

        </div>

      `

      : `

        <div class="image-placeholder">

          Gambar belum tersedia.

        </div>

      `;


  return `

    <article class="material-card single">

      <div class="material-content">


        <div class="pill soft">

          VISUAL / GRAFIK

        </div>


        <h2>

          ${escapeHtml(
            slide.title || ""
          )}

        </h2>


        ${imageHtml}


        <p>

          ${escapeHtml(
            slide.text || ""
          )}

        </p>


      </div>

    </article>

  `;
}


/* =========================================================
   VIDEO SLIDE
========================================================= */

function renderVideoSlide(slide) {

  return `

    <article class="material-card single">

      <div class="material-content">


        <div class="pill soft">

          VIDEO PEMBELAJARAN

        </div>


        <h2>

          ${escapeHtml(
            slide.title || ""
          )}

        </h2>


        <div class="video-card">

          ${getVideoEmbed(
            slide.video
          )}

        </div>


        <p>

          ${escapeHtml(
            slide.text || ""
          )}

        </p>


      </div>

    </article>

  `;
}


/* =========================================================
   QUESTION SLIDE
========================================================= */

function renderQuestionSlide(slide) {

  const selected =
    state.answers[state.currentSlide];


  const options =
    Array.isArray(slide.options)
      ? slide.options
      : [];


  return `

    <article class="quiz-card">


      <div class="pill soft">

        PERTANYAAN

      </div>


      <h2>

        ${escapeHtml(
          slide.q || ""
        )}

      </h2>


      <div class="options">


        ${options.map(
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

              type="button"

              onclick="
                answerQuestion(${index})
              "

            >

              <span>

                ${String.fromCharCode(
                  65 + index
                )}

              </span>


              <b>

                ${escapeHtml(
                  option
                )}

              </b>

            </button>

          `
        ).join("")}


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
   ANSWER QUESTION
========================================================= */

function answerQuestion(index) {

  state.answers[
    state.currentSlide
  ] = index;


  saveState();

  renderLearning();

}


/* =========================================================
   PREVIOUS SLIDE
========================================================= */

function previousSlide() {

  if (
    state.currentSlide <= 0
  ) {

    return;

  }


  state.currentSlide--;

  saveState();

  renderLearning();

}


/* =========================================================
   NEXT SLIDE
========================================================= */

function nextSlide() {

  const slides =
    getSlides();


  const current =
    slides[state.currentSlide];


  /* -------------------------------------------------------
     Question wajib dijawab
  ------------------------------------------------------- */

  if (

    current &&

    current.type === "question" &&

    state.answers[
      state.currentSlide
    ] === undefined

  ) {

    return;

  }


  /* -------------------------------------------------------
     Masih ada slide berikutnya
  ------------------------------------------------------- */

  if (

    state.currentSlide <
    slides.length - 1

  ) {

    state.currentSlide++;

    saveState();

    renderLearning();

    return;

  }


  /* -------------------------------------------------------
     Slide terakhir
  ------------------------------------------------------- */

  state.screen =
    "result";


  saveState();

  render();

}


/* =========================================================
   RESULT
========================================================= */

function renderResult() {
  const r = calculateResult();

  app.innerHTML = layout(`
    <section class="result-page">

      <h2>Safe Commuting Awarennes</h2>

      <p class="result-thanks">
        Terima kasih, <b>${escapeHtml(state.participant.name)}</b>.
        Anda telah menyelesaikan LnD dengan materi
        <b>Safety Commuting Awareness</b>.
      </p>

      <div class="score">
        ${r.score}<small>/100</small>
      </div>

      <p class="result-summary">
        Anda menjawab <b>${r.correct} dari ${r.total}</b> soal dengan benar.
      </p>

      <div class="result-actions">
        <button class="primary" onclick="saveResult()" id="save-result-button">
          Simpan Hasil
        </button>

        <button class="secondary" onclick="finishTraining()">
          Selesai
        </button>
      </div>

      <div id="save-status" class="save-status"></div>

    </section>
  `);
}


/* =========================================================
   FINISH TRAINING
========================================================= */

function finishTraining() {

  clearTrainingState();


  state.screen =
    "home";


  state.currentSlide =
    0;


  state.answers =
    {};


  state.participant = {

    name: "",

    email: ""

  };


  state.isSaving =
    false;


  render();

}


/* =========================================================
   START APPLICATION
========================================================= */

function bootTMS() {

  console.log(
    "TMS: aplikasi dimulai."
  );

  try {

    const restored =
      loadState();

    if (restored) {

      console.log(
        "TMS: progress sebelumnya dipulihkan."
      );

      render();

      return;

    }


    state.screen =
      "home";


    state.currentSlide =
      0;


    state.answers =
      {};


    render();

  }


  catch (error) {

    console.error(
      "TMS: gagal menjalankan aplikasi.",
      error
    );

    if (app) {

      app.innerHTML = `

        <div
          style="
            min-height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            padding:30px;
            font-family:Inter,Arial,sans-serif;
            background:#f7f8fa;
          "
        >


          <div
            style="
              max-width:600px;
              width:100%;
              background:#fff;
              border:1px solid #e5e7eb;
              border-radius:16px;
              padding:30px;
              box-shadow:0 10px 30px rgba(0,0,0,.06);
            "
          >


            <h2 style="margin-top:0;">

              TMS gagal dimuat

            </h2>


            <p>

              Terjadi error pada JavaScript.

              Silakan buka Developer Console
              (F12 → Console) untuk melihat
              detailnya.

            </p>


            <pre
              style="
                white-space:pre-wrap;
                background:#f3f4f6;
                padding:15px;
                border-radius:10px;
                font-size:12px;
                overflow:auto;
              "
            >${escapeHtml(
              error.message ||
              String(error)
            )}</pre>


          </div>


        </div>

      `;

    }

  }

}


/* =========================================================
   RUN APPLICATION
========================================================= */

bootTMS();
