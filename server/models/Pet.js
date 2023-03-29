class Pet {
  constructor(
    name,
    age,
    animalType,
    breed,
    size,
    mood,
    entryDate = new Date()
  ) {
    this.name = name;
    this.age = age;
    this.animalType = animalType;
    this.breed = breed;
    this.size = size;
    this.mood = mood;
    this.entryDate = entryDate;
  }
}

export default Pet;
