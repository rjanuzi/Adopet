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

  console.log(pets);

  let tableHtml = "";
  pets.forEach((pet) => {
    console.log(pet);
    tableHtml += `<tr>
                      <td>${pet.name}</td>
                      <td>${pet.animalType}</td>
                      <td>${pet.age}</td>
                      <td>${pet.breed}</td>
                      <td>${pet.size}</td>
                      <td>${pet.mood}</td>
                  </tr>`;
  });

  pets_table.innerHTML = tableHtml;

  console.log(tableHtml);
}

getPets().then((res) => fillPetsTable(res));
