
const adsImages = document.querySelectorAll('.img-fluid');
const adsContents = document.querySelectorAll('.collapse');

adsImages.forEach((image) => {
  image.addEventListener('click', function () {
    const target = this.getAttribute('data-target');
    const currentContent = document.querySelector(target);

    adsContents.forEach((content) => {
      if (content !== currentContent) {
        content.classList.remove('show');
      }
    });
  });
});

function mostrarNoticias() {
    document.getElementById("noticias").style.display = "flex";
    document.getElementById("indicacoes").style.display = "none";
    document.querySelector(".benefits__type-btn.arg").classList.add("active");
    document.querySelector(".benefits__type-btn.pub").classList.remove("active");
  }

  function mostrarIndicacoes() {
    document.getElementById("noticias").style.display = "none";
    document.getElementById("indicacoes").style.display = "flex";
    document.querySelector(".benefits__type-btn.arg").classList.remove("active");
    document.querySelector(".benefits__type-btn.pub").classList.add("active");
  }