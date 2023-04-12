console.log("Adding event");

document.getElementById("create-btn").addEventListener("click", () =>
  createPet().then((result) => {
    if (result) {
      window.location.href = "/";
    } else {
      console.log(`Deu ruim: ${result}`);
    }
  })
);

const inputName = document.getElementById("inputName");
const inputAge = document.getElementById("inputAge");
const inputAnimalType = document.getElementById("inputAnimalType");
const inputBreed = document.getElementById("inputBreed");
const inputSize = document.getElementById("inputSize");
const inputMood = document.getElementById("inputMood");

function formToObject() {
  const newPetData = {
    name: inputName.value,
    age: inputAge.value,
    animalType: inputAnimalType.value,
    breed: inputBreed.value,
    size: inputSize.value,
    mood: inputMood.value,
  };

  return newPetData;
}

async function createPet() {
  const response = await fetch("/pets", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formToObject()),
  });
  const result = await response.json();
  return result.result;
}
