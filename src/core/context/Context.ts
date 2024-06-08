import Dexie from "dexie";

import * as Models from "../models";

const mealSchedules = [
  new Models.MealSchedule(0, "Завтрак", 7, 0, 8, 0), // Завтрак с 7:00 - 8:00 и т. д.
  new Models.MealSchedule(1, "Второй завтрак", 11, 0, 11, 30),
  new Models.MealSchedule(2, "Обед", 12, 0, 13, 0),
  new Models.MealSchedule(3, "Полдник", 15, 0, 15, 30),
  new Models.MealSchedule(4, "Ужин", 18, 0, 20, 0),
] as const;

export class Context extends Dexie {
  public foods!: Dexie.Table<Models.Food, "id">;
  public mealSchedules: ReadonlyArray<Models.MealSchedule>;
  public foodsRecords!: Dexie.Table<Models.FoodRecord, "date">;

  constructor() {
    super("FoodApp");

    this.mealSchedules = mealSchedules;

    this.version(1).stores({
      foods:
        "++id, fat, protein, carbohydrates, sucrose, kilocalories, kilojoules, image",
      foodsRecords: "&date, foodId, mealScheduleId",
    });

    this.foods.mapToClass(Models.Food);
    this.foodsRecords.mapToClass(Models.FoodRecord);
  }
}
