function Star(selector, count, callback) {
  const container = document.querySelector(selector);
  let active = 0;

  // Create stars
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const star = document.createElement("i");
    star.className = "fa fa-star-o";
    star.dataset.value = i;
    fragment.appendChild(star);
  }

  container.appendChild(fragment);

  const stars = container.querySelectorAll("i");

  function highlight(value) {
    stars.forEach((star, index) => {
      star.classList.toggle("fa-star", index <= value);
    });
  }

  container.addEventListener("mouseover", (e) => {
    if (!e.target.dataset.value) return;
    highlight(e.target.dataset.value);
  });

  container.addEventListener("mouseleave", () => {
    highlight(active);
  });

  container.addEventListener("click", (e) => {
    if (!e.target.dataset.value) return;

    active = +e.target.dataset.value;
    highlight(active);
    callback(active+1);
  });
}

function getStar(value) {
  document.getElementById("display-star").innerText = value;
}

Star("#star", 5, getStar);