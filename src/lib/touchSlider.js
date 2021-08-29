export const touchSlider = (sliderClass, slideItemClass, slideImg) => {
  let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID,
    currentIndex = 0;

  setInterval(() => {
    if (currentIndex < slides.length - 1) currentIndex += 1;
    else currentIndex = 0;
    setPositionByIndex();
  }, 5000);

  const getPositionX = (event) => {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  };

  const setSliderPosition = () => {
    if (slider) {
      slider.style.transform = `translateX(${currentTranslate}px)`;
    }
  };

  const animation = () => {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  };

  const touchStart = (index) => {
    return (event) => {
      isDragging = true;
      startPos = getPositionX(event);
      animationID = requestAnimationFrame(animation);
    };
  };

  const touchEnd = () => {
    isDragging = false;
    cancelAnimationFrame(animationID);
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;
    setPositionByIndex();
  };

  const touchMove = (event) => {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  };
  function setPositionByIndex() {
    if (window.innerWidth < 1023) {
      currentTranslate = currentIndex * -window.innerWidth;
    } else currentTranslate = currentIndex * -864;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }

  const resetSlider = () => {
    currentIndex = 0;
    currentTranslate = 0;
    setPositionByIndex();
  };

  window.addEventListener("resize", resetSlider);

  // prevent menu popup on long press
  window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  const slider = document.querySelector(`.${sliderClass}`),
    slides = Array.from(document.querySelectorAll(`.${slideItemClass}`));

  slides.forEach((slide, index) => {
    const slideImage = slide.querySelector(`.${slideImg}`);
    slideImage.addEventListener("dragstart", (e) => e.preventDefault());
    //Touch events
    slide.addEventListener("touchstart", touchStart(index));
    slide.addEventListener("touchend", touchEnd);
    slide.addEventListener("touchmove", touchMove);

    //Mouse events
    slide.addEventListener("mousedown", touchStart(index));
    slide.addEventListener("mouseup", touchEnd);
    slide.addEventListener("mouseleave", touchEnd);
    slide.addEventListener("mousemove", touchMove);
  });
};

export function getTranslateXY(element) {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return {
    translateX: matrix.m41,
    translateY: matrix.m42,
  };
}

export const resizeFnc = (callback) => {
  callback();
};
