document.querySelector("#btnLoad").addEventListener("click", () => {
  if (document.querySelector("#dinoName") !== null) {
    document.querySelector("#dinoName").remove();
  }
  if (document.querySelector("#dinoImage") !== null) {
    document.querySelector("#dinoImage").remove();
  }
  getDinoName();
  getDinoImage();
});

async function getDinoName() {
  const response = await fetch("/dinoname");
  const data = await response.json();
  const dinoName = data[0].join(" ");

  const dinoNameDiv = document.createElement("div");
  dinoNameDiv.id = "dinoName";
  dinoNameDiv.textContent = dinoName;
  document.querySelector("#dinoWrapper").appendChild(dinoNameDiv);
}

async function getDinoImage() {
  const response = await fetch("/dinoimage");
  const data = await response.json();
  const dinoImage = data.value[Math.floor(Math.random() * data.value.length)];
  const dinoImageUrl = dinoImage.thumbnailUrl;
  const dinoAlt = dinoImage.name;

  const img = document.createElement("img");
  img.id = "dinoImage";
  img.src = dinoImageUrl;
  img.alt = dinoAlt;
  document.querySelector("#dinoWrapper").appendChild(img);
}
