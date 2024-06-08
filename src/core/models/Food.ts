import { AbstractEntity } from "../AbstractEntity";
import toMany from "../toMany";
import type FoodRecord from "./FoodRecord";

export default class Food extends AbstractEntity {
  foodRecords!: FoodRecord[];

  constructor(
    public id: number,
    public fat: number,
    public protein: number,
    public carbohydrates: number,
    public sucrose: number,
    public kilocalories: number,
    public kilojoules: number,
    public image: Blob
  ) {
    super(id);

    Object.defineProperties(this, {
      foodRecords: toMany(),
    });
  }
}
