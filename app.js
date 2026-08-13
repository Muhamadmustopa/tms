const CONFIG = {
  googleScriptUrl: "", // isi setelah Google Apps Script siap
  passingGrade: 75
};

const TRAINING = {
  title: "Basic K3 di Tempat Kerja",
  subtitle: "Materi pembelajaran & post test",
  duration: "± 10 menit",
  questionsCount: 5,
  materials: [
    {
      type: "intro",
      title: "Mengapa K3 penting?",
      text: "Keselamatan dan Kesehatan Kerja membantu menciptakan lingkungan kerja yang aman, sehat, dan produktif. Pahami prinsip dasarnya sebelum masuk ke evaluasi.",
      points: ["Kenali potensi bahaya", "Gunakan APD sesuai pekerjaan", "Laporkan kondisi tidak aman"]
    },
    {
      type: "material",
      title: "Kenali Potensi Bahaya",
      text: "Potensi bahaya adalah kondisi atau tindakan yang dapat menyebabkan cedera, kerusakan, atau gangguan kesehatan. Contohnya lantai licin, kabel berserakan, atau penggunaan alat tanpa prosedur.",
      points: ["Amati area kerja", "Identifikasi sumber bahaya", "Lakukan pengendalian yang sesuai"]
    },
    {
      type: "material",
      title: "Penggunaan APD",
      text: "Alat Pelindung Diri digunakan sesuai risiko pekerjaan. APD bukan pengganti pengendalian bahaya, tetapi menjadi perlindungan tambahan bagi pekerja.",
      points: ["Pilih APD sesuai risiko", "Pastikan APD layak digunakan", "Gunakan dengan benar"]
    }
  ],
  questions: [
    { q: "Apa tujuan utama penerapan K3?", options: ["Mempercepat pekerjaan tanpa aturan", "Menciptakan tempat kerja yang aman dan sehat", "Mengurangi jumlah karyawan", "Menghilangkan seluruh pekerjaan"], answer: 1 },
    { q: "Manakah yang merupakan contoh potensi bahaya?", options: ["Area kerja tertata", "APD sesuai standar", "Kabel berserakan di jalur berjalan", "Briefing keselamatan"], answer: 2 },
    { q: "APD digunakan terutama untuk...", options: ["Menambah gaya berpakaian", "Memberikan perlindungan tambahan sesuai risiko", "Menggantikan semua prosedur kerja", "Mengurangi waktu istirahat"], answer: 1 },
    { q: "Jika menemukan kondisi tidak aman, tindakan yang tepat adalah...", options: ["Membiarkannya", "Menunggu sampai terjadi kecelakaan", "Melaporkan dan melakukan pengendalian sesuai prosedur", "Memfoto lalu menghapusnya"], answer: 2 },
    { q: "Sebelum menggunakan alat kerja, sebaiknya...", options: ["Langsung digunakan", "Memastikan kondisi alat dan memahami prosedurnya", "Meminjamkan ke orang lain", "Melepas pengaman alat"], answer: 1 }
  ]
};

const state = {
  screen: "home",
  participant: { name: "", nik: "", email: "" },
  materialIndex: 0,
  questionIndex: 0,
  answers: []
};

const app = document.getElementById("app");

function progress(current, total) {
  return `<div class="progress"><div class="progress-bar" style="width:${Math.round((current/total)*100)}%"></div></div>`;
}

function layout(content, eyebrow = "TMS") {
  return `<div class="shell">
    <header class="topbar"><div class="brand"><span class="brand-mark">T</span><span>${eyebrow}</span></div><span class="mini-label">TRAINING & LEARNING</span></header>
    ${content}
    <footer>Training Management System • Versi 1.0</footer>
  </div>`;
}

function render() {
  if (state.screen === "home") renderHome();
  if (state.screen === "identity") renderIdentity();
  if (state.screen === "material") renderMaterial();
  if (state.screen === "quiz") renderQuiz();
  if (state.screen === "result") renderResult();
}

function renderHome() {
  app.innerHTML = layout(`
    <section class="hero">
      <div class="hero-copy">
        <div class="pill">● ONLINE TRAINING</div>
        <h1>Belajar singkat.<br><em>Paham lebih cepat.</em></h1>
        <p>Materi dan evaluasi dalam satu pengalaman belajar yang sederhana. Tidak perlu terasa seperti mengisi formulir.</p>
        <button class="primary" onclick="goIdentity()">Mulai Training <span>→</span></button>
      </div>
      <div class="hero-card">
        <div class="card-icon">▣</div>
        <div><strong>${TRAINING.title}</strong><small>${TRAINING.subtitle}</small></div>
        <div class="stats"><span><b>${TRAINING.materials.length}</b> Materi</span><span><b>${TRAINING.questionsCount}</b> Soal</span><span><b>${TRAINING.duration}</b></span></div>
      </div>
    </section>
    <section class="feature-row">
      <div><span>01</span><b>Pelajari materi</b><p>Baca poin penting secara bertahap.</p></div>
      <div><span>02</span><b>Kerjakan post test</b><p>Jawab soal setelah materi selesai.</p></div>
      <div><span>03</span><b>Lihat hasil</b><p>Nilai dihitung otomatis.</p></div>
    </section>
  `);
}

