function bottlePreview() {
  let bottleArr = [
    { name: "bottle-0", imgURL: "./assets/empty-bottles/bottle-0.webp" },
    { name: "bottle-1", imgURL: "./assets/empty-bottles/bottle-1.webp" },
    { name: "bottle-2", imgURL: "./assets/empty-bottles/bottle-2.webp" },
    { name: "bottle-3", imgURL: "./assets/empty-bottles/bottle-3.webp" },
    { name: "bottle-4", imgURL: "./assets/empty-bottles/bottle-4.webp" },
  ];
  let bottleTypeSelect = document.getElementById("bottle-type-select");
  let bottlePreview = document.getElementById("bottle-preview");
  bottlePreview.src = bottleArr[bottleTypeSelect.value].imgURL;
  document.getElementById("bottle-preview-caption").innerHTML =
    "Type: " + (Number(bottleTypeSelect.value) + 1);
}

function addToInputColor() {
  let potionColorPicker = document.getElementById("potion-color-picker");
  document.getElementById("potion-color-span").innerHTML =
    "Color: " + potionColorPicker.value;
}

async function submitPotion() {
  let potionForm = document.getElementById("potions-form");
  potionForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const potionOBJ = {
      "potion-name": event.target["potion-name"].value,
      "potion-ingredients": event.target["potion-ingredients"].value,
      "potion-effects": event.target["potion-effects"].value,
      "potion-color-picker": event.target["potion-color-picker"].value,
      "bottle-type-select": event.target["bottle-type-select"].value,
    };
    const potionJSON = JSON.stringify(potionOBJ);

    await fetch("http://localhost:3000/potions", {
      method: "POST",
      body: potionJSON,
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.warn("Something went wrong.", err);
      });
  });
}

async function showAllPotions() {
  let response = (await fetch("http://localhost:3000/potions")).json();
  response.then((allPotions) => {
    for (let potion of allPotions) {
      createPotion(potion);
    }
  });
}
showAllPotions();

function createPotion(potion) {
  const potionShowcase = document.getElementById("potion-showcase");

  const potionCard = document.createElement("DIV");
  potionCard.classList.add("potion-card");

  const showcasePotionContainer = document.createElement("DIV");
  showcasePotionContainer.classList.add("showcase-potion-container");

  const showcasePotionImg = document.createElement("IMG");
  showcasePotionImg.classList.add("showcase-potion-img");
  showcasePotionImg.src = `assets/empty-bottles/bottle-${potion["bottle-type-select"]}.webp`;
  showcasePotionImg.alt = "It's a potion bottle";

  const showcasePotionColor = document.createElement("DIV");
  showcasePotionColor.classList.add(
    `showcase-potion-color-${potion["bottle-type-select"]}`
  );

  if (["0", "2", "4"].includes(potion["bottle-type-select"])) {
    showcasePotionColor.style.backgroundColor = potion["potion-color-picker"];
  }

  if (potion["bottle-type-select"] === "3") {
    showcasePotionColor.style.borderTop = `1px solid ${potion["potion-color-picker"]}`;
    showcasePotionColor.style.borderBottom = `40px solid ${potion["potion-color-picker"]}`;
  }

  showcasePotionContainer.appendChild(showcasePotionImg);

  if (potion["bottle-type-select"] === "1") {
    const showcasePotionColor1Bottom = document.createElement("DIV");
    showcasePotionColor1Bottom.classList.add("showcase-potion-color-1-bottom");
    showcasePotionColor1Bottom.style.borderBottom = `5px solid ${potion["potion-color-picker"]}`;
    showcasePotionColor1Bottom.style.backgroundColor =
      potion["potion-color-picker"];
    showcasePotionContainer.appendChild(showcasePotionColor1Bottom);

    showcasePotionColor.style.borderBottom = `50px solid ${potion["potion-color-picker"]}`;
  }

  showcasePotionContainer.appendChild(showcasePotionColor);
  potionCard.appendChild(showcasePotionContainer);

  //Create spans here

  potionShowcase.appendChild(potionCard);
}
