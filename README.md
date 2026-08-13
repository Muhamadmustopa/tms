# TMS — Training Management System

Versi 1 adalah prototype mini learning platform:

- Landing page
- Identitas peserta
- Materi pembelajaran
- Post test pilihan ganda
- Progress bar
- Perhitungan nilai otomatis
- Status lulus/tidak lulus
- Struktur siap dihubungkan ke Google Sheets melalui Google Apps Script

## Menjalankan

Tidak membutuhkan build tool. Cukup buka `index.html` atau deploy repository ini ke GitHub Pages/Netlify.

## Google Sheets

Di `app.js`, isi:

```js
const CONFIG = {
  googleScriptUrl: "URL_WEB_APP_GOOGLE_APPS_SCRIPT",
  passingGrade: 75
};
```

Endpoint Apps Script akan menerima JSON hasil peserta.
