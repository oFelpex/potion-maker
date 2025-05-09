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
function createNewPotion() {
  let potionForm = document.getElementById("potions-form");
  potionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const potionFormData = new FormData(potionForm);

    const potionOBJ = {
      "potion-name": potionFormData.get("potion-name"),
      "potion-ingredients": potionFormData.get("potion-ingredients"),
      "potion-effects": potionFormData.get("potion-effects"),
      "potion-color-picker": potionFormData.get("potion-color-picker"),
      "bottle-type-select": potionFormData.get("bottle-type-select"),
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

function createPotionCard(potion) {
  const potionShowcase = document.getElementById("potion-showcase");
  potionShowcase.innerHTML += `
  <div class="potion-card">
    <div class="showcase-potion-container">
      <img
        class="showcase-potion-img"
        src="assets/empty-bottles/bottle-${potion["bottle-type-select"]}.webp"
        alt="It's a potion bottle"
      />
      ${
        potion["bottle-type-select"] === "1"
          ? `<div class="showcase-potion-color-1-bottom" style="border-bottom: 5px solid ${potion["potion-color-picker"]}; background-color: ${potion["potion-color-picker"]};"></div>`
          : ""
      }
      <div class="showcase-potion-color-${potion["bottle-type-select"]}"
        style="
          ${
            ["0", "2", "4"].includes(potion["bottle-type-select"])
              ? `background-color: ${potion["potion-color-picker"]};`
              : ""
          }
          ${
            potion["bottle-type-select"] === "3"
              ? `border-top: 1px solid ${potion["potion-color-picker"]}; border-bottom: 40px solid ${potion["potion-color-picker"]};`
              : ""
          }
          ${
            potion["bottle-type-select"] === "1"
              ? `border-bottom: 50px solid ${potion["potion-color-picker"]};`
              : ""
          }
        ">
      </div>
    </div>
    <h3 class="span-potion-name">${potion["potion-name"]}</h3>
    <span class="span-potion-ingredients"><strong>Ingredients: </strong>${
      potion["potion-ingredients"]
    }</span>
    <span class="span-potion-effects"><strong>Effects: </strong>${
      potion["potion-effects"]
    }</span>
    <div class="action-buttons">
      <button class="edit-button" onclick='openPotionModal(${JSON.stringify(
        potion
      )}, event, "update")'><span>Edit</span></button>
      <button class="delete-button" onclick='openPotionModal(${JSON.stringify(
        potion
      )}, event, "delete")'><span>Delete</span></button>
    </div>
  </div>
`;
}

function openPotionModal(potion, event, modalType) {
  switch (modalType) {
    case "update":
      openUpdatePotionModal(potion, event);
      break;
    case "delete":
      openDeletePotionModal(potion, event);
      break;
    default:
      alert("Something broken in openPotionModal");
  }
}
function closePotionModal(event) {
  event.stopPropagation();
  const main = document.getElementById("main");
  const modalOverlay = document.getElementById("modal-overlay");

  main.removeChild(modalOverlay);
}

function openUpdatePotionModal(potion, event) {
  if (document.getElementById("modal-overlay")) closePotionModal(event);

  document.getElementById("main").innerHTML += `
        <div id="modal-overlay" onclick="closePotionModal(event)">
        <div id="modal-container" onclick="event.stopPropagation()">
          <h3>Update Potion</h3>
          <form method="post" id="modal-update-potion-form">
            <div class="modal-div-input">
              <label for="modal-potion-name">Potion Name</label>
              <input required maxlength="30" minlength="3" placeholder="Ex: Strength Potion" type="text" value="${potion["potion-name"]}" name="modal-potion-name" id="modal-potion-name"
              />
            </div>
            <div class="modal-div-input">
              <label for="modal-potion-ingredients">Potion Ingredients</label>
              <input required maxlength="50" minlength="3" placeholder="Ex: Spider Eye" type="text" value="${potion["potion-ingredients"]}" name="modal-potion-ingredients" id="modal-potion-ingredients"/>
            </div>
            <div class="modal-div-input">
              <label for="modal-potion-effects">Potion Effects</label>
              <input required maxlength="40" minlength="3" placeholder="Ex: Strength" type="text" value="${potion["potion-effects"]}" name="modal-potion-effects" id="modal-potion-effects"/>
            </div>
            <div class="modal-div-input">
              <label for="modal-potion-color-picker">Choose the color of the potion</label>
              <div id="modal-div-potion-color">
                <input required type="color" name="modal-potion-color-picker" id="modal-potion-color-picker" onchange="addToSpanColor('modal-potion-color-picker', 'modal-potion-color-span')"/>
                <span id="modal-potion-color-span">Select a color, default: black</span>
              </div>
            </div>
            <div class="modal-div-input">
              <label for="modal-bottle-type-select">Choose the type of bottle</label>
              <div id="div-bottle-preview">
                <select required name="modal-bottle-type-select" id="modal-bottle-type-select" onchange="bottlePreview('modal-bottle-type-select', 'modal-bottle-preview-img', 'modal-bottle-preview-caption')">
                  <option value="" selected disabled>Select the type</option>
                  <option value="0">Type 1</option>
                  <option value="1">Type 2</option>
                  <option value="2">Type 3</option>
                  <option value="3">Type 4</option>
                  <option value="4">Type 5</option>
                </select>
                <div id="bottle-preview-container">
                  <img id="modal-bottle-preview-img" style="opacity: 0" src="./assets/empty-bottles/bottle-${potion["bottle-type-select"]}.webp" alt="A Empty Bottle"/>
                  <figcaption id="modal-bottle-preview-caption" style="transform: translateY(-35px)">
                    Select the bottle
                  </figcaption>
                </div>
              </div>
            </div>
            <div>
              <button id="sumit-update-button" type="submit" class="submit-button">
                <span>Update!</span>
              </button>
              <button type="button" onclick="closePotionModal(event)" style="margin-top: 20px" class="delete-button">
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

  const sumitUpdateButton = document.getElementById("sumit-update-button");
  sumitUpdateButton.addEventListener("click", updatePotion(potion));
}
function updatePotion(potion) {
  const modalUpdatePotionForm = document.getElementById(
    "modal-update-potion-form"
  );

  modalUpdatePotionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const updatePotionFormData = new FormData(modalUpdatePotionForm);

    function areObjectsEqual(potion, updatePotionFormData) {
      const modalPotion = {
        id: potion.id,
        "potion-name": updatePotionFormData.get("modal-potion-name"),
        "potion-ingredients": updatePotionFormData.get(
          "modal-potion-ingredients"
        ),
        "potion-effects": updatePotionFormData.get("modal-potion-effects"),
        "potion-color-picker": updatePotionFormData.get(
          "modal-potion-color-picker"
        ),
        "bottle-type-select": updatePotionFormData.get(
          "modal-bottle-type-select"
        ),
      };

      const potionArr = Object.keys(potion);
      for (let key of potionArr) {
        if (potion[key] !== modalPotion[key]) return false;
      }
      return true;
    }
    if (!areObjectsEqual(potion, updatePotionFormData)) {
      fetch(`http://localhost:3000/potions/${potion["id"]}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "potion-name": updatePotionFormData.get("modal-potion-name"),
          "potion-ingredients": updatePotionFormData.get(
            "modal-potion-ingredients"
          ),
          "potion-effects": updatePotionFormData.get("modal-potion-effects"),
          "potion-color-picker": updatePotionFormData.get(
            "modal-potion-color-picker"
          ),
          "bottle-type-select": updatePotionFormData.get(
            "modal-bottle-type-select"
          ),
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Updated with success:", data))
        .catch((error) => console.error("Error:", error));
      return;
    }

    closePotionModal(event);
    return;
  });
}

