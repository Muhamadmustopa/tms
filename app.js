/* =========================================================
   TMS - TRAINING MANAGEMENT SYSTEM
   Slide Based Learning System
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const CONFIG = {
  googleScriptUrl:
    "https://script.google.com/macros/s/AKfycbxhgHyJeH3UgkEgRLsPRcB9dMa_nvLgZcf3H3ghe2EciLki1TJq8-lLJP5gTzULuhSPoQ/exec",

  passingGrade: 75
};


/* =========================================================
   TRAINING CONTENT
   =========================================================

   TYPE YANG TERSEDIA:

   1. material
      Materi + text + optional image

   2. image
      Gambar / grafik + text

   3. video
      YouTube atau MP4 + text

   4. question
      Pertanyaan + pilihan jawaban

   Kamu bebas mencampur urutannya.

   ========================================================= */

const TRAINING = {

  title: "Learning and Development",
  subtitle: "Materi safe commuting awareness",
  slides: [

    /* =====================================================
       SLIDE 1
       MATERI + GAMBAR
       ===================================================== */

    {
      type: "material",

      title: "Safe Commuting Awareness",

      text:
        "Safe commuting awareness dirancang untuk seluruh karyawan untuk selalu waspada terhadap resiko apapun",

      image:
         "./assets/images/Slide2.PNG",

      points: [
        "Laporkan kondisi yang tidak aman"
      ]
    },


    /* =====================================================
       SLIDE 2
       GAMBAR / GRAFIK
       ===================================================== */

    {
      type: "image",

      title: "Grafik Angka kecelakaan lalu lintas",

      text:
        "Berbagai kecelakaan kerja dapat terjadi karena kombinasi tindakan tidak aman dan kondisi lingkungan yang tidak aman. Memahami sumber risiko membantu kita melakukan pencegahan sejak awal.",

      image:
        "./assets/images/Slide3.PNG",
    },


    /* =====================================================
       SLIDE 3
       VIDEO
       ===================================================== */

    {
      type: "video",

      title: "Video Pengenalan K3",

      text:
        "Silakan simak video berikut untuk memahami pentingnya keselamatan dan kesehatan kerja sebelum melanjutkan ke pertanyaan.",

      video:
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },


    /* =====================================================
       SLIDE 4
       QUESTION
       ===================================================== */

    {
      type: "question",

      q:
        "Apa tujuan utama penerapan K3?",

      options: [
        "Mempercepat pekerjaan tanpa aturan",
        "Menciptakan tempat kerja yang aman dan sehat",
        "Mengurangi jumlah karyawan",
        "Menghilangkan seluruh pekerjaan"
      ],

      answer: 1
    },


    /* =====================================================
       SLIDE 5
       QUESTION
       ===================================================== */

    {
      type: "question",

      q:
        "Manakah yang merupakan contoh potensi bahaya?",

      options: [
        "Area kerja tertata",
        "APD sesuai standar",
        "Kabel berserakan di jalur berjalan",
        "Briefing keselamatan"
      ],

      answer: 2
    },


    /* =====================================================
       SLIDE 6
       MATERI + GAMBAR
       ===================================================== */

    {
      type: "material",

      title: "Penggunaan Alat Pelindung Diri",

      text:
        "Alat Pelindung Diri atau APD digunakan sebagai perlindungan tambahan bagi pekerja dari risiko yang masih ada setelah pengendalian bahaya dilakukan.",

      image:
        "https://images.unsplash.com/photo-1581093458791-9d42e3c5f0b1?auto=format&fit=crop&w=1200&q=80",

      points: [
        "Pilih APD sesuai risiko pekerjaan",
        "Pastikan APD dalam kondisi layak",
        "Gunakan APD dengan benar",
        "Rawat dan simpan APD sesuai prosedur"
      ]
    },


    /* =====================================================
       SLIDE 7
       MATERI + GAMBAR
       ===================================================== */

    {
      type: "material",

      title: "Kenali Potensi Bahaya",

      text:
        "Potensi bahaya adalah kondisi atau tindakan yang dapat menyebabkan cedera, kerusakan, atau gangguan kesehatan. Bahaya dapat berasal dari lingkungan, peralatan, bahan, maupun perilaku manusia.",

      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",

      points: [
        "Amati kondisi area kerja",
        "Identifikasi sumber bahaya",
        "Nilai tingkat risikonya",
        "Lakukan pengendalian yang sesuai"
      ]
    },


    /* =====================================================
       SLIDE 8
       QUESTION
       ===================================================== */

    {
      type: "question",

      q:
        "APD digunakan terutama untuk...",

      options: [
        "Menambah gaya berpakaian",
        "Memberikan perlindungan tambahan sesuai risiko",
        "Menggantikan semua prosedur kerja",
        "Mengurangi waktu istirahat"
      ],

      answer: 1
    },


    /* =====================================================
       SLIDE 9
       QUESTION
       ===================================================== */

    {
      type: "question",

      q:
        "Sebelum menggunakan APD, kita sebaiknya...",

      options: [
        "Memastikan kondisi APD layak digunakan",
        "Langsung menggunakannya tanpa pemeriksaan",
        "Meminjamkan kepada orang lain",
        "Melepas bagian pengaman APD"
      ],

      answer: 0
    },


    /* =====================================================
       SLIDE 10
       QUESTION
       ===================================================== */

    {
      type: "question",

      q:
        "Jika menemukan kondisi tidak aman, tindakan yang tepat adalah...",

      options: [
        "Membiarkannya",
        "Menunggu sampai terjadi kecelakaan",
        "Melaporkan dan melakukan pengendalian sesuai prosedur",
        "Mengabaikannya"
      ],

      answer: 2
    },


    /* =====================================================
       SLIDE 11
       MATERI + GAMBAR
       ===================================================== */

    {
      type: "material",

      title: "Identifikasi Bahaya",

      text:
        "Identifikasi bahaya dilakukan untuk mengetahui sumber bahaya yang dapat menyebabkan kecelakaan atau gangguan kesehatan. Proses ini merupakan bagian penting dalam pengendalian risiko.",

      image:
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",

      points: [
        "Periksa kondisi lingkungan kerja",
        "Periksa peralatan dan mesin",
        "Perhatikan aktivitas pekerja",
        "Catat potensi bahaya yang ditemukan"
      ]
    },


    /* =====================================================
       SLIDE 12
       MATERI + GAMBAR
       ===================================================== */

    {
      type: "material",

      title: "Pengendalian Risiko",

      text:
        "Setelah bahaya diidentifikasi, langkah berikutnya adalah melakukan pengendalian untuk mengurangi kemungkinan terjadinya kecelakaan atau dampak kesehatan.",

      image:
        "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1200&q=80",

      points: [
        "Hilangkan sumber bahaya jika memungkinkan",
        "Gunakan pengendalian teknis",
        "Gunakan prosedur kerja yang aman",
        "Gunakan APD sebagai perlindungan tambahan"
      ]
    },


    /* =====================================================
       SLIDE 13
       QUESTION
       ===================================================== */

    {
      type: "question",

      q:
        "Apa langkah awal dalam proses pengendalian risiko?",

      options: [
        "Mengidentifikasi bahaya",
        "Mengabaikan risiko",
        "Menghentikan seluruh pekerjaan",
        "Membuat laporan keuangan"
      ],

      answer: 0
    },


    /* =====================================================
       SLIDE 14
       QUESTION
       ===================================================== */

    {
      type: "question",

      q:
        "Mengapa risiko di tempat kerja perlu dikendalikan?",

      options: [
        "Agar pekerjaan menjadi lebih lama",
        "Untuk mencegah kejadian yang tidak diinginkan",
        "Untuk menambah pekerjaan",
        "Agar terlihat sibuk"
      ],

      answer: 1
    },


    /* =====================================================
       SLIDE 15
       QUESTION
       ===================================================== */

    {
      type: "question",

      q:
        "Apa tindakan yang tepat ketika melihat kondisi berbahaya?",

      options: [
        "Membiarkannya",
        "Melaporkan dan melakukan tindakan pengendalian",
        "Menunggu orang lain",
        "Mengabaikannya"
      ],

      answer: 1
    }

  ]

};


