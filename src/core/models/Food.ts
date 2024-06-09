import { AbstractEntity } from "../AbstractEntity";
import toMany from "../toMany";
import type FoodRecord from "./FoodRecord";

export default class Food extends AbstractEntity {
  foodRecords!: FoodRecord[];

  constructor(
    public id: number,
    public name: string,
    public fat: number,
    public protein: number,
    public carbohydrates: number,
    public kilojoules: number,
    public image: Blob,
    public weightGram?: number
  ) {
    super(id);

    Object.defineProperties(this, {
      foodRecords: toMany(),
    });
  }
}