function openDeletePotionModal(potion, event) {
  if (document.getElementById("modal-overlay")) closePotionModal(event);

  document.getElementById("main").innerHTML += `
  <div id="modal-overlay" onclick="closePotionModal(event)">
    <div id="modal-container" onclick="event.stopPropagation()" style="height: fit-content; width: fit-content">
      <h3>Delete Potion</h3>
      <div id="modal-delete-potion">
        <span style="text-align: center">Do you want to delete: <span style="color: ${potion["potion-color-picker"]}; text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.5);">${potion["potion-name"]}</span>?</span>
      </div>
    </div>
  </div>  
  `;

  const modalDeletePotion = document.getElementById("modal-delete-potion");

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

  modalDeletePotion.appendChild(showcasePotionContainer);

  modalDeletePotion.innerHTML += `
        <div class="action-buttons">
          <button id="modal-delete-button" class="delete-button" type="button"><span>Delete</span></button>
          <button type="button" onclick="closePotionModal(event)"><span>Cancel</span></button>
        </div>`;

  const modalDeleteButton = document.getElementById("modal-delete-button");
  modalDeleteButton.addEventListener("click", () => {
    deletePotion(potion);
  });

  return;
}
function deletePotion(potion) {
  fetch(`http://localhost:3000/potions/${potion["id"]}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("deleted with success:", data);
    })
    .catch((error) => console.error("Error:", error));
  return;
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
        createPotionCard(potion);
      }
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });
}
showAllPotions();
