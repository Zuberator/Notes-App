let notes = document.querySelector("#notes");
let addButton = document.getElementById("add");
let removeButton = document.querySelectorAll("#remove");
let noteTemplate = document.querySelector("[data-note-template]");

(function loadValues() {
  let content = localStorage.getItem("notes");
  if (content) notes.innerHTML = content;

  document.querySelectorAll(".note").forEach((input) => {
    if (
      localStorage.getItem("Title" + input.id) &&
      localStorage.getItem("Content" + input.id)
    ) {
      input.children[0].value = localStorage.getItem("Title" + input.id);
      input.children[1].value = localStorage.getItem("Content" + input.id);
    }
  });
})();

addButton.addEventListener("click", () => {
  let card = noteTemplate.content.cloneNode(true).children[0];
  card.style.background = `rgb(
  ${random(0, 255)},
  ${random(0, 255)},
  ${random(0, 255)})`;
  card.style.transform = `rotateZ(${random(-10, 10)}deg)`;
  card.id = random(10000, 99999);
  notes.append(card);
  save();
});

if (!document.querySelectorAll(".note").length > 0) addButton.click();

document.body.addEventListener("keyup", () => save());

document.body.addEventListener("click", (e) => {
  if (e.target.matches("span#remove")) {
    e.target.parentElement.remove();
    save();
  }
});

function random(min, max) {
  let color = Math.floor(Math.random() * (max - min)) + min;
  return color;
}

function save() {
  localStorage.setItem("notes", notes.innerHTML);

  document.querySelectorAll(".note").forEach((input) => {
    let savedTitle = input.children[0].value;
    let savedContent = input.children[1].value;
    localStorage.setItem("Title" + input.id, savedTitle);
    localStorage.setItem("Content" + input.id, savedContent);
  });
}

function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}

// add.addEventListener("click", () => {
//   let note = document.createElement("div");
//   note.classList.add("note");
//   let title = document.createElement("input[type="text"]);
//   note.classList.add("note");
//   let title = document.createElement("input[type="text"]);
//   note.classList.add("note");
// })
