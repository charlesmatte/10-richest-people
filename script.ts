const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Armancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

// Store listItems
const listItems: HTMLElement[] = [];

let dragStartIndex: number;

type personObject = { value: string; sort: number };

createList();

// Insert list items into DOM
function createList(): void {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a: personObject, b: personObject) => a.sort - b.sort)
    .map((a: personObject) => a.value)
    .forEach((person: string, index: number): void => {
      const listItem: HTMLElement = document.createElement("li");
      const stringIndex: string = index.toString();
      listItem.setAttribute("data-index", stringIndex);

      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart(): void {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragOver(e): void {
  e.preventDefault();
}

function dragDrop(): void {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function dragEnter(): void {
  this.classList.add("over");
}

function dragLeave(): void {
  this.classList.remove("over");
}

function swapItems(fromIndex: number, toIndex: number): void {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const listItemDraggable: HTMLElement = listItem.querySelector(".draggable");
    const personName = listItemDraggable.innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.remove("right");
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners(): void {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
