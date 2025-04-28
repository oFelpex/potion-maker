function scrollToPotionCreator() {
  let potionCreator = document.getElementById("potion-creator");
  potionCreator.scrollIntoView({ behavior: "smooth" });
}
function scrollToHeader() {
  let header = document.getElementById("header");
  header.scrollIntoView({ behavior: "smooth" });
}

function bottlePreview(
  bottleTypeSelectID,
  bottlePreviewID,
  bottlePreviewCaptionID
) {
  let bottleArr = [
    { name: "bottle-0", imgURL: "./assets/empty-bottles/bottle-0.webp" },
    { name: "bottle-1", imgURL: "./assets/empty-bottles/bottle-1.webp" },
    { name: "bottle-2", imgURL: "./assets/empty-bottles/bottle-2.webp" },
    { name: "bottle-3", imgURL: "./assets/empty-bottles/bottle-3.webp" },
    { name: "bottle-4", imgURL: "./assets/empty-bottles/bottle-4.webp" },
  ];
  let bottleTypeSelect = document.getElementById(bottleTypeSelectID);

  let bottlePreviewIMG = document.getElementById(bottlePreviewID);
  bottlePreviewIMG.style.opacity = 1;
  bottlePreviewIMG.src = bottleArr[bottleTypeSelect.value].imgURL;

  let bottlePreviewCaption = document.getElementById(bottlePreviewCaptionID);
  bottlePreviewCaption.style.transform = "translateY(0)";
  bottlePreviewCaption.innerHTML =
    "Type: " + (Number(bottleTypeSelect.value) + 1);
}

function addToSpanColor(potionColorPickerID, potionPolorSpanID) {
  let potionColorPicker = document.getElementById(potionColorPickerID);
  document.getElementById(potionPolorSpanID).innerHTML =
    "Color: " + potionColorPicker.value;
}

