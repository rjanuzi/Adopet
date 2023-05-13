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
  const response = await fetch(`/pets/${petId}`, {method: "DELETE"});
  const jsonData = await response.json();

  getPets().then((res) => fillPetsTable(res));
}

function fillPetsTable(pets) {
  const pets_table = document.getElementById("pets_table_body");
  pets_table.innerHTML = "";

  const range = document.createRange();

  
  pets.forEach((pet) => {
    let rowHtml = `<tr>
                      <td class="align-middle">${pet.name}</td>
                      <td class="align-middle">${pet.animalType}</td>
                      <td class="align-middle">${pet.age}</td>
                      <td class="align-middle">${pet.breed}</td>
                      <td class="align-middle">${pet.size}</td>
                      <td class="align-middle">${pet.mood}</td>
                      <td class="text-center align-middle"><a class="btn btn-primary btn-sm" href="createPet/${pet._id}">Edit</a></td>
                      <td class="text-center align-middle"><button id="delete_btn_${pet._id}" class="btn btn-danger btn-sm">Delete</button></td>

                  </tr>`;
    
    // REESCREVER PRA TODOS OS ELEMENTOS
    const frag = document.createDocumentFragment(); 
    const trElement = document.createElement('tr');
    const tdNameElement = document.createElement('td');
    const tdDeleteElement = document.createElement('td');
    const tdButton = range.createContextualFragment(`<button id="delete_btn_${pet._id}" petId=${pet._id} class="btn btn-danger btn-sm">Delete</button>`);
    tdNameElement.innerHTML = pet.name;
    trElement.appendChild(tdNameElement);
    trElement.appendChild(tdDeleteElement);
    tdDeleteElement.appendChild(tdButton);
    frag.appendChild(trElement);
    
    const tempButton = frag.getElementById(`delete_btn_${pet._id}`);
    tempButton.addEventListener("click", deletePet);
    
    pets_table.appendChild(frag);
  });

  
}

getPets().then((res) => fillPetsTable(res));
