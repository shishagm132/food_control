import { derived, writable, type Readable, type Writable } from "svelte/store";
import { Food } from "./models";

const updateRelativelyToWeight = (weight: number, property: number) =>
  (weight / 100) * property;

export class FoodHolder {
  count?: number;
  weight?: number;
  kj!: number;
  protein!: number;
  carbohydrates!: number;
  fat!: number;

  get isEnumerable() {
    return this.count !== undefined;
  }

  private constructor(public readonly food: Food) {}

  private initFromFood({ fat, kj, protein, carbohydrates }: Food) {
    this.fat = fat;
    this.kj = kj;
    this.protein = protein;
    this.carbohydrates = carbohydrates;
  }

  static fromEnumerableFood(food: Food, count = 1) {
    const instance = new FoodHolder(food);

    instance.count = count;
    instance.initFromFood(food);

    return instance;
  }

  static fromWeightFood(food: Food, weight: number) {
    const instance = new FoodHolder(food);

    instance.weight = weight;
    instance.initFromFood(food);

    return instance;
  }
}
