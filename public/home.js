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

function fillPetsTable(pets) {
  const pets_table = document.getElementById("pets_table_body");
  pets_table.innerHTML = "";


  let tableHtml = "";
  pets.forEach((pet) => {
    tableHtml += `<tr>
                      <td class="align-middle">${pet.name}</td>
                      <td class="align-middle">${pet.animalType}</td>
                      <td class="align-middle">${pet.age}</td>
                      <td class="align-middle">${pet.breed}</td>
                      <td class="align-middle">${pet.size}</td>
                      <td class="align-middle">${pet.mood}</td>
                      <td class="text-center"><a class="btn btn-primary" href="createPet/${pet._id}">Edit</a></td>
                  </tr>`;
  });

  pets_table.innerHTML = tableHtml;
}

getPets().then((res) => fillPetsTable(res));