function renderIdentity() {
  app.innerHTML = layout(`
    <section class="form-page">
      <div class="section-kicker">01 / IDENTITAS PESERTA</div>
      <h2>Sebelum mulai,<br>kenalkan diri dulu.</h2>
      <p class="muted">Data ini digunakan untuk mencatat hasil training.</p>
      <form onsubmit="startTraining(event)" class="identity-form">
        <label>Nama lengkap<input id="name" required placeholder="Contoh: Ahmad Yani"></label>
        <label>NIK / ID Karyawan<input id="nik" required placeholder="Contoh: 00123"></label>
        <label>Email <span class="optional">(opsional)</span><input id="email" type="email" placeholder="nama@perusahaan.com"></label>
        <button class="primary full">Lanjut ke Materi <span>→</span></button>
      </form>
    </section>
  `);
}

function renderMaterial() {
  const m = TRAINING.materials[state.materialIndex];
  const total = TRAINING.materials.length;
  app.innerHTML = layout(`
    <section class="learning">
      ${progress(state.materialIndex + 1, total)}
      <div class="learning-meta"><span>MATERI ${String(state.materialIndex+1).padStart(2,"0")} / ${String(total).padStart(2,"0")}</span><span>${TRAINING.title}</span></div>
      <article class="material-card">
        <div class="material-number">${String(state.materialIndex+1).padStart(2,"0")}</div>
        <div class="material-content">
          <div class="pill soft">MATERI PEMBELAJARAN</div>
          <h2>${m.title}</h2>
          <p>${m.text}</p>
          <div class="points">${m.points.map((p,i)=>`<div><span>✓</span>${p}</div>`).join("")}</div>
        </div>
      </article>
      <div class="nav-row">
        <span class="muted">Baca dan pahami sebelum melanjutkan.</span>
        <button class="primary" onclick="nextMaterial()">${state.materialIndex === total-1 ? "Mulai Post Test" : "Materi Berikutnya"} <span>→</span></button>
      </div>
    </section>
  `);
}

function renderQuiz() {
  const q = TRAINING.questions[state.questionIndex];
  const total = TRAINING.questions.length;
  app.innerHTML = layout(`
    <section class="learning">
      ${progress(state.questionIndex + 1, total)}
      <div class="learning-meta"><span>POST TEST ${String(state.questionIndex+1).padStart(2,"0")} / ${String(total).padStart(2,"0")}</span><span>Pilih satu jawaban</span></div>
      <article class="quiz-card">
        <div class="pill soft">PERTANYAAN ${state.questionIndex+1}</div>
        <h2>${q.q}</h2>
        <div class="options">
          ${q.options.map((o,i)=>`<button class="option" onclick="answer(${i})"><span>${String.fromCharCode(65+i)}</span><b>${o}</b></button>`).join("")}
        </div>
      </article>
    </section>
  `);
}

function renderResult() {
  const correct = state.answers.filter((a,i)=>a === TRAINING.questions[i].answer).length;
  const score = Math.round((correct / TRAINING.questions.length) * 100);
  const passed = score >= CONFIG.passingGrade;
  app.innerHTML = layout(`
    <section class="result-page">
      <div class="result-icon">${passed ? "✓" : "!"}</div>
      <div class="pill">${passed ? "TRAINING SELESAI" : "BELUM LULUS"}</div>
      <h2>${passed ? "Selamat, training selesai." : "Training sudah selesai."}</h2>
      <div class="score">${score}<small>/100</small></div>
      <div class="result-status ${passed ? "pass" : "fail"}">${passed ? "LULUS" : "TIDAK LULUS"}</div>
      <p class="muted">${state.participant.name}, kamu menjawab <b>${correct} dari ${TRAINING.questions.length}</b> soal dengan benar.</p>
      <div class="result-actions"><button class="primary" onclick="saveResult()">Simpan Hasil</button><button class="secondary" onclick="location.reload()">Selesai</button></div>
      <div id="save-status" class="save-status"></div>
    </section>
  `);
}

function goIdentity(){ state.screen="identity"; render(); }
function startTraining(e){
  e.preventDefault();
  state.participant.name=document.getElementById("name").value.trim();
  state.participant.nik=document.getElementById("nik").value.trim();
  state.participant.email=document.getElementById("email").value.trim();
  state.screen="material"; render();
}
function nextMaterial(){
  if(state.materialIndex < TRAINING.materials.length-1){ state.materialIndex++; }
  else { state.screen="quiz"; }
  render();
}
function answer(i){
  state.answers[state.questionIndex]=i;
  if(state.questionIndex < TRAINING.questions.length-1) state.questionIndex++;
  else state.screen="result";
  render();
}
async function saveResult(){
  const correct=state.answers.filter((a,i)=>a===TRAINING.questions[i].answer).length;
  const score=Math.round(correct/TRAINING.questions.length*100);
  const payload={timestamp:new Date().toISOString(),...state.participant,training:TRAINING.title,totalQuestions:TRAINING.questions.length,correct,score,status:score>=CONFIG.passingGrade?"LULUS":"TIDAK LULUS"};
  const el=document.getElementById("save-status");
  if(!CONFIG.googleScriptUrl){el.innerHTML="Demo selesai. <b>Google Sheets belum dikonfigurasi.</b><br>Isi URL Google Apps Script di <code>app.js</code> untuk mengaktifkan penyimpanan."; return;}
  el.textContent="Menyimpan hasil...";
  try{
    await fetch(CONFIG.googleScriptUrl,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(payload)});
    el.innerHTML="✓ Hasil berhasil dikirim.";
  }catch(err){el.innerHTML="Gagal mengirim hasil. Silakan coba lagi."; console.error(err);}
}
render();
