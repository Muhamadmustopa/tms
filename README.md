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

Google Apps Script sudah dikonfigurasi pada `app.js`.

Endpoint Apps Script:
`https://script.google.com/macros/s/AKfycbxhgHyJeH3UgkEgRLsPRcB9dMa_nvLgZcf3H3ghe2EciLki1TJq8-lLJP5gTzULuhSPoQ/exec`

Data peserta yang digunakan: Nama dan Email. NIK tidak digunakan.

Endpoint Apps Script menerima JSON hasil peserta dan menuliskannya ke sheet `SafetyRiding`.
