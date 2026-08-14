function getSlides() {
  return Array.isArray(TRAINING.slides) ? TRAINING.slides : [];
}

function getQuestions() {
  return getSlides().filter(s => s.type === "question");
}

function getQuestionCount() {
  return getQuestions().length;
}

function getMaterialCount() {
  return getSlides().filter(s =>
    ["material", "image", "video"].includes(s.type)
  ).length;
}

function progress(current, total) {
  const p = total
    ? Math.round((current / total) * 100)
    : 0;

  return `
    <div class="progress">
      <div class="progress-bar" style="width:${p}%"></div>
    </div>
  `;
}

function escapeHtml(v) {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getVideoEmbed(url) {

  if (!url) {
    return `<div class="video-empty">Video belum tersedia.</div>`;
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
      console.error("URL video tidak valid:", e);
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
    <video controls playsinline class="direct-video">
      <source src="${escapeHtml(url)}" type="video/mp4">
      Browser kamu tidak mendukung pemutaran video.
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

    const slideIndex = TRAINING.slides.indexOf(q);

    const selected = state.answers[slideIndex];

    if (
      selected !== undefined &&
      selected === q.answer
    ) {
      correct++;
    }

  });

  const total = qs.length;

  const score = total
    ? Math.round((correct / total) * 100)
    : 0;

  return {
    total,
    correct,
    score,
    passed: score >= CONFIG.passingGrade
  };
}


/* =========================================================
   CEK EMAIL SUDAH PERNAH TRAINING ATAU BELUM
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
      Math.floor(Math.random() * 10000);

    const script = document.createElement("script");

    const timeout = setTimeout(() => {

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
        script.parentNode.removeChild(script);
      }

      try {
        delete window[callbackName];
      } catch (e) {
        window[callbackName] = undefined;
      }
    }


    window[callbackName] = function(response) {

      cleanup();

      if (!response || response.success !== true) {

        reject(
          new Error(
            response?.message ||
            "Gagal mengecek email."
          )
        );

        return;
      }

      resolve(response.exists === true);
    };


    const url =
      CONFIG.googleScriptUrl +
      "?action=checkEmail" +
      "&email=" +
      encodeURIComponent(email) +
      "&callback=" +
      encodeURIComponent(callbackName);

    script.src = url;

    script.onerror = function() {

      cleanup();

      reject(
        new Error(
          "Gagal menghubungi Google Sheets."
        )
      );
    };

    document.body.appendChild(script);

  });
}


/* =========================================================
   SIMPAN HASIL KE GOOGLE SHEETS
========================================================= */

async function saveResult() {

  if (state.isSaving) return;

  const r = calculateResult();

  const el =
    document.getElementById("save-status");

  const btn =
    document.getElementById("save-result-button");


  if (!CONFIG.googleScriptUrl) {

    if (el) {
      el.innerHTML =
        "Demo selesai. <b>Google Sheets belum dikonfigurasi.</b>";
    }

    return;
  }


  state.isSaving = true;


  if (btn) {
    btn.disabled = true;
    btn.textContent = "Menyimpan...";
  }


  if (el) {
    el.textContent =
      "Menyimpan hasil ke Google Sheets...";
  }


  try {

    const payload = {

      action: "saveResult",

      timestamp: new Date().toISOString(),

      name:
        state.participant.name || "",

      email:
        state.participant.email || "",

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


    await fetch(
      CONFIG.googleScriptUrl,
      {
        method: "POST",

        mode: "no-cors",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body: JSON.stringify(payload)
      }
    );


    if (el) {

      el.innerHTML =
        '<span class="save-success">' +
        "✓ Hasil berhasil dikirim ke Google Sheets." +
        "</span>";
    }


    if (btn) {

      btn.textContent =
        "✓ Hasil Tersimpan";
    }


  } catch (e) {

    console.error(
      "Gagal menyimpan hasil:",
      e
    );


    if (el) {

      el.innerHTML =
        '<span class="save-error">' +
        "Gagal mengirim hasil. Silakan coba lagi." +
        "</span>";
    }


    if (btn) {

      btn.disabled = false;

      btn.textContent =
        "Coba Lagi";
    }

  }


  state.isSaving = false;
}
