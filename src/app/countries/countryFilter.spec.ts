import {Country, Options} from "./model";
import {countryFilter} from "./countries.component";

describe('Country Filter', () => {
  it('should match by name and currency', () => {
    const country = testCountry("Ukraine", "UAH")

    const matches = countryFilter(country, "Ukraine", "UAH");

    expect(matches).toBeTrue();
  });

  it('should match by name given uppercase filter value', () => {
    const country = testCountry("Ukraine", "UAH")

    const matches = countryFilter(country, "UKRAINE", "");

    expect(matches).toBeTrue();
  });

  it('should match by currency given uppercase filter value', () => {
    const country = testCountry("Ukraine", "uah")

    const matches = countryFilter(country, "", "UAH");

    expect(matches).toBeTrue();
  });

  it('should match by name given uppercase object property', () => {
    const country = testCountry("UKRAINE", "UAH")

    const matches = countryFilter(country, "ukraine", "");

    expect(matches).toBeTrue();
  });


  it('should match by currency given uppercase object property', () => {
    const country = testCountry("Ukraine", "UAH")

    const matches = countryFilter(country, "", "uah");

    expect(matches).toBeTrue();
  });

  it('should match by name given a part of the matching string', () => {
    const country = testCountry("Ukraine", "UAH")

    const matches = countryFilter(country, "rai", "");

    expect(matches).toBeTrue();
  });

  it('should match by currency given a part of the matching string', () => {
    const country = testCountry("Ukraine", "UAH")

    const matches = countryFilter(country, "", "ah");

    expect(matches).toBeTrue();
  });

  it('should not match given different currency', () => {
    const country = testCountry("Ukraine", "UAH")

    const matches = countryFilter(country, "Ukraine", "EUR");

    expect(matches).toBeFalse();
  });

  it('should not match given different name', () => {
    const country = testCountry("Ukraine", "UAH")

    const matches = countryFilter(country, "Italy", "UAH");

    expect(matches).toBeFalse();
  });
});

const testCountry = (name: string, currency: string): Country => new Country(
  name,
  currency,
  [{description: "Passport"}],
  new Options("100")
)
