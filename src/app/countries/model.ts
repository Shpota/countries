export class Country {
  public constructor(
    public name: string,
    public defaultCurrency: string,
    public documents: Document[],
    public options: Options,
  ) {}
}

export class Options {
  public constructor(public withdrawalMaximum: string) {}
}

export class Document {
  public constructor(public description: string) {}
}
