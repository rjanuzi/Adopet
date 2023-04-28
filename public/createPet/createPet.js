const url = window.location.href;
const lastUrlToken = url.split("/").pop();
const petId = lastUrlToken == "createPet" ? "" : lastUrlToken;

const inputName = document.getElementById("inputName");
const inputAge = document.getElementById("inputAge");
const inputAnimalType = document.getElementById("inputAnimalType");
const inputBreed = document.getElementById("inputBreed");
const inputSize = document.getElementById("inputSize");
const inputMood = document.getElementById("inputMood");
const createBtn = document.getElementById("create-btn");
const saveBtn = document.getElementById("save-btn");

/* Query Pet Data and fill form */
async function fillForm(petId) {
  const response = await fetch("/pets/" + petId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const petData = await response.json();

  console.log(petData);

  inputName.value = petData.name;
  inputAge.value = petData.age;
  inputAnimalType.value = petData.animalType;
  inputBreed.value = petData.breed;
  inputSize.value = petData.size;
  inputMood.value = petData.mood;
}

function processResult(result) {
  if (result) {
    window.location.href = "/";
  } else {
    console.log(`Deu ruim: ${result}`);
  }
}  

/* Configure page for create or update Pet */
function configPage() {
  const isCreatePage = petId == "";

  if (isCreatePage) {
    /* Configure for Create Page */
    saveBtn.style.display = "none";
    createBtn.addEventListener("click", () =>
      createPet().then((result) => {
        if (result) {
          window.location.href = "/";
        } else {
          console.log(`Deu ruim: ${result}`);
        }
      })
    );
  } else {
    /* Configure to update page */
    createBtn.style.display = "none";
    saveBtn.addEventListener("click", () =>
      savePet().then((result) => {
        if (result) {
          window.location.href = "/";
        } else {
          console.log(`Deu ruim: ${result}`);
        }
      })
    );

    fillForm(petId);
  }
}

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

async function postFormData(url) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formToObject()),
  });
  const result = await response.json();
  return result.result;
};

async function createPet() {
  return postFormData("/pets");
}

async function savePet() {
  return postFormData(`/pets/${petId}`);
}

addEventListener("load", (event) => {
  configPage();
});
