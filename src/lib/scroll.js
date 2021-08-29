const scrollHorizontal = (elmName, speed) => {
  const target = document.querySelector(elmName);
  if (target) {
    target.addEventListener("wheel", (event) => {
      const toLeft = event.deltaY < 0 && target.scrollLeft > 0;
      const toRight =
        event.deltaY > 0 &&
        target.scrollLeft < target.scrollWidth - target.clientWidth;

      if (toLeft || toRight) {
        event.preventDefault();
        let number;
        if (event.deltaY > 0) {
          number = event.deltaY + speed;
        } else if (event.deltaY < 0) {
          number = event.deltaY - speed;
        }
        target.scrollLeft += number;
      }
    });
  }
};

export default scrollHorizontal;
