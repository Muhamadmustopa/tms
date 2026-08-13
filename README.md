# TMS — Training Management System

Template sudah dipecah agar mudah dikelola dan tidak menggunakan import/export.

```text
assets/images/
js/
  app.js
  config.js
  functions.js
  state.js
  training-data.js
index.html
styles.css
README.md
```

Urutan script di index.html: config -> training-data -> state -> functions -> app.

Copy gambar `Slide2.PNG` dan `Slide3.PNG` dari project lama ke `assets/images/`.

Untuk mengganti materi/urutan slide, edit `js/training-data.js`.
Untuk Google Sheets, edit `js/config.js`.
