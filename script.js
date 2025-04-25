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
