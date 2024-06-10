import { AbstractEntity } from "../AbstractEntity";
import type FoodRecord from "./FoodRecord";

export default class Food {
  foodRecords!: FoodRecord[];
  public id: number = null!;

  constructor(
    public name: string,
    public fat: number,
    public protein: number,
    public carbohydrates: number,
    public kilojoules: number,
    public weightGram: number,
    public image?: Blob
  ) {
    Object.defineProperties(this, {
      id: { enumerable: false, writable: true },
    });
  }

  get isEnumerable() {
    return this.weightGram >= 1;
  }

  public equals(id: number) {
    return this.id === id;
  }
}
