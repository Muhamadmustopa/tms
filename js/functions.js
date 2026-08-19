/* =========================================================
   TMS - FUNCTIONS
   File: js/functions.js

   Dependency:
   - config.js
   - training-data.js
   - state.js

   IMPORTANT:
   JavaScript biasa.
   Tidak menggunakan import / export.
========================================================= */


/* =========================================================
   SLIDES
========================================================= */

function getSlides() {

  return Array.isArray(TRAINING.slides)
    ? TRAINING.slides
    : [];

}


/* =========================================================
   QUESTIONS
========================================================= */

function getQuestions() {

  return getSlides().filter(
    slide => slide.type === "question"
  );

}


function getQuestionCount() {

  return getQuestions().length;

}


/* =========================================================
   MATERIAL COUNT
========================================================= */

function getMaterialCount() {

  return getSlides().filter(slide =>
    [
      "material",
      "image",
      "video"
    ].includes(slide.type)
  ).length;

}


/* =========================================================
   PROGRESS BAR
========================================================= */

function progress(current, total) {

  const p = total
    ? Math.round((current / total) * 100)
    : 0;


  return `
    <div class="progress">

      <div
        class="progress-bar"
        style="width:${p}%"
      ></div>

    </div>
  `;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(v) {

  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================================================
   VIDEO EMBED
========================================================= */

function getVideoEmbed(url) {

  if (!url) {

    return `
      <div class="video-empty">
        Video belum tersedia.
      </div>
    `;

  }


  if (
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  ) {

    let id = "";


    try {

      const u = new URL(url);

      id =
        u.searchParams.get("v") ||
        u.pathname.split("/embed/")[1]?.split("/")[0] ||
        u.pathname.replace(/^\//, "").split("/")[0];

    } catch (e) {

      console.error(
        "URL video tidak valid:",
        e
      );

    }


    if (id) {

      return `
        <div class="video-wrapper">

          <iframe
            src="https://www.youtube.com/embed/${escapeHtml(id)}"
            title="Video Training"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>

        </div>
      `;

    }

  }


  return `
    <video
      controls
      playsinline
      class="direct-video"
    >

      <source
        src="${escapeHtml(url)}"
        type="video/mp4"
      >

      Browser kamu tidak mendukung
      pemutaran video.

    </video>
  `;

}


/* =========================================================
   HITUNG HASIL
========================================================= */

function calculateResult() {

  const qs = getQuestions();

  let correct = 0;


  qs.forEach(q => {

    const slideIndex =
      TRAINING.slides.indexOf(q);

    const selected =
      state.answers[slideIndex];


    if (
      selected !== undefined &&
      selected === q.answer
    ) {

      correct++;

    }

  });


  const total = qs.length;


  const score = total
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
   CEK EMAIL
   -----------------------------------------
   Tetap mempertahankan fungsi lama
   supaya app.js lama tidak langsung error.
========================================================= */

function checkEmailExists(email) {

  return new Promise((resolve, reject) => {

    if (!email) {

      resolve(false);

      return;

    }


    const callbackName =
      "tmsEmailCheck_" +
      Date.now() +
      "_" +
      Math.floor(
        Math.random() * 10000
      );


    const script =
      document.createElement("script");


    const timeout =
      setTimeout(() => {

        cleanup();

        reject(
          new Error(
            "Tidak dapat terhubung ke Google Sheets."
          )
        );

      }, 15000);


    function cleanup() {

      clearTimeout(timeout);


      if (script.parentNode) {

        script.parentNode.removeChild(
          script
        );

      }


      try {

        delete window[callbackName];

      } catch (e) {

        window[callbackName] =
          undefined;

      }

    }


    window[callbackName] =
      function(response) {

        cleanup();


        if (
          !response ||
          response.success !== true
        ) {

          reject(
            new Error(
              response?.message ||
              "Gagal mengecek email."
            )
          );

          return;

        }


        resolve(
          response.exists === true
        );

      };


    const url =
      CONFIG.googleScriptUrl +
      "?action=checkEmail" +
      "&email=" +
      encodeURIComponent(email) +
      "&callback=" +
      encodeURIComponent(callbackName);


    script.src = url;


    script.onerror =
      function() {

        cleanup();


        reject(
          new Error(
            "Gagal menghubungi Google Sheets."
          )
        );

      };


    document.body.appendChild(
      script
    );

  });

}


/* =========================================================
   AMBIL HASIL TERAKHIR BERDASARKAN EMAIL
   -----------------------------------------
   Digunakan ketika email sudah pernah
   mengikuti training.
========================================================= */

function getTrainingResult(email) {

  return new Promise((resolve, reject) => {

    if (!email) {

      reject(
        new Error(
          "Email tidak boleh kosong."
        )
      );

      return;

    }


    const callbackName =
      "tmsResult_" +
      Date.now() +
      "_" +
      Math.floor(
        Math.random() * 10000
      );


    const script =
      document.createElement("script");


    const timeout =
      setTimeout(() => {

        cleanup();

        reject(
          new Error(
            "Tidak dapat mengambil hasil training."
          )
        );

      }, 15000);


    function cleanup() {

      clearTimeout(timeout);


      if (script.parentNode) {

        script.parentNode.removeChild(
          script
        );

      }


      try {

        delete window[callbackName];

      } catch (e) {

        window[callbackName] =
          undefined;

      }

    }


    window[callbackName] =
      function(response) {

        cleanup();


        if (
          !response ||
          response.success !== true
        ) {

          reject(
            new Error(
              response?.message ||
              "Gagal mengambil hasil training."
            )
          );

          return;

        }


        resolve(
          response.result || null
        );

      };


    const url =
      CONFIG.googleScriptUrl +
      "?action=getResult" +
      "&email=" +
      encodeURIComponent(email) +
      "&callback=" +
      encodeURIComponent(callbackName);


    script.src = url;


    script.onerror =
      function() {

        cleanup();


        reject(
          new Error(
            "Gagal menghubungi Google Sheets."
          )
        );

      };


    document.body.appendChild(
      script
    );

  });

}


/* =========================================================
   SIMPAN HASIL KE GOOGLE SHEETS
   -----------------------------------------
   Digunakan otomatis setelah training selesai.

   Department ditambahkan ke payload.
========================================================= */

async function saveResult() {

  if (state.isSaving) {

    return;

  }


  const r =
    calculateResult();


  if (!CONFIG.googleScriptUrl) {

    console.error(
      "Google Script URL belum dikonfigurasi."
    );

    return;

  }


  state.isSaving = true;


  try {

    const payload = {

      action:
        "saveResult",


      timestamp:
        new Date().toISOString(),


      name:
        state.participant.name || "",


      email:
        state.participant.email || "",


      department:
        state.participant.department || "",


      training:
        CONFIG.trainingName ||
        TRAINING.title ||
        "",


      totalQuestions:
        r.total,


      correct:
        r.correct,


      score:
        r.score,


      status:
        "SELESAI"

    };


    /*
      POST ke Google Apps Script.

      mode: no-cors digunakan karena
      frontend berada di GitHub Pages
      sedangkan backend berada di
      Google Apps Script.
    */

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


    console.log(
      "TMS: hasil training dikirim ke Google Sheets."
    );


    return true;


  } catch (error) {

    console.error(
      "TMS: gagal menyimpan hasil:",
      error
    );


    return false;

  } finally {

    state.isSaving = false;

  }

}
