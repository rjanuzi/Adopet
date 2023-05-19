const updateBtn = document
  .getElementById("update-page")
  .addEventListener("click", () => {
    getPets().then((res) => fillPetsTable(res));
  });

async function getPets() {
  const response = await fetch("/pets");
  const jsonData = await response.json();
  return jsonData;
}

async function deletePet(event) {
  const target = event.target;
  const petId = target.getAttribute("petId");
  const response = await fetch(`/pets/${petId}`, { method: "DELETE" });
  const jsonData = await response.json();

  getPets().then((res) => fillPetsTable(res));
}

function fillPetsTable(pets) {
  const pets_table = document.getElementById("pets_table_body");
  pets_table.innerHTML = "";

  const range = document.createRange();

  pets.forEach((pet) => {
    const frag = document.createDocumentFragment();
    const trElement = document.createElement("tr");

    /* TD Elements */
    const tdNameElement = document.createElement("td");
    const tdAnimalTypeElement = document.createElement("td");
    const tdAgeElement = document.createElement("td");
    const tdBreedElement = document.createElement("td");
    const tdSizeElement = document.createElement("td");
    const tdMoodElement = document.createElement("td");
    const tdEditElement = document.createElement("td");
    const tdDeleteElement = document.createElement("td");

    /* Add align class to td element */
    tdEditElement.classList.add("text-center");
    tdDeleteElement.classList.add("text-center");

    /* Add buttons */
    const tdEditButton = range.createContextualFragment(
      `<a class="btn btn-primary btn-sm" href="createPet/${pet._id}">Edit</a>`
    );
    const tdDeleteButton = range.createContextualFragment(
      `<button id="delete_btn_${pet._id}" petId=${pet._id} class="btn btn-danger btn-sm">Delete</button>`
    );

    /* Fill Fields */
    tdNameElement.innerHTML = pet.name;
    tdAnimalTypeElement.innerHTML = pet.animalType;
    tdAgeElement.innerHTML = pet.age;
    tdBreedElement.innerHTML = pet.breed;
    tdSizeElement.innerHTML = pet.size;
    tdMoodElement.innerHTML = pet.mood;

    /* Append TDs into TR */
    trElement.appendChild(tdNameElement);
    trElement.appendChild(tdAnimalTypeElement);
    trElement.appendChild(tdAgeElement);
    trElement.appendChild(tdBreedElement);
    trElement.appendChild(tdSizeElement);
    trElement.appendChild(tdMoodElement);
    trElement.appendChild(tdEditElement);
    trElement.appendChild(tdDeleteElement);

    /* Append Buttons into TDs */
    tdEditElement.appendChild(tdEditButton);
    tdDeleteElement.appendChild(tdDeleteButton);

    /* Append TR into Fragment */
    frag.appendChild(trElement);

    /* Add listener for delete */
    const tempButton = frag.getElementById(`delete_btn_${pet._id}`);
    tempButton.addEventListener("click", deletePet);

    /* Add the Fragment to the table */
    pets_table.appendChild(frag);
  });
}

getPets().then((res) => fillPetsTable(res));