function createPotion() {
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

    fetch("http://localhost:3000/potions", {
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

function showAllPotions() {
  fetch("http://localhost:3000/potions")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (allPotions) {
      for (let potion of allPotions) {
        createPotion(potion);
      }
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });
}

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

  const spanPotionTitle = document.createElement("H3");
  spanPotionTitle.classList.add("span-potion-name");
  spanPotionTitle.innerHTML = potion["potion-name"];
  potionCard.appendChild(spanPotionTitle);

  const spanPotionIngredients = document.createElement("SPAN");
  spanPotionIngredients.classList.add("span-potion-ingredients");
  spanPotionIngredients.innerHTML =
    "<strong>Ingredients: </strong>" + potion["potion-ingredients"];
  potionCard.appendChild(spanPotionIngredients);

  const spanPotionEffects = document.createElement("SPAN");
  spanPotionEffects.classList.add("span-potion-effects");
  spanPotionEffects.innerHTML =
    "<strong>Effects: </strong> " + potion["potion-effects"];
  potionCard.appendChild(spanPotionEffects);

  const divActionButtons = document.createElement("DIV");
  divActionButtons.classList.add("action-buttons");

  const editButton = document.createElement("BUTTON");
  editButton.classList.add("edit-button");
  editButton.innerHTML = "<span>Edit</span>";
  editButton.onclick = function (event) {
    updatePotion(potion, event);
  };
  divActionButtons.appendChild(editButton);

  const deleteButton = document.createElement("BUTTON");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = "<span>Delete</span>";
  deleteButton.onclick = function () {
    deletePotion(potion);
  };
  divActionButtons.appendChild(deleteButton);

  potionCard.appendChild(divActionButtons);
  potionShowcase.appendChild(potionCard);
}

function updatePotion(potion, event) {
  openUpdatePotionModal(potion, event);

  const modalUpdatePotionForm = document.getElementById(
    "modal-update-potion-form"
  );
  // let editWhat = prompt(
  //   `What do you want to edit?
  //   Potion name: 0
  //   Potion ingredients: 1
  //   Potion effects: 2
  //   Potion color: 3`
  // );
  // switch (editWhat) {
  //   case "0":
  //     updatePotionName(potion);
  //     break;
  //   case "1":
  //     updatePotionIngredients(potion);
  //     break;
  //   case "2":
  //     updatePotionEffects(potion);
  //     break;
  //   case "3":
  //     updatePotionColor(potion);
  //     break;
  //   case "":
  //     alert("You didn't choose any option...");
  //     break;
  //   case null:
  //     break;
  //   default:
  //     alert("That's not a option! >:(");
  // }
}
// function updatePotionName(potion) {
//   let newName = prompt(
//     `CHANGE THE NAME.\nCurrent potion name: ${potion["potion-name"]}\nChoose a new name:`
//   );
//   if (newName) {
//     if (newName.trim() === "") {
//       alert("Well, I guess you want to cancel...");
//       return;
//     } else {
//       if (newName.length > 30) {
//         alert("Max length to Potion name is 30!");
//         return;
//       }
//       if (newName.length < 3) {
//         alert("Min length to Potion name is 3!");
//         return;
//       }
//     }
//     fetch(`http://localhost:3000/potions/${potion["id"]}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         "potion-name": newName,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log("Updated with success:", data))
//       .catch((error) => console.error("Error:", error));
//     return;
//   }
//   alert("Well, I guess you want to cancel...");
//   return;
// }
// function updatePotionIngredients(potion) {
//   let newIngredients = prompt(
//     `CHANGE THE INGREDIENTS.\nCurrent potion ingredients: ${potion["potion-ingredients"]}\nWrite the ingredients:`
//   );
//   if (newIngredients) {
//     if (newIngredients.trim() === "") {
//       alert("Well, I guess you want to cancel...");
//       return;
//     } else {
//       if (newIngredients.length > 50) {
//         alert("Max length to Potion name is 50!");
//         return;
//       }
//       if (newIngredients.length < 3) {
//         alert("Min length to Potion name is 3!");
//         return;
//       }
//     }
//   } else {
//     alert("Well, I guess you want to cancel...");
//     return;
//   }

//   fetch(`http://localhost:3000/potions/${potion["id"]}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       "potion-ingredients": newIngredients,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log("Updated with success:", data))
//     .catch((error) => console.error("Error:", error));
// }
// function updatePotionEffects(potion) {
//   let newEffects = prompt(
//     `CHANGE THE EFFECTS.\nCurrent potion effects: ${potion["potion-effects"]}\nWrite the effects:`
//   );
//   if (newEffects) {
//     if (newEffects.trim() === "") {
//       alert("Well, I guess you want to cancel...");
//       return;
//     } else {
//       if (newEffects.length > 40) {
//         alert("Max length to Potion effects is 40!");
//         return;
//       }
//       if (newEffects.length < 3) {
//         alert("Min length to Potion effects is 3!");
//         return;
//       }
//     }

//     fetch(`http://localhost:3000/potions/${potion["id"]}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         "potion-effects": newEffects,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log("Updated with success:", data))
//       .catch((error) => console.error("Error:", error));
//     return;
//   }

//   alert("Well, I guess you want to cancel...");
//   return;
// }
// function updatePotionColor(potion) {
//   let newColor = prompt(
//     `CHANGE THE COLOR.\nCurrent potion color: ${potion["potion-color-picker"]}\nWrite the color in HEX (EX: #000000):`
//   );
//   if (newColor) {
//     if (newColor.trim() === "") {
//       alert("Well, I guess you want to cancel...");
//       return;
//     } else {
//       if (newColor.charAt(0) !== "#") {
//         newColor = "#" + newColor;
//       }

//       if (![4, 7, 9].includes(newColor.length)) {
//         alert(
//           "Potion color must be in one of these formats:\n#RGB (4 chars)\n#RRGGBB (7 chars)\n#RRGGBBAA (9 chars)"
//         );
//         return;
//       }
//     }
//     fetch(`http://localhost:3000/potions/${potion["id"]}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         "potion-color-picker": newColor,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log("Updated with success:", data))
//       .catch((error) => console.error("Error:", error));
//     return;
//   }
//   alert("Well, I guess you want to cancel...");
//   return;
// }
function deletePotion(potion) {
  let areYouSure = prompt(
    `Are you sure that you want to delete: ${potion["potion-name"]}?\nType: 1 to confirm`
  );

  if (areYouSure) {
    if (areYouSure.trim() !== "") {
      if (areYouSure === "1") {
        fetch(`http://localhost:3000/potions/${potion["id"]}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("deleted with success:", data);
            alert(`${potion["potion-name"]} deleted with success`);
          })
          .catch((error) => console.error("Error:", error));
        return;
      }
      return;
    }
    alert("Well, I guess you want to cancel...");
    return;
  }
  alert("Well, I guess you want to cancel...");
  return;
}

function openUpdatePotionModal(potion, event) {
  if (document.getElementById("modal-overlay")) closeUpdatePotionModal(event);

  document.getElementById("main").innerHTML += `
        <div id="modal-overlay" onclick="closeUpdatePotionModal(event)">
        <div id="modal-container" onclick="event.stopPropagation()">
          <h3>Update Potion</h3>
          <form id="modal-update-potion-form">
            <div class="modal-div-input">
              <label for="modal-potion-name">Potion Name</label>
              <input
                required
                maxlength="30"
                minlength="3"
                placeholder="Ex: Strength Potion"
                type="text"
                value="${potion["potion-name"]}"
                name="modal-potion-name"
                id="modal-potion-name"
              />
            </div>

            <div class="modal-div-input">
              <label for="modal-potion-ingredients">Potion Ingredients</label>
              <input
                required
                maxlength="50"
                minlength="3"
                placeholder="Ex: Spider Eye"
                type="text"
                value="${potion["potion-ingredients"]}"
                name="modal-potion-ingredients"
                id="modal-potion-ingredients"
              />
            </div>

            <div class="modal-div-input">
              <label for="modal-potion-effects">Potion Effects</label>
              <input
                required
                maxlength="40"
                minlength="3"
                placeholder="Ex: Strength"
                type="text"
                value="${potion["potion-effects"]}"
                name="modal-potion-effects"
                id="modal-potion-effects"
              />
            </div>

            <div class="modal-div-input">
              <label for="modal-potion-color-picker"
                >Choose the color of the potion</label
              >
              <div id="modal-div-potion-color">
                <input
                  required
                  type="color"
                  name="modal-potion-color-picker"
                  id="modal-potion-color-picker"
                  onchange="addToSpanColor('modal-potion-color-picker', 'modal-potion-color-span')"
                />
                <span id="modal-potion-color-span"
                  >Select a color, default: black</span
                >
              </div>
            </div>

            <div class="modal-div-input">
              <label for="modal-bottle-type-select"
                >Choose the type of bottle</label
              >
              <div id="div-bottle-preview">
                <select
                  required
                  name="modal-bottle-type-select"
                  id="modal-bottle-type-select"
                  onchange="bottlePreview('modal-bottle-type-select',
                    'modal-bottle-preview-img',
                    'modal-bottle-preview-caption')"
                >
                  <option value="" selected disabled>Select the type</option>
                  <option value="0">Type 1</option>
                  <option value="1">Type 2</option>
                  <option value="2">Type 3</option>
                  <option value="3">Type 4</option>
                  <option value="4">Type 5</option>
                </select>
                <div id="bottle-preview-container">
                  <img
                    id="modal-bottle-preview-img"
                    style="opacity: 0"
                    src="./assets/empty-bottles/bottle-${potion["bottle-type-select"]}.webp"
                    alt="A Empty Bottle"
                  />
                  <figcaption
                    id="modal-bottle-preview-caption"
                    style="transform: translateY(-35px)"
                  >
                    Select the bottle
                  </figcaption>
                </div>
              </div>
            </div>

            

            <div>
              <button
                type="submit"
                onclick="updatePotionForm()"
                class="submit-button"
              >
                <span>Update!</span>
              </button>

              <button
                type="button"
                onclick="closeUpdatePotionModal(event)"
                style="margin-top: 20px"
                class="delete-button"
              >
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
  `;

  const selectElement = document.getElementById("modal-bottle-type-select");
  selectElement.value = potion["bottle-type-select"];
  selectElement.dispatchEvent(new Event("change"));

  const colorInput = document.getElementById("modal-potion-color-picker");
  colorInput.value = potion["potion-color-picker"];
  colorInput.dispatchEvent(new Event("change"));
}

function closeUpdatePotionModal(event) {
  event.stopPropagation();
  const main = document.getElementById("main");
  const modalOverlay = document.getElementById("modal-overlay");

  main.removeChild(modalOverlay);
}

function updatePotionForm() {}

showAllPotions();
