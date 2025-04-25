let bottleArr = [
  { name: "bottle-0", imgURL: "./assets/empty-bottles/bottle-0.webp" },
  { name: "bottle-1", imgURL: "./assets/empty-bottles/bottle-1.webp" },
  { name: "bottle-2", imgURL: "./assets/empty-bottles/bottle-2.webp" },
  { name: "bottle-3", imgURL: "./assets/empty-bottles/bottle-3.webp" },
  { name: "bottle-4", imgURL: "./assets/empty-bottles/bottle-4.webp" },
];
function bottlePreview() {
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

async function getPotions() {
  let response = (await fetch("http://localhost:3000/potions")).json();
  response.then((value) => {
    return value;
  });
}
