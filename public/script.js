document.querySelector("#btnLoad").addEventListener("click", () => {
  if (document.querySelector("#dinoName") !== null) {
    document.querySelector("#dinoName").remove();
  }
  if (document.querySelector("#dinoImage") !== null) {
    document.querySelector("#dinoImage").remove();
  }

  const spinner = `
    <div id="spinner" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;
  document.querySelector("#dinoWrapper").innerHTML = spinner;

  nameAndImage();
});

async function nameAndImage() {
  const dinoNameDiv = await getDinoName();
  const img = await getDinoImage();

  await Promise.all([dinoNameDiv, img]).then(([dinoNameDiv, img]) => {
    document.querySelector("#spinner").remove();
    document.querySelector("#dinoWrapper").appendChild(dinoNameDiv);
    document.querySelector("#dinoWrapper").appendChild(img);
  });
}

async function getDinoName() {
  const response = await fetch("/dinoname");
  const data = await response.json();
  const dinoName = data[0].join(" ");

  const dinoNameDiv = document.createElement("div");
  dinoNameDiv.id = "dinoName";
  dinoNameDiv.textContent = dinoName;

  return dinoNameDiv;
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

  return img;
}
