const list = document.querySelector(".list");

const loadItems = (itemLimit) => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Array(itemLimit).fill("List Item"));
    }, 1000);
  }).then((response) => {
    const html = response.map((data) => `<li>${data}</li>`);

    list.innerHTML += html.join("");
  });
};

const intersectionObserver = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting) {
    loadItems(10);
  }
});

loadItems(10);

intersectionObserver.observe(document.querySelector(".more"));
