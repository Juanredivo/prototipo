
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
