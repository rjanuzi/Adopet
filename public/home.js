

const petsCorouselDiv = document.getElementById("pets_carousel");

async function getPets() {
  const response = await fetch("/pets");
  const jsonData = await response.json();
  return jsonData;
}

function genSlideElement(pet, active) {
  if (active) {
    return `
              <div class="carousel-item active">
                <img class="d-block w-100" width="300" height="350" src="${pet.photo}"/>
                <div class="carousel-caption d-none d-md-block">
                  <h5><a style="color: white;" href="createPet/${pet._id}"><strong>${pet.name}<strong/></a></h5>
                  <p style="color: white;"><strong>A ${pet.age} years old ${pet.size} sized ${pet.mood} ${pet.animalType} from the breed ${pet.breed}.<strong/></p>
                </div>
              </div>
            `;
  } else {
    return `
              <div class="carousel-item">
                <img class="d-block w-100" width="300" height="350" src="${pet.photo}"/>
                <div class="carousel-caption d-none d-md-block">
                  <h5><a style="color: white;" href="createPet/${pet._id}"><strong>${pet.name}<strong/></a></h5>
                  <p style="color: white;"><strong>A ${pet.age} years old ${pet.size} sized ${pet.mood} ${pet.animalType} from the breed ${pet.breed}.<strong/></p>
                </div>
              </div>
            `;
  }
}

function fillPetsSlides(pets) {
  petsCorouselDiv.innerHTML = "";

  let innerHTML = "";
  pets.forEach((pet, index) => {
    innerHTML += genSlideElement(pet, index == 0);
  });

  petsCorouselDiv.innerHTML = innerHTML;
}

async function updatePets() {
  const pets = await getPets();
  fillPetsSlides(pets);
}

async function deletePet(event) {
  const target = event.target;
  const petId = target.getAttribute("petId");
  const response = await fetch(`/pets/${petId}`, { method: "DELETE" });
  const jsonData = await response.json();

  if (jsonData.success) {
    alert("Pet deleted successfully!");
  } else {
    alert("Error deleting pet!");
  }

  await updatePets();
}


await updatePets();
