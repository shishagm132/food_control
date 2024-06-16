export default class FoodRecord {
  constructor(
    public date: string,
    public foodId: number[],
    public mealScheduleId: number
  ) {}

  public equal(date: string): boolean {
    return this.date === date;
  }
}
