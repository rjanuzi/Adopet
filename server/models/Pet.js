class Pet {
  constructor({ name, age, animalType, breed, size, mood }) {
    this.name = name;
    this.age = age;
    this.animalType = animalType;
    this.breed = breed;
    this.size = size;
    this.mood = mood;
    this.entryDate = new Date();
  }
}

export default Pet;
