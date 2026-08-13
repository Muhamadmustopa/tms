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


function layout(
  content,
  eyebrow = "TMS"
) {

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


function getVideoEmbed(url) {

  if (!url) {

    return `
      <div class="video-empty">
        Video belum tersedia.
      </div>
    `;

  }


  // YouTube
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

      try {

        videoId =
          new URL(url)
            .searchParams
            .get("v");

      } catch (error) {

        console.error(
          "URL YouTube tidak valid:",
          error
        );

      }

    }


    else if (url.includes("/embed/")) {

      videoId =
        url
          .split("/embed/")[1]
          .split("?")[0];

    }


    if (videoId) {

      return `
        <div class="video-wrapper">

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
          ></iframe>

        </div>
      `;

    }

  }


  // MP4
  return `
    <video
      controls
      playsinline
      class="training-video"
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
