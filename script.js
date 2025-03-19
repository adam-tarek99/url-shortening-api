const listBtn = document.querySelector(".list-btn");
const nav = document.querySelector("header nav");

const form = document.getElementById("form");
const linkShort = document.querySelector(".link-short");
const shortenLinks = document.querySelector(".shorten-links");
const oLink = document.querySelector(".o-link");
const submitBtn = document.querySelector(".submitBtn");

listBtn.addEventListener("click", () => {
  nav.classList.toggle("d-none");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  shortApi(e.target[0].value);
});

const shortApi = async (url) => {
  submitBtn.textContent = "";
  submitBtn.innerHTML = '<div class="loader"></div>';
  const urlApi = "https://cleanuri.com/api/v1/shorten";

  try {
    const response = await fetch(urlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ url }),
    });

    const shortLink = await response.json();
    shortenLinks.textContent = shortLink.result_url;
    oLink.textContent = url;
    navigator.clipboard.writeText(shortLink.result_url);
    linkShort.querySelector(".shorten-links").value = shortLink.result_url;
    submitBtn.textContent = "Shorten it!";
    linkShort.classList.remove("d-none");
  } catch (error) {
    console.log(error);
  }
};