/* =========================================================
   STATE
   ========================================================= */

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

/* =========================================================
   LOCAL STORAGE
   ========================================================= */

const STORAGE_KEY = "TMS_TRAINING_STATE";


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

    /* Proteksi slide */

    const totalSlides =
      getSlides().length;

    if (totalSlides === 0) {

      state.currentSlide = 0;

    } else if (
      state.currentSlide < 0
    ) {

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
/* =========================================================
   APP
   ========================================================= */

const app = document.getElementById("app");


/* =========================================================
   HELPER
   ========================================================= */

function getSlides() {

  return TRAINING.slides || [];

}


function getQuestions() {

  return getSlides().filter(
    slide => slide.type === "question"
  );

}


function getQuestionCount() {

  return getQuestions().length;

}


function getMaterialCount() {

  return getSlides().filter(
    slide =>
      slide.type === "material" ||
      slide.type === "image" ||
      slide.type === "video"
  ).length;

}


/* =========================================================
   PROGRESS
   ========================================================= */

function progress(current, total) {

  const percentage =
    total > 0
      ? Math.round((current / total) * 100)
      : 0;

  return `
    <div class="progress">
      <div
        class="progress-bar"
        style="width:${percentage}%"
      ></div>
    </div>
  `;

}


/* =========================================================
   LAYOUT
   ========================================================= */

function layout(content, eyebrow = "TMS") {

  return `
    <div class="shell">

      <header class="topbar">

        <div class="brand">

          <span class="brand-mark">
            T
          </span>

          <span>
            ${eyebrow}
          </span>

        </div>

        <span class="mini-label">
          TRAINING & LEARNING
        </span>

      </header>

      ${content}

      <footer>
        Training Management System • Versi 1.0
      </footer>

    </div>
  `;

}


/* =========================================================
   RENDER ROUTER
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

}


/* =========================================================
   HOME
   ========================================================= */

function renderHome() {

  const slideCount = getSlides().length;

  const questionCount = getQuestionCount();

  const materialCount = getMaterialCount();

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

            <b>
              ${materialCount}
            </b>

            Materi

          </span>


          <span>

            <b>
              ${questionCount}
            </b>

            Soal

          </span>


          <span>

            <b>
              ${TRAINING.duration}
            </b>

            Durasi

          </span>

        </div>


        <div
          style="
            margin-top:18px;
            padding-top:18px;
            border-top:1px solid #edf0f4;
            font-size:12px;
            color:#7b8494;
          "
        >

          ${slideCount} slide pembelajaran

        </div>

      </div>

    </section>


    <section class="feature-row">

      <div>

        <span>
          01
        </span>

        <b>
          Pelajari materi
        </b>

        <p>
          Materi disajikan secara bertahap
          melalui slide yang interaktif.
        </p>

      </div>


      <div>

        <span>
          02
        </span>

        <b>
          Tonton & pahami
        </b>

        <p>
          Materi dapat dilengkapi gambar,
          grafik, dan video.
        </p>

      </div>


      <div>

        <span>
          03
        </span>

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
   START TRAINING
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
   MAIN LEARNING ENGINE
   ========================================================= */

function renderLearning() {

  const slides = getSlides();

  const totalSlides = slides.length;

  const slide = slides[state.currentSlide];

  if (!slide) {

    state.screen = "result";

    render();

    return;

  }


  let content = "";


  /* =======================================================
     MATERIAL
     ======================================================= */

  if (slide.type === "material") {

    content = renderMaterialSlide(slide);

  }


  /* =======================================================
     IMAGE
     ======================================================= */

  else if (slide.type === "image") {

    content = renderImageSlide(slide);

  }


  /* =======================================================
     VIDEO
     ======================================================= */

  else if (slide.type === "video") {

    content = renderVideoSlide(slide);

  }


  /* =======================================================
     QUESTION
     ======================================================= */

  else if (slide.type === "question") {

    content = renderQuestionSlide(slide);

  }


  /* =======================================================
     UNKNOWN TYPE
     ======================================================= */

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
    state.currentSlide === totalSlides - 1;


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

          ${String(totalSlides).padStart(2, "0")}

        </span>


        <span>

          ${TRAINING.title}

        </span>

      </div>


      ${content}


      <div
        class="nav-row"
        style="
          align-items:center;
          margin-top:22px;
        "
      >


        <button

          class="secondary"

          onclick="previousSlide()"

          ${isFirst ? "disabled" : ""}

        >

          ← Sebelumnya

        </button>


        <span
          class="muted"
          style="
            text-align:center;
            flex:1;
          "
        >

          ${isQuestion

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

          ${isLast
            ? "Lihat Hasil"
            : "Berikutnya"}

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

  const image = slide.image
    ? `

      <div
        style="
          margin-bottom:28px;
          border-radius:18px;
          overflow:hidden;
          border:1px solid #e6e9ef;
          background:#f5f7fb;
        "
      >

        <img

          src="${slide.image}"

          alt="${slide.title || "Materi"}"

          style="
            width:100%;
            display:block;
            max-height:420px;
            object-fit:cover;
          "

        >

      </div>

    `
    : "";


  const points = Array.isArray(slide.points)
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
                  (point, index) => `

                    <div>

                      <span>
                        ✓
                      </span>

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
   IMAGE / GRAPHIC SLIDE
   ========================================================= */

function renderImageSlide(slide) {

  return `

    <article
      class="material-card"
      style="
        grid-template-columns:1fr;
      "
    >

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

              <div
                style="
                  margin:28px 0;
                  border-radius:20px;
                  overflow:hidden;
                  border:1px solid #e6e9ef;
                  background:#f5f7fb;
                "
              >

                <img

                  src="${slide.image}"

                  alt="${slide.title || "Gambar training"}"

                  style="
                    display:block;
                    width:100%;
                    max-height:520px;
                    object-fit:contain;
                    background:#f5f7fb;
                  "

                >

              </div>

            `
            : `

              <div
                style="
                  padding:50px;
                  text-align:center;
                  background:#f5f7fb;
                  border-radius:16px;
                  color:#8b93a3;
                "
              >

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
   VIDEO SLIDE
   ========================================================= */

function renderVideoSlide(slide) {

  const videoHtml =
    getVideoEmbed(slide.video);


  return `

    <article
      class="material-card"
      style="
        grid-template-columns:1fr;
      "
    >

      <div class="material-content">

        <div class="pill soft">
          VIDEO PEMBELAJARAN
        </div>


        <h2>
          ${slide.title || ""}
        </h2>


        <div
          style="
            margin:28px 0;
            border-radius:20px;
            overflow:hidden;
            background:#111827;
            border:1px solid #e6e9ef;
          "
        >

          ${videoHtml}

        </div>


        <p>
          ${slide.text || ""}
        </p>


      </div>

    </article>

  `;

}


/* =========================================================
   VIDEO HELPER
   ========================================================= */

function getVideoEmbed(url) {

  if (!url) {

    return `

      <div
        style="
          padding:70px 20px;
          text-align:center;
          color:#9ca3af;
        "
      >

        Video belum tersedia.

      </div>

    `;

  }


  /* =======================================================
     YOUTUBE
     ======================================================= */

  if (
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  ) {

    let videoId = "";


    if (url.includes("youtu.be/")) {

      videoId =
        url
          .split("youtu.be/")[1]
          .split("?")[0];

    }


    else if (url.includes("watch?v=")) {

      videoId =
        new URL(url).searchParams.get("v");

    }


    else if (url.includes("/embed/")) {

      videoId =
        url
          .split("/embed/")[1]
          .split("?")[0];

    }


    if (videoId) {

      return `

        <div
          style="
            position:relative;
            width:100%;
            padding-top:56.25%;
          "
        >

          <iframe

            src="https://www.youtube.com/embed/${videoId}"

            title="Video Training"

            frameborder="0"

            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share
            "

            allowfullscreen

            style="
              position:absolute;
              top:0;
              left:0;
              width:100%;
              height:100%;
            "

          ></iframe>

        </div>

      `;

    }

  }
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

  /* =======================================================
     DIRECT MP4 / VIDEO
     ======================================================= */

  return `

    <video

      controls

      playsinline

      style="
        width:100%;
        display:block;
        max-height:520px;
        background:#000;
      "

    >

      <source
        src="${url}"
        type="video/mp4"
      >

      Browser kamu tidak mendukung
      pemutaran video.

    </video>

  `;

}


/* =========================================================
   QUESTION SLIDE
   ========================================================= */

function renderQuestionSlide(slide) {

  const selected =
    state.answers[state.currentSlide];


  return `

    <article
      class="quiz-card"
    >

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

                  onclick="
                    answerQuestion(${index})
                  "

                >

                  <span>

                    ${String
                      .fromCharCode(65 + index)}

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

            <div
              style="
                margin-top:20px;
                padding:12px 15px;
                background:#e9f6ef;
                color:#227047;
                border-radius:10px;
                font-size:12px;
                font-weight:700;
              "
            >

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
  state.answers[state.currentSlide] =
    index;
  saveState();
  renderLearning();
}

/* =========================================================
   PREVIOUS SLIDE
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
   NEXT SLIDE
   ========================================================= */

function nextSlide() {
  const slides = getSlides();
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

  /* =======================================================
     QUESTION HARUS DIJAWAB
     ======================================================= */

  if (
    current &&
    current.type === "question" &&
    state.answers[state.currentSlide] === undefined
  ) {

    return;

  }


  /* =======================================================
     MASIH ADA SLIDE
     ======================================================= */

  if (
    state.currentSlide <
    slides.length - 1
  ) {

    state.currentSlide++;

    renderLearning();

    return;

  }


  /* =======================================================
     SLIDE TERAKHIR
     ======================================================= */

  state.screen = "result";

  render();

}


/* =========================================================
   CALCULATE RESULT
   ========================================================= */

function calculateResult() {

  const questions = getQuestions();


  let correct = 0;


  questions.forEach(question => {

    const slideIndex =
      TRAINING.slides.indexOf(
        question
      );


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
   RESULT
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
          id="save-result-button" >Simpan Hasil</button>


        <button
           class="secondary"
           onclick="finishTraining()"
         >Selesai</button>
      </div>
      

      <div
        id="save-status"
        class="save-status"
      ></div>


    </section>

  `);

}


/* =========================================================
   SAVE RESULT TO GOOGLE SHEETS
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


  if (
    !CONFIG.googleScriptUrl
  ) {

    el.innerHTML = `
      Demo selesai.
      <b>
        Google Sheets belum dikonfigurasi.
      </b>
    `;

    return;

  }


  state.isSaving = true;


  if (button) {

    button.disabled = true;

    button.textContent =
      "Menyimpan...";

  }


  el.textContent =
    "Menyimpan hasil ke Google Sheets...";


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


    el.innerHTML = `
      <span
        style="
          color:#227047;
          font-weight:700;
        "
      >
        ✓ Hasil berhasil dikirim ke
        Google Sheets.
      </span>
    `;


    if (button) {

      button.textContent =
        "✓ Hasil Tersimpan";

    }


  } catch (error) {

    console.error(
      "Gagal menyimpan hasil:",
      error
    );


    el.innerHTML = `
      <span
        style="
          color:#a53b34;
          font-weight:700;
        "
      >
        Gagal mengirim hasil.
        Silakan coba lagi.
      </span>
    `;


    if (button) {

      button.disabled = false;

      button.textContent =
        "Coba Lagi";

    }


    state.isSaving = false;

  }

}

/* =========================================================
   START APPLICATION
   ========================================================= */

const restored =
  loadState();

if (restored) {

  render();

} else {

  state.screen = "home";

  render();

}
