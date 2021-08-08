export class Currency {
  public constructor(
    public name: string,
    public code: string,
    public countries: string[] = []
  ) {}
}
