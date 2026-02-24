export interface PetTuple {
  id: number;
  name: string;
}

export class PetNameAnalyzer {
  private pets: PetTuple[];

  constructor(pets: PetTuple[]) {
    this.pets = pets;
  }

  listTuples(): PetTuple[] {
    return this.pets;
  }

  // returns { "Bella": 14, "doggie": 8, ... }
  countByName(): Record<string, number> {
    return this.pets.reduce<Record<string, number>>((acc, pet) => {
      const name = pet.name.trim();
      acc[name] = (acc[name] ?? 0) + 1;
      return acc;
    }, {});
  }

}
