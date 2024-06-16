import { AbstractEntity } from "../AbstractEntity";

interface IMealSchedule {
  id: number;
  startHours: number;
  endHours: number;
  startMinutes: number;
  endMinutes: number;
  name: string;
}

export default class MealSchedule
  extends AbstractEntity
  implements IMealSchedule
{
  constructor(
    public id: number,
    public name: string,
    public startHours: number,
    public startMinutes: number,
    public endHours: number,
    public endMinutes: number
  ) {
    super(id);
  }

  override toString() {
    return `${this.startHours}:${this.startMinutes
      .toString()
      .padEnd(2, "0")} – ${this.endHours}:${this.endMinutes
      .toString()
      .padEnd(2, "0")}. ${this.name}`;
  }
}
