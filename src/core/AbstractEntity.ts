export abstract class AbstractEntity {
  constructor(public id: number) {}

  public equals(id: number): boolean {
    return this.id === id;
  }
}
