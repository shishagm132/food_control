import type { Context } from "../core/context/Context";
import type { Food } from "../core/models";

export function addFood(db: Context, food: Food): void {
  db.foods.add(food);
}
